export interface fetchedDataInterface {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: Array<string>;
  question: string;
  type: string;
}

export interface transformedDataInterface {
  correctAnswer: string;
  options: {
    option: string;
    isSelected: boolean;
  }[];
  question: string;
}
