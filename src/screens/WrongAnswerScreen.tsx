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
    // Reload
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
              <View key={`${q.id}-${index}`} style={styles.card}>
                <View style={styles.cardHeader}>
                  <Text style={styles.sourceTag}>{q.source}</Text>
                  <TouchableOpacity 
                    onPress={() => handleRemove(q.id, (q as any).exam_id || '')}
                  >
                    <Ionicons name="close-circle" size={22} color={COLORS.border} />
                  </TouchableOpacity>
                </View>
                <Text style={styles.questionText} numberOfLines={3}>
                  {q.question}
                </Text>
                <View style={styles.cardFooter}>
                  <Text style={styles.answerLabel}>정답: {q.answer}번</Text>
                </View>
              </View>
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
  },
  answerLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.success,
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
