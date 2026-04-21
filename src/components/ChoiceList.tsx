import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

interface Props {
  choices: string[];
  selectedChoice: number | null;
  correctAnswer: number;
  showAnswer: boolean;
  isCorrect: boolean;
  onSelect: (index: number) => void;
}

const ChoiceList: React.FC<Props> = ({ 
  choices, 
  selectedChoice, 
  correctAnswer, 
  showAnswer, 
  onSelect 
}) => {
  return (
    <View style={styles.container}>
      {choices.map((choice, index) => {
        const isSelected = selectedChoice === index;
        const isCorrect = index + 1 === correctAnswer;
        
        let itemStyle: any = styles.choiceItem;
        let textStyle: any = styles.choiceText;
        let numberStyle: any = styles.number;

        if (showAnswer) {
          if (isCorrect) {
            itemStyle = [styles.choiceItem, styles.correctItem];
            textStyle = [styles.choiceText, styles.correctText];
            numberStyle = [styles.number, styles.correctText];
          } else if (isSelected) {
            itemStyle = [styles.choiceItem, styles.wrongItem];
            textStyle = [styles.choiceText, styles.wrongText];
            numberStyle = [styles.number, styles.wrongText];
          }
        } else if (isSelected) {
          itemStyle = [styles.choiceItem, styles.selectedItem];
        }

        return (
          <TouchableOpacity
            key={index}
            style={itemStyle}
            onPress={() => onSelect(index)}
            disabled={showAnswer}
            activeOpacity={0.7}
          >
            <View style={styles.content}>
              <Text style={numberStyle}>{index + 1}</Text>
              <Text style={textStyle}>{choice}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  choiceItem: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  selectedItem: {
    borderColor: '#007AFF',
    backgroundColor: '#F0F7FF',
  },
  correctItem: {
    backgroundColor: '#E8F5E9',
    borderColor: '#4CAF50',
  },
  wrongItem: {
    backgroundColor: '#FFEBEE',
    borderColor: '#FF5252',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  number: {
    width: 28,
    fontSize: 16,
    fontWeight: '700',
    color: '#999999',
  },
  choiceText: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
    lineHeight: 22,
  },
  correctText: {
    color: '#2E7D32',
    fontWeight: '600',
  },
  wrongText: {
    color: '#C62828',
    fontWeight: '600',
  },
});

export default ChoiceList;
