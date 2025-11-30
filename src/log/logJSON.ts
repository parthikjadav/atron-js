/**
 * Pretty-print a JavaScript value as colored JSON.
 *
 * - Object keys are quoted.
 * - String values are JSON-encoded.
 * - Numeric and boolean values are printed as-is.
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
    const items = value.map((item) => `${pad}  ${formatJSON(item, indent + 1)}`);
    return [`[`, ...items, `${pad}]`].join("\n");
  }

  if (value && typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>);
    if (entries.length === 0) return "{}";

    const lines = entries.map(([key, val], index) => {
      const formattedKey = JSON.stringify(key);
      const formattedVal = formatJSON(val, indent + 1);
      const comma = index < entries.length - 1 ? "," : "";
      return `${pad}  ${formattedKey}: ${formattedVal}${comma}`;
    });

    return [`{`, ...lines, `${pad}}`].join("\n");
  }

  switch (typeof value) {
    case "string":
      return JSON.stringify(value);
    case "number":
    case "bigint":
      return String(value);
    case "boolean":
      return String(value);
    case "undefined":
      return "null";
    default:
      return String(value);
  }
}
