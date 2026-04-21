import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { COLORS } from '../constants/theme';

interface Props {
  current: number;
  total: number;
}

const ProgressBar: React.FC<Props> = ({ current, total }) => {
  const progress = total > 0 ? (current / total) * 100 : 0;

  return (
    <View style={styles.container}>
      <View style={styles.barBackground}>
        <View style={[styles.barFill, { width: `${progress}%` }]} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.progressText}>
          질문 <Text style={styles.currentText}>{current}</Text> / {total}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  barBackground: {
    height: 6,
    backgroundColor: '#EEEEEE',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 8,
  },
  barFill: {
    height: '100%',
    backgroundColor: '#007AFF',
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  progressText: {
    fontSize: 12,
    color: '#999999',
    fontWeight: '500',
  },
  currentText: {
    color: '#007AFF',
    fontWeight: '700',
  },
});

export default ProgressBar;
