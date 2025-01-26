import useQuiz from "../hooks/useQuiz";
import { Question } from "./Question";
import { Timer } from "./Timer";
import { Score } from "./Score";
import { Button } from "./ui/Button";
import { Card } from "./ui/Card";
import QuizNavigation from "./QuizNavigation";

const Quiz = () => {
  const { state, checkAnswer, nextQuestion, resetQuiz, previousQuestion } =
    useQuiz();
  const { questions, currentQuestionIndex, score, showAnswer } = state;

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
};

export default Quiz;
