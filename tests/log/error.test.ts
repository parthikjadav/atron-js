import test from "node:test";
import assert from "node:assert/strict";
import { error } from "../../src";

test("error logs a red cross message", () => {
  const originalLog = console.log;
  const calls: string[] = [];
  console.log = (arg: unknown) => {
    calls.push(String(arg));
  };

  try {
    error("Something went wrong");
  } finally {
    console.log = originalLog;
  }

  assert.equal(calls.length, 1);
  const output = calls[0];
  assert.ok(output.includes("✖"));
  assert.ok(output.includes("Something went wrong"));
});
