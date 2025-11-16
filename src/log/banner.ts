import chalk from "chalk";

/**
 * Print a simple ASCII banner for highlighting important messages.
 *
 * This does not rely on external banner libraries; it just draws a
 * decorative frame around the text.
 *
 * Example
 * ```ts
 * import { banner } from "atron-js";
 *
 * banner("ATRON JS");
 * ```
 *
 * @param text - The banner text to display.
 */
export function banner(text: string): void {
  const padded = `  ${text.toUpperCase()}  `;
  const border = "=".repeat(padded.length);
  const output = [border, padded, border].join("\n");
  console.log(chalk.greenBright(output));
}
