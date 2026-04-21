// src/screens/ResultScreen.tsx
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SHADOWS } from '../constants/theme';

interface Props {
  score: number;
  total: number;
  onBack: () => void;
}

const ResultScreen: React.FC<Props> = ({ score, total, onBack }) => {
  const percentage = Math.round((score / total) * 100);
  
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.iconContainer}>
          <Ionicons 
            name={percentage >= 60 ? "trophy" : "ribbon"} 
            size={80} 
            color={percentage >= 60 ? COLORS.warning : COLORS.primary} 
          />
        </View>
        
        <Text style={styles.title}>학습 결과</Text>
        <Text style={styles.scoreText}>
          <Text style={styles.scoreHighlight}>{score}</Text> / {total}
        </Text>
        
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>정답률</Text>
            <Text style={styles.statValue}>{percentage}%</Text>
          </View>
          <View style={[styles.statItem, { borderLeftWidth: 1, borderLeftColor: COLORS.border }]}>
            <Text style={styles.statLabel}>상태</Text>
            <Text style={[styles.statValue, { color: percentage >= 60 ? COLORS.success : COLORS.error }]}>
              {percentage >= 60 ? "합격권" : "노력필요"}
            </Text>
          </View>
        </View>

        <Text style={styles.infoText}>
          틀린 문제는 오답노트에 자동으로 저장되었습니다.
        </Text>

        <TouchableOpacity style={styles.button} onPress={onBack}>
          <Text style={styles.buttonText}>메인으로 돌아가기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 32,
    padding: 32,
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  iconContainer: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 8,
  },
  scoreText: {
    fontSize: 32,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginBottom: 32,
  },
  scoreHighlight: {
    fontSize: 48,
    fontWeight: '900',
    color: COLORS.primary,
  },
  statsRow: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 32,
    paddingVertical: 16,
    backgroundColor: COLORS.background,
    borderRadius: 20,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
  },
  infoText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 20,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 20,
    width: '100%',
    alignItems: 'center',
    ...SHADOWS.small,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '700',
  },
});

export default ResultScreen;
