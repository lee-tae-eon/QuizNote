// src/types/exam.ts
export interface Question {
  id: number;
  subject: string;
  source: string;
  question: string;
  choices: string[];
  answer: number;
  explanation: string;
  image?: string;
}

export interface ExamSet {
  id: string;
  title: string;
  file: string;
  count: number;
  questions: Question[];
}

export type QuizMode = 'ALL' | 'WRONG';
