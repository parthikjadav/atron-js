import test from "node:test";
import assert from "node:assert/strict";
import { sequence } from "../../src";

test("sequence runs tasks in order and collects results", async () => {
  const tasks = Array.from({ length: 10 }, (_, i) => () => Promise.resolve(i + 1));
  const results = await sequence(tasks);
  assert.deepEqual(results, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});

test("sequence handles empty task array", async () => {
  const results = await sequence([]);
  assert.deepEqual(results, []);
});

test("sequence stops on first error and propagates it", async () => {
  const error = new Error("boom");
  let executed: number[] = [];
  const tasks = [
    async () => {
      executed.push(1);
      return 1;
    },
    async () => {
      executed.push(2);
      throw error;
    },
    async () => {
      executed.push(3);
      return 3;
    },
  ];

  await assert.rejects(sequence(tasks), error);
  assert.deepEqual(executed, [1, 2]);
});

// Check that tasks are strictly sequential (no overlap)

test("sequence runs only one task at a time", async () => {
  let active = 0;
  let maxActive = 0;

  const tasks = Array.from({ length: 20 }, () => async () => {
    active++;
    maxActive = Math.max(maxActive, active);
    await new Promise<void>((resolve) => setTimeout(resolve, 2));
    active--;
    return active;
  });

  await sequence(tasks.map((t) => () => t()));
  assert.equal(maxActive, 1);
});
