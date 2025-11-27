import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { retry } from "../../src/fetch";

describe("retry", () => {
  test("succeeds on first attempt", async () => {
    let calls = 0;
    const result = await retry(async () => {
      calls++;
      return 1;
    }, 3);

    assert.equal(result, 1);
    assert.equal(calls, 1);
  });

  test("succeeds after several failures", async () => {
    let calls = 0;
    const result = await retry(async () => {
      calls++;
      if (calls < 3) throw new Error("fail");
      return 99;
    }, 5);

    assert.equal(result, 99);
    assert.equal(calls, 3);
  });

  test("throws last error after exhausting attempts", async () => {
    let calls = 0;
    const err = new Error("always fails");
    await assert.rejects(
      retry(async () => {
        calls++;
        throw err;
      }, 3),
      err
    );
    assert.equal(calls, 3);
  });

  test("waits between attempts when delay is provided", async () => {
    let calls = 0;
    const start = Date.now();
    await assert.rejects(
      retry(async () => {
        calls++;
        throw new Error("fail");
      }, 3, 20), // Increased delay slightly to be safe against CI variance
      /fail/
    );
    const elapsed = Date.now() - start;
    
    // 3 attempts means 2 delays (Attempt 1 -> wait -> Attempt 2 -> wait -> Attempt 3)
    // 2 * 20ms = 40ms. We check for >= 30ms to account for slight timer inaccuracies.
    assert.ok(elapsed >= 30, `Elapsed time ${elapsed}ms should be >= 30ms`);
    assert.equal(calls, 3);
  });

  test("throws if attempts is not greater than 0", async () => {
    await assert.rejects(
      retry(async () => 1, 0),
      /Attempts must be at least 1/
    );
  });
});