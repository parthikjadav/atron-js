/**
 * Log a message with a leading timestamp in `[HH:MM:SS]` format.
 *
 * The timestamp is printed using `chalk.dim` and the message is printed
 * in white.
 *
 * Example
 * ```ts
 * import { timestamp } from "atron-js";
 *
 * timestamp("Job finished");
 * // [12:34:56] Job finished
 * ```
 *
 * @param message - The message to log after the timestamp.
 */
export function timestamp(message: string): void {
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  const ss = String(now.getSeconds()).padStart(2, "0");
  const time = `${hh}:${mm}:${ss}`;

  console.log(`[${time}] ${message}`);
}
