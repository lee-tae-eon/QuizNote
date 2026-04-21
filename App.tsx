import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useQuiz } from './src/hooks/useQuiz';
import { DataService } from './src/services/dataService';
import TopBar from './src/components/TopBar';
import ProgressBar from './src/components/ProgressBar';
import QuizHeader from './src/components/QuizHeader';
import ChoiceList from './src/components/ChoiceList';
import ExplanationBox from './src/components/ExplanationBox';

export default function App() {
  const [selectedExam, setSelectedExam] = useState<any>(null);
  const {
    currentQuestion,
    currentIndex,
    totalQuestions,
    selectedChoice,
    isCorrect,
    showAnswer,
    score,
    handleChoiceSelect,
    goToNextQuestion,
    resetQuiz,
    isQuizFinished,
    loadQuestions,
  } = useQuiz();

  const handleSelectExam = (exam: any) => {
    const questions = DataService.getQuestionsByFile(exam.file);
    loadQuestions(questions);
    setSelectedExam(exam);
  };

  const handleBackToList = () => {
    setSelectedExam(null);
    resetQuiz();
  };

  // Exam List Screen
  if (!selectedExam) {
    const examList = DataService.getExamList();
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
          <View style={styles.headerContainer}>
            <Text style={styles.title}>QuizNote 📚</Text>
            <Text style={styles.subtitle}>정보처리기사 기출문제 (05-25년)</Text>
          </View>
          <ScrollView style={styles.listContainer} showsVerticalScrollIndicator={false}>
            {examList.map((exam, index) => (
              <TouchableOpacity
                key={index}
                style={styles.examItem}
                onPress={() => handleSelectExam(exam)}
              >
                <View style={styles.examInfo}>
                  <Text style={styles.examTitle}>{exam.title}</Text>
                  <Text style={styles.examMeta}>{exam.count} 문제</Text>
                </View>
                <Text style={styles.arrow}>›</Text>
              </TouchableOpacity>
            ))}
            <View style={{ height: 40 }} />
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  // Quiz Finished Screen
  if (isQuizFinished) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <View style={styles.finishedContainer}>
            <Text style={styles.finishedEmoji}>🎉</Text>
            <Text style={styles.finishedTitle}>학습 완료!</Text>
            <Text style={styles.scoreText}>{score} / {totalQuestions}</Text>
            <TouchableOpacity style={styles.button} onPress={handleBackToList}>
              <Text style={styles.buttonText}>목록으로 돌아가기</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  // Main Quiz Screen
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <TopBar 
          onBack={handleBackToList} 
          title={selectedExam.title} 
          score={score} 
        />
        
        <ProgressBar 
          current={currentIndex + 1} 
          total={totalQuestions} 
        />

        <ScrollView style={styles.quizContent} showsVerticalScrollIndicator={false}>
          {currentQuestion ? (
            <>
              <QuizHeader question={currentQuestion} />
              
              <ChoiceList 
                choices={currentQuestion.choices}
                selectedChoice={selectedChoice}
                correctAnswer={currentQuestion.answer}
                showAnswer={showAnswer}
                isCorrect={isCorrect}
                onSelect={handleChoiceSelect}
              />

              {showAnswer && (
                <ExplanationBox 
                  explanation={currentQuestion.explanation}
                  onNext={goToNextQuestion}
                  isLast={currentIndex === totalQuestions - 1}
                />
              )}
              <View style={{ height: 40 }} />
            </>
          ) : (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>문제를 불러오는 중입니다...</Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  headerContainer: {
    padding: 24,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1A1A1A',
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
    marginTop: 4,
  },
  listContainer: {
    flex: 1,
    padding: 16,
  },
  examItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  examInfo: {
    flex: 1,
  },
  examTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  examMeta: {
    fontSize: 12,
    color: '#999999',
    marginTop: 4,
  },
  arrow: {
    fontSize: 24,
    color: '#CCCCCC',
    marginLeft: 10,
  },
  quizContent: {
    flex: 1,
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666666',
  },
  finishedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  finishedEmoji: {
    fontSize: 80,
    marginBottom: 20,
  },
  finishedTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1A1A1A',
    marginBottom: 10,
  },
  scoreText: {
    fontSize: 48,
    fontWeight: '700',
    color: '#007AFF',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});
