// src/services/dbService.ts
import * as SQLite from 'expo-sqlite';
import { Question } from '../types/exam';

const DB_NAME = 'quiznote.db';

export const DbService = {
  db: null as SQLite.SQLiteDatabase | null,

  async init() {
    if (this.db) return;
    this.db = await SQLite.openDatabaseAsync(DB_NAME);
    
    // Create tables
    await this.db.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS wrong_answers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        question_id INTEGER NOT NULL,
        exam_id TEXT NOT NULL,
        added_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(question_id, exam_id)
      );
    `);
  },

  async addWrongAnswer(questionId: number, examId: string) {
    if (!this.db) await this.init();
    try {
      await this.db!.runAsync(
        'INSERT OR IGNORE INTO wrong_answers (question_id, exam_id) VALUES (?, ?)',
        [questionId, examId]
      );
    } catch (e) {
      console.error('DB Error adding wrong answer:', e);
    }
  },

  async removeWrongAnswer(questionId: number, examId: string) {
    if (!this.db) await this.init();
    try {
      await this.db!.runAsync(
        'DELETE FROM wrong_answers WHERE question_id = ? AND exam_id = ?',
        [questionId, examId]
      );
    } catch (e) {
      console.error('DB Error removing wrong answer:', e);
    }
  },

  async getWrongAnswers() {
    if (!this.db) await this.init();
    try {
      const allRows = await this.db!.getAllAsync<{ question_id: number; exam_id: string }>(
        'SELECT question_id, exam_id FROM wrong_answers ORDER BY added_at DESC'
      );
      return allRows;
    } catch (e) {
      console.error('DB Error getting wrong answers:', e);
      return [];
    }
  },

  async clearWrongAnswers() {
    if (!this.db) await this.init();
    await this.db!.runAsync('DELETE FROM wrong_answers');
  }
};
