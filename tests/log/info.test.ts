import test from "node:test";
import assert from "node:assert/strict";
import { info } from "../../src/log/info";

test("info logs an info prefix", () => {
  const originalLog = console.log;
  const calls: string[] = [];
  console.log = (arg: unknown) => {
    calls.push(String(arg));
  };

  try {
    info("Server started on port 3000");
  } finally {
    console.log = originalLog;
  }

  assert.equal(calls.length, 1);
  const output = calls[0];
  assert.ok(output.includes("ℹ Info:"));
  assert.ok(output.includes("Server started on port 3000"));
});
