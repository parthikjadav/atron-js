import test from "node:test";
import assert from "node:assert/strict";
import { box } from "../../src";

test("box wraps message in a box", () => {
  const originalLog = console.log;
  const calls: string[] = [];
  console.log = (arg: unknown) => {
    calls.push(String(arg));
  };

  try {
    box("Line 1\nLine 2");
  } finally {
    console.log = originalLog;
  }

  assert.equal(calls.length, 1);
  const output = calls[0];
  assert.ok(output.includes("+"));
  assert.ok(output.includes("| Line 1"));
  assert.ok(output.includes("| Line 2"));
});
