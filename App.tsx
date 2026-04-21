// App.tsx
import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';

import { DataService } from './src/services/dataService';
import { DbService } from './src/services/dbService';
import { COLORS } from './src/constants/theme';
import { Question } from './src/types/exam';

// Screens
import HomeScreen from './src/screens/HomeScreen';
import QuizScreen from './src/screens/QuizScreen';
import ResultScreen from './src/screens/ResultScreen';
import WrongAnswerScreen from './src/screens/WrongAnswerScreen';

type AppMode = 'HOME' | 'QUIZ' | 'RESULT' | 'WRONG_NOTE';

export default function App() {
  const [mode, setMode] = useState<AppMode>('HOME');
  const [selectedExam, setSelectedExam] = useState<any>(null);
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [lastResult, setLastResult] = useState({ score: 0, total: 0 });

  useEffect(() => {
    // Initialize DB
    DbService.init();
  }, []);

  const handleSelectExam = (exam: any) => {
    const questions = DataService.getQuestionsByFile(exam.id);
    setQuizQuestions(questions);
    setSelectedExam(exam);
    setMode('QUIZ');
  };

  const handleStartRandom = () => {
    const randomSet = DataService.getRandomQuestions(50);
    const questions = randomSet.map(item => ({
      ...item.question,
      examId: item.examId // Attach for DB saving
    }));
    setQuizQuestions(questions);
    setSelectedExam({ title: '랜덤 50문제', id: 'random' });
    setMode('QUIZ');
  };

  const handleOpenWrongNote = () => {
    setMode('WRONG_NOTE');
  };

  const handleStartWrongReview = (questions: Question[]) => {
    setQuizQuestions(questions);
    setSelectedExam({ title: '오답 다시 풀기', id: 'review' });
    setMode('QUIZ');
  };

  const handleFinishQuiz = (score: number, total: number) => {
    setLastResult({ score, total });
    setMode('RESULT');
  };

  const handleBackToHome = () => {
    setMode('HOME');
    setSelectedExam(null);
    setQuizQuestions([]);
  };

  const renderScreen = () => {
    switch (mode) {
      case 'HOME':
        return (
          <HomeScreen 
            onSelectExam={handleSelectExam}
            onStartRandom={handleStartRandom}
            onOpenWrongNote={handleOpenWrongNote}
          />
        );
      case 'QUIZ':
        return (
          <QuizScreen 
            exam={selectedExam}
            questions={quizQuestions}
            onBack={handleBackToHome}
            onFinish={handleFinishQuiz}
          />
        );
      case 'RESULT':
        return (
          <ResultScreen 
            score={lastResult.score}
            total={lastResult.total}
            onBack={handleBackToHome}
          />
        );
      case 'WRONG_NOTE':
        return (
          <WrongAnswerScreen 
            onBack={handleBackToHome}
            onStartReview={handleStartWrongReview}
          />
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        {renderScreen()}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});
