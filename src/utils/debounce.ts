/**
 * Creates a debounced version of a function.
 *
 * The debounced function delays calling `fn` until no calls
 * have occurred for `ms` milliseconds.
 *
 * Options:
 *   - `leading`: call immediately on the first trigger.
 *   - `trailing`: call once after the wait period (default depends on leading).
 *
 * Behavior:
 *   - If `leading: true` and `trailing` is not provided → trailing defaults to false.
 *   - If `leading: false` and `trailing` is not provided → trailing defaults to true.
 *
 * Supports both `leading` and `trailing` modes.
 *
 * @template T - A function type to debounce.
 *
 * @param {T} fn - The function to debounce.
 * @param {number} [ms=0] - The wait time in milliseconds.
 * @param {Object} [options={}] - Optional configuration.
 * @param {boolean} [options.leading=false] - Whether to call on the leading edge.
 * @param {boolean} [options.trailing] - Whether to call on the trailing edge.
 *
 * @returns {(...args: Parameters<T>) => void}
 * A debounced function that delays invoking `fn`.
 */


export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  ms: number = 0,
  options: {
    leading?: boolean;
    trailing?: boolean;
  } = {}
): (...args: Parameters<T>) => void {

  let timeout: NodeJS.Timeout | null = null;
  let lastArgs: Parameters<T> | null = null;
  let leadingCalled = false;

  const leading = options.leading ?? false;

  const trailing =
    options.trailing !== undefined ? options.trailing : !leading;

  return function (...args: Parameters<T>) {
    lastArgs = args;

    // Leading execution
    if (leading && !leadingCalled) {
      fn(...args);
      leadingCalled = true;
    }

    // Reset previous timer
    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(() => {
      if (trailing && lastArgs) {
        fn(...lastArgs);
      }

      // Allow next leading execution
      leadingCalled = false;

      timeout = null;
      lastArgs = null;
    }, ms);
    
  };
}
