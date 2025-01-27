import useQuiz from "../hooks/useQuiz";
import Question from "../components/Question";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import QuizNavigation from "../components/QuizNavigation";
import Score from "../components/Score";
import Loading from "../components/ui/Loading";

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
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
        <Score score={score} total={questions.length} />
        <Button onClick={resetQuiz} className="mt-4">
          Play Again
        </Button>
      </div>
    );
  }

  return (
    <Card className="w-full max-w-2xl">
      <QuizNavigation
        currentIndex={currentQuestionIndex}
        totalQuestions={questions.length}
        onPrevious={previousQuestion}
        onNext={nextQuestion}
      />
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
