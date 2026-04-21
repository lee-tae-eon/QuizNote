// src/screens/QuizScreen.tsx
import React, { useEffect } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import { useQuiz } from '../hooks/useQuiz';
import { DbService } from '../services/dbService';
import TopBar from '../components/TopBar';
import ProgressBar from '../components/ProgressBar';
import QuizHeader from '../components/QuizHeader';
import ChoiceList from '../components/ChoiceList';
import ExplanationBox from '../components/ExplanationBox';
import { COLORS } from '../constants/theme';
import { Question } from '../types/exam';

interface Props {
  exam: any;
  questions: Question[];
  onBack: () => void;
  onFinish: (score: number, total: number) => void;
}

const QuizScreen: React.FC<Props> = ({ exam, questions, onBack, onFinish }) => {
  const {
    currentQuestion,
    currentIndex,
    totalQuestions,
    selectedChoice,
    isCorrect,
    showAnswer,
    score,
    isQuizFinished,
    handleChoiceSelect,
    goToNextQuestion,
    loadQuestions,
  } = useQuiz();

  useEffect(() => {
    loadQuestions(questions);
  }, [questions]);

  useEffect(() => {
    if (isQuizFinished) {
      onFinish(score, totalQuestions);
    }
  }, [isQuizFinished]);

  const onSelect = async (index: number) => {
    handleChoiceSelect(index);
    
    // If incorrect, save to DB
    const currentQ = questions[currentIndex];
    const isCorrectChoice = index + 1 === currentQ.answer;
    
    if (!isCorrectChoice) {
      // We need the original exam ID. In random mode, it's attached to the question.
      const examId = (currentQ as any).examId || exam.id;
      await DbService.addWrongAnswer(currentQ.id, examId);
    }
  };

  return (
    <View style={styles.container}>
      <TopBar 
        onBack={onBack} 
        title={exam.title} 
        score={score} 
      />
      
      <ProgressBar 
        current={currentIndex + 1} 
        total={totalQuestions} 
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {currentQuestion ? (
          <>
            <QuizHeader question={currentQuestion} />
            
            <ChoiceList 
              choices={currentQuestion.choices}
              selectedChoice={selectedChoice}
              correctAnswer={currentQuestion.answer}
              showAnswer={showAnswer}
              isCorrect={isCorrect}
              onSelect={onSelect}
            />

            {showAnswer && (
              <ExplanationBox 
                explanation={currentQuestion.explanation}
                onNext={goToNextQuestion}
                isLast={currentIndex === totalQuestions - 1}
              />
            )}
            <View style={{ height: 60 }} />
          </>
        ) : (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>문제를 불러오는 중입니다...</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  loadingText: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
});

export default QuizScreen;
