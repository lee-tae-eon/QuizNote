// src/screens/HomeScreen.tsx
import React, { useMemo } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, SectionList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DataService } from '../services/dataService';
import { COLORS, SHADOWS } from '../constants/theme';

interface Props {
  onSelectExam: (exam: any) => void;
  onStartRandom: () => void;
  onOpenWrongNote: () => void;
}

const HomeScreen: React.FC<Props> = ({ onSelectExam, onStartRandom, onOpenWrongNote }) => {
  const groupedExams = useMemo(() => DataService.getExamsByYear(), []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>QuizNote</Text>
        <Text style={styles.subtitle}>정보처리기사 기출 완전 정복</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.actionContainer}>
          <TouchableOpacity 
            style={[styles.actionCard, { backgroundColor: COLORS.primary }]}
            onPress={onStartRandom}
          >
            <View style={styles.iconCircle}>
              <Ionicons name="shuffle" size={28} color={COLORS.primary} />
            </View>
            <Text style={styles.actionTitle}>랜덤 풀이</Text>
            <Text style={styles.actionDesc}>전체 문항 중 50문제를 무작위로 뽑아 풉니다.</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.actionCard, { backgroundColor: COLORS.secondary }]}
            onPress={onOpenWrongNote}
          >
            <View style={styles.iconCircle}>
              <Ionicons name="bookmark" size={28} color={COLORS.secondary} />
            </View>
            <Text style={styles.actionTitle}>오답노트</Text>
            <Text style={styles.actionDesc}>내가 틀린 문제들만 모아서 다시 복습하세요.</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>연도별 기출문제</Text>

        {groupedExams.map((group) => (
          <View key={group.year} style={styles.yearGroup}>
            <View style={styles.yearHeader}>
              <Text style={styles.yearText}>{group.year}년</Text>
              <View style={styles.yearLine} />
            </View>
            <View style={styles.examGrid}>
              {group.exams.map((exam) => (
                <TouchableOpacity
                  key={exam.id}
                  style={styles.examCard}
                  onPress={() => onSelectExam(exam)}
                >
                  <Text style={styles.examTitle}>{exam.title.split('_')[0]}</Text>
                  <View style={styles.examMeta}>
                    <Ionicons name="list" size={14} color={COLORS.textSecondary} />
                    <Text style={styles.examCount}>{exam.count} 문항</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
        <View style={{ height: 60 }} />
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
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 24,
    backgroundColor: COLORS.white,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: COLORS.text,
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  actionContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
    marginBottom: 30,
  },
  actionCard: {
    flex: 1,
    borderRadius: 24,
    padding: 20,
    minHeight: 180,
    justifyContent: 'flex-end',
    ...SHADOWS.medium,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    position: 'absolute',
    top: 20,
    left: 20,
  },
  actionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.white,
    marginBottom: 4,
  },
  actionDesc: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 20,
  },
  yearGroup: {
    marginBottom: 24,
  },
  yearHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  yearText: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
    marginRight: 12,
  },
  yearLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },
  examGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  examCard: {
    width: '48%',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    ...SHADOWS.small,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  examTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 8,
  },
  examMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  examCount: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
});

export default HomeScreen;
