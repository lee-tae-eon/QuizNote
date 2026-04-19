import { useState } from 'react';
import * as Haptics from 'expo-haptics';
import { Question } from '../types/quiz';

export const useQuiz = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  const loadQuestions = (newQuestions: Question[]) => {
    setQuestions(newQuestions);
    setCurrentIndex(0);
    setSelectedChoice(null);
    setShowAnswer(false);
    setScore(0);
    setIsQuizFinished(false);
  };

  const handleChoiceSelect = (index: number) => {
    if (selectedChoice !== null || !questions[currentIndex]) return;

    setSelectedChoice(index);
    setShowAnswer(true);

    if (index === questions[currentIndex].answer) {
      setScore(s => s + 1);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  };

  const goToNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedChoice(null);
      setShowAnswer(false);
    } else {
      setIsQuizFinished(true);
    }
  };

  const resetQuiz = () => {
    setCurrentIndex(0);
    setSelectedChoice(null);
    setShowAnswer(false);
    setScore(0);
    setIsQuizFinished(false);
  };

  return {
    currentQuestion: questions[currentIndex],
    currentIndex,
    totalQuestions: questions.length,
    selectedChoice,
    isCorrect: selectedChoice === questions[currentIndex]?.answer,
    showAnswer,
    score,
    isQuizFinished,
    handleChoiceSelect,
    goToNextQuestion,
    resetQuiz,
    loadQuestions,
  };
};
