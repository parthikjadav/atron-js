import { test } from "node:test";
import assert from "node:assert";
import { debounce } from "../src/utils/debounce.ts";

/** helper: waits for ms milliseconds */
function wait(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

test("debounce (trailing): fires once after silence", async () => {
  let count = 0;
  const fn = debounce(() => count++, 50);

  fn();
  fn();
  fn();

  assert.strictEqual(count, 0, "Should not fire immediately");
  await wait(60);

  assert.strictEqual(count, 1, "Should fire exactly once after ms");
});

test("debounce (leading): fires immediately", async () => {
  let count = 0;

  const fn = debounce(() => count++, 50, { leading: true });

  fn(); // leading fire
  fn(); // ignored
  fn(); // ignored

  assert.strictEqual(count, 1, "Leading should fire once immediately");

  await wait(60);

  assert.strictEqual(
    count,
    1,
    "Trailing should NOT fire when trailing: false"
  );
});

test("debounce (leading + trailing): fires twice", async () => {
  let count = 0;
  const fn = debounce(() => count++, 50, {
    leading: true,
    trailing: true,
  });

  fn(); // leading
  fn(); // reschedules trailing
  fn();

  assert.strictEqual(count, 1, "Leading should fire once immediately");

  await wait(60);

  assert.strictEqual(count, 2, "Trailing should fire once after wait");
});

test("debounce resets timer correctly", async () => {
  let count = 0;
  const fn = debounce(() => count++, 50);

  fn();
  await wait(30);
  fn(); // resets timer
  await wait(30);
  fn(); // resets timer again

  assert.strictEqual(count, 0, "Should not fire before final wait");

  await wait(60);

  assert.strictEqual(count, 1, "Should fire exactly once after last reset");
});

test("debounce passes parameters correctly", async () => {
  let lastValue: number | null = null;

  const fn = debounce((value: number) => {
    lastValue = value;
  }, 40);

  fn(10);
  fn(20);
  fn(30);

  await wait(50);

  assert.strictEqual(lastValue, 30, "Should receive last argument");
});



test("debounce infers parameter types", () => {
  const original = (x: number, y: string) => `${x}-${y}`;
  const debounced = debounce(original, 10);

  // TS should enforce correct types:
  // ✔ OK
  debounced(1, "hello");



  assert.ok(true);
});
