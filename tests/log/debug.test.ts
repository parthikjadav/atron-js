import test from "node:test";
import assert from "node:assert/strict";
import { debug } from "../../src";

test("debug logs when NODE_ENV is not production", () => {
  const originalLog = console.log;
  const calls: string[] = [];
  const originalEnv = process.env.NODE_ENV;
  console.log = (arg: unknown) => {
    calls.push(String(arg));
  };

  try {
    process.env.NODE_ENV = "development";
    debug("Should be logged");
  } finally {
    process.env.NODE_ENV = originalEnv;
    console.log = originalLog;
  }

  assert.equal(calls.length, 1);
  const output = calls[0];
  assert.ok(output.includes("🐞 Debug:"));
  assert.ok(output.includes("Should be logged"));
});

test("debug does not log when NODE_ENV is production", () => {
  const originalLog = console.log;
  const calls: string[] = [];
  const originalEnv = process.env.NODE_ENV;
  console.log = (arg: unknown) => {
    calls.push(String(arg));
  };

  try {
    process.env.NODE_ENV = "production";
    debug("Should NOT be logged");
  } finally {
    process.env.NODE_ENV = originalEnv;
    console.log = originalLog;
  }

  assert.equal(calls.length, 0);
});
