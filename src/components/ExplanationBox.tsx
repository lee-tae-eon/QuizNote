// src/components/ExplanationBox.tsx
import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

interface Props {
  explanation: string;
  isCorrect: boolean;
  canRemove: boolean;
  onRemove: () => void;
  onNext: () => void;
}

export const ExplanationBox: React.FC<Props> = ({ explanation, isCorrect, canRemove, onRemove, onNext }) => (
  <View style={styles.explanationBox}>
    <View style={styles.explanationHeader}>
      <Text style={styles.explanationTitle}>💡 해설</Text>
      {canRemove && isCorrect && (
        <TouchableOpacity onPress={onRemove}>
          <Text style={styles.removeText}>오답 제거</Text>
        </TouchableOpacity>
      )}
    </View>
    <Text style={styles.explanationText}>{explanation}</Text>
    <TouchableOpacity style={styles.nextButton} onPress={onNext}>
      <Text style={styles.nextButtonText}>다음</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  explanationBox: { padding: 20, backgroundColor: '#FFF', borderRadius: 16, shadowOpacity: 0.1, shadowRadius: 4 },
  explanationHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  explanationTitle: { fontWeight: 'bold', fontSize: 16 },
  removeText: { color: '#FF3B30', fontSize: 12, fontWeight: 'bold' },
  explanationText: { fontSize: 15, color: '#48484A', lineHeight: 22, marginBottom: 20 },
  nextButton: { backgroundColor: '#007AFF', padding: 15, borderRadius: 12, alignItems: 'center' },
  nextButtonText: { color: '#FFF', fontWeight: 'bold' },
});
