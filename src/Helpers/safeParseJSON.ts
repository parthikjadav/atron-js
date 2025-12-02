/**
 * Safely parses a JSON string without throwing errors.
 *
 * A drop-in, fail-proof replacement for `JSON.parse()`.
 *
 * Behavior:
 *   - Returns `{ success: true, data }` on valid JSON.
 *   - Returns `{ success: false, error }` on malformed JSON.
 *   - Returns a typed error if the input is not a string.
 *
 * Useful when parsing unknown, external, or user-generated data.
 *
 * @template T - Expected JSON-parsed type.
 *
 * @param {string} jsonString - The string to parse as JSON.
 *
 * @returns {ParseResult<T>}
 * A result object containing parsed data or an error.
 */
export type ParseResult<T> =
  | { success: true; data: T }
  | { success: false; error: Error };

export function safeParseJSON<T = unknown>(jsonString: string): ParseResult<T> {
  // Validate input type
  if (typeof jsonString !== "string") {
    return {
      success: false,
      error: new TypeError("safeParseJSON expected a string input."),
    };
  }

  try {
    const parsed = JSON.parse(jsonString);
    return {
      success: true,
      data: parsed as T,
    };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err : new Error("Unknown JSON parse error"),
    };
  }
}
