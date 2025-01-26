import { FC } from "react";

interface ScoreProps {
  score: number;
  total: number;
}

export const Score: FC<ScoreProps> = ({ score, total }) => {
  const percentage = Math.round((score / total) * 100);

  const getScoreColor = () => {
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="flex flex-col items-center">
      <div className={`text-2xl font-bold ${getScoreColor()}`}>
        {score} / {total}
      </div>
      <div className="text-gray-600 text-sm">{percentage}% Correct</div>
    </div>
  );
};
