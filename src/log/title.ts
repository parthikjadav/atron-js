import chalk from "chalk";

/**
 * Print a section title using bold, underlined cyan text.
 *
 * Useful for visually separating sections in CLI output.
 *
 * Example
 * ```ts
 * import { title } from "atron-js";
 *
 * title("Build Summary");
 * ```
 *
 * @param message - The title text to display.
 */
export function title(message: string): void {
  console.log(chalk.cyan.bold.underline(message));
}
