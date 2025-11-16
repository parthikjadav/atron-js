import test from "node:test";
import assert from "node:assert/strict";
import { success } from "../../src/log/success";

test("success logs a green checkmark message", () => {
  const originalLog = console.log;
  const calls: string[] = [];
  console.log = (arg: unknown) => {
    calls.push(String(arg));
  };

  try {
    success("Operation completed");
  } finally {
    console.log = originalLog;
  }

  assert.equal(calls.length, 1);
  const output = calls[0];
  assert.ok(output.includes("✔"));
  assert.ok(output.includes("Operation completed"));
});
