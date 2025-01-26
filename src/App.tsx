import { lazy, Suspense } from "react";
import Loading from "./components/ui/Loading";
import { ErrorBoundary } from "./components/ui/ErrorBoundary";
import ErrorFallback from "./components/ui/ErrorFallback";
const Quiz = lazy(() => import("./components/Quiz"));

function App() {
  return (
    <ErrorBoundary
      fallback={
        <ErrorFallback resetErrorBoundary={() => window.location.reload()} />
      }
    >
      <Suspense fallback={<Loading />}>
        <div className="min-h-screen flex items-center justify-center">
          <Quiz />
        </div>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
