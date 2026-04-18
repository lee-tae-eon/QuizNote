# 📚 QuizNote 프로젝트 로컬 규칙

이 파일은 `QuizNote` 프로젝트 전용 규칙을 정의합니다. `Personal/.agent/rules/global.md` 규칙과 함께 적용됩니다.

## 1. 아키텍처 및 스택
- **Framework**: React Native (Expo)
- **Language**: TypeScript
- **Data Storage**: AsyncStorage (기본) 또는 SQLite (대량 데이터)
- **Architecture**: Functional Components with Hooks (Context API 또는 간단한 State)
- **No Backend**: 별도의 서버 없이 로컬 데이터 중심으로 작동합니다.

## 2. 개발 우선순위 (개인용 앱)
1. **데이터 편의성**: 아이폰에서 문제를 직접 치는 것은 불가능에 가깝다. 가장 중요한 스펙은 CSV/JSON 파일을 iCloud에서 편하게 불러오는 기능이다.
2. **빠른 피드백 루프**: 문제를 풀고 채점, 정답/오답 표시를 직관적이고 빠르게 넘어갈 수 있어야 한다.
3. **복습(Spaced Repetition)**: 오답 노트는 횟수, 시간 순으로 정렬/필터링 가능해야 한다.

## 3. UI/UX 지침
- 기본 시스템 컴포넌트를 최대한 활용 (화려한 커스텀 디자인보다는 깔끔하고 실용적인 구성)
- 오답 여부 시각적 피드백 명확히 (햅틱, 컬러 포인트)
