interface FeedbackProps {
  isCorrect: boolean;
  score: number;
  totalQuestions: number;
}

export default function Feedback({
  isCorrect,
  score,
  totalQuestions,
}: FeedbackProps) {
  const percentage = (score / totalQuestions) * 100;

  const getFeedback = () => {
    switch (true) {
      case isCorrect && percentage > 80:
        return "Excellent! Keep it up!";
      case isCorrect && percentage > 60:
        return "Well done! You're getting better!";
      case isCorrect:
        return "That's right! You're making progress.";
      case percentage > 60:
        return "Not quite, but you're still doing great!";
      case percentage > 40:
        return "Wrong, but don't give up!";
      default:
        return "Keep trying, you'll get it!";
    }
  };

  return (
    <span
      className={`text-lg font-medium ${
        isCorrect ? "text-green-600" : "text-red-600"
      }`}
    >
      {getFeedback()}
    </span>
  );
}
