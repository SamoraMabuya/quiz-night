import { useState, useEffect, useMemo } from "react";
import { QuizQuestion } from "../types/quiz";
import Feedback from "./Feedback";
import Button from "./ui/Button";

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

export default function Question({
  question,
  showAnswer,
  onAnswerSelected,
  onNextQuestion,
  score,
  totalQuestions,
}: QuestionProps) {
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
    switch (true) {
      case !showAnswer && selectedAnswer === answer:
        return "answer-base answer-selected";

      case !showAnswer:
        return "answer-base answer-default";

      case answer === question.correct_answer:
        return "answer-base answer-correct";

      default:
        return "answer-base answer-inactive";
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
}
