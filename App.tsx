import React from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';

// 아키텍처 기반 임포트
import { useQuiz } from './src/hooks/useQuiz';
import { TopBar } from './src/components/TopBar';
import { ProgressBar } from './src/components/ProgressBar';
import { QuizHeader } from './src/components/QuizHeader';
import { ChoiceList } from './src/components/ChoiceList';
import { ExplanationBox } from './src/components/ExplanationBox';

export default function App() {
  const {
    loading, questions, currentQuestion, currentIdx, selectedIdx, showExplanation, 
    mode, wrongIds, handleSelect, nextQuestion, toggleMode, removeWrong, importQuestions
  } = useQuiz();

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  const progress = questions.length > 0 ? (currentIdx + 1) / questions.length : 0;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <TopBar 
        mode={mode} 
        wrongCount={wrongIds.length} 
        onToggleMode={toggleMode} 
        onImport={importQuestions} 
      />

      <ProgressBar progress={progress} />

      {questions.length > 0 && currentQuestion ? (
        <ScrollView style={styles.quizContainer} showsVerticalScrollIndicator={false}>
          <QuizHeader 
            source={currentQuestion.source} 
            subject={currentQuestion.subject} 
            currentIdx={currentIdx} 
            total={questions.length} 
          />

          <Text style={styles.questionText}>{currentQuestion.question}</Text>

          <ChoiceList 
            choices={currentQuestion.choices} 
            selectedIdx={selectedIdx} 
            correctIdx={currentQuestion.answer} 
            onSelect={handleSelect} 
          />

          {showExplanation && (
            <ExplanationBox 
              explanation={currentQuestion.explanation} 
              isCorrect={selectedIdx === currentQuestion.answer}
              canRemove={mode === 'WRONG'}
              onRemove={() => removeWrong(currentQuestion.id)}
              onNext={nextQuestion}
            />
          )}
          <View style={{ height: 50 }} />
        </ScrollView>
      ) : (
        <View style={styles.centerContainer}>
          <Text style={styles.emptyText}>문제가 없습니다. 새로운 문제를 임포트해보세요!</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F2F7' },
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  quizContainer: { padding: 20 },
  questionText: { fontSize: 19, fontWeight: 'bold', lineHeight: 26, color: '#1C1C1E', marginBottom: 25 },
  emptyText: { color: '#8E8E93', textAlign: 'center', fontSize: 16 }
});
