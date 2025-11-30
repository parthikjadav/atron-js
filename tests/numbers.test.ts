import test from "node:test";
import assert from "node:assert/strict";
import { randomNumber, isEven, clamp } from "../src";

test("randomNumber returns values within range for many ranges", () => {
  const ranges: Array<[number, number]> = [
    [0, 0],
    [1, 1],
    [1, 3],
    [-5, 5],
    [-10, -1],
    [0, 10],
    [10, 20],
    [100, 1000],
    [2, 2],
    [-3, 3],
  ];

  for (const [min, max] of ranges) {
    for (let i = 0; i < 20; i++) {
      const value = randomNumber(min, max);
      assert.ok(value >= min && value <= max, `randomNumber(${min}, ${max}) produced ${value}`);
    }
  }
});

test("isEven correctly classifies numbers from -5 to 14", () => {
  const cases: Array<[number, boolean]> = [
    [-5, false],
    [-4, true],
    [-1, false],
    [0, true],
    [1, false],
    [2, true],
    [3, false],
    [10, true],
    [11, false],
    [14, true],
  ];

  for (const [value, expected] of cases) {
    assert.equal(isEven(value), expected, `isEven(${value}) should be ${expected}`);
  }
});

test("clamp restricts values to the provided bounds", () => {
  const cases: Array<[number, number, number, number]> = [
    [5, 0, 10, 5],
    [-5, 0, 10, 0],
    [15, 0, 10, 10],
    [0, 0, 10, 0],
    [10, 0, 10, 10],
    [100, 100, 100, 100],
    [-5, -10, 10, -5],
    [-15, -10, 10, -10],
    [15, -10, 10, 10],
    [3, 3, 5, 3],
  ];

  for (const [value, min, max, expected] of cases) {
    assert.equal(
      clamp(value, min, max),
      expected,
      `clamp(${value}, ${min}, ${max}) should be ${expected}`,
    );
  }
});
