import { ExamSet, Question } from "../types/exam";
import examData0 from "../Data/exams/2025년3회_정보처리기사 필기_기출문제.json";
import examData1 from "../Data/exams/2025년2회_정보처리기사필기기출문제.json";
import examData2 from "../Data/exams/2025년1회_정보처리기사필기기출문제.json";
import examData3 from "../Data/exams/2024년3회_정보처리기사필기기출문제.json";
import examData4 from "../Data/exams/2024년2회_정보처리기사필기기출문제.json";
import examData5 from "../Data/exams/2024년1회_정보처리기사필기기출문제_fixed.json";
import examData6 from "../Data/exams/2024년1회_정보처리기사필기기출문제.json";
import examData7 from "../Data/exams/2023년3회_정보처리기사필기기출문제.json";
import examData8 from "../Data/exams/2023년2회_정보처리기사필기기출문제.json";
import examData9 from "../Data/exams/2023년1회_정보처리기사필기기출문제.json";
import examData10 from "../Data/exams/2022년3회_기사필기 기출문제.json";
import examData11 from "../Data/exams/2022년2회_기사필기 기출문제.json";
import examData12 from "../Data/exams/2022년1회_기사필기 기출문제.json";
import examData13 from "../Data/exams/2021년 3회_정보처리기사 필기 기출문제.json";
import examData14 from "../Data/exams/2021년 2회_정보처리기사 필기 기출문제.json";
import examData15 from "../Data/exams/2021년 1회_정보처리기사 필기 기출문제.json";
import examData16 from "../Data/exams/2020년 4회_정보처리기사 필기 기출문제.json";
import examData17 from "../Data/exams/2020년 3회_정보처리기사 필기 기출문제.json";
import examData18 from "../Data/exams/2020년 1, 2회_정보처리기사 필기 기출문제.json";
import examData19 from "../Data/exams/2019년2회_기사필기_기출문제.json";
import examData20 from "../Data/exams/2019년1회_기사필기_기출문제.json";
import examData21 from "../Data/exams/2018년3회_기사필기_기출문제.json";
import examData22 from "../Data/exams/2018년2회_기사필기_기출문제.json";
import examData23 from "../Data/exams/2018년1회_기사필기_기출문제.json";
import examData24 from "../Data/exams/2017년3회_정보처리기사필기기출문제.json";
import examData25 from "../Data/exams/2017년2회_정보처리기사필기기출문제.json";
import examData26 from "../Data/exams/2017년1회_정보처리기사필기기출문제.json";
import examData27 from "../Data/exams/2016년3회_정보처리기사_필기_기출문제.json";
import examData28 from "../Data/exams/2016년2회_정보처리기사_필기_기출문제.json";
import examData29 from "../Data/exams/2016년1회_정보처리기사_필기_기출문제.json";
import examData30 from "../Data/exams/2015년3회정보처리기사필기.json";
import examData31 from "../Data/exams/2015년2회정보처리기사필기.json";
import examData32 from "../Data/exams/2015년1회정보처리기사필기.json";
import examData33 from "../Data/exams/2014년3회_기사필기기출문제.json";
import examData34 from "../Data/exams/2014년2회_기사필기기출문제.json";
import examData35 from "../Data/exams/2014년1회_기사필기기출문제.json";
import examData36 from "../Data/exams/2013년3회_기사필기_기출문제.json";
import examData37 from "../Data/exams/2013년2회_기사필기_기출문제.json";
import examData38 from "../Data/exams/2013년1회_기사필기_기출문제.json";
import examData39 from "../Data/exams/2012년3회_기사필기.json";
import examData40 from "../Data/exams/2012년2회_기사필기.json";
import examData41 from "../Data/exams/2012년1회_기사필기.json";
import examData42 from "../Data/exams/2011년3회_기사필기.json";
import examData43 from "../Data/exams/2011년2회_기사필기.json";
import examData44 from "../Data/exams/2011년1회_기사필기.json";
import examData45 from "../Data/exams/2010년4회_기사필기기출문제.json";
import examData46 from "../Data/exams/2010년2회_기사필기기출문제.json";
import examData47 from "../Data/exams/2010년1회_기사필기기출문제.json";
import examData48 from "../Data/exams/2009년04회기사필기.json";
import examData49 from "../Data/exams/2009년02회기사필기.json";
import examData50 from "../Data/exams/2009년01회기사필기.json";
import examData51 from "../Data/exams/2008년04회기사필기.json";
import examData52 from "../Data/exams/2008년02회기사필기.json";
import examData53 from "../Data/exams/2008년01회기사필기.json";
import examData54 from "../Data/exams/07년4회기사필기_기출문제.json";
import examData55 from "../Data/exams/07년2회기사필기_기출문제.json";
import examData56 from "../Data/exams/07년1회기사필기_기출문제.json";
import examData57 from "../Data/exams/06년4회기사필기기출.json";
import examData58 from "../Data/exams/06년2회기사필기기출.json";
import examData59 from "../Data/exams/06년1회기사필기기출.json";
import examData60 from "../Data/exams/05년2회기사필기기출.json";

const ALL_EXAMS: any[] = [
  { id: "2025년3회_정보처리기사 필기_기출문제", title: "2025년3회_정보처리기사 필기_기출문제", file: "2025년3회_정보처리기사 필기_기출문제", count: 100, questions: examData0 },
  { id: "2025년2회_정보처리기사필기기출문제", title: "2025년2회_정보처리기사필기기출문제", file: "2025년2회_정보처리기사필기기출문제", count: 100, questions: examData1 },
  { id: "2025년1회_정보처리기사필기기출문제", title: "2025년1회_정보처리기사필기기출문제", file: "2025년1회_정보처리기사필기기출문제", count: 100, questions: examData2 },
  { id: "2024년3회_정보처리기사필기기출문제", title: "2024년3회_정보처리기사필기기출문제", file: "2024년3회_정보처리기사필기기출문제", count: 100, questions: examData3 },
  { id: "2024년2회_정보처리기사필기기출문제", title: "2024년2회_정보처리기사필기기출문제", file: "2024년2회_정보처리기사필기기출문제", count: 100, questions: examData4 },
  { id: "2024년1회_정보처리기사필기기출문제_fixed", title: "2024년1회_정보처리기사필기기출문제_fixed", file: "2024년1회_정보처리기사필기기출문제_fixed", count: 3, questions: examData5 },
  { id: "2024년1회_정보처리기사필기기출문제", title: "2024년1회_정보처리기사필기기출문제", file: "2024년1회_정보처리기사필기기출문제", count: 100, questions: examData6 },
  { id: "2023년3회_정보처리기사필기기출문제", title: "2023년3회_정보처리기사필기기출문제", file: "2023년3회_정보처리기사필기기출문제", count: 100, questions: examData7 },
  { id: "2023년2회_정보처리기사필기기출문제", title: "2023년2회_정보처리기사필기기출문제", file: "2023년2회_정보처리기사필기기출문제", count: 100, questions: examData8 },
  { id: "2023년1회_정보처리기사필기기출문제", title: "2023년1회_정보처리기사필기기출문제", file: "2023년1회_정보처리기사필기기출문제", count: 100, questions: examData9 },
  { id: "2022년3회_기사필기 기출문제", title: "2022년3회_기사필기 기출문제", file: "2022년3회_기사필기 기출문제", count: 100, questions: examData10 },
  { id: "2022년2회_기사필기 기출문제", title: "2022년2회_기사필기 기출문제", file: "2022년2회_기사필기 기출문제", count: 100, questions: examData11 },
  { id: "2022년1회_기사필기 기출문제", title: "2022년1회_기사필기 기출문제", file: "2022년1회_기사필기 기출문제", count: 100, questions: examData12 },
  { id: "2021년 3회_정보처리기사 필기 기출문제", title: "2021년 3회_정보처리기사 필기 기출문제", file: "2021년 3회_정보처리기사 필기 기출문제", count: 100, questions: examData13 },
  { id: "2021년 2회_정보처리기사 필기 기출문제", title: "2021년 2회_정보처리기사 필기 기출문제", file: "2021년 2회_정보처리기사 필기 기출문제", count: 100, questions: examData14 },
  { id: "2021년 1회_정보처리기사 필기 기출문제", title: "2021년 1회_정보처리기사 필기 기출문제", file: "2021년 1회_정보처리기사 필기 기출문제", count: 100, questions: examData15 },
  { id: "2020년 4회_정보처리기사 필기 기출문제", title: "2020년 4회_정보처리기사 필기 기출문제", file: "2020년 4회_정보처리기사 필기 기출문제", count: 100, questions: examData16 },
  { id: "2020년 3회_정보처리기사 필기 기출문제", title: "2020년 3회_정보처리기사 필기 기출문제", file: "2020년 3회_정보처리기사 필기 기출문제", count: 100, questions: examData17 },
  { id: "2020년 1, 2회_정보처리기사 필기 기출문제", title: "2020년 1, 2회_정보처리기사 필기 기출문제", file: "2020년 1, 2회_정보처리기사 필기 기출문제", count: 100, questions: examData18 },
  { id: "2019년2회_기사필기_기출문제", title: "2019년2회_기사필기_기출문제", file: "2019년2회_기사필기_기출문제", count: 100, questions: examData19 },
  { id: "2019년1회_기사필기_기출문제", title: "2019년1회_기사필기_기출문제", file: "2019년1회_기사필기_기출문제", count: 100, questions: examData20 },
  { id: "2018년3회_기사필기_기출문제", title: "2018년3회_기사필기_기출문제", file: "2018년3회_기사필기_기출문제", count: 100, questions: examData21 },
  { id: "2018년2회_기사필기_기출문제", title: "2018년2회_기사필기_기출문제", file: "2018년2회_기사필기_기출문제", count: 100, questions: examData22 },
  { id: "2018년1회_기사필기_기출문제", title: "2018년1회_기사필기_기출문제", file: "2018년1회_기사필기_기출문제", count: 100, questions: examData23 },
  { id: "2017년3회_정보처리기사필기기출문제", title: "2017년3회_정보처리기사필기기출문제", file: "2017년3회_정보처리기사필기기출문제", count: 100, questions: examData24 },
  { id: "2017년2회_정보처리기사필기기출문제", title: "2017년2회_정보처리기사필기기출문제", file: "2017년2회_정보처리기사필기기출문제", count: 100, questions: examData25 },
  { id: "2017년1회_정보처리기사필기기출문제", title: "2017년1회_정보처리기사필기기출문제", file: "2017년1회_정보처리기사필기기출문제", count: 100, questions: examData26 },
  { id: "2016년3회_정보처리기사_필기_기출문제", title: "2016년3회_정보처리기사_필기_기출문제", file: "2016년3회_정보처리기사_필기_기출문제", count: 100, questions: examData27 },
  { id: "2016년2회_정보처리기사_필기_기출문제", title: "2016년2회_정보처리기사_필기_기출문제", file: "2016년2회_정보처리기사_필기_기출문제", count: 101, questions: examData28 },
  { id: "2016년1회_정보처리기사_필기_기출문제", title: "2016년1회_정보처리기사_필기_기출문제", file: "2016년1회_정보처리기사_필기_기출문제", count: 1, questions: examData29 },
  { id: "2015년3회정보처리기사필기", title: "2015년3회정보처리기사필기", file: "2015년3회정보처리기사필기", count: 90, questions: examData30 },
  { id: "2015년2회정보처리기사필기", title: "2015년2회정보처리기사필기", file: "2015년2회정보처리기사필기", count: 100, questions: examData31 },
  { id: "2015년1회정보처리기사필기", title: "2015년1회정보처리기사필기", file: "2015년1회정보처리기사필기", count: 100, questions: examData32 },
  { id: "2014년3회_기사필기기출문제", title: "2014년3회_기사필기기출문제", file: "2014년3회_기사필기기출문제", count: 100, questions: examData33 },
  { id: "2014년2회_기사필기기출문제", title: "2014년2회_기사필기기출문제", file: "2014년2회_기사필기기출문제", count: 89, questions: examData34 },
  { id: "2014년1회_기사필기기출문제", title: "2014년1회_기사필기기출문제", file: "2014년1회_기사필기기출문제", count: 89, questions: examData35 },
  { id: "2013년3회_기사필기_기출문제", title: "2013년3회_기사필기_기출문제", file: "2013년3회_기사필기_기출문제", count: 100, questions: examData36 },
  { id: "2013년2회_기사필기_기출문제", title: "2013년2회_기사필기_기출문제", file: "2013년2회_기사필기_기출문제", count: 11, questions: examData37 },
  { id: "2013년1회_기사필기_기출문제", title: "2013년1회_기사필기_기출문제", file: "2013년1회_기사필기_기출문제", count: 2, questions: examData38 },
  { id: "2012년3회_기사필기", title: "2012년3회_기사필기", file: "2012년3회_기사필기", count: 5, questions: examData39 },
  { id: "2012년2회_기사필기", title: "2012년2회_기사필기", file: "2012년2회_기사필기", count: 5, questions: examData40 },
  { id: "2012년1회_기사필기", title: "2012년1회_기사필기", file: "2012년1회_기사필기", count: 1, questions: examData41 },
  { id: "2011년3회_기사필기", title: "2011년3회_기사필기", file: "2011년3회_기사필기", count: 3, questions: examData42 },
  { id: "2011년2회_기사필기", title: "2011년2회_기사필기", file: "2011년2회_기사필기", count: 5, questions: examData43 },
  { id: "2011년1회_기사필기", title: "2011년1회_기사필기", file: "2011년1회_기사필기", count: 2, questions: examData44 },
  { id: "2010년4회_기사필기기출문제", title: "2010년4회_기사필기기출문제", file: "2010년4회_기사필기기출문제", count: 1, questions: examData45 },
  { id: "2010년2회_기사필기기출문제", title: "2010년2회_기사필기기출문제", file: "2010년2회_기사필기기출문제", count: 3, questions: examData46 },
  { id: "2010년1회_기사필기기출문제", title: "2010년1회_기사필기기출문제", file: "2010년1회_기사필기기출문제", count: 5, questions: examData47 },
  { id: "2009년04회기사필기", title: "2009년04회기사필기", file: "2009년04회기사필기", count: 3, questions: examData48 },
  { id: "2009년02회기사필기", title: "2009년02회기사필기", file: "2009년02회기사필기", count: 4, questions: examData49 },
  { id: "2009년01회기사필기", title: "2009년01회기사필기", file: "2009년01회기사필기", count: 2, questions: examData50 },
  { id: "2008년04회기사필기", title: "2008년04회기사필기", file: "2008년04회기사필기", count: 4, questions: examData51 },
  { id: "2008년02회기사필기", title: "2008년02회기사필기", file: "2008년02회기사필기", count: 2, questions: examData52 },
  { id: "2008년01회기사필기", title: "2008년01회기사필기", file: "2008년01회기사필기", count: 3, questions: examData53 },
  { id: "07년4회기사필기_기출문제", title: "07년4회기사필기_기출문제", file: "07년4회기사필기_기출문제", count: 100, questions: examData54 },
  { id: "07년2회기사필기_기출문제", title: "07년2회기사필기_기출문제", file: "07년2회기사필기_기출문제", count: 100, questions: examData55 },
  { id: "07년1회기사필기_기출문제", title: "07년1회기사필기_기출문제", file: "07년1회기사필기_기출문제", count: 100, questions: examData56 },
  { id: "06년4회기사필기기출", title: "06년4회기사필기기출", file: "06년4회기사필기기출", count: 98, questions: examData57 },
  { id: "06년2회기사필기기출", title: "06년2회기사필기기출", file: "06년2회기사필기기출", count: 1, questions: examData58 },
  { id: "06년1회기사필기기출", title: "06년1회기사필기기출", file: "06년1회기사필기기출", count: 1, questions: examData59 },
  { id: "05년2회기사필기기출", title: "05년2회기사필기기출", file: "05년2회기사필기기출", count: 5, questions: examData60 },
];

export const DataService = {
  getExamList: (): any[] => {
    return ALL_EXAMS;
  },

  getExamById: (id: string): any | undefined => {
    return ALL_EXAMS.find((e) => e.id === id);
  },

  getQuestionsByFile: (fileId: string): Question[] => {
    const exam = ALL_EXAMS.find((e) => e.id === fileId);
    return exam ? exam.questions : [];
  },
};