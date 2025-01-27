import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Loading from "./components/ui/Loading";
import { ErrorBoundary } from "./components/ui/ErrorBoundary";
import ErrorFallback from "./components/ui/ErrorFallback";
import Drawer from "./components/ui/Drawer";

const Quiz = lazy(() => import("./pages/Quiz"));
const Movies = lazy(() => import("./pages/Movies"));

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary
        fallback={
          <ErrorFallback resetErrorBoundary={() => window.location.reload()} />
        }
      >
        <div className="flex min-h-screen bg-gray-100">
          <Drawer />
          <main className="flex-1 ml-0 lg:ml-64 min-h-screen">
            <Suspense fallback={<Loading />}>
              <div className="p-6 flex items-center justify-center min-h-screen">
                <Routes>
                  <Route path="/quiz" element={<Quiz />} />
                  <Route path="/movies" element={<Movies />} />
                  <Route path="/" element={<Navigate to="/quiz" replace />} />
                </Routes>
              </div>
            </Suspense>
          </main>
        </div>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
