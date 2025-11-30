import test from "node:test";
import assert from "node:assert/strict";
import { capitalize, reverse, isEmpty, camelCase, kebabCase } from "../src";

test("capitalize handles various inputs", () => {
  const cases: Array<[string, string]> = [
    ["", ""],
    ["a", "A"],
    ["hello", "Hello"],
    ["Hello", "Hello"],
    ["hELLO", "HELLO"],
    [" hello", " hello"], // leading space should remain unchanged
    ["123abc", "123abc"],
    ["ümlaut", "Ümlaut"],
    [" multiple words", " multiple words"],
    ["already Capitalized", "Already Capitalized"],
  ];

  for (const [input, expected] of cases) {
    assert.equal(
      capitalize(input),
      expected,
      `capitalize(${JSON.stringify(input)}) should be ${JSON.stringify(expected)}`,
    );
  }
});

test("reverse reverses many different strings", () => {
  const cases: Array<[string, string]> = [
    ["", ""],
    ["a", "a"],
    ["ab", "ba"],
    ["abc", "cba"],
    ["racecar", "racecar"],
    ["hello world", "dlrow olleh"],
    ["  spaced", "decaps  "],
    ["12345", "54321"],
    ["abc 123", "321 cba"],
    ["😀👍", "👍😀"],
  ];

  for (const [input, expected] of cases) {
    assert.equal(
      reverse(input),
      expected,
      `reverse(${JSON.stringify(input)}) should be ${JSON.stringify(expected)}`,
    );
  }
});

test("isEmpty detects empty and non-empty strings", () => {
  const cases: Array<[string, boolean]> = [
    ["", true],
    [" ", true],
    ["   ", true],
    ["\t", true],
    ["\n", true],
    [" \n\t ", true],
    ["hello", false],
    [" hello ", false],
    ["0", false],
    ["a b", false],
    ["   a   ", false],
  ];

  for (const [input, expected] of cases) {
    assert.equal(
      isEmpty(input),
      expected,
      `isEmpty(${JSON.stringify(input)}) should be ${expected}`,
    );
  }
});

test("camelCase handles various separators and cases", () => {
  const cases: Array<[string, string]> = [
    ["hello world", "helloWorld"],
    ["hello-world", "helloWorld"],
    ["hello_world", "helloWorld"],
    ["hello-world_test value", "helloWorldTestValue"],
    ["--hello-world--", "helloWorld"],
    ["a__b--c d", "aBcd"],
    ["ver1-test2", "ver1Test2"],
    ["héllo wørld", "hélloWørld"],
    ["alreadyCamel", "alreadyCamel"],
    ["HELLO WORLD", "helloWorld"],
    ["hello", "hello"],
    ["", ""],
    ["--__..//", ""],
    ["//hello...world__", "helloWorld"],
  ];

  for (const [input, expected] of cases) {
    assert.equal(
      camelCase(input),
      expected,
      `camelCase(${JSON.stringify(input)}) should be ${JSON.stringify(expected)}`,
    );
  }
});

test("kebabCase converts various inputs to kebab-case", () => {
  const cases: Array<[string, string]> = [
    ["hello world", "hello-world"],
    ["hello_world", "hello-world"],
    ["hello_world-test value", "hello-world-test-value"],
    ["helloWorld", "hello-world"],
    ["HelloWorld", "hello-world"],
    ["XMLHttpRequest", "xml-http-request"],
    ["ver1Test2", "ver1-test2"],
    ["hélloWørld", "héllo-wørld"],
    ["--hello-world--", "hello-world"],
    ["", ""],
    ["----", ""],
    ["already-kebab-case", "already-kebab-case"],
    ["he!!o wor@ld", "heo-world"],
    ["Hello.World_Test-Case", "hello-world-test-case"],
  ];

  for (const [input, expected] of cases) {
    assert.equal(
      kebabCase(input),
      expected,
      `kebabCase(${JSON.stringify(input)}) should be ${JSON.stringify(expected)}`,
    );
  }
});
