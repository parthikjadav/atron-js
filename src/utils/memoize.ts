export interface MemoizeOptions {
  /**
   * Time-to-live in milliseconds.
   * If provided, cache entries older than this will be recomputed.
   */
  ttlMs?: number;
}

/**
 * Creates a memoized version of a function.
 * Caches the result based on the arguments provided.
 *
 * @param fn - The function to memoize.
 * @param options - Configuration options (e.g., TTL).
 * @returns A new function that caches results.
 */
export function memoize<T extends (...args: unknown[]) => unknown>(
  fn: T,
  options?: MemoizeOptions,
): (...args: Parameters<T>) => ReturnType<T> {
  // Cache stores the result and the timestamp of when it was created
  const cache = new Map<string, { value: ReturnType<T>; timestamp: number }>();

  return (...args: Parameters<T>): ReturnType<T> => {
    // Create a simple cache key based on arguments
    // Note: This treats undefined and null as the same in some edge cases (e.g. [undefined] vs [null])
    const key = JSON.stringify(args);
    const now = Date.now();
    const cached = cache.get(key);

    if (cached) {
      // If TTL is set, check if the entry has expired
      if (options?.ttlMs && now - cached.timestamp > options.ttlMs) {
        cache.delete(key);
      } else {
        return cached.value;
      }
    }

    const result = fn(...args) as ReturnType<T>;
    cache.set(key, { value: result, timestamp: now });
    return result;
  };
}
