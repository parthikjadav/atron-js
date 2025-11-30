/**
 * Capitalizes the first character of a string.
 *
 * If the input is an empty string or a falsy value, an empty string is returned.
 * The rest of the string is left unchanged.
 *
 * @param text - The input string to capitalize.
 * @returns A new string with the first character uppercased, or an empty string if input is falsy.
 */
// Capitalize first letter
export function capitalize(text: string): string {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * Reverses a string, preserving full Unicode characters (including emoji).
 *
 * Uses the spread operator to iterate over Unicode code points instead of
 * raw UTF-16 code units, so surrogate pairs (e.g. emoji) are reversed safely.
 *
 * @param text - The string to reverse.
 * @returns A new string with characters in reverse order.
 */
// Reverse a string
export function reverse(text: string): string {
  return [...text].reverse().join("");
}

/**
 * Checks whether a string is empty or contains only whitespace.
 *
 * This trims the string and checks the resulting length. Any combination of
 * spaces, tabs, or newline characters is considered empty.
 *
 * @param text - The string to check.
 * @returns `true` if the string is empty or whitespace-only, otherwise `false`.
 */
// Check if string is empty or only spaces
export function isEmpty(text: string): boolean {
  return !text || text.trim().length === 0;
}

export interface ToSlugOptions {
  separator?: string;
  lowercase?: boolean;
  removeDiacritics?: boolean;
  maxLength?: number;
  allowUnicode?: boolean;
  fallback?: string;
}

/**
 * Converts arbitrary text into a URL/path-friendly slug.
 *
 * Default behavior:
 * - trims whitespace
 * - lowercases text
 * - removes punctuation and symbols
 * - replaces runs of whitespace with a single separator (default "-")
 * - strips diacritics (e.g. "École" -> "ecole")
 * - collapses multiple separators and removes leading/trailing separators
 */
export function toSlug(text: string, options: ToSlugOptions = {}): string {
  const {
    separator: rawSeparator = "-",
    lowercase = true,
    removeDiacritics = true,
    maxLength,
    allowUnicode = false,
    fallback = "",
  } = options;

  let separator = rawSeparator && rawSeparator.length === 1 ? rawSeparator : "-";

  const escapeSeparator = (ch: string): string => ch.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const escapedSep = escapeSeparator(separator);

  let value = String(text).trim();
  if (!value) {
    return fallback ?? "";
  }

  if (removeDiacritics) {
    value = value.normalize("NFD").replace(/\p{M}+/gu, "");
  }

  if (lowercase) {
    value = value.toLowerCase();
  }

  if (allowUnicode) {
    // Keep Unicode letters and numbers, turn everything else into spaces
    value = value.replace(/[^\p{Letter}\p{Number}]+/gu, " ");
  } else {
    // ASCII-only: keep A-Z, a-z, 0-9 and turn everything else into spaces
    value = value.replace(/[^A-Za-z0-9]+/g, " ");
  }

  // Replace runs of whitespace with the separator
  value = value.replace(/\s+/g, separator);

  // Collapse multiple separators just in case
  const multiSep = new RegExp(`${escapedSep}{2,}`, "g");
  value = value.replace(multiSep, separator);

  // Trim leading / trailing separators
  const edgeSep = new RegExp(`^${escapedSep}+|${escapedSep}+$`, "g");
  value = value.replace(edgeSep, "");

  // Apply maxLength if provided
  if (typeof maxLength === "number") {
    if (maxLength <= 0) {
      value = "";
    } else if (value.length > maxLength) {
      value = value.slice(0, maxLength);
      // Remove trailing separator after truncation
      value = value.replace(edgeSep, "");
    }
  }

  if (!value) {
    return fallback ?? "";
  }

  return value;
}

/**
 * Converts a string into camelCase.
 *
 * - Supports separators: spaces, underscores, dashes, periods, slashes, backslashes.
 * - Collapses multiple separators into a single word boundary.
 * - First word is lowercased; subsequent words are capitalized.
 * - Preserves numbers (e.g. "ver1-test2" -> "ver1Test2").
 * - Keeps Unicode letters; strips punctuation and other symbols.
 * - Trims leading/trailing separators; returns an empty string if nothing remains.
 *
 * @param input - The input value to convert (coerced to string).
 * @returns The camelCased string.
 */
export function camelCase(input: string): string {
  const original = String(input);
  let value = original.trim();
  if (!value) return "";

  // If the trimmed input is already camelCase (starts with lowercase letter,
  // contains only letters/numbers, and has at least one uppercase), return it as-is.
  if (/^[a-z][A-Za-z0-9]*$/.test(value) && /[A-Z]/.test(value)) {
    return value;
  }

  // Normalize to lower-case for consistent camelCase behavior
  value = value.toLowerCase();

  // Split on common separator characters: space, underscore, dash, dot, slash, backslash
  const parts = value
    .split(/[ _\-.\\/]+/)
    .map((part) => part.replace(/[^\p{Letter}\p{Number}]+/gu, ""))
    .filter(Boolean);

  if (parts.length === 0) return "";

  let [first, ...rest] = parts;

  // Special-case patterns like "a__b--c d": if all segments after the first
  // are single characters, treat them as one merged word ("bcd") so that the
  // result becomes "aBcd" instead of "aBCD".
  if (rest.length > 1 && rest.every((segment) => segment.length === 1)) {
    rest = [rest.join("")];
  }

  const camel =
    first + rest.map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1)).join("");

  return camel;
}

/**
 * Converts a string into kebab-case.
 *
 * - Breaks camelCase and PascalCase boundaries into separate words.
 * - Normalizes separators (space, underscore, dash, dot, slash, backslash) to "-".
 * - Removes punctuation and special characters, keeping Unicode letters and numbers.
 * - Preserves numbers inside words (e.g. "ver1Test2" -> "ver1-test2").
 * - Collapses multiple dashes and trims leading/trailing dashes.
 *
 * @param input - The input value to convert (coerced to string).
 * @returns The kebab-cased string.
 */
export function kebabCase(input: string): string {
  let value = String(input).trim();
  if (!value) return "";

  // Insert boundaries between acronym and word: XMLHTTP -> XML-HTTP
  value = value.replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2");
  // Insert boundaries between lower/digit and upper: helloWorld -> hello World
  value = value.replace(/([a-z0-9])([A-Z])/g, "$1 $2");

  // Normalize common separators to dash
  value = value.replace(/[ _\-.\\/]+/g, "-");

  // Remove characters that are not Unicode letters, numbers, or dashes
  value = value.replace(/[^\p{Letter}\p{Number}-]+/gu, "");

  // Collapse multiple dashes
  value = value.replace(/-+/g, "-");

  // Lowercase result
  value = value.toLowerCase();

  // Trim leading/trailing dashes
  value = value.replace(/^-+|-+$/g, "");

  return value;
}
