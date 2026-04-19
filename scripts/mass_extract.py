import pdfplumber
import re
import json
import os

def parse_answer_key(text):
    matches = re.findall(r"(\d+)\.([①②③④])", text)
    mapping = { "①": 0, "②": 1, "③": 2, "④": 3 }
    return { int(num): mapping[ans] for num, ans in matches }

def extract_quiz(pdf_path):
    all_questions = []
    current_subject = "전체"
    
    try:
        with pdfplumber.open(pdf_path) as pdf:
            last_page_text = ""
            for p in range(len(pdf.pages)-1, -1, -1):
                last_page_text = pdf.pages[p].extract_text() or ""
                if "정답" in last_page_text: break
            
            answers = parse_answer_key(last_page_text)
            full_text_blocks = []
            
            for page in pdf.pages:
                width = page.width
                for bbox in [(0, 0, width*0.5, page.height), (width*0.5, 0, width, page.height)]:
                    col = page.within_bbox(bbox)
                    words = col.extract_words(x_tolerance=3, y_tolerance=3)
                    if not words: continue
                    lines = []
                    current_line = [words[0]]
                    for w in words[1:]:
                        if abs(w['top'] - current_line[-1]['top']) < 3:
                            current_line.append(w)
                        else:
                            lines.append(" ".join([x['text'] for x in current_line]))
                            current_line = [w]
                    lines.append(" ".join([x['text'] for x in current_line]))
                    full_text_blocks.extend(lines)

            i = 0
            while i < len(full_text_blocks):
                line = full_text_blocks[i].strip()
                sub_match = re.search(r"제\d과목\s+([\w\s]+)", line)
                if sub_match:
                    current_subject = sub_match.group(1).strip()
                    i += 1
                    continue
                
                q_match = re.match(r"^(\d+)\.\s+(.+)", line)
                if q_match:
                    q_num = int(q_match.group(1))
                    q_content = q_match.group(2)
                    i += 1
                    while i < len(full_text_blocks) and not re.search(r"[①②③④]", full_text_blocks[i]):
                        if re.match(r"^\d+\.", full_text_blocks[i]): break
                        q_content += " " + full_text_blocks[i].strip()
                        i += 1
                    choices_raw = ""
                    while i < len(full_text_blocks):
                        if re.match(r"^\d+\.", full_text_blocks[i]): break
                        if re.search(r"제\d과목", full_text_blocks[i]): break
                        choices_raw += " " + full_text_blocks[i].strip()
                        i += 1
                    c_list = re.split(r"[①②③④]", choices_raw)
                    c_list = [c.strip() for c in c_list if c.strip()]
                    if len(c_list) >= 4:
                        all_questions.append({
                            "id": f"{os.path.basename(pdf_path)}_{q_num}",
                            "subject": current_subject,
                            "question": q_content.strip(),
                            "choices": c_list[:4],
                            "answer": answers.get(q_num, 0),
                            "explanation": "해설은 준비 중입니다."
                        })
                    continue
                i += 1
    except Exception as e:
        print(f"Error parsing {pdf_path}: {e}")
    return all_questions

input_dir = "/Users/itaeeon/Desktop/Personal/Project/QuizNote/Data/examples"
output_dir = "/Users/itaeeon/Desktop/Personal/Project/QuizNote/src/Data/exams"
os.makedirs(output_dir, exist_ok=True)

exam_list = []

for filename in sorted(os.listdir(input_dir)):
    if filename.endswith(".pdf"):
        print(f"Processing {filename}...")
        file_path = os.path.join(input_dir, filename)
        questions = extract_quiz(file_path)
        
        if questions:
            # Create a safe filename for JSON
            safe_name = filename.replace(".pdf", "").replace(" ", "_")
            out_file = os.path.join(output_dir, f"{safe_name}.json")
            with open(out_file, "w", encoding="utf-8") as f:
                json.dump(questions, f, ensure_ascii=False, indent=2)
            
            exam_list.append({
                "title": filename.replace(".pdf", ""),
                "count": len(questions),
                "file": f"{safe_name}.json"
            })

with open(os.path.join(output_dir, "exam_list.json"), "w", encoding="utf-8") as f:
    json.dump(exam_list, f, ensure_ascii=False, indent=2)

print(f"Total {len(exam_list)} exams processed.")
