import { test, describe, mock } from "node:test";
import assert from "node:assert/strict";
import { memoize } from "../src";

describe("memoize", () => {
  test("caches result for same arguments", () => {
    // Create a mock function to track calls
    const fn = mock.fn((x: number) => x * 2);
    const memoized = memoize(fn);

    // First call: Should execute function
    assert.strictEqual(memoized(2), 4);
    assert.strictEqual(fn.mock.callCount(), 1);

    // Second call: Should use cache
    assert.strictEqual(memoized(2), 4);
    assert.strictEqual(fn.mock.callCount(), 1); // Call count stays 1

    // Different arguments: Should execute function
    assert.strictEqual(memoized(3), 6);
    assert.strictEqual(fn.mock.callCount(), 2);
  });

  test("handles multiple arguments", () => {
    const fn = mock.fn((a: string, b: number) => `${a}-${b}`);
    const memoized = memoize(fn);

    assert.strictEqual(memoized("test", 1), "test-1");
    assert.strictEqual(memoized("test", 1), "test-1");
    assert.strictEqual(fn.mock.callCount(), 1);

    assert.strictEqual(memoized("test", 2), "test-2");
    assert.strictEqual(fn.mock.callCount(), 2);
  });

  test("respects TTL (Time To Live)", async () => {
    const fn = mock.fn((x: number) => x * 10);
    // Short TTL for testing
    const memoized = memoize(fn, { ttlMs: 50 });

    // 1. Initial Call
    assert.strictEqual(memoized(5), 50);
    assert.strictEqual(fn.mock.callCount(), 1);

    // 2. Call within TTL (immediate)
    assert.strictEqual(memoized(5), 50);
    assert.strictEqual(fn.mock.callCount(), 1); // Cached

    // 3. Wait for TTL to expire (> 50ms)
    await new Promise((resolve) => setTimeout(resolve, 60));

    // 4. Call after TTL
    assert.strictEqual(memoized(5), 50);
    assert.strictEqual(fn.mock.callCount(), 2); // Recomputed
  });

  test("caches distinct object references correctly", () => {
    const fn = mock.fn((obj: { id: number }) => obj.id);
    const memoized = memoize(fn);

    const objA = { id: 1 };
    const objB = { id: 1 }; // Different ref, same content

    // Call with objA
    assert.strictEqual(memoized(objA), 1);

    // Call with objB (same structure) -> JSON.stringify key matches
    // Note: Default simple JSON strategy treats deep equal objects as cache hits
    assert.strictEqual(memoized(objB), 1);

    assert.strictEqual(fn.mock.callCount(), 1);
  });
});
