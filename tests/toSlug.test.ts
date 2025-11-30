import test from "node:test";
import assert from "node:assert/strict";
import { toSlug } from "../src";

const longInput = "Hello world ".repeat(10000);

test("toSlug - basic ASCII", () => {
  assert.equal(toSlug("Hello World"), "hello-world");
});

test("toSlug - multiple whitespace collapsed", () => {
  assert.equal(toSlug("a b\tc\n d"), "a-b-c-d");
});

test("toSlug - punctuation removed", () => {
  assert.equal(toSlug("Hello, world!"), "hello-world");
});

test("toSlug - leading and trailing separators removed", () => {
  assert.equal(toSlug(" --Hello-- "), "hello");
});

test("toSlug - diacritics removed by default", () => {
  assert.equal(toSlug("École À bientôt"), "ecole-a-bientot");
});

test("toSlug - preserve case when lowercase is false", () => {
  assert.equal(toSlug("Hello World", { lowercase: false }), "Hello-World");
});

test("toSlug - custom separator", () => {
  assert.equal(toSlug("Hello World", { separator: "_" }), "hello_world");
});

test("toSlug - maxLength truncation without trailing separator", () => {
  assert.equal(toSlug("abcdef ghi", { maxLength: 5 }), "abcde");
});

test("toSlug - allowUnicode true keeps non-Latin letters", () => {
  assert.equal(toSlug("Привет мир", { allowUnicode: true }), "привет-мир");
});

test("toSlug - allowUnicode false removes non-ASCII letters", () => {
  assert.equal(toSlug("你好 世界"), "");
  assert.equal(toSlug("你好 世界", { fallback: "n-a" }), "n-a");
});

test("toSlug - fallback used when result is empty", () => {
  assert.equal(toSlug("", { fallback: "n-a" }), "n-a");
  assert.equal(toSlug("$%#@", { fallback: "n-a" }), "n-a");
});

test("toSlug - emojis and symbols removed", () => {
  assert.equal(toSlug("hello 👋 world"), "hello-world");
});

test("toSlug - combining marks and composed forms produce same result", () => {
  const composed = "école";
  const decomposed = "e\u0301cole";
  assert.equal(toSlug(composed), "ecole");
  assert.equal(toSlug(decomposed), "ecole");
});

test("toSlug - performance on long input", () => {
  const start = Date.now();
  const result = toSlug(longInput);
  const elapsed = Date.now() - start;

  assert.equal(typeof result, "string");
  assert.ok(result.length > 0);
  assert.ok(elapsed < 2000, `toSlug took too long: ${elapsed}ms`);
});

test("toSlug - separator escaping for regex special chars", () => {
  assert.equal(toSlug("a b c", { separator: "." }), "a.b.c");
});

test("toSlug - already slug input preserved", () => {
  assert.equal(toSlug("already-slug"), "already-slug");
});
