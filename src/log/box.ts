/**
 * Print a message inside an ASCII box, colored with `chalk.magentaBright`.
 *
 * The box will expand to fit the longest line in the message.
 *
 * Example
 * ```ts
 * import { box } from "atron-js";
 *
 * box("Deployment complete\nAll services are healthy");
 * ```
 *
 * @param message - The message to wrap in a box (may contain newlines).
 */
export function box(message: string): void {
  const lines = message.split("\n");
  const width = lines.reduce((max, line) => Math.max(max, line.length), 0);
  const horizontal = "-".repeat(width + 2);
  const top = "+" + horizontal + "+";
  const bottom = "+" + horizontal + "+";
  const content = lines.map(line => `| ${line.padEnd(width, " ")} |`);

  const output = [top, ...content, bottom].join("\n");
  console.log(output);
}
