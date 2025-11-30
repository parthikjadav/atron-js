import test from "node:test";
import assert from "node:assert/strict";
import { delay, formatTime } from "../src";

test("delay waits approximately the requested time for various values", async () => {
  const cases: number[] = [0, 1, 5, 10, 20, 30, 40, 50, 75, 100];

  for (const ms of cases) {
    const start = Date.now();
    await delay(ms);
    const elapsed = Date.now() - start;
    const tolerance = 5; // allow small scheduling differences

    assert.ok(elapsed >= Math.max(0, ms - tolerance), `delay(${ms}) waited only ${elapsed}ms`);
  }
});

test("formatTime formats Date objects to HH:MM in local time", () => {
  const cases: Array<[number, number, string]> = [
    [0, 0, "00:00"],
    [0, 1, "00:01"],
    [1, 0, "01:00"],
    [9, 5, "09:05"],
    [12, 0, "12:00"],
    [13, 59, "13:59"],
    [23, 59, "23:59"],
    [5, 9, "05:09"],
    [15, 30, "15:30"],
    [7, 7, "07:07"],
  ];

  for (const [hours, minutes, expected] of cases) {
    const date = new Date(2020, 0, 1, hours, minutes, 0, 0); // local time
    const result = formatTime(date);
    assert.equal(
      result,
      expected,
      `formatTime(${hours}:${minutes}) should be ${expected} but was ${result}`,
    );
  }
});
