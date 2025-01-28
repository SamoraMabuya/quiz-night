// Cache duration in milliseconds (5 minutes)
const CACHE_DURATION = 5 * 60 * 1000;

// Store API responses in memory with their timestamps using URL as key
const cache = new Map<string, { data: any; timestamp: number }>();

export async function cachedFetch(url: string) {
  // Check if we have a cached version of this URL
  const cached = cache.get(url);

  // If cache exists and hasn't expired, return cached data
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  // If no cache or expired, fetch new data
  const response = await fetch(url);
  const data = await response.json();

  // Store the new data in cache with current timestamp
  cache.set(url, { data, timestamp: Date.now() });
  return data;
}
