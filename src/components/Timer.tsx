import { useState, useEffect } from "react";
import { Timer as TimerIcon } from "lucide-react";

interface TimerProps {
  duration?: number;
  onTimeout: () => void;
}

export default function Timer({ onTimeout, duration = 30 }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    // Reset timer when question changes
    setTimeLeft(duration);

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          // move to next question when timer runs out
          onTimeout();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [duration, onTimeout]);

  return (
    <div className="flex items-center gap-2 text-sm text-gray-300">
      <TimerIcon className="w-4 h-4" />
      <span>{timeLeft}s</span>
    </div>
  );
}
