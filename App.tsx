import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import * as Haptics from 'expo-haptics';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

const STORAGE_KEY = 'WRONG_ANSWERS_IDS';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [wrongIds, setWrongIds] = useState<number[]>([]);
  const [isWrongNoteMode, setIsWrongNoteMode] = useState(false);
  
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);

  // 현재 모드에 따른 문제 목록 필터링
  const questions = isWrongNoteMode 
    ? sampleData.filter(q => wrongIds.includes(q.id))
    : sampleData;

  const currentQuestion: Question | undefined = questions[currentIdx];

  // 오답 데이터 불러오기
  useEffect(() => {
    loadWrongIds();
  }, []);

  const loadWrongIds = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        setWrongIds(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load wrong answers', e);
    } finally {
      setLoading(false);
    }
  };

  const saveWrongId = async (id: number) => {
    try {
      if (!wrongIds.includes(id)) {
        const newIds = [...wrongIds, id];
        setWrongIds(newIds);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newIds));
      }
    } catch (e) {
      console.error('Failed to save wrong answer', e);
    }
  };

  const removeWrongId = async (id: number) => {
    try {
      const newIds = wrongIds.filter(val => val !== id);
      setWrongIds(newIds);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newIds));
      
      // 만약 오답노트 모드에서 마지막 문제를 지웠다면 인덱스 조절
      if (isWrongNoteMode && currentIdx >= newIds.length && currentIdx > 0) {
        setCurrentIdx(currentIdx - 1);
      }
    } catch (e) {
      console.error('Failed to remove wrong answer', e);
    }
  };

  const handleSelect = (idx: number) => {
    if (selectedIdx !== null || !currentQuestion) return;
    
    setSelectedIdx(idx);
    setShowExplanation(true);

    if (idx === currentQuestion.answer) {
      setScore(score + 1);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      
      // 오답노트 모드에서 맞췄다면 오답 목록에서 제거할지 물어보기
      if (isWrongNoteMode) {
        // 자동 제거 대신 사용자 선택이나 로직 추가 가능 (여기선 유지)
      }
    } else {
      saveWrongId(currentQuestion.id);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  };

  const nextQuestion = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setSelectedIdx(null);
      setShowExplanation(false);
    } else {
      Alert.alert('학습 완료!', `최종 점수: ${score} / ${questions.length}`, [
        { 
          text: '다시 풀기', 
          onPress: () => {
            setCurrentIdx(0);
            setSelectedIdx(null);
            setShowExplanation(false);
            setScore(0);
          } 
        },
        {
          text: '종료',
          style: 'cancel'
        }
      ]);
    }
  };

  const toggleMode = () => {
    if (!isWrongNoteMode && wrongIds.length === 0) {
      Alert.alert('알림', '저장된 오답이 없습니다!');
      return;
    }
    setIsWrongNoteMode(!isWrongNoteMode);
    setCurrentIdx(0);
    setSelectedIdx(null);
    setShowExplanation(false);
    setScore(0);
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* 상단 탭/모드 표시 */}
      <View style={styles.modeSelector}>
        <TouchableOpacity 
          style={[styles.modeButton, !isWrongNoteMode && styles.activeModeButton]} 
          onPress={() => isWrongNoteMode && toggleMode()}
        >
          <Text style={[styles.modeButtonText, !isWrongNoteMode && styles.activeModeButtonText]}>전체 문제</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.modeButton, isWrongNoteMode && styles.activeWrongModeButton]} 
          onPress={() => !isWrongNoteMode && toggleMode()}
        >
          <Text style={[styles.modeButtonText, isWrongNoteMode && styles.activeModeButtonText]}>오답 노트 ({wrongIds.length})</Text>
        </TouchableOpacity>
      </View>

      {questions.length > 0 ? (
        <>
          <View style={styles.header}>
            <View>
              <Text style={styles.sourceText}>{currentQuestion.source}</Text>
              <Text style={styles.subjectText}>[{currentQuestion.subject}]</Text>
            </View>
            <View style={styles.progressBadge}>
              <Text style={styles.progressText}>{currentIdx + 1} / {questions.length}</Text>
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
                   {isWrongNoteMode && selectedIdx === currentQuestion.answer && (
                     <TouchableOpacity onPress={() => removeWrongId(currentQuestion.id)}>
                        <Text style={styles.removeText}>오답 제거 ✕</Text>
                     </TouchableOpacity>
                   )}
                </View>
                <Text style={styles.explanationText}>{currentQuestion.explanation}</Text>
                <TouchableOpacity style={styles.nextButton} onPress={nextQuestion}>
                  <Text style={styles.nextButtonText}>
                    {currentIdx < questions.length - 1 ? '다음 문제로' : '결과 확인'}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            <View style={{ height: 40 }} />
          </ScrollView>
        </>
      ) : (
        <View style={styles.centerContainer}>
          <Text style={styles.emptyText}>표시할 문제가 없습니다.</Text>
          <TouchableOpacity style={styles.nextButton} onPress={toggleMode}>
            <Text style={styles.nextButtonText}>전체 문제로 돌아가기</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F2F7' },
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  
  modeSelector: { flexDirection: 'row', padding: 4, backgroundColor: '#E5E5EA', margin: 16, borderRadius: 10 },
  modeButton: { flex: 1, paddingVertical: 8, alignItems: 'center', borderRadius: 8 },
  activeModeButton: { backgroundColor: '#FFF', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
  activeWrongModeButton: { backgroundColor: '#FF3B30' },
  modeButtonText: { fontSize: 13, fontWeight: '600', color: '#8E8E93' },
  activeModeButtonText: { color: '#FFF' },
  activeModeButtonTextDark: { color: '#1C1C1E' }, // Not used but for ref

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
  sourceText: { color: '#8E8E93', fontSize: 11, marginBottom: 2 },
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
  
  correctButton: { backgroundColor: '#34C759' },
  correctText: { color: '#FFF', fontWeight: '600' },
  wrongButton: { backgroundColor: '#FF3B30' },
  wrongText: { color: '#FFF', fontWeight: '600' },
  
  explanationBox: { 
    padding: 20, 
    backgroundColor: '#FFF', 
    borderRadius: 16, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  explanationHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  explanationTitle: { fontSize: 16, fontWeight: 'bold', color: '#1C1C1E' },
  removeText: { fontSize: 12, color: '#FF3B30', fontWeight: '600' },
  
  explanationText: { fontSize: 15, lineHeight: 22, color: '#48484A', marginBottom: 20 },
  nextButton: { backgroundColor: '#007AFF', paddingHorizontal: 30, paddingVertical: 15, borderRadius: 12, alignItems: 'center' },
  nextButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  emptyText: { fontSize: 16, color: '#8E8E93', marginBottom: 20 }
});
