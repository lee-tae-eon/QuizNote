// src/components/ProgressBar.tsx
import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

interface Props {
  progress: number; // 0 to 1
}

export const ProgressBar: React.FC<Props> = ({ progress }) => (
  <View style={styles.container}>
    <View style={[styles.bar, { width: width * progress }]} />
  </View>
);

const styles = StyleSheet.create({
  container: { height: 4, backgroundColor: '#E5E5EA', width: '100%' },
  bar: { height: '100%', backgroundColor: '#007AFF' },
});
