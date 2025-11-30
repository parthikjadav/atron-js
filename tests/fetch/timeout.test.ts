import test from "node:test";
import assert from "node:assert/strict";
import { timeout } from "../../src";

test("timeout resolves underlying promise when it finishes in time", async () => {
  const cases = [0, 1, 5, 10, 20];

  for (const delay of cases) {
    const result = await timeout(
      new Promise<number>(resolve => setTimeout(() => resolve(42), delay)),
      delay + 20
    );
    assert.equal(result, 42);
  }
});

test("timeout rejects when promise is too slow", async () => {
  const slowPromise = new Promise<void>(() => {
    // never resolves
  });

  await assert.rejects(
    timeout(slowPromise, 10, "too slow"),
    /too slow/
  );
});

test("timeout propagates original rejection when promise rejects fast", async () => {
  const err = new Error("original");
  await assert.rejects(
    timeout(Promise.reject(err), 50),
    err
  );
});
