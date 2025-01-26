const QUIZ_ENDPOINT = "https://opentdb.com/api.php?amount=10";

export async function fetchQuizQuestions() {
  const response = await fetch(QUIZ_ENDPOINT);

  if (!response.ok) {
    throw new Error(`HTTP status: ${response.status}`);
  }

  const data = await response.json();
  if (data.results.length === 0) {
    throw new Error("No questions available");
  }

  return data.results;
}
