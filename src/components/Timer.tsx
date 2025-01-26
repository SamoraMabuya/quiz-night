import { useState, useEffect } from "react";
import { Timer as TimerIcon } from "lucide-react";

interface TimerProps {
  duration?: number;
  onTimeout: () => void;
}

export default function Timer({ duration = 30, onTimeout }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeout();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeout]);

  const percentage = (timeLeft / duration) * 100;
  const isLowTime = percentage < 30;

  return (
    <div className="flex items-center gap-3">
      <TimerIcon
        className={`w-4 h-4 ${isLowTime ? "text-red-500" : "text-primary-500"}`}
      />
      <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full transition-all duration-1000 ease-linear"
          style={{
            width: `${percentage}%`,
            backgroundColor: isLowTime ? "#EF4444" : "#3B82F6",
          }}
        />
      </div>
      <span
        className={`text-sm font-medium ${
          isLowTime ? "text-red-500" : "text-gray-600"
        }`}
      >
        {timeLeft}s
      </span>
    </div>
  );
}
