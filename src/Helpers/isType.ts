/**
 * A utility helper for validating unknown data using custom type guards.
 *
 * This function delegates validation to a caller-provided type guard,
 * enabling safe narrowing of `unknown` or `any` values into strongly
 * typed structures.
 *
 * Ideal for:
 *   - API response validation
 *   - Runtime safety checks
 *   - Form input parsing
 *   - Narrowing complex or nested types
 *
 * Behavior:
 *   - Returns `true` when the custom type guard confirms the value matches type `T`.
 *   - Returns `false` otherwise.
 *   - Provides full TypeScript narrowing when the guard succeeds.
 *
 * @template T - The type being validated.
 *
 * @param {unknown} value - The value to validate at runtime.
 * @param {TypeGuard<T>} typeGuard - A function that asserts whether the value is of type `T`.
 *
 * @returns {value is T}
 * True if the value conforms to type `T`, otherwise false.
 */
export type TypeGuard<T> = (value: unknown) => value is T;

export function isType<T>(
  value: unknown,
  typeGuard: TypeGuard<T>
): value is T {
  try {
    return typeGuard(value);
  } catch {
    return false;
  }
}
