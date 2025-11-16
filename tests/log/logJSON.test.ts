import test from "node:test";
import assert from "node:assert/strict";
import { logJSON } from "../../src/log/logJSON";

test("logJSON prints keys and values", () => {
  const originalLog = console.log;
  const calls: string[] = [];
  console.log = (arg: unknown) => {
    calls.push(String(arg));
  };

  try {
    logJSON({ id: 1, name: "Atron", active: true });
  } finally {
    console.log = originalLog;
  }

  assert.equal(calls.length, 1);
  const output = calls[0];
  assert.ok(output.includes('"id"'));
  assert.ok(output.includes("1"));
  assert.ok(output.includes('"name"'));
  assert.ok(output.includes('"Atron"'));
  assert.ok(output.includes('"active"'));
  assert.ok(output.includes("true"));
});

test("logJSON handles arrays and nested objects", () => {
  const originalLog = console.log;
  const calls: string[] = [];
  console.log = (arg: unknown) => {
    calls.push(String(arg));
  };

  try {
    logJSON({ items: [1, 2, { nested: "ok" }] });
  } finally {
    console.log = originalLog;
  }

  assert.equal(calls.length, 1);
  const output = calls[0];
  assert.ok(output.includes('"items"'));
  assert.ok(output.includes("1"));
  assert.ok(output.includes("2"));
  assert.ok(output.includes('"nested"'));
  assert.ok(output.includes('"ok"'));
});
