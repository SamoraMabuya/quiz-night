import React, { useState, useEffect, useMemo } from "react";
import { QuizQuestion } from "../types/quiz";
import { Button } from "./ui/Button";
import { Feedback } from "./Feedback";

interface QuestionProps {
  question: QuizQuestion;
  showAnswer: boolean;
  score: number;
  totalQuestions: number;
  onAnswerSelected: (answer: string) => {
    isCorrect: boolean;
    correctAnswer: string;
    selectedAnswer: string;
  };
  onNextQuestion: () => void;
}

export const Question: React.FC<QuestionProps> = ({
  question,
  showAnswer,
  onAnswerSelected,
  onNextQuestion,
  score,
  totalQuestions,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answerResult, setAnswerResult] = useState<{
    isCorrect: boolean;
    correctAnswer: string;
    selectedAnswer: string;
  } | null>(null);

  useEffect(() => {
    setSelectedAnswer(null);
  }, [question]);

  const handleAnswerClick = (answer: string) => {
    if (showAnswer || selectedAnswer) return;

    setSelectedAnswer(answer);
    const result = onAnswerSelected(answer);
    setAnswerResult(result);
  };

  const allAnswers = useMemo(() => {
    const answers = [...question.incorrect_answers, question.correct_answer];
    return answers.sort(() => Math.random() - 0.5);
  }, [question]);

  const getAnswerClass = (answer: string) => {
    const baseClass =
      "w-full p-4 text-left border-2 rounded-lg transition-colors duration-200";

    switch (true) {
      // Not showing results & answer is selected
      case !showAnswer && selectedAnswer === answer:
        return `${baseClass} border-primary-500 bg-primary-50`;

      // Not showing results & answer not selected
      case !showAnswer:
        return `${baseClass} border-gray-200 hover:border-primary-500 hover:bg-primary-50`;

      // Showing results & is correct answer
      case answer === question.correct_answer:
        return `${baseClass} border-green-500 bg-green-50`;

      // All other answers when showing results
      default:
        return `${baseClass} border-gray-200 opacity-50`;
    }
  };
  return (
    <div>
      <h2
        className="text-xl font-semibold mb-4"
        dangerouslySetInnerHTML={{ __html: question.question }}
      />

      <div className="space-y-3">
        {allAnswers.map((answer, index) => (
          <Button
            key={index}
            onClick={() => handleAnswerClick(answer)}
            disabled={showAnswer}
            className={`w-full p-4 text-left ${getAnswerClass(answer)}`}
            dangerouslySetInnerHTML={{ __html: answer }}
          />
        ))}
      </div>

      {showAnswer && (
        <div className="mt-6 flex justify-between items-center">
          <Feedback
            isCorrect={answerResult?.isCorrect || false}
            score={score}
            totalQuestions={totalQuestions}
          />
          <Button onClick={onNextQuestion} className="btn-primary">
            Next Question
          </Button>
        </div>
      )}
    </div>
  );
};
