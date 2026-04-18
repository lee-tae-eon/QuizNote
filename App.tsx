import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView, Alert, ActivityIndicator, Dimensions } from 'react-native';
import * as Haptics from 'expo-haptics';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';

// 샘플 데이터 임포트
import initialData from './Data/SampleQuestions.json';

const { width } = Dimensions.get('window');

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

const WRONG_KEY = 'WRONG_ANSWERS_IDS';
const CUSTOM_KEY = 'CUSTOM_QUESTIONS';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [wrongIds, setWrongIds] = useState<number[]>([]);
  const [customQuestions, setCustomQuestions] = useState<Question[]>([]);
  const [isWrongNoteMode, setIsWrongNoteMode] = useState(false);
  
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);

  const allQuestions = [...initialData, ...customQuestions];
  const questions = isWrongNoteMode 
    ? allQuestions.filter(q => wrongIds.includes(q.id))
    : allQuestions;

  const currentQuestion: Question | undefined = questions[currentIdx];

  useEffect(() => {
    initData();
  }, []);

  const initData = async () => {
    try {
      const [storedWrong, storedCustom] = await Promise.all([
        AsyncStorage.getItem(WRONG_KEY),
        AsyncStorage.getItem(CUSTOM_KEY)
      ]);
      if (storedWrong) setWrongIds(JSON.parse(storedWrong));
      if (storedCustom) setCustomQuestions(JSON.parse(storedCustom));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const saveWrongId = async (id: number) => {
    if (!wrongIds.includes(id)) {
      const newIds = [...wrongIds, id];
      setWrongIds(newIds);
      await AsyncStorage.setItem(WRONG_KEY, JSON.stringify(newIds));
    }
  };

  const removeWrongId = async (id: number) => {
    const newIds = wrongIds.filter(val => val !== id);
    setWrongIds(newIds);
    await AsyncStorage.setItem(WRONG_KEY, JSON.stringify(newIds));
    if (isWrongNoteMode && currentIdx >= newIds.length && currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
    }
  };

  // CSV 파싱 로직 (간이 구현)
  const parseCSV = (text: string): Partial<Question>[] => {
    const lines = text.split(/\r?\n/);
    return lines.slice(1).filter(line => line.trim()).map(line => {
      // 콤마로 분리 (따옴표 내 콤마는 무시하는 정규식 사용 권장이나 여기선 심플하게)
      const [subject, source, question, c1, c2, c3, c4, answer, explanation] = line.split(',');
      return {
        subject: subject?.trim(),
        source: source?.trim(),
        question: question?.trim(),
        choices: [c1?.trim(), c2?.trim(), c3?.trim(), c4?.trim()],
        answer: parseInt(answer?.trim()) - 1, // 1~4 입력을 0~3으로 변환
        explanation: explanation?.trim()
      };
    });
  };

  const handleImport = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/json', 'text/comma-separated-values', 'text/plain'],
        copyToCacheDirectory: true
      });

      if (result.canceled) return;

      const fileUri = result.assets[0].uri;
      const fileName = result.assets[0].name.toLowerCase();
      const fileContent = await FileSystem.readAsStringAsync(fileUri);
      
      let importedData: any[] = [];
      if (fileName.endsWith('.json')) {
        importedData = JSON.parse(fileContent);
      } else if (fileName.endsWith('.csv')) {
        importedData = parseCSV(fileContent);
      }

      if (!Array.isArray(importedData)) throw new Error('Invalid format');

      const lastId = allQuestions.length > 0 ? Math.max(...allQuestions.map(q => q.id)) : 0;
      const processedData = importedData.map((q, idx) => ({
        ...q,
        id: lastId + idx + 1
      }));

      const newCustomQuestions = [...customQuestions, ...processedData];
      setCustomQuestions(newCustomQuestions);
      await AsyncStorage.setItem(CUSTOM_KEY, JSON.stringify(newCustomQuestions));

      Alert.alert('임포트 완료', `${processedData.length}개의 문제를 추가했습니다.`);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch (e) {
      Alert.alert('오류', '파일 형식이 올바르지 않습니다.');
    }
  };

  const handleSelect = (idx: number) => {
    if (selectedIdx !== null || !currentQuestion) return;
    setSelectedIdx(idx);
    setShowExplanation(true);
    if (idx === currentQuestion.answer) {
      setScore(score + 1);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
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
      Alert.alert('학습 완료!', `점수: ${score}/${questions.length}`, [
        { text: '다시 풀기', onPress: () => { setCurrentIdx(0); setSelectedIdx(null); setShowExplanation(false); setScore(0); } }
      ]);
    }
  };

  const progress = questions.length > 0 ? (currentIdx + 1) / questions.length : 0;

  if (loading) return <View style={styles.centerContainer}><ActivityIndicator size="large" color="#007AFF" /></View>;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.topBar}>
        <View style={styles.modeSelector}>
          <TouchableOpacity style={[styles.modeButton, !isWrongNoteMode && styles.activeModeButton]} onPress={() => isWrongNoteMode && setIsWrongNoteMode(false)}>
            <Text style={[styles.modeButtonText, !isWrongNoteMode && styles.activeModeButtonText]}>전체</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.modeButton, isWrongNoteMode && styles.activeWrongModeButton]} onPress={() => !isWrongNoteMode && setIsWrongNoteMode(true)}>
            <Text style={[styles.modeButtonText, isWrongNoteMode && styles.activeModeButtonText]}>오답({wrongIds.length})</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.importButton} onPress={handleImport}><Text style={styles.importButtonText}>임포트 +</Text></TouchableOpacity>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: width * progress }]} />
      </View>

      {questions.length > 0 ? (
        <ScrollView style={styles.quizContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <View style={{flex:1}}>
              <Text style={styles.sourceText}>{currentQuestion.source}</Text>
              <Text style={styles.subjectText}>[{currentQuestion.subject}]</Text>
            </View>
            <Text style={styles.progressText}>{currentIdx + 1} / {questions.length}</Text>
          </View>

          <Text style={styles.questionText}>{currentQuestion.question}</Text>

          <View style={styles.choicesBox}>
            {currentQuestion.choices.map((choice, idx) => {
              let btnStyle: any = styles.choiceButton;
              let txtStyle: any = styles.choiceText;
              if (selectedIdx !== null) {
                if (idx === currentQuestion.answer) { btnStyle = [styles.choiceButton, styles.correctButton]; txtStyle = [styles.choiceText, styles.correctText]; }
                else if (idx === selectedIdx) { btnStyle = [styles.choiceButton, styles.wrongButton]; txtStyle = [styles.choiceText, styles.wrongText]; }
              }
              return (
                <TouchableOpacity key={idx} style={btnStyle} onPress={() => handleSelect(idx)} disabled={selectedIdx !== null}>
                  <Text style={txtStyle}>{idx + 1}. {choice}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {showExplanation && (
            <View style={styles.explanationBox}>
              <View style={styles.explanationHeader}>
                <Text style={styles.explanationTitle}>💡 해설</Text>
                {isWrongNoteMode && selectedIdx === currentQuestion.answer && (
                  <TouchableOpacity onPress={() => removeWrongId(currentQuestion.id)}><Text style={styles.removeText}>오답 제거</Text></TouchableOpacity>
                )}
              </View>
              <Text style={styles.explanationText}>{currentQuestion.explanation}</Text>
              <TouchableOpacity style={styles.nextButton} onPress={nextQuestion}><Text style={styles.nextButtonText}>다음</Text></TouchableOpacity>
            </View>
          )}
          <View style={{height: 50}} />
        </ScrollView>
      ) : (
        <View style={styles.centerContainer}>
          <Text style={styles.emptyText}>문제가 없습니다.</Text>
          <TouchableOpacity style={styles.nextButton} onPress={handleImport}><Text style={styles.nextButtonText}>문제 가져오기</Text></TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F2F7' },
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  topBar: { flexDirection: 'row', padding: 10, backgroundColor: '#FFF', alignItems: 'center' },
  modeSelector: { flex: 1, flexDirection: 'row', backgroundColor: '#E5E5EA', borderRadius: 8, padding: 2, marginRight: 10 },
  modeButton: { flex: 1, paddingVertical: 6, alignItems: 'center', borderRadius: 6 },
  activeModeButton: { backgroundColor: '#FFF' },
  activeWrongModeButton: { backgroundColor: '#FF3B30' },
  modeButtonText: { fontSize: 12, fontWeight: '600', color: '#8E8E93' },
  activeModeButtonText: { color: '#FFF' },
  importButton: { backgroundColor: '#007AFF', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 },
  importButtonText: { color: '#FFF', fontSize: 12, fontWeight: 'bold' },
  progressBarContainer: { height: 4, backgroundColor: '#E5E5EA', width: '100%' },
  progressBar: { height: '100%', backgroundColor: '#007AFF' },
  quizContainer: { padding: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  sourceText: { fontSize: 11, color: '#8E8E93' },
  subjectText: { fontSize: 14, fontWeight: 'bold', color: '#007AFF' },
  progressText: { fontSize: 12, color: '#3A3A3C', fontWeight: 'bold' },
  questionText: { fontSize: 19, fontWeight: 'bold', lineHeight: 26, color: '#1C1C1E', marginBottom: 25 },
  choicesBox: { marginBottom: 20 },
  choiceButton: { backgroundColor: '#FFF', padding: 16, borderRadius: 12, marginBottom: 10, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 2, elevation: 2 },
  choiceText: { fontSize: 16, color: '#3A3A3C' },
  correctButton: { backgroundColor: '#34C759' },
  correctText: { color: '#FFF', fontWeight: 'bold' },
  wrongButton: { backgroundColor: '#FF3B30' },
  wrongText: { color: '#FFF', fontWeight: 'bold' },
  explanationBox: { padding: 20, backgroundColor: '#FFF', borderRadius: 16, shadowOpacity: 0.1, shadowRadius: 4 },
  explanationHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  explanationTitle: { fontWeight: 'bold', fontSize: 16 },
  removeText: { color: '#FF3B30', fontSize: 12, fontWeight: 'bold' },
  explanationText: { fontSize: 15, color: '#48484A', lineHeight: 22, marginBottom: 20 },
  nextButton: { backgroundColor: '#007AFF', padding: 15, borderRadius: 12, alignItems: 'center' },
  nextButtonText: { color: '#FFF', fontWeight: 'bold' },
  emptyText: { color: '#8E8E93', marginBottom: 20 }
});
