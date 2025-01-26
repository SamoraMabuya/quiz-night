import { useState, useEffect, useCallback } from "react";
import { QuizState, QuizAnswer } from "../types/quiz";
import { fetchQuizQuestions } from "../services/api/quiz";

const HTTP_TOO_MANY_REQUESTS = 429;
const MAX_RETRIES = 3;
const MAX_DELAY = 5000;

const quizStatus = {
  questions: [],
  currentQuestionIndex: 0,
  score: 0,
  showAnswer: false,
  isLoading: true,
  error: null,
};

export default function useQuiz() {
  const [state, setState] = useState<QuizState>(quizStatus);

  const calculateBackoffDelay = (attempt: number): number => {
    return Math.min(1000 * Math.pow(2, attempt), MAX_DELAY);
  };

  const fetchQuestions = useCallback(
    async (retryAttempt = 0): Promise<void> => {
      const delay = calculateBackoffDelay(retryAttempt);

      try {
        const response = await fetchQuizQuestions();
        setState({
          ...quizStatus,
          questions: response,
          isLoading: false,
        });
      } catch (error) {
        if (
          error instanceof Response &&
          error.status === HTTP_TOO_MANY_REQUESTS &&
          retryAttempt < MAX_RETRIES
        ) {
          await new Promise((resolve) => setTimeout(resolve, delay));
          return fetchQuestions(retryAttempt + 1);
        }

        if (retryAttempt < MAX_RETRIES) {
          setTimeout(() => fetchQuestions(retryAttempt + 1), delay);
        } else {
          setState((prev) => ({
            ...prev,
            error: "Failed to load quiz questions. Please try again.",
            isLoading: false,
          }));
        }
      }
    },
    []
  );

  const checkAnswer = (selectedAnswer: string): QuizAnswer => {
    const currentQuestion = state.questions[state.currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correct_answer;

    setState((prev) => ({
      ...prev,
      score: isCorrect ? prev.score + 1 : prev.score,
      showAnswer: true,
    }));

    return {
      isCorrect,
      correctAnswer: currentQuestion.correct_answer,
      selectedAnswer,
    };
  };

  const updateQuestionIndex = (direction: 1 | -1) => {
    setState((prev) => ({
      ...prev,
      currentQuestionIndex:
        direction === -1
          ? Math.max(0, prev.currentQuestionIndex - 1)
          : prev.currentQuestionIndex + 1,
      showAnswer: false,
    }));
  };

  const previousQuestion = () => updateQuestionIndex(-1);
  const nextQuestion = () => updateQuestionIndex(1);

  const resetQuiz = () => {
    setState({
      questions: [],
      currentQuestionIndex: 0,
      score: 0,
      showAnswer: false,
      isLoading: true,
      error: null,
    });
    fetchQuestions();
  };

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  return {
    state,
    checkAnswer,
    previousQuestion,
    nextQuestion,
    resetQuiz,
  };
}
