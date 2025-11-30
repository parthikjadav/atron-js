import test from "node:test";
import assert from "node:assert/strict";
import { warning } from "../../src";

test("warning logs a yellow warning prefix", () => {
  const originalLog = console.log;
  const calls: string[] = [];
  console.log = (arg: unknown) => {
    calls.push(String(arg));
  };

  try {
    warning("Low disk space");
  } finally {
    console.log = originalLog;
  }

  assert.equal(calls.length, 1);
  const output = calls[0];
  assert.ok(output.includes("⚠ Warning:"));
  assert.ok(output.includes("Low disk space"));
});
