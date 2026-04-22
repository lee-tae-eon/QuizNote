# 📋 TASKS - QuizNote

## 🎯 Current Status (현재 상태)
- **Primary Goal**: Restoration of exam data integrity and stabilization of Quiz mode.
- **핵심 목표**: 기출문제 데이터 무결성 복구 및 퀴즈 모드 안정화.

---

## 🏃 Active Tasks (진행 중인 작업)

| Priority | Task | Assignee | Status | Note |
| :--- | :--- | :--- | :--- | :--- |
| High | **Data Integrity Check** | Constructor | `READY_FOR_TEST` | New JSON datasets generated and mapped. |
| High | **UI Error Handling** | Constructor | `DONE` | Warning UI added for missing answers. |
| Medium | **Project Structure Docs** | Constructor | `DONE` | Created .agents/TASKS.md and project_notes.md. |

---

## 🗒 Task Details (작업 상세)

### 1. Data Integrity & Recovery (데이터 무결성 및 복구)
- [x] Fix multi-line question truncation in `mass_extract.py`.
- [x] Standardize all answers to 1-indexed.
- [x] Filter out `answer: 0` questions in `DataService`.
- [ ] Refine choice splitting logic for symbol-only markers.

### 2. Feature Improvements (기능 개선)
- [ ] Implement subject-based filtering for Random Mode.
- [ ] Add "Search Question" feature in Wrong Answer note.
- [ ] Improve diagram (image) extraction resolution.

---

## 🏗 Project Structure (프로젝트 구조)

### Directory Map
```text
QuizNote/
├── .agents/            # Agent management & Docs
├── scripts/            # Data extraction & Processing tools
├── src/
│   ├── Data/           # JSON Exam datasets
│   ├── assets/         # Images & Static assets
│   ├── components/     # UI Components (ChoiceList, etc.)
│   ├── constants/      # Theme & App constants
│   ├── hooks/          # Custom hooks (useQuiz, etc.)
│   ├── screens/        # Main screen views
│   ├── services/       # Core logic (DataService, DbService)
│   └── types/          # TypeScript interfaces
└── Data/examples/      # Raw PDF exam files
```

---

## 🤝 Handoff Notes (인계 사항)

### To Guardian (검증자에게)
- Please verify the data quality of 2012-2015 exams in Random Mode.
- Check if the "Missing Answer" warning UI triggers correctly for `answer: 0`.
- 2012-2015년 기출문제가 랜덤 모드에서 정상적으로 출력되는지 확인해 주세요.
- 정답이 0인 경우 경고 UI가 의도대로 표시되는지 테스트가 필요합니다.
