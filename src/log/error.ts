/**
 * Log a red error message with a leading "✖" prefix.
 *
 * This helper is intended for user-facing error messages in CLIs or tooling.
 * It does not throw; it only logs to the console.
 *
 * Example
 * ```ts
 * import { error } from "atron-js";
 *
 * error("Failed to connect to server");
 * // ✖ Failed to connect to server
 * ```
 *
 * @param message - The error message to display.
 */
export function error(message: string): void {
  console.log(`✖ ${message}`);
}
