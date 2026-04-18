import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView, Alert } from 'react-native';
import * as Haptics from 'expo-haptics';
import { StatusBar } from 'expo-status-bar';

// 샘플 데이터 임포트
import sampleData from './Data/SampleQuestions.json';

// 타입 정의
interface Question {
  id: number;
  subject: string;
  source: string;
  question: string;
  choices: string[];
  answer: number;
  explanation: string;
}

export default function App() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion: Question = sampleData[currentIdx];

  const handleSelect = (idx: number) => {
    if (selectedIdx !== null) return; // 이미 선택했으면 무시
    
    setSelectedIdx(idx);
    setShowExplanation(true);

    if (idx === currentQuestion.answer) {
      setScore(score + 1);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  };

  const nextQuestion = () => {
    if (currentIdx < sampleData.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setSelectedIdx(null);
      setShowExplanation(false);
    } else {
      Alert.alert('학습 완료!', `최종 점수: ${score} / ${sampleData.length}`, [
        { 
          text: '다시 풀기', 
          onPress: () => {
            setCurrentIdx(0);
            setSelectedIdx(null);
            setShowExplanation(false);
            setScore(0);
          } 
        }
      ]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <View>
          <Text style={styles.sourceText}>{currentQuestion.source}</Text>
          <Text style={styles.subjectText}>[{currentQuestion.subject}]</Text>
        </View>
        <View style={styles.progressBadge}>
          <Text style={styles.progressText}>{currentIdx + 1} / {sampleData.length}</Text>
        </View>
      </View>

      <ScrollView style={styles.quizContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.questionBox}>
          <Text style={styles.questionText}>{currentQuestion.question}</Text>
        </View>

        <View style={styles.choicesBox}>
          {currentQuestion.choices.map((choice, idx) => {
            let buttonStyle: any = styles.choiceButton;
            let textStyle: any = styles.choiceText;
            
            if (selectedIdx !== null) {
              if (idx === currentQuestion.answer) {
                buttonStyle = [styles.choiceButton, styles.correctButton];
                textStyle = [styles.choiceText, styles.correctText];
              } else if (idx === selectedIdx) {
                buttonStyle = [styles.choiceButton, styles.wrongButton];
                textStyle = [styles.choiceText, styles.wrongText];
              }
            }

            return (
              <TouchableOpacity 
                key={idx} 
                style={buttonStyle} 
                onPress={() => handleSelect(idx)}
                disabled={selectedIdx !== null}
                activeOpacity={0.7}
              >
                <View style={styles.choiceNumberBox}>
                   <Text style={[styles.choiceNumber, selectedIdx !== null && idx === currentQuestion.answer && {color: '#FFF'}]}>{idx + 1}</Text>
                </View>
                <Text style={textStyle}>{choice}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {showExplanation && (
          <View style={styles.explanationBox}>
            <View style={styles.explanationHeader}>
               <Text style={styles.explanationTitle}>💡 정답 해설</Text>
               <View style={[styles.statusBadge, selectedIdx === currentQuestion.answer ? styles.correctBadge : styles.wrongBadge]}>
                  <Text style={styles.statusBadgeText}>{selectedIdx === currentQuestion.answer ? '정답입니다' : '오답입니다'}</Text>
               </View>
            </View>
            <Text style={styles.explanationText}>{currentQuestion.explanation}</Text>
            <TouchableOpacity style={styles.nextButton} onPress={nextQuestion}>
              <Text style={styles.nextButtonText}>
                {currentIdx < sampleData.length - 1 ? '다음 문제로' : '결과 확인'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F2F7' },
  header: { 
    paddingHorizontal: 20, 
    paddingVertical: 15, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA'
  },
  sourceText: { color: '#8E8E93', fontSize: 12, marginBottom: 2 },
  subjectText: { fontSize: 14, fontWeight: 'bold', color: '#007AFF' },
  progressBadge: { backgroundColor: '#E5E5EA', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  progressText: { fontSize: 12, fontWeight: '600', color: '#3A3A3C' },
  
  quizContainer: { padding: 20 },
  questionBox: { marginBottom: 25 },
  questionText: { fontSize: 19, fontWeight: '700', lineHeight: 28, color: '#1C1C1E' },
  
  choicesBox: { marginBottom: 20 },
  choiceButton: { 
    backgroundColor: '#FFF', 
    padding: 16, 
    borderRadius: 14, 
    marginBottom: 12, 
    flexDirection: 'row', 
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2
  },
  choiceNumberBox: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#F2F2F7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12
  },
  choiceNumber: { fontSize: 14, fontWeight: 'bold', color: '#8E8E93' },
  choiceText: { fontSize: 16, color: '#3A3A3C', flex: 1 },
  
  correctButton: { backgroundColor: '#34C759', borderColor: '#34C759' },
  correctText: { color: '#FFF', fontWeight: '600' },
  wrongButton: { backgroundColor: '#FF3B30', borderColor: '#FF3B30' },
  wrongText: { color: '#FFF', fontWeight: '600' },
  
  explanationBox: { 
    padding: 20, 
    backgroundColor: '#FFF', 
    borderRadius: 16, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4
  },
  explanationHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  explanationTitle: { fontSize: 16, fontWeight: 'bold', color: '#1C1C1E' },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  correctBadge: { backgroundColor: '#E8F5E9' },
  wrongBadge: { backgroundColor: '#FFEBEE' },
  statusBadgeText: { fontSize: 11, fontWeight: 'bold' },
  
  explanationText: { fontSize: 15, lineHeight: 22, color: '#48484A', marginBottom: 20 },
  nextButton: { backgroundColor: '#007AFF', padding: 16, borderRadius: 12, alignItems: 'center' },
  nextButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 }
});
