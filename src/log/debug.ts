/**
 * Log a dim debug message with a "🐞 Debug:" prefix.
 *
 * Debug messages are only printed when `NODE_ENV` is **not** set to
 * `"production"`. In production, this function is a no-op.
 *
 * Example
 * ```ts
 * import { debug } from "atron-js";
 *
 * debug("Got payload", JSON.stringify(payload));
 * // 🐞 Debug: Got payload ... (only when NODE_ENV !== "production")
 * ```
 *
 * @param message - The debug message to display.
 */
export function debug(message: string): void {
  if (process.env.NODE_ENV === "production") return;
  console.log(`🐞 Debug: ${message}`);
}
