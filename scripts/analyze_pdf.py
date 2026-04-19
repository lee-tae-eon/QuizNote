import pdfplumber
import os

pdf_path = "/Users/itaeeon/Desktop/Personal/Project/QuizNote/Data/examples/2024년1회_정보처리기사필기기출문제.pdf"

print(f"--- Analyzing: {os.path.basename(pdf_path)} ---")

with pdfplumber.open(pdf_path) as pdf:
    # Check first 2 pages
    for i in range(min(2, len(pdf.pages))):
        page = pdf.pages[i]
        text = page.extract_text()
        print(f"\n[Page {i+1}]")
        print(text[:2000]) # Print first 2000 chars
