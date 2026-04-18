// src/hooks/useQuiz.ts
import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import * as Haptics from 'expo-haptics';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { Question, QuizMode } from '../types/quiz';
import { QuizStorage } from '../services/storage';
import { QuizParser } from '../services/parser';
import initialData from '../../Data/SampleQuestions.json';

export const useQuiz = () => {
  const [loading, setLoading] = useState(true);
  const [wrongIds, setWrongIds] = useState<number[]>([]);
  const [customQuestions, setCustomQuestions] = useState<Question[]>([]);
  const [mode, setMode] = useState<QuizMode>('ALL');
  
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);

  const allQuestions = [...(initialData as Question[]), ...customQuestions];
  const questions = mode === 'WRONG' 
    ? allQuestions.filter(q => wrongIds.includes(q.id))
    : allQuestions;

  const currentQuestion = questions[currentIdx];

  useEffect(() => {
    (async () => {
      const ids = await QuizStorage.getWrongIds();
      const custom = await QuizStorage.getCustomQuestions();
      setWrongIds(ids);
      setCustomQuestions(custom);
      setLoading(false);
    })();
  }, []);

  const handleSelect = (idx: number) => {
    if (selectedIdx !== null || !currentQuestion) return;
    setSelectedIdx(idx);
    setShowExplanation(true);

    if (idx === currentQuestion.answer) {
      setScore(s => s + 1);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else {
      const newIds = [...new Set([...wrongIds, currentQuestion.id])];
      setWrongIds(newIds);
      QuizStorage.saveWrongIds(newIds);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  };

  const nextQuestion = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(i => i + 1);
      setSelectedIdx(null);
      setShowExplanation(false);
    } else {
      Alert.alert('학습 완료!', `점수: ${score}/${questions.length}`, [
        { text: '다시 풀기', onPress: resetQuiz }
      ]);
    }
  };

  const resetQuiz = () => {
    setCurrentIdx(0);
    setSelectedIdx(null);
    setShowExplanation(false);
    setScore(0);
  };

  const toggleMode = (newMode: QuizMode) => {
    if (newMode === 'WRONG' && wrongIds.length === 0) {
      Alert.alert('알림', '저장된 오답이 없습니다!');
      return;
    }
    setMode(newMode);
    resetQuiz();
  };

  const removeWrong = async (id: number) => {
    const newIds = wrongIds.filter(v => v !== id);
    setWrongIds(newIds);
    await QuizStorage.saveWrongIds(newIds);
    if (mode === 'WRONG' && currentIdx >= newIds.length && currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
    }
  };

  const importQuestions = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/json', 'text/comma-separated-values', 'text/plain'],
        copyToCacheDirectory: true
      });
      if (result.canceled) return;

      const fileContent = await FileSystem.readAsStringAsync(result.assets[0].uri);
      const fileName = result.assets[0].name.toLowerCase();
      
      let imported: Partial<Question>[] = fileName.endsWith('.json') 
        ? QuizParser.parseJSON(fileContent) 
        : QuizParser.parseCSV(fileContent);

      const lastId = allQuestions.length > 0 ? Math.max(...allQuestions.map(q => q.id)) : 0;
      const processed = imported.map((q, i) => ({ ...q, id: lastId + i + 1 } as Question));
      
      const newCustom = [...customQuestions, ...processed];
      setCustomQuestions(newCustomQuestions => [...newCustomQuestions, ...processed]);
      await QuizStorage.saveCustomQuestions(newCustom);

      Alert.alert('성공', `${processed.length}개의 문제를 추가했습니다.`);
    } catch (e) {
      Alert.alert('오류', '파일 형식이 잘못되었습니다.');
    }
  };

  return {
    loading, questions, currentQuestion, currentIdx, selectedIdx, showExplanation, score, mode, wrongIds,
    handleSelect, nextQuestion, toggleMode, removeWrong, importQuestions
  };
};
