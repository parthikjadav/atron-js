import test from "node:test";
import assert from "node:assert/strict";
import { sleep } from "../../src";

test("sleep waits approximately the requested time for many values", async () => {
  const cases: number[] = [0, 1, 2, 3, 4, 5, 7, 10, 12, 15, 18, 20, 22, 25, 27, 30, 35, 40, 45, 50];

  for (const ms of cases) {
    const start = Date.now();
    await sleep(ms);
    const elapsed = Date.now() - start;
    const tolerance = 5; // allow small scheduling differences

    assert.ok(
      elapsed >= Math.max(0, ms - tolerance),
      `sleep(${ms}) waited only ${elapsed}ms`
    );
  }
});
