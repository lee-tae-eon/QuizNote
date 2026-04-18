// src/components/ChoiceList.tsx
import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

interface Props {
  choices: string[];
  selectedIdx: number | null;
  correctIdx: number;
  onSelect: (idx: number) => void;
}

export const ChoiceList: React.FC<Props> = ({ choices, selectedIdx, correctIdx, onSelect }) => (
  <View style={styles.choicesBox}>
    {choices.map((choice, idx) => {
      let btnStyle: any = styles.choiceButton;
      let txtStyle: any = styles.choiceText;
      
      if (selectedIdx !== null) {
        if (idx === correctIdx) {
          btnStyle = [styles.choiceButton, styles.correctButton];
          txtStyle = [styles.choiceText, styles.correctText];
        } else if (idx === selectedIdx) {
          btnStyle = [styles.choiceButton, styles.wrongButton];
          txtStyle = [styles.choiceText, styles.wrongText];
        }
      }

      return (
        <TouchableOpacity 
          key={idx} 
          style={btnStyle} 
          onPress={() => onSelect(idx)} 
          disabled={selectedIdx !== null}
        >
          <Text style={txtStyle}>{idx + 1}. {choice}</Text>
        </TouchableOpacity>
      );
    })}
  </View>
);

const styles = StyleSheet.create({
  choicesBox: { marginBottom: 20 },
  choiceButton: { backgroundColor: '#FFF', padding: 16, borderRadius: 12, marginBottom: 10, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 2, elevation: 2 },
  choiceText: { fontSize: 16, color: '#3A3A3C' },
  correctButton: { backgroundColor: '#34C759' },
  correctText: { color: '#FFF', fontWeight: 'bold' },
  wrongButton: { backgroundColor: '#FF3B30' },
  wrongText: { color: '#FFF', fontWeight: 'bold' },
});
