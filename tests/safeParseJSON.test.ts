import { test } from "node:test";
import assert from "node:assert";
import { safeParseJSON } from "../src/Helpers/safeParseJSON.ts";

// BASIC SUCCESS CASES

test("safeParseJSON: parses valid JSON object", () => {
  const result = safeParseJSON<{ a: number }>('{"a": 10}');

  assert.strictEqual(result.success, true);
  assert.deepStrictEqual(result.data, { a: 10 });
});

test("safeParseJSON: parses valid JSON array", () => {
  const result = safeParseJSON<number[]>("[1, 2, 3]");

  assert.strictEqual(result.success, true);
  assert.deepStrictEqual(result.data, [1, 2, 3]);
});

test("safeParseJSON: parses primitive JSON", () => {
  const result = safeParseJSON<number>("123");

  assert.strictEqual(result.success, true);
  assert.strictEqual(result.data, 123);
});

// ERROR CASES

test("safeParseJSON: malformed JSON returns error", () => {
  const result = safeParseJSON("{ invalid json ");

  assert.strictEqual(result.success, false);
  assert.ok(result.error instanceof Error);
});

test("safeParseJSON: input must be string", () => {
  // @ts-expect-error - non-string input should cause TypeScript error
  const result = safeParseJSON(123);

  assert.strictEqual(result.success, false);
  assert.ok(result.error instanceof TypeError);
});

test("safeParseJSON: empty string is valid JSON parse error", () => {
  const result = safeParseJSON("");

  assert.strictEqual(result.success, false);
  assert.ok(result.error instanceof Error);
});

// TYPE NARROWING TEST

test("safeParseJSON: type inference works for parsed object", () => {
  const result = safeParseJSON<{ name: string }>('{"name": "Sudip"}');

  if (result.success) {
    const nameUpper = result.data.name.toUpperCase();
    assert.strictEqual(nameUpper, "SUDIP");
  } else {
    assert.fail("Expected successful parse");
  }
});

// UNKNOWN JSON TYPE FALLBACK

test("safeParseJSON: default generic type is unknown", () => {
  const result = safeParseJSON("{\"x\": 1}");

  assert.strictEqual(result.success, true);
  assert.deepStrictEqual(result.data, { x: 1 });
});

// BOOLEAN, NULL, ARRAY EDGE CASES

test("safeParseJSON: parses null", () => {
  const result = safeParseJSON<null>("null");

  assert.strictEqual(result.success, true);
  assert.strictEqual(result.data, null);
});

test("safeParseJSON: parses boolean", () => {
  const result = safeParseJSON<boolean>("true");

  assert.strictEqual(result.success, true);
  assert.strictEqual(result.data, true);
});

// THROW-SAFE GUARANTEE

test("safeParseJSON: never throws even with extreme input", () => {
  const result = safeParseJSON("{{{{{{{");

  assert.strictEqual(result.success, false);
  assert.ok(result.error instanceof Error);
});
