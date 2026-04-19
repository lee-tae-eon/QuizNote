import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

interface Props {
  onBack: () => void;
  title: string;
  score: number;
}

const TopBar: React.FC<Props> = ({ onBack, title, score }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={styles.backText}>‹ 목록</Text>
      </TouchableOpacity>
      
      <View style={styles.titleContainer}>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
      </View>
      
      <View style={styles.scoreBadge}>
        <Text style={styles.scoreText}>{score}점</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  backButton: {
    width: 60,
  },
  backText: {
    color: '#007AFF',
    fontSize: 17,
    fontWeight: '500',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  scoreBadge: {
    width: 60,
    alignItems: 'flex-end',
  },
  scoreText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#007AFF',
  },
});

export default TopBar;
