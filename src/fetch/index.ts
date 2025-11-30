// Fetch and async helpers
import type { GetJSONOptions, PostJSONOptions } from "../types/fetch";

/**
 * Custom error class to provide detailed API failure information.
 */
export class HttpError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    public url: string,
    public data?: unknown,
  ) {
    super(`Request to ${url} failed with status ${status}: ${statusText}`);
    this.name = "HttpError";
  }
}

/**
 * Fetches a URL and parses the response as JSON.
 *
 * Robustness Improvements:
 * - Uses AbortController to physically cancel requests on timeout (saves bandwidth).
 * - "Fail fast" on network errors.
 * - Captures server error bodies (e.g., validation messages) in HttpError.
 * - Automatically sets 'Accept: application/json'.
 *
 * @typeParam T - The expected JSON shape of the response.
 * @param url - The URL to fetch.
 * @param options - Fetch options plus an optional `timeoutMs`.
 * @returns A promise that resolves with the parsed JSON response.
 */
export async function getJSON<T = unknown>(url: string, options: GetJSONOptions = {}): Promise<T> {
  const { timeoutMs = 10_000, headers, ...fetchOptions } = options;

  // 1. Setup AbortController for true cancellation
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);

  // Merge user signals if they passed one
  if (options.signal) {
    options.signal.addEventListener("abort", () => controller.abort());
  }

  try {
    // 2. Add 'Accept' header to be a "good citizen"
    const reqHeaders = new Headers(headers);
    if (!reqHeaders.has("Accept")) {
      reqHeaders.set("Accept", "application/json");
    }

    const response = await fetch(url, {
      ...fetchOptions,
      headers: reqHeaders,
      signal: controller.signal,
    });

    // 3. Robust Error Handling (Status Check)
    if (!response.ok) {
      // Try to parse the error body to give the developer context
      let errorData: unknown;
      try {
        errorData = await response.json();
      } catch {
        // If not JSON, try text, otherwise ignore
        try {
          errorData = await response.text();
        } catch {
          /* ignore */
        }
      }

      throw new HttpError(response.status, response.statusText, url, errorData);
    }

    // 4. Content-Type Validation (Fast check)
    // We check partial match because headers can be "application/json; charset=utf-8"
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error(`Expected JSON from ${url}, received ${contentType || "unknown"}`);
    }

    // 5. Parse JSON
    return (await response.json()) as T;
  } catch (error) {
    // Check if this was a timeout abort
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new Error(`Request to ${url} timed out after ${timeoutMs}ms`);
    }
    throw error;
  } finally {
    // 6. Cleanup: Always clear the timer to prevent open handles/memory leaks
    clearTimeout(id);
  }
}

/**
 * Sends a JSON `POST` request and parses the JSON response.
 *
 * This function is optimized to reuse the robust error handling and timeout
 * logic from {@link getJSON}.
 *
 * @typeParam TBody - The shape of the request body.
 * @typeParam TResponse - The expected JSON response shape.
 * @param url - The URL to send the request to.
 * @param body - The JSON-serializable request payload.
 * @param options - Additional fetch options and optional `timeoutMs`.
 * @returns A promise that resolves with the parsed JSON response.
 */
export async function postJSON<TBody = unknown, TResponse = unknown>(
  url: string,
  body: TBody,
  options: PostJSONOptions = {},
): Promise<TResponse> {
  const { headers, ...rest } = options;

  // Use Headers API to robustly merge user headers with defaults.
  // This handles cases where headers are passed as an object, array, or Headers instance.
  const reqHeaders = new Headers(headers);

  // Default to application/json, but allow user to override (e.g. for vendor specific types)
  if (!reqHeaders.has("Content-Type")) {
    reqHeaders.set("Content-Type", "application/json");
  }

  return getJSON<TResponse>(url, {
    ...rest,
    method: "POST",
    headers: reqHeaders,
    body: JSON.stringify(body),
  });
}
/**
 * src/utils/async.ts
 */

/**
 * Retries an asynchronous operation a fixed number of times.
 *
 * @typeParam T - The resolved type of the retried function.
 * @param fn - A function returning a promise to be retried.
 * @param attempts - Maximum number of attempts (must be > 0).
 * @param delayMs - Optional delay in milliseconds between attempts.
 * @returns The result of the first successful attempt.
 * @throws If all attempts fail, rethrows the last encountered error.
 */
export async function retry<T>(fn: () => Promise<T>, attempts: number, delayMs = 0): Promise<T> {
  if (attempts < 1) {
    throw new Error(`Attempts must be at least 1, got ${attempts}`);
  }

  let lastError: unknown;

  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      // Don't delay if it was the last attempt
      if (attempt < attempts && delayMs > 0) {
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      }
    }
  }

  throw lastError;
}

/**
 * Wraps a promise and enforces a timeout.
 *
 * Features:
 * - Clears the timer immediately upon resolution/rejection to free resources.
 * - prevents the process from hanging due to active timeout handles.
 *
 * @typeParam T - The resolved type of the wrapped promise.
 * @param promise - The promise to wrap.
 * @param ms - Timeout duration in milliseconds.
 * @param message - Optional custom error message.
 * @returns A promise that resolves or rejects with the underlying promise.
 */
export function timeout<T>(
  promise: Promise<T>,
  ms: number,
  message = `Operation timed out after ${ms}ms`,
): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    // Create the timer
    const timer = setTimeout(() => {
      reject(new Error(message));
    }, ms);

    // Attach handlers to the original promise
    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (error) => {
        clearTimeout(timer);
        reject(error);
      },
    );
  });
}

/**
 * Sleeps for a given number of milliseconds.
 *
 * @param ms - The number of milliseconds to wait.
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Runs an array of asynchronous tasks sequentially.
 *
 * @typeParam T - The result type of each task.
 * @param tasks - An array of functions that each return a promise.
 * @returns A promise resolving to an array of results in order.
 */
export async function sequence<T>(tasks: Array<() => Promise<T>>): Promise<T[]> {
  const results = new Array<T>(tasks.length);

  for (let i = 0; i < tasks.length; i++) {
    results[i] = await tasks[i]();
  }

  return results;
}

/**
 * Runs asynchronous tasks in parallel with an optional concurrency limit.
 *
 * Optimizations:
 * - Uses native `Promise.all` if `limit` >= `tasks.length` for max speed.
 * - Pre-allocates result array to avoid resizing.
 * - Implements a "worker" pattern for concurrency limiting.
 *
 * @typeParam T - The result type of each task.
 * @param tasks - An array of functions that each return a promise.
 * @param limit - Maximum number of concurrent tasks (must be > 0).
 * @returns A promise resolving to an array of results in the original order.
 */
export function parallel<T>(tasks: Array<() => Promise<T>>, limit = Infinity): Promise<T[]> {
  if (limit <= 0) {
    throw new Error(`Limit must be greater than 0, got ${limit}`);
  }

  // Fast path: No tasks
  if (tasks.length === 0) {
    return Promise.resolve([]);
  }

  // Fast path: Unbounded concurrency (or limit exceeds task count)
  // Native Promise.all is highly optimized in V8
  if (limit >= tasks.length) {
    return Promise.all(tasks.map((fn) => fn()));
  }

  return new Promise<T[]>((resolve, reject) => {
    const results = new Array<T>(tasks.length);
    let nextIndex = 0;
    let completedCount = 0;
    let hasRejected = false;

    // The "worker" that picks up the next task
    const next = () => {
      if (hasRejected) return;

      // Check if all tasks are done
      if (completedCount === tasks.length) {
        resolve(results);
        return;
      }

      // Check if there are tasks left to schedule
      if (nextIndex < tasks.length) {
        const index = nextIndex++;
        const task = tasks[index];

        task().then(
          (value) => {
            results[index] = value;
            completedCount++;
            next(); // Recursively pick up the next task
          },
          (error) => {
            if (!hasRejected) {
              hasRejected = true;
              reject(error);
            }
          },
        );
      }
    };

    // Kick off the initial batch of workers
    for (let i = 0; i < limit && i < tasks.length; i++) {
      next();
    }
  });
}

/**
 * Splits an array into evenly sized batches.
 *
 * @typeParam T - The type of items in the input array.
 * @param items - The array of items to split.
 * @param size - The maximum size of each batch (must be > 0).
 * @returns An array of batches (sub-arrays) of the original items.
 */
export function batch<T>(items: T[], size: number): T[][] {
  if (size <= 0) {
    throw new Error(`Batch size must be greater than 0, got ${size}`);
  }

  const length = items.length;

  if (length === 0) {
    return [];
  }

  // Fast path: Single batch
  if (size >= length) {
    return [items.slice()]; // Return a shallow copy to stay consistent
  }

  // Pre-allocate the array for performance
  const chunksCount = Math.ceil(length / size);
  const result = new Array<T[]>(chunksCount);

  for (let i = 0, j = 0; i < length; i += size, j++) {
    result[j] = items.slice(i, i + size);
  }

  return result;
}
