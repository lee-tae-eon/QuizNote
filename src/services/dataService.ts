import { ExamSet, Question } from "../types/exam";
import examData0 from "../Data/exams/exam_data_0.json";
import examData1 from "../Data/exams/exam_data_1.json";
import examData2 from "../Data/exams/exam_data_2.json";
import examData3 from "../Data/exams/exam_data_3.json";
import examData4 from "../Data/exams/exam_data_4.json";
import examData5 from "../Data/exams/exam_data_5.json";
import examData6 from "../Data/exams/exam_data_6.json";
import examData7 from "../Data/exams/exam_data_7.json";
import examData8 from "../Data/exams/exam_data_8.json";
import examData9 from "../Data/exams/exam_data_9.json";
import examData10 from "../Data/exams/exam_data_10.json";
import examData11 from "../Data/exams/exam_data_11.json";
import examData12 from "../Data/exams/exam_data_12.json";
import examData13 from "../Data/exams/exam_data_13.json";
import examData14 from "../Data/exams/exam_data_14.json";
import examData15 from "../Data/exams/exam_data_15.json";
import examData16 from "../Data/exams/exam_data_16.json";
import examData17 from "../Data/exams/exam_data_17.json";
import examData18 from "../Data/exams/exam_data_18.json";
import examData19 from "../Data/exams/exam_data_19.json";
import examData20 from "../Data/exams/exam_data_20.json";
import examData21 from "../Data/exams/exam_data_21.json";
import examData22 from "../Data/exams/exam_data_22.json";
import examData23 from "../Data/exams/exam_data_23.json";
import examData24 from "../Data/exams/exam_data_24.json";
import examData25 from "../Data/exams/exam_data_25.json";
import examData26 from "../Data/exams/exam_data_26.json";
import examData27 from "../Data/exams/exam_data_27.json";
import examData28 from "../Data/exams/exam_data_28.json";
import examData29 from "../Data/exams/exam_data_29.json";
import examData30 from "../Data/exams/exam_data_30.json";
import examData31 from "../Data/exams/exam_data_31.json";
import examData32 from "../Data/exams/exam_data_32.json";
import examData33 from "../Data/exams/exam_data_33.json";
import examData34 from "../Data/exams/exam_data_34.json";
import examData35 from "../Data/exams/exam_data_35.json";
import examData36 from "../Data/exams/exam_data_36.json";
import examData37 from "../Data/exams/exam_data_37.json";
import examData38 from "../Data/exams/exam_data_38.json";
import examData39 from "../Data/exams/exam_data_39.json";
import examData40 from "../Data/exams/exam_data_40.json";
import examData41 from "../Data/exams/exam_data_41.json";
import examData42 from "../Data/exams/exam_data_42.json";
import examData43 from "../Data/exams/exam_data_43.json";
import examData44 from "../Data/exams/exam_data_44.json";
import examData45 from "../Data/exams/exam_data_45.json";
import examData46 from "../Data/exams/exam_data_46.json";
import examData47 from "../Data/exams/exam_data_47.json";
import examData48 from "../Data/exams/exam_data_48.json";
import examData49 from "../Data/exams/exam_data_49.json";
import examData50 from "../Data/exams/exam_data_50.json";
import examData51 from "../Data/exams/exam_data_51.json";
import examData52 from "../Data/exams/exam_data_52.json";
import examData53 from "../Data/exams/exam_data_53.json";
import examData54 from "../Data/exams/exam_data_54.json";
import examData55 from "../Data/exams/exam_data_55.json";
import examData56 from "../Data/exams/exam_data_56.json";
import examData57 from "../Data/exams/exam_data_57.json";
import examData58 from "../Data/exams/exam_data_58.json";
import examData59 from "../Data/exams/exam_data_59.json";
import examData60 from "../Data/exams/exam_data_60.json";

const ALL_EXAMS: any[] = [
  { id: "2025년3회_정보처리기사 필기_기출문제", title: "2025년3회_정보처리기사 필기_기출문제", file: "2025년3회_정보처리기사 필기_기출문제", count: examData0.length, questions: examData0 },
  { id: "2025년2회_정보처리기사필기기출문제", title: "2025년2회_정보처리기사필기기출문제", file: "2025년2회_정보처리기사필기기출문제", count: examData1.length, questions: examData1 },
  { id: "2025년1회_정보처리기사필기기출문제", title: "2025년1회_정보처리기사필기기출문제", file: "2025년1회_정보처리기사필기기출문제", count: examData2.length, questions: examData2 },
  { id: "2024년3회_정보처리기사필기기출문제", title: "2024년3회_정보처리기사필기기출문제", file: "2024년3회_정보처리기사필기기출문제", count: examData3.length, questions: examData3 },
  { id: "2024년2회_정보처리기사필기기출문제", title: "2024년2회_정보처리기사필기기출문제", file: "2024년2회_정보처리기사필기기출문제", count: examData4.length, questions: examData4 },
  { id: "2024년1회_정보처리기사필기기출문제_fixed", title: "2024년1회_정보처리기사필기기출문제_fixed", file: "2024년1회_정보처리기사필기기출문제_fixed", count: examData5.length, questions: examData5 },
  { id: "2024년1회_정보처리기사필기기출문제", title: "2024년1회_정보처리기사필기기출문제", file: "2024년1회_정보처리기사필기기출문제", count: examData6.length, questions: examData6 },
  { id: "2023년3회_정보처리기사필기기출문제", title: "2023년3회_정보처리기사필기기출문제", file: "2023년3회_정보처리기사필기기출문제", count: examData7.length, questions: examData7 },
  { id: "2023년2회_정보처리기사필기기출문제", title: "2023년2회_정보처리기사필기기출문제", file: "2023년2회_정보처리기사필기기출문제", count: examData8.length, questions: examData8 },
  { id: "2023년1회_정보처리기사필기기출문제", title: "2023년1회_정보처리기사필기기출문제", file: "2023년1회_정보처리기사필기기출문제", count: examData9.length, questions: examData9 },
  { id: "2022년3회_기사필기 기출문제", title: "2022년3회_기사필기 기출문제", file: "2022년3회_기사필기 기출문제", count: examData10.length, questions: examData10 },
  { id: "2022년2회_기사필기 기출문제", title: "2022년2회_기사필기 기출문제", file: "2022년2회_기사필기 기출문제", count: examData11.length, questions: examData11 },
  { id: "2022년1회_기사필기 기출문제", title: "2022년1회_기사필기 기출문제", file: "2022년1회_기사필기 기출문제", count: examData12.length, questions: examData12 },
  { id: "2021년 3회_정보처리기사 필기 기출문제", title: "2021년 3회_정보처리기사 필기 기출문제", file: "2021년 3회_정보처리기사 필기 기출문제", count: examData13.length, questions: examData13 },
  { id: "2021년 2회_정보처리기사 필기 기출문제", title: "2021년 2회_정보처리기사 필기 기출문제", file: "2021년 2회_정보처리기사 필기 기출문제", count: examData14.length, questions: examData14 },
  { id: "2021년 1회_정보처리기사 필기 기출문제", title: "2021년 1회_정보처리기사 필기 기출문제", file: "2021년 1회_정보처리기사 필기 기출문제", count: examData15.length, questions: examData15 },
  { id: "2020년 4회_정보처리기사 필기 기출문제", title: "2020년 4회_정보처리기사 필기 기출문제", file: "2020년 4회_정보처리기사 필기 기출문제", count: examData16.length, questions: examData16 },
  { id: "2020년 3회_정보처리기사 필기 기출문제", title: "2020년 3회_정보처리기사 필기 기출문제", file: "2020년 3회_정보처리기사 필기 기출문제", count: examData17.length, questions: examData17 },
  { id: "2020년 1, 2회_정보처리기사 필기 기출문제", title: "2020년 1, 2회_정보처리기사 필기 기출문제", file: "2020년 1, 2회_정보처리기사 필기 기출문제", count: examData18.length, questions: examData18 },
  { id: "2019년2회_기사필기_기출문제", title: "2019년2회_기사필기_기출문제", file: "2019년2회_기사필기_기출문제", count: examData19.length, questions: examData19 },
  { id: "2019년1회_기사필기_기출문제", title: "2019년1회_기사필기_기출문제", file: "2019년1회_기사필기_기출문제", count: examData20.length, questions: examData20 },
  { id: "2018년3회_기사필기_기출문제", title: "2018년3회_기사필기_기출문제", file: "2018년3회_기사필기_기출문제", count: examData21.length, questions: examData21 },
  { id: "2018년2회_기사필기_기출문제", title: "2018년2회_기사필기_기출문제", file: "2018년2회_기사필기_기출문제", count: examData22.length, questions: examData22 },
  { id: "2018년1회_기사필기_기출문제", title: "2018년1회_기사필기_기출문제", file: "2018년1회_기사필기_기출문제", count: examData23.length, questions: examData23 },
  { id: "2017년3회_정보처리기사필기기출문제", title: "2017년3회_정보처리기사필기기출문제", file: "2017년3회_정보처리기사필기기출문제", count: examData24.length, questions: examData24 },
  { id: "2017년2회_정보처리기사필기기출문제", title: "2017년2회_정보처리기사필기기출문제", file: "2017년2회_정보처리기사필기기출문제", count: examData25.length, questions: examData25 },
  { id: "2017년1회_정보처리기사필기기출문제", title: "2017년1회_정보처리기사필기기출문제", file: "2017년1회_정보처리기사필기기출문제", count: examData26.length, questions: examData26 },
  { id: "2016년3회_정보처리기사_필기_기출문제", title: "2016년3회_정보처리기사_필기_기출문제", file: "2016년3회_정보처리기사_필기_기출문제", count: examData27.length, questions: examData27 },
  { id: "2016년2회_정보처리기사_필기_기출문제", title: "2016년2회_정보처리기사_필기_기출문제", file: "2016년2회_정보처리기사_필기_기출문제", count: examData28.length, questions: examData28 },
  { id: "2016년1회_정보처리기사_필기_기출문제", title: "2016년1회_정보처리기사_필기_기출문제", file: "2016년1회_정보처리기사_필기_기출문제", count: examData29.length, questions: examData29 },
  { id: "2015년3회정보처리기사필기", title: "2015년3회정보처리기사필기", file: "2015년3회정보처리기사필기", count: examData30.length, questions: examData30 },
  { id: "2015년2회정보처리기사필기", title: "2015년2회정보처리기사필기", file: "2015년2회정보처리기사필기", count: examData31.length, questions: examData31 },
  { id: "2015년1회정보처리기사필기", title: "2015년1회정보처리기사필기", file: "2015년1회정보처리기사필기", count: examData32.length, questions: examData32 },
  { id: "2014년3회_기사필기기출문제", title: "2014년3회_기사필기기출문제", file: "2014년3회_기사필기기출문제", count: examData33.length, questions: examData33 },
  { id: "2014년2회_기사필기기출문제", title: "2014년2회_기사필기기출문제", file: "2014년2회_기사필기기출문제", count: examData34.length, questions: examData34 },
  { id: "2014년1회_기사필기기출문제", title: "2014년1회_기사필기기출문제", file: "2014년1회_기사필기기출문제", count: examData35.length, questions: examData35 },
  { id: "2013년3회_기사필기_기출문제", title: "2013년3회_기사필기_기출문제", file: "2013년3회_기사필기_기출문제", count: examData36.length, questions: examData36 },
  { id: "2013년2회_기사필기_기출문제", title: "2013년2회_기사필기_기출문제", file: "2013년2회_기사필기_기출문제", count: examData37.length, questions: examData37 },
  { id: "2013년1회_기사필기_기출문제", title: "2013년1회_기사필기_기출문제", file: "2013년1회_기사필기_기출문제", count: examData38.length, questions: examData38 },
  { id: "2012년3회_기사필기", title: "2012년3회_기사필기", file: "2012년3회_기사필기", count: examData39.length, questions: examData39 },
  { id: "2012년2회_기사필기", title: "2012년2회_기사필기", file: "2012년2회_기사필기", count: examData40.length, questions: examData40 },
  { id: "2012년1회_기사필기", title: "2012년1회_기사필기", file: "2012년1회_기사필기", count: examData41.length, questions: examData41 },
  { id: "2011년3회_기사필기", title: "2011년3회_기사필기", file: "2011년3회_기사필기", count: examData42.length, questions: examData42 },
  { id: "2011년2회_기사필기", title: "2011년2회_기사필기", file: "2011년2회_기사필기", count: examData43.length, questions: examData43 },
  { id: "2011년1회_기사필기", title: "2011년1회_기사필기", file: "2011년1회_기사필기", count: examData44.length, questions: examData44 },
  { id: "2010년4회_기사필기기출문제", title: "2010년4회_기사필기기출문제", file: "2010년4회_기사필기기출문제", count: examData45.length, questions: examData45 },
  { id: "2010년2회_기사필기기출문제", title: "2010년2회_기사필기기출문제", file: "2010년2회_기사필기기출문제", count: examData46.length, questions: examData46 },
  { id: "2010년1회_기사필기기출문제", title: "2010년1회_기사필기기출문제", file: "2010년1회_기사필기기출문제", count: examData47.length, questions: examData47 },
  { id: "2009년04회기사필기", title: "2009년04회기사필기", file: "2009년04회기사필기", count: examData48.length, questions: examData48 },
  { id: "2009년02회기사필기", title: "2009년02회기사필기", file: "2009년02회기사필기", count: examData49.length, questions: examData49 },
  { id: "2009년01회기사필기", title: "2009년01회기사필기", file: "2009년01회기사필기", count: examData50.length, questions: examData50 },
  { id: "2008년04회기사필기", title: "2008년04회기사필기", file: "2008년04회기사필기", count: examData51.length, questions: examData51 },
  { id: "2008년02회기사필기", title: "2008년02회기사필기", file: "2008년02회기사필기", count: examData52.length, questions: examData52 },
  { id: "2008년01회기사필기", title: "2008년01회기사필기", file: "2008년01회기사필기", count: examData53.length, questions: examData53 },
  { id: "07년4회기사필기_기출문제", title: "07년4회기사필기_기출문제", file: "07년4회기사필기_기출문제", count: examData54.length, questions: examData54 },
  { id: "07년2회기사필기_기출문제", title: "07년2회기사필기_기출문제", file: "07년2회기사필기_기출문제", count: examData55.length, questions: examData55 },
  { id: "07년1회기사필기_기출문제", title: "07년1회기사필기_기출문제", file: "07년1회기사필기_기출문제", count: examData56.length, questions: examData56 },
  { id: "06년4회기사필기기출", title: "06년4회기사필기기출", file: "06년4회기사필기기출", count: examData57.length, questions: examData57 },
  { id: "06년2회기사필기기출", title: "06년2회기사필기기출", file: "06년2회기사필기기출", count: examData58.length, questions: examData58 },
  { id: "06년1회기사필기기출", title: "06년1회기사필기기출", file: "06년1회기사필기기출", count: examData59.length, questions: examData59 },
  { id: "05년2회기사필기기출", title: "05년2회기사필기기출", file: "05년2회기사필기기출", count: examData60.length, questions: examData60 },
];

export const DataService = {
  getExamList: (): any[] => {
    // Filter out exams with corrupted data (e.g., all choices empty)
    return ALL_EXAMS
      .filter(exam => 
        exam.questions && 
        exam.questions.length > 0 && 
        exam.questions.every((q: Question) => q.choices && q.choices.length > 0)
      )
      .map(exam => ({
        ...exam,
        count: exam.questions.length
      }));
  },

  getExamsByYear: (): { year: string; exams: any[] }[] => {
    const list = DataService.getExamList();
    const groups: { [key: string]: any[] } = {};
    
    list.forEach(exam => {
      // Extract year from title (e.g., "2025년3회..." -> "2025")
      const yearMatch = exam.title.match(/(\d{2,4})년/);
      const year = yearMatch ? (yearMatch[1].length === 2 ? `20${yearMatch[1]}` : yearMatch[1]) : '기타';
      
      if (!groups[year]) groups[year] = [];
      groups[year].push(exam);
    });

    return Object.keys(groups)
      .sort((a, b) => b.localeCompare(a)) // Latest year first
      .map(year => ({
        year,
        exams: groups[year].sort((a, b) => b.id.localeCompare(a.id))
      }));
  },

  getExamById: (id: string): any | undefined => {
    return ALL_EXAMS.find((e) => e.id === id);
  },

  getQuestionsByFile: (fileId: string): Question[] => {
    const exam = ALL_EXAMS.find((e) => e.id === fileId);
    return exam ? exam.questions : [];
  },

  getRandomQuestions: (limit: number = 50): { examId: string; question: Question }[] => {
    const allQuestions: { examId: string; question: Question }[] = [];
    const validExams = ALL_EXAMS.filter(exam => 
      exam.questions && 
      exam.questions.length > 0 && 
      exam.questions.every((q: Question) => q.choices && q.choices.length > 0)
    );
    
    validExams.forEach(exam => {
      exam.questions.forEach((q: Question) => {
        allQuestions.push({ examId: exam.id, question: q });
      });
    });

    // Shuffle
    for (let i = allQuestions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allQuestions[i], allQuestions[j]] = [allQuestions[j], allQuestions[i]];
    }

    return allQuestions.slice(0, limit);
  },

  getQuestionsByIds: (ids: { question_id: number; exam_id: string }[]): Question[] => {
    const results: Question[] = [];
    ids.forEach(item => {
      const exam = ALL_EXAMS.find(e => e.id === item.exam_id);
      if (exam) {
        const question = exam.questions.find((q: Question) => q.id === item.question_id);
        if (question) {
          results.push({ ...question, source: exam.title }); // Attach source title
        }
      }
    });
    return results;
  }
};