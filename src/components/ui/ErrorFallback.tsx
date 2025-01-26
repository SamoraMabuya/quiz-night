interface ErrorFallbackProps {
  resetErrorBoundary: () => void;
}

export default function ErrorFallback({
  resetErrorBoundary,
}: ErrorFallbackProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <p className="text-red-500 mb-4">Something went wrong</p>
      <button onClick={resetErrorBoundary}>Try Again</button>
    </div>
  );
}
