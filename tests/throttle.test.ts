import { test } from "node:test";
import assert from "node:assert";
import { throttle } from "../src";

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// BASIC: fires at most once per interval

test("throttle: fires at most once per interval", async () => {
  let count = 0;
  const fn = throttle(() => count++, 50);

  fn();
  fn();
  fn();

  assert.strictEqual(count, 1, "Should fire immediately only once");

  await wait(60);

  assert.strictEqual(count, 2, "Trailing should fire once after interval");
});

// LEADING MODE ONLY

test("throttle (leading only): fires immediately and not at end", async () => {
  let count = 0;

  const fn = throttle(() => count++, 50, {
    leading: true,
    trailing: false,
  });

  fn(); // leading hit
  fn(); // skipped
  fn(); // skipped

  assert.strictEqual(count, 1, "Leading should fire once immediately");

  await wait(60);

  assert.strictEqual(count, 1, "Trailing must NOT fire");
});

// TRAILING MODE ONLY

test("throttle (trailing only): fires at end, not immediately", async () => {
  let count = 0;

  const fn = throttle(() => count++, 50, {
    leading: false,
    trailing: true,
  });

  fn(); // scheduled trailing
  fn(); // same window
  fn();

  assert.strictEqual(count, 0, "Should NOT fire immediately (leading=false)");

  await wait(60);

  assert.strictEqual(count, 1, "Should fire once at end");
});

// LEADING + TRAILING COMBINED

test("throttle (leading + trailing): fires twice", async () => {
  let count = 0;

  const fn = throttle(() => count++, 50, {
    leading: true,
    trailing: true,
  });

  fn(); // leading fire
  fn(); // ignored, trailing scheduled
  fn();

  assert.strictEqual(count, 1, "Leading should fire once immediately");

  await wait(60);

  assert.strictEqual(count, 2, "Trailing should fire once after interval");
});

// ARGUMENT PASSING

test("throttle passes parameters correctly", async () => {
  let lastValue: any = null;

  const fn = throttle((v: number) => {
    lastValue = v;
  }, 40);

  fn(10);
  fn(20);
  fn(30);

  assert.strictEqual(lastValue, 10, "Leading should get first value");

  await wait(50);

  assert.strictEqual(lastValue, 30, "Trailing should get last value");
});

// TIMER RESET + MULTIPLE WINDOWS

test("throttle handles spaced intervals correctly", async () => {
  let count = 0;
  const fn = throttle(() => count++, 30);

  fn(); // run immediately
  await wait(40); // window ends

  fn(); // new window, run again
  await wait(40);

  assert.strictEqual(count, 2, "Should fire once per window");
});

// TYPE TEST (similar to debounce type tests)

test("throttle infers parameter types", () => {
  const original = (x: number, y: string) => `${x}-${y}`;
  const thr = throttle(original, 10);

  // ✔ correct usage
  thr(1, "hello");

  // ✘ wrong first param
  // @ts-expect-error - wrong type for first parameter
  thr("not-number", "hello");

  // ✘ wrong second param
  // @ts-expect-error - wrong type for second parameter
  thr(1, 2);

  // ✘ missing second param
  // @ts-expect-error - missing second argument
  thr(1);

  // ✘ extra argument
  // @ts-expect-error - extra third argument
  thr(1, "hello", true);

  assert.ok(true);
});
