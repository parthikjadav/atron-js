import { test } from "node:test";
import assert from "node:assert";
import { unique, chunk, shuffle, flatten } from "../src";

test("unique removes duplicate values", () => {
  assert.deepStrictEqual(unique([1, 2, 2, 3, 3, 3]), [1, 2, 3]);
  assert.deepStrictEqual(unique(["a", "b", "a", "c"]), ["a", "b", "c"]);
  assert.deepStrictEqual(unique([]), []);
  assert.deepStrictEqual(unique([1]), [1]);
});

test("chunk splits array into fixed-size groups", () => {
  assert.deepStrictEqual(chunk([1, 2, 3, 4, 5], 2), [[1, 2], [3, 4], [5]]);
  assert.deepStrictEqual(chunk([1, 2, 3, 4], 2), [[1, 2], [3, 4]]);
  assert.deepStrictEqual(chunk([1, 2, 3], 5), [[1, 2, 3]]);
  assert.deepStrictEqual(chunk([], 2), []);
  assert.deepStrictEqual(chunk([1, 2, 3], 0), []);
});

test("shuffle randomizes array order", () => {
  const original = [1, 2, 3, 4, 5];
  const shuffled = shuffle(original);
  
  // Should have same length
  assert.strictEqual(shuffled.length, original.length);
  
  // Should contain same elements
  assert.deepStrictEqual(shuffled.sort(), original.sort());
  
  // Original should be unchanged
  assert.deepStrictEqual(original, [1, 2, 3, 4, 5]);
  
  // Empty array
  assert.deepStrictEqual(shuffle([]), []);
  
  // Single element
  assert.deepStrictEqual(shuffle([1]), [1]);
});

test("flatten converts nested arrays to single level", () => {
  assert.deepStrictEqual(flatten([1, [2, [3, 4]]]), [1, 2, 3, 4]);
  assert.deepStrictEqual(flatten([1, 2, 3]), [1, 2, 3]);
  assert.deepStrictEqual(flatten([]), []);
  assert.deepStrictEqual(flatten([[1, 2], [3, 4]]), [1, 2, 3, 4]);
  assert.deepStrictEqual(flatten([1, [2, 3], 4, [5, [6, 7]]]), [1, 2, 3, 4, 5, 6, 7]);
});