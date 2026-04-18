// src/components/TopBar.tsx
import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { QuizMode } from '../types/quiz';

interface Props {
  mode: QuizMode;
  wrongCount: number;
  onToggleMode: (mode: QuizMode) => void;
  onImport: () => void;
}

export const TopBar: React.FC<Props> = ({ mode, wrongCount, onToggleMode, onImport }) => (
  <View style={styles.topBar}>
    <View style={styles.modeSelector}>
      <TouchableOpacity 
        style={[styles.modeButton, mode === 'ALL' && styles.activeModeButton]} 
        onPress={() => onToggleMode('ALL')}
      >
        <Text style={[styles.modeButtonText, mode === 'ALL' && styles.activeModeButtonText]}>전체</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.modeButton, mode === 'WRONG' && styles.activeWrongModeButton]} 
        onPress={() => onToggleMode('WRONG')}
      >
        <Text style={[styles.modeButtonText, mode === 'WRONG' && styles.activeModeButtonText]}>오답({wrongCount})</Text>
      </TouchableOpacity>
    </View>
    <TouchableOpacity style={styles.importButton} onPress={onImport}>
      <Text style={styles.importButtonText}>임포트 +</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  topBar: { flexDirection: 'row', padding: 10, backgroundColor: '#FFF', alignItems: 'center' },
  modeSelector: { flex: 1, flexDirection: 'row', backgroundColor: '#E5E5EA', borderRadius: 8, padding: 2, marginRight: 10 },
  modeButton: { flex: 1, paddingVertical: 6, alignItems: 'center', borderRadius: 6 },
  activeModeButton: { backgroundColor: '#FFF' },
  activeWrongModeButton: { backgroundColor: '#FF3B30' },
  modeButtonText: { fontSize: 12, fontWeight: '600', color: '#8E8E93' },
  activeModeButtonText: { color: '#FFF' },
  importButton: { backgroundColor: '#007AFF', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 },
  importButtonText: { color: '#FFF', fontSize: 12, fontWeight: 'bold' },
});
