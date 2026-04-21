import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

interface Props {
  explanation: string;
  onNext: () => void;
  isLast: boolean;
}

const ExplanationBox: React.FC<Props> = ({ explanation, onNext, isLast }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>💡 정답 해설</Text>
        <Text style={styles.text}>{explanation}</Text>
      </View>
      
      <TouchableOpacity style={styles.nextButton} onPress={onNext}>
        <Text style={styles.nextButtonText}>
          {isLast ? '결과 보기' : '다음 문제'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  content: {
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333333',
    marginBottom: 8,
  },
  text: {
    fontSize: 15,
    color: '#666666',
    lineHeight: 22,
  },
  nextButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default ExplanationBox;
