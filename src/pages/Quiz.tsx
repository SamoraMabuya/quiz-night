import useQuiz from "../hooks/useQuiz";
import Question from "../components/Question";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Loading from "../components/ui/Loading";
import { lazy, Suspense } from "react";
const Score = lazy(() => import("../components/Score"));
const QuizNavigation = lazy(() => import("../components/QuizNavigation"));

export default function Quiz() {
  const { state, checkAnswer, nextQuestion, resetQuiz, previousQuestion } =
    useQuiz();
  const { questions, currentQuestionIndex, score, showAnswer, isLoading } =
    state;

  if (isLoading || !questions.length) {
    return <Loading />;
  }

  if (currentQuestionIndex >= questions.length) {
    return (
      <Suspense fallback={<Loading />}>
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
          <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
          <Score score={score} total={questions.length} />
          <Button
            onClick={resetQuiz}
            className="mt-4"
            aria-label="Start a new quiz"
          >
            Play Again
          </Button>
        </div>
      </Suspense>
    );
  }

  return (
    <Card className="w-full max-w-2xl">
      <Suspense
        fallback={
          <div className="w-full h-12 bg-gray-100 animate-pulse rounded" />
        }
      >
        <QuizNavigation
          currentIndex={currentQuestionIndex}
          totalQuestions={questions.length}
          onPrevious={previousQuestion}
          onNext={nextQuestion}
        />
      </Suspense>

      <Question
        question={questions[currentQuestionIndex]}
        showAnswer={showAnswer}
        score={score}
        totalQuestions={questions.length}
        onAnswerSelected={checkAnswer}
        onNextQuestion={nextQuestion}
      />
    </Card>
  );
}
