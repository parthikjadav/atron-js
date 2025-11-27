import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { parallel } from "../../src/fetch";

describe("parallel", () => {
  test("resolves all tasks and preserves order", async () => {
    const tasks = [
      () => new Promise<number>(resolve => setTimeout(() => resolve(1), 20)),
      () => new Promise<number>(resolve => setTimeout(() => resolve(2), 10)),
      () => new Promise<number>(resolve => setTimeout(() => resolve(3), 5)),
    ];

    const results = await parallel(tasks, Infinity);
    assert.deepEqual(results, [1, 2, 3]);
  });

  test("respects concurrency limit", async () => {
    let active = 0;
    let maxActive = 0;

    const tasks = Array.from({ length: 20 }, (_, i) => async () => {
      active++;
      maxActive = Math.max(maxActive, active);
      // Small random delay to ensure overlaps occur naturally
      await new Promise<void>(resolve => setTimeout(resolve, Math.random() * 10));
      active--;
      return i;
    });

    const results = await parallel(tasks, 3);
    
    // Check concurrency
    assert.ok(maxActive <= 3, `Max active (${maxActive}) should be <= 3`);
    
    // Check completeness
    assert.equal(results.length, tasks.length);
    
    // Check order
    const expected = Array.from({ length: 20 }, (_, i) => i);
    assert.deepEqual(results, expected);
  });

  test("rejects when any task fails", async () => {
    const error = new Error("fail");
    const tasks = [
      () => Promise.resolve(1),
      () => Promise.reject(error),
      () => Promise.resolve(3),
    ];

    await assert.rejects(parallel(tasks, 2), error);
  });

  test("throws if limit is not greater than 0", () => {
    const tasks = [() => Promise.resolve(1)];
    
    // Note: parallel throws synchronously for invalid limits, 
    // so we use assert.throws instead of assert.rejects
    assert.throws(
      () => parallel(tasks, 0),
      /Limit must be greater than 0/i
    );
  });
});