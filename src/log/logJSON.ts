import chalk from "chalk";

/**
 * Pretty-print a JavaScript value as colored JSON.
 *
 * - Object keys are yellow.
 * - String values are green.
 * - Numeric and boolean values are cyan.
 * - Indentation is two spaces per level.
 *
 * Example
 * ```ts
 * import { logJSON } from "atron-js";
 *
 * logJSON({ id: 1, name: "Atron", active: true });
 * ```
 *
 * @param obj - The value to log as colored JSON.
 */
export function logJSON(obj: unknown): void {
  console.log(formatJSON(obj, 0));
}

function formatJSON(value: unknown, indent: number): string {
  const pad = "  ".repeat(indent);

  if (Array.isArray(value)) {
    if (value.length === 0) return "[]";
    const items = value.map(item => `${pad}  ${formatJSON(item, indent + 1)}`);
    return [`[`, ...items, `${pad}]`].join("\n");
  }

  if (value && typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>);
    if (entries.length === 0) return "{}";

    const lines = entries.map(([key, val], index) => {
      const formattedKey = chalk.yellow(JSON.stringify(key));
      const formattedVal = formatJSON(val, indent + 1);
      const comma = index < entries.length - 1 ? "," : "";
      return `${pad}  ${formattedKey}: ${formattedVal}${comma}`;
    });

    return [`{`, ...lines, `${pad}}`].join("\n");
  }

  switch (typeof value) {
    case "string":
      return chalk.green(JSON.stringify(value));
    case "number":
    case "bigint":
      return chalk.cyan(String(value));
    case "boolean":
      return chalk.cyan(String(value));
    case "undefined":
      return chalk.cyan("null");
    default:
      return chalk.cyan(String(value));
  }
}
