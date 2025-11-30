/**
 * Returns a new array with duplicate values removed.
 *
 * Uses Set to efficiently remove duplicates while preserving order.
 *
 * @param arr - The input array to remove duplicates from.
 * @returns A new array with unique values only.
 */
export function unique<T>(arr: T[]): T[] {
  return [...new Set(arr)];
}

/**
 * Splits an array into smaller fixed-size groups.
 *
 * The last chunk may contain fewer elements if the array length
 * is not evenly divisible by the chunk size.
 *
 * @param arr - The array to split into chunks.
 * @param size - The size of each chunk.
 * @returns An array of arrays, each containing at most `size` elements.
 */
export function chunk<T>(arr: T[], size: number): T[][] {
  if (size <= 0) return [];
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

/**
 * Randomizes the order of elements in the array.
 *
 * Uses the Fisher-Yates shuffle algorithm to ensure uniform distribution.
 * Returns a new array without modifying the original.
 *
 * @param arr - The array to shuffle.
 * @returns A new array with elements in random order.
 */
export function shuffle<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Flattens nested arrays of any depth into a single-level array.
 *
 * Recursively flattens all nested arrays regardless of nesting depth.
 *
 * @param arr - The array to flatten.
 * @returns A new flattened array.
 */
export function flatten<T>(arr: unknown[]): T[] {
  const result: T[] = [];
  for (const val of arr) {
    if (Array.isArray(val)) {
      result.push(...flatten<T>(val as unknown[]));
    } else {
      result.push(val as T);
    }
  }
  return result;
}
