/**
 * Log an informational message with a blue "ℹ Info:" prefix.
 *
 * Example
 * ```ts
 * import { info } from "atron-js";
 *
 * info("Server started on port 3000");
 * // ℹ Info: Server started on port 3000
 * ```
 *
 * @param message - The informational message to display.
 */
export function info(message: string): void {
  console.log(`ℹ Info: ${message}`);
}
