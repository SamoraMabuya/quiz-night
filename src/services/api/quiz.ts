import { cachedFetch } from "./cacheFetch";

const QUIZ_ENDPOINT = "https://opentdb.com/api.php?amount=10";

export async function fetchQuizQuestions() {
  const data = await cachedFetch(QUIZ_ENDPOINT);
  if (data.results.length === 0) {
    throw new Error("No questions available");
  }
  return data.results;
}
