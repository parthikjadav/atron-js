/**
 * Delays execution for a given number of milliseconds.
 *
 * This is a small wrapper around `setTimeout` that returns a `Promise`,
 * making it convenient to use with `async`/`await`.
 *
 * @param ms - The number of milliseconds to wait.
 * @returns A promise that resolves after the delay.
 */
// Delay / sleep function
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Formats a `Date` instance to a simple 24-hour `"HH:MM"` string.
 *
 * The formatting is based on the environment's local time zone.
 *
 * @param date - The date to format.
 * @returns A string in `"HH:MM"` format.
 */
// Format time: 14:05 => "14:05"
export function formatTime(date: Date): string {
  return date.toTimeString().slice(0, 5);
}
