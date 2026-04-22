// src/screens/WrongAnswerScreen.tsx
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DbService } from '../services/dbService';
import { DataService } from '../services/dataService';
import { COLORS, SHADOWS } from '../constants/theme';
import { Question } from '../types/exam';

interface Props {
  onBack: () => void;
  onStartReview: (questions: Question[]) => void;
}

const WrongAnswerCard: React.FC<{ 
  q: Question, 
  onRemove: (id: number, examId: string) => void 
}> = ({ q, onRemove }) => {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.sourceTag}>{q.source}</Text>
        <TouchableOpacity onPress={() => onRemove(q.id, (q as any).exam_id || '')}>
          <Ionicons name="close-circle" size={22} color={COLORS.border} />
        </TouchableOpacity>
      </View>
      <Text style={styles.questionText}>{q.question}</Text>
      
      <View style={styles.cardFooter}>
        <View style={styles.answerRow}>
          <View style={[styles.choiceIndicator, { backgroundColor: COLORS.error }]}>
            <Text style={styles.choiceIndicatorText}>나</Text>
          </View>
          <Text style={styles.wrongAnswerText}>
            {q.userChoice ? `${q.userChoice}번: ${q.choices[q.userChoice-1]}` : '기록 없음'}
          </Text>
        </View>

        {showAnswer ? (
          <>
            <View style={[styles.answerRow, { marginTop: 8 }]}>
              <View style={[styles.choiceIndicator, { backgroundColor: COLORS.success }]}>
                <Text style={styles.choiceIndicatorText}>정</Text>
              </View>
              <Text style={styles.correctAnswerText}>
                {q.answer}번: {q.choices[q.answer-1]}
              </Text>
            </View>
            <View style={styles.explanationContainer}>
              <Text style={styles.explanationTitle}>해설</Text>
              <Text style={styles.explanationText}>{q.explanation}</Text>
            </View>
            <TouchableOpacity 
              style={styles.hideButton} 
              onPress={() => setShowAnswer(false)}
            >
              <Text style={styles.hideButtonText}>숨기기</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity 
            style={styles.showButton} 
            onPress={() => setShowAnswer(true)}
          >
            <Ionicons name="eye-outline" size={16} color={COLORS.primary} />
            <Text style={styles.showButtonText}>정답 및 해설 확인</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const WrongAnswerScreen: React.FC<Props> = ({ onBack, onStartReview }) => {
  const [wrongQuestions, setWrongQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    const saved = await DbService.getWrongAnswers();
    const questions = DataService.getQuestionsByIds(saved);
    setWrongQuestions(questions);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleRemove = async (questionId: number, examId: string) => {
    await DbService.removeWrongAnswer(questionId, examId);
    loadData();
  };

  const handleClearAll = () => {
    Alert.alert(
      "오답노트 초기화",
      "모든 오답 기록을 삭제하시겠습니까?",
      [
        { text: "취소", style: "cancel" },
        { 
          text: "삭제", 
          style: "destructive",
          onPress: async () => {
            await DbService.clearWrongAnswers();
            loadData();
          }
        }
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>불러오는 중...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.title}>오답노트</Text>
        <TouchableOpacity onPress={handleClearAll} style={styles.clearButton}>
          <Ionicons name="trash-outline" size={20} color={COLORS.error} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {wrongQuestions.length > 0 ? (
          <>
            <TouchableOpacity 
              style={styles.reviewButton}
              onPress={() => onStartReview(wrongQuestions)}
            >
              <Ionicons name="play" size={20} color={COLORS.white} />
              <Text style={styles.reviewButtonText}>오답 전체 다시 풀기 ({wrongQuestions.length})</Text>
            </TouchableOpacity>

            {wrongQuestions.map((q, index) => (
              <WrongAnswerCard 
                key={`${q.id}-${index}`} 
                q={q} 
                onRemove={handleRemove} 
              />
            ))}
          </>
        ) : (
          <View style={styles.emptyContainer}>
            <Ionicons name="checkmark-circle-outline" size={80} color={COLORS.border} />
            <Text style={styles.emptyText}>오답이 없습니다!</Text>
            <Text style={styles.emptySubText}>열심히 학습하여 실력을 쌓아보세요.</Text>
          </View>
        )}
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    padding: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
  },
  clearButton: {
    padding: 4,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  reviewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
    gap: 8,
    ...SHADOWS.medium,
  },
  reviewButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '700',
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    ...SHADOWS.small,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sourceTag: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.primary,
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  questionText: {
    fontSize: 15,
    color: COLORS.text,
    lineHeight: 22,
    marginBottom: 12,
  },
  cardFooter: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 10,
    marginTop: 4,
  },
  answerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  choiceIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  choiceIndicatorText: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.white,
  },
  wrongAnswerText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.error,
  },
  correctAnswerText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.success,
  },
  showButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginTop: 12,
    backgroundColor: 'rgba(99, 102, 241, 0.05)',
    borderRadius: 12,
    gap: 6,
  },
  showButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
  },
  hideButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    marginTop: 12,
  },
  hideButtonText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    textDecorationLine: 'underline',
  },
  explanationContainer: {
    marginTop: 16,
    padding: 16,
    backgroundColor: COLORS.background,
    borderRadius: 12,
  },
  explanationTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 8,
  },
  explanationText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
    marginTop: 20,
  },
  emptySubText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 8,
  },
});

export default WrongAnswerScreen;
