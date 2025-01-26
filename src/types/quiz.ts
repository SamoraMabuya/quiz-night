export interface QuizQuestion {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface QuizState {
  questions: QuizQuestion[];
  currentQuestionIndex: number;
  score: number;
  showAnswer: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface QuizAnswer {
  isCorrect: boolean;
  correctAnswer: string;
  selectedAnswer: string;
}
