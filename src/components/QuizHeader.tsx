// src/components/QuizHeader.tsx
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

interface Props {
  source: string;
  subject: string;
  currentIdx: number;
  total: number;
}

export const QuizHeader: React.FC<Props> = ({ source, subject, currentIdx, total }) => (
  <View style={styles.header}>
    <View style={{flex:1}}>
      <Text style={styles.sourceText}>{source}</Text>
      <Text style={styles.subjectText}>[{subject}]</Text>
    </View>
    <Text style={styles.progressText}>{currentIdx + 1} / {total}</Text>
  </View>
);

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  sourceText: { fontSize: 11, color: '#8E8E93' },
  subjectText: { fontSize: 14, fontWeight: 'bold', color: '#007AFF' },
  progressText: { fontSize: 12, color: '#3A3A3C', fontWeight: 'bold' },
});
