import { ChevronLeft, SkipForward } from "lucide-react";
import Button from "./ui/Button";
import Timer from "./Timer";

interface QuizNavigationProps {
  currentIndex: number;
  totalQuestions: number;
  onPrevious: () => void;
  onNext: () => void;
}

export default function QuizNavigation({
  currentIndex,
  totalQuestions,
  onPrevious,
  onNext,
}: QuizNavigationProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <div className="flex items-center gap-4">
        <div className="text-sm text-gray-300">
          Question {currentIndex + 1} of {totalQuestions}
        </div>
        <Timer onTimeout={onNext} />
      </div>
      <div className="flex gap-2">
        <Button
          onClick={onPrevious}
          disabled={currentIndex === 0}
          className="btn-primary flex items-center disabled:opacity-30 
            disabled:cursor-not-allowed"
          label="Previous Button"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>
        <Button onClick={onNext} className="btn-primary flex items-center">
          Skip
          <SkipForward className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
