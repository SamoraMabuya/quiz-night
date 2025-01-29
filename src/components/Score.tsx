interface ScoreProps {
  score: number;
  total: number;
}

export default function Score({ score, total }: ScoreProps) {
  // Guard against division by zero
  const percentage = total === 0 ? 0 : Math.round((score / total) * 100);

  function getScoreColor() {
    if (percentage >= 80) return "text-emerald-400";
    if (percentage >= 60) return "text-amber-400";
    return "text-gray-400";
  }

  return (
    <div className="flex flex-col items-center">
      <div className={`text-4xl font-bold ${getScoreColor()}`}>
        {score} / {total}
      </div>
      <div className="text-gray-400 mt-2">{percentage}% Correct</div>
    </div>
  );
}
