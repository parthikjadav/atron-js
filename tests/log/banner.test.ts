import test from "node:test";
import assert from "node:assert/strict";
import { banner } from "../../src/log/banner";

test("banner prints an uppercase framed banner", () => {
  const originalLog = console.log;
  const calls: string[] = [];
  console.log = (arg: unknown) => {
    calls.push(String(arg));
  };

  try {
    banner("Atron JS");
  } finally {
    console.log = originalLog;
  }

  assert.equal(calls.length, 1);
  const output = calls[0];
  assert.ok(output.toUpperCase().includes("ATRON JS"));
  assert.ok(output.includes("="));
});
