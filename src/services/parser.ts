// src/services/parser.ts
import { Question } from '../types/quiz';

export const QuizParser = {
  parseJSON(text: string): Partial<Question>[] {
    const data = JSON.parse(text);
    if (!Array.isArray(data)) throw new Error('Invalid JSON format');
    return data;
  },

  parseCSV(text: string): Partial<Question>[] {
    const lines = text.split(/\r?\n/);
    return lines.slice(1)
      .filter(line => line.trim())
      .map(line => {
        const [subject, source, question, c1, c2, c3, c4, answer, explanation] = line.split(',');
        return {
          subject: subject?.trim(),
          source: source?.trim(),
          question: question?.trim(),
          choices: [c1?.trim(), c2?.trim(), c3?.trim(), c4?.trim()],
          answer: parseInt(answer?.trim()) - 1,
          explanation: explanation?.trim()
        };
      });
  }
};
