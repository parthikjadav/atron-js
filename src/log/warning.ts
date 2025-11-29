/**
 * Log a yellow warning message with a "⚠ Warning:" prefix.
 *
 * Example
 * ```ts
 * import { warning } from "atron-js";
 *
 * warning("Configuration file not found, using defaults");
 * // ⚠ Warning: Configuration file not found, using defaults
 * ```
 *
 * @param message - The warning message to display.
 */
export function warning(message: string): void {
  console.log(`⚠ Warning: ${message}`);
}
