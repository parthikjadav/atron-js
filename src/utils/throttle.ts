/**
 * Ensures a function runs at most once every `ms` milliseconds.
 *
 * Options:
 *  - leading: call immediately on the first trigger (default: true)
 *  - trailing: call once more at the end of the throttle window (default: true)
 *
 * Useful for scroll handlers, drag events, resize, and rate-limited actions.
 *
 * @template T - A function type to throttle.
 *
 * @param {T} fn - The function to throttle.
 * @param {number} [ms=0] - The throttle interval.
 * @param {Object} [options={}] - Optional configuration.
 * @param {boolean} [options.leading=true] - Whether to call on the leading edge.
 * @param {boolean} [options.trailing=true] - Whether to call on the trailing edge.
 *
 * @returns {(...args: Parameters<T>) => void}
 */

export function throttle<A extends unknown[], R>(
  fn: (...args: A) => R,
  ms: number = 0,
  options: {
    leading?: boolean;
    trailing?: boolean;
  } = {},
): (...args: A) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  let lastArgs: A | null = null;
  let lastCallTime = 0;

  const leading = options.leading ?? true;
  const trailing = options.trailing ?? true;

  return function (this: unknown, ...args: A) {
    const now = Date.now();

    if (!lastCallTime && !leading) {
      lastCallTime = now;
    }

    const remaining = ms - (now - lastCallTime);
    lastArgs = args;

    // Leading: call immediately
    if (remaining <= 0 || remaining > ms) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }

      lastCallTime = now;
      (fn as (...a: A) => R).apply(this, args);
      return;
    }

    // Trailing: schedule last call
    if (!timeout && trailing) {
      timeout = setTimeout(() => {
        lastCallTime = leading ? Date.now() : 0;
        timeout = null;

        if (lastArgs) {
          (fn as (...a: A) => R).apply(this, lastArgs);
          lastArgs = null;
        }
      }, remaining);
    }
  };
}
