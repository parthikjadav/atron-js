import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { batch } from "../../src/fetch";

describe("batch", () => {
  test("splits arrays into chunks correctly", () => {
    const cases: Array<{ items: number[]; size: number; expected: number[][] }> = [
      { items: [], size: 1, expected: [] },
      { items: [1], size: 1, expected: [[1]] },
      { items: [1, 2], size: 1, expected: [[1], [2]] },
      { items: [1, 2], size: 2, expected: [[1, 2]] },
      { items: [1, 2, 3], size: 2, expected: [[1, 2], [3]] },
      { items: [1, 2, 3, 4], size: 2, expected: [[1, 2], [3, 4]] },
      { items: [1, 2, 3, 4, 5], size: 3, expected: [[1, 2, 3], [4, 5]] },
      { items: [1, 2, 3], size: 5, expected: [[1, 2, 3]] },
      { items: [1, 2, 3, 4, 5, 6], size: 4, expected: [[1, 2, 3, 4], [5, 6]] },
      { items: [1, 2, 3, 4, 5, 6, 7], size: 3, expected: [[1, 2, 3], [4, 5, 6], [7]] },
      { items: [0, 0, 0], size: 1, expected: [[0], [0], [0]] },
      { items: [1, 2, 3, 4, 5], size: 4, expected: [[1, 2, 3, 4], [5]] },
      { items: [1, 2, 3, 4, 5], size: 2, expected: [[1, 2], [3, 4], [5]] },
      { items: [1, 2, 3, 4], size: 3, expected: [[1, 2, 3], [4]] },
      { items: [1, 2, 3, 4], size: 4, expected: [[1, 2, 3, 4]] },
      { items: [1, 2], size: 10, expected: [[1, 2]] },
      { items: [1, 2, 3, 4, 5, 6], size: 6, expected: [[1, 2, 3, 4, 5, 6]] },
      { items: [1, 2, 3, 4, 5, 6], size: 5, expected: [[1, 2, 3, 4, 5], [6]] },
      { items: [1, 2, 3, 4, 5, 6, 7, 8], size: 3, expected: [[1, 2, 3], [4, 5, 6], [7, 8]] },
    ];

    for (const { items, size, expected } of cases) {
      const result = batch(items, size);
      
      // Check value equality
      assert.deepEqual(result, expected, `batch(${JSON.stringify(items)}, ${size}) failed structure check`);
      
      // Ensure we returned a new array reference (immutability check)
      if (items.length > 0) {
        assert.notEqual(result, items, "Should return a new array instance");
      }
    }
  });

  test("throws for non-positive size", () => {
    // New error message pattern: /Batch size must be greater than 0/
    assert.throws(() => batch([1, 2], 0), /Batch size must be greater than 0/);
    assert.throws(() => batch([], 0), /Batch size must be greater than 0/);
    assert.throws(() => batch([1], -1), /Batch size must be greater than 0/);
  });
});