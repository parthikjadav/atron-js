import test from "node:test";
import assert from "node:assert/strict";
import { title } from "../../src";

test("title logs a highlighted section header", () => {
  const originalLog = console.log;
  const calls: string[] = [];
  console.log = (arg: unknown) => {
    calls.push(String(arg));
  };

  try {
    title("Build Summary");
  } finally {
    console.log = originalLog;
  }

  assert.equal(calls.length, 1);
  const output = calls[0];
  assert.ok(output.includes("Build Summary"));
});
