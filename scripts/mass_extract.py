import pdfplumber
import re
import json
import os
import unicodedata

def parse_answer_key(text):
    mapping = { "①": 0, "②": 1, "③": 2, "④": 3, "⑤": 4, "가": 0, "나": 1, "다": 2, "라": 3, "마": 4 }
    matches = re.findall(r"(\d+)\s*[\.．:]\s*([①②③④⑤가나다라마])", text)
    return { int(num): mapping[ans] for num, ans in matches }

def find_column_divider(page):
    width = page.width
    mid_start, mid_end = int(width * 0.4), int(width * 0.6)
    words = page.extract_words()
    if not words: return width * 0.5
    x_density = [0] * int(width)
    for w in words:
        for x in range(int(w['x0']), int(w['x1'])):
            if 0 <= x < len(x_density): x_density[x] += 1
    min_val = min(x_density[mid_start:mid_end])
    for x in range(mid_start, mid_end):
        if x_density[x] == min_val: return float(x)
    return width * 0.5

def get_tight_diagram_bbox(page_obj, is_legacy=False, has_keyword=False):
    objs = page_obj.images + page_obj.rects + page_obj.curves
    if not objs: return None
    clean_objs = []
    for o in objs:
        w, h = o.get('width', 0), o.get('height', 0)
        if w < 2 and h < 2: continue
        if w > page_obj.width * 0.9: continue
        clean_objs.append(o)
    if not clean_objs: return None
    x0, top = min(o['x0'] for o in clean_objs), min(o['top'] for o in clean_objs)
    x1, bottom = max(o['x1'] for o in clean_objs), max(o['bottom'] for o in clean_objs)
    threshold = 8 if (is_legacy or has_keyword) else 40
    if (bottom - top) < threshold: return None
    return (max(0, x0-0.5), max(0, top-0.5), min(page_obj.width, x1+0.5), min(page_obj.height, bottom+0.5))

def extract_quiz_v14(pdf_path, img_dir):
    all_questions = []
    norm_path = unicodedata.normalize('NFC', pdf_path)
    is_legacy = any(x in norm_path for x in ["05년", "06년", "07년"])
    answers = {}
    
    try:
        with pdfplumber.open(pdf_path) as pdf:
            # First pass: collect answers
            for page in pdf.pages:
                text = page.extract_text() or ""
                if any(k in text for k in ["정답", "가 나 다 라", "정 답"]):
                    ans_map = parse_answer_key(text)
                    if len(ans_map) > 10:
                        answers.update(ans_map)
            
            # Second pass: collect questions
            for page in pdf.pages:
                div = find_column_divider(page)
                for bbox in [(0, 0, div - 5, page.height), (div + 5, 0, page.width, page.height)]:
                    col = page.within_bbox(bbox)
                    words = col.extract_words(x_tolerance=2, y_tolerance=2)
                    if not words: continue
                    
                    lines = []
                    curr_line = [words[0]]
                    for w in words[1:]:
                        if abs(w['top'] - curr_line[-1]['top']) < 3: curr_line.append(w)
                        else:
                            lines.append({"text": " ".join([x['text'] for x in curr_line]), "top": curr_line[0]['top'], "bottom": curr_line[0]['bottom']})
                            curr_line = [w]
                    lines.append({"text": " ".join([x['text'] for x in curr_line]), "top": curr_line[0]['top'], "bottom": curr_line[0]['bottom']})
                    
                    q_indices = [i for i, l in enumerate(lines) if re.match(r"^\d+\s*[\.．]", l["text"])]
                    
                    for k in range(len(q_indices)):
                        curr_idx = q_indices[k]
                        next_q_idx = q_indices[k+1] if k+1 < len(q_indices) else len(lines)
                        
                        q_match = re.match(r"^(\d+)\s*[\.．]\s*(.+)", lines[curr_idx]["text"])
                        if q_match:
                            q_num, q_first_line = int(q_match.group(1)), q_match.group(2)
                            
                            q_lines = []
                            choice_start_idx = next_q_idx
                            
                            # Check for choices on the first line
                            m = re.search(r"[①②③④⑤가나다라마]\s*[\.．\)）]", lines[curr_idx]["text"])
                            if m and m.start() > 5:
                                q_lines.append(lines[curr_idx]["text"][:m.start()].replace(str(q_num), "", 1).strip(" .．"))
                                choice_start_idx = curr_idx
                            else:
                                q_lines.append(q_first_line)
                                for i in range(curr_idx + 1, next_q_idx):
                                    m = re.search(r"[①②③④⑤가나다라마]\s*[\.．\)）]", lines[i]["text"])
                                    if m:
                                        choice_start_idx = i
                                        if m.start() > 2: q_lines.append(lines[i]["text"][:m.start()])
                                        break
                                    q_lines.append(lines[i]["text"])
                            
                            q_content = " ".join(q_lines).strip()
                            q_content = re.sub(r"^\d+\s*[\.．]\s*", "", q_content)
                            
                            choice_block_lines = []
                            for i in range(choice_start_idx, next_q_idx):
                                choice_block_lines.append(lines[i]["text"])
                            raw_block = " ".join(choice_block_lines)
                            
                            c_list = re.split(r"[①②③④⑤가나다라마]\s*[\.．\)）]", raw_block)
                            choices = [c.strip() for c in c_list if c.strip()]
                            if not choices or len(choices) < 2:
                                c_list = re.split(r"[①②③④⑤]", raw_block)
                                if len(c_list) <= 1: c_list = re.split(r"[가나다라마]\s*[\.．\)）]", raw_block)
                                choices = [c.strip() for c in c_list[1:] if c.strip()]
                            
                            if not choices: choices = ["가", "나", "다", "라"]
                            
                            has_keyword = any(k in q_content for k in ["다음", "질의", "SQL", "그림", "보기"]) or (choices == ["가", "나", "다", "라"])
                            prev_q_bottom = lines[q_indices[k-1]]["bottom"] if k > 0 else 0
                            next_q_top = lines[q_indices[k+1]]["top"] if k+1 < len(q_indices) else page.height
                            q_bubble_bbox = (bbox[0], prev_q_bottom + 1, bbox[2], next_q_top - 1)
                            
                            img_file = None
                            if q_bubble_bbox[3] > q_bubble_bbox[1]:
                                try:
                                    bubble_area = page.within_bbox(q_bubble_bbox)
                                    diag_bbox = get_tight_diagram_bbox(bubble_area, is_legacy, has_keyword)
                                    if diag_bbox:
                                        q_id = f"{os.path.basename(pdf_path)}_{q_num}"
                                        img_file = f"{q_id}.png"
                                        page.within_bbox(diag_bbox).to_image(resolution=300).save(os.path.join(img_dir, img_file))
                                except: img_file = None

                            final_ans = 0
                            if q_num in answers:
                                raw_ans = answers[q_num]
                                final_ans = raw_ans + 1 if raw_ans >= 0 and raw_ans < 5 else 0

                            all_questions.append({
                                "id": f"{os.path.basename(pdf_path)}_{q_num}",
                                "subject": "전체",
                                "question": q_content,
                                "choices": choices[:5],
                                "answer": final_ans,
                                "image": img_file,
                                "explanation": "해설은 준비 중입니다."
                            })
    except Exception as e: print(f"  [Error] {pdf_path}: {e}")
    return all_questions

if __name__ == "__main__":
    base_dir = "/Users/itaeeon/Desktop/Personal/Project/QuizNote"
    input_dir = os.path.join(base_dir, "Data/examples")
    output_data_dir = os.path.join(base_dir, "src/Data/exams")
    output_img_dir = os.path.join(base_dir, "src/assets/exams")
    
    if not os.path.exists(output_data_dir): os.makedirs(output_data_dir)
    if not os.path.exists(output_img_dir): os.makedirs(output_img_dir)
    
    for filename in sorted(os.listdir(input_dir)):
        if filename.endswith(".pdf"):
            print(f"Processing {filename}...")
            questions = extract_quiz_v14(os.path.join(input_dir, filename), output_img_dir)
            if questions:
                safe_name = filename.replace(".pdf", "").replace(" ", "_")
                with open(os.path.join(output_data_dir, f"{safe_name}.json"), "w", encoding="utf-8") as f:
                    json.dump(questions, f, ensure_ascii=False, indent=2)
    print("\nExtraction V14 Improved Complete.")
