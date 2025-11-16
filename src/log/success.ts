import chalk from "chalk";

/**
 * Log a green success message with a leading checkmark.
 *
 * This helper is intended for pretty console output during development
 * or CLI tooling.
 *
 * Example
 * ```ts
 * import { success } from "atron-js/src/log/success";
 *
 * success("User created successfully");
 * // ✔ User created successfully (in green)
 * ```
 *
 * @param message - The success message to display after the checkmark.
 */
export function success(message: string): void {
  console.log(chalk.green(`✔ ${message}`));
}
