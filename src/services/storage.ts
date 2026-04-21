// src/services/storage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Question } from '../types/exam';

const WRONG_KEY = 'WRONG_ANSWERS_IDS';
const CUSTOM_KEY = 'CUSTOM_QUESTIONS';

export const QuizStorage = {
  async getWrongIds(): Promise<number[]> {
    const stored = await AsyncStorage.getItem(WRONG_KEY);
    return stored ? JSON.parse(stored) : [];
  },

  async saveWrongIds(ids: number[]): Promise<void> {
    await AsyncStorage.setItem(WRONG_KEY, JSON.stringify(ids));
  },

  async getCustomQuestions(): Promise<Question[]> {
    const stored = await AsyncStorage.getItem(CUSTOM_KEY);
    return stored ? JSON.parse(stored) : [];
  },

  async saveCustomQuestions(questions: Question[]): Promise<void> {
    await AsyncStorage.setItem(CUSTOM_KEY, JSON.stringify(questions));
  }
};
