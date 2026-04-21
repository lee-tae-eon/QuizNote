import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Question } from '../types/exam';
import { ImageService } from '../services/imageService';

interface Props {
  question: Question;
}

const QuizHeader: React.FC<Props> = ({ question }) => {
  const examImage = question.image ? ImageService.getImage(question.image) : null;

  return (
    <View style={styles.container}>
      <Text style={styles.subject}>[{question.subject}]</Text>
      <Text style={styles.questionText}>{question.question}</Text>
      
      {examImage && (
        <View style={styles.imageContainer}>
          <Image 
            source={examImage} 
            style={styles.image} 
            resizeMode="contain" 
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  subject: {
    fontSize: 14,
    fontWeight: '700',
    color: '#007AFF',
    marginBottom: 8,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    lineHeight: 26,
    marginBottom: 16,
  },
  imageContainer: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  image: {
    width: '100%',
    height: 200,
  },
});

export default QuizHeader;
