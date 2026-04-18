// src/types/quiz.ts
export interface Question {
  id: number;
  subject: string;
  source: string;
  question: string;
  choices: string[];
  answer: number;
  explanation: string;
}

export type QuizMode = 'ALL' | 'WRONG';
