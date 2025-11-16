import test from "node:test";
import assert from "node:assert/strict";
import { timestamp } from "../../src/log/timestamp";

test("timestamp prefixes message with time", () => {
  const originalLog = console.log;
  const calls: string[] = [];
  console.log = (arg: unknown) => {
    calls.push(String(arg));
  };

  try {
    timestamp("Job finished");
  } finally {
    console.log = originalLog;
  }

  assert.equal(calls.length, 1);
  const output = calls[0];
  // Should contain [HH:MM:SS]
  assert.match(output, /\d{2}:\d{2}:\d{2}/);
  assert.ok(output.includes("Job finished"));
});
