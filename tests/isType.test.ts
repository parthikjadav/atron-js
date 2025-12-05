import { test } from "node:test";
import assert from "node:assert";
import { isType } from "../src/Helpers/isType.ts";
import type { TypeGuard } from "../src/Helpers/isType.ts";



interface Post {
  title: string;
  body: string;
}

const isPost: TypeGuard<Post> = (d): d is Post =>
  typeof d === "object" &&
  d !== null &&
  typeof (d as any).title === "string" &&
  typeof (d as any).body === "string";


test("isType: valid Post object returns true", () => {
  assert.strictEqual(isType({ title: "Hello", body: "World" }, isPost), true);
});

test("isType: missing property returns false", () => {
  assert.strictEqual(isType({ title: "Hello" }, isPost), false);
});

test("isType: wrong property type returns false", () => {
  assert.strictEqual(isType({ title: "A", body: 123 }, isPost), false);
});

test("isType: null returns false", () => {
  assert.strictEqual(isType(null, isPost), false);
});

test("isType: undefined returns false", () => {
  assert.strictEqual(isType(undefined, isPost), false);
});

test("isType: extra properties still allowed", () => {
  assert.strictEqual(
    isType({ title: "A", body: "B", extra: 999 }, isPost),
    true
  );
});


// THROWING GUARD TESTS

test("isType: guard throwing returns false", () => {
  const badGuard: TypeGuard<any> = (_value): _value is any => {
    throw new Error("Boom");
  };
  assert.strictEqual(isType("test", badGuard), false);
});

// PRIMITIVE GUARDS

const isNumber: TypeGuard<number> = (v): v is number =>
  typeof v === "number";

test("isType: number guard accepts number", () => {
  assert.strictEqual(isType(123, isNumber), true);
});

test("isType: number guard rejects string", () => {
  assert.strictEqual(isType("123", isNumber), false);
});

test("isType: NaN is still number", () => {
  assert.strictEqual(isType(NaN, isNumber), true);
});

// ARRAY GUARDS

const isStringArray: TypeGuard<string[]> = (v): v is string[] =>
  Array.isArray(v) && v.every((x) => typeof x === "string");

test("isType: string array passes", () => {
  assert.strictEqual(isType(["a", "b"], isStringArray), true);
});

test("isType: invalid string array fails", () => {
  assert.strictEqual(isType(["a", 1], isStringArray), false);
});

// DEEP NESTED OBJECTS

interface Deep {
  a: { b: { c: number } };
}

const isDeep: TypeGuard<Deep> = (v): v is Deep =>
  typeof v === "object" &&
  v !== null &&
  typeof (v as any).a?.b?.c === "number";

test("isType: deep object valid", () => {
  assert.strictEqual(isType({ a: { b: { c: 10 } } }, isDeep), true);
});

test("isType: deep object invalid", () => {
  assert.strictEqual(isType({ a: { b: {} } }, isDeep), false);
});

// UNION TYPE GUARD

type NumOrStr = number | string;

const isNumOrStr: TypeGuard<NumOrStr> = (v): v is NumOrStr =>
  typeof v === "number" || typeof v === "string";

test("isType: union guard works", () => {
  assert.strictEqual(isType("x", isNumOrStr), true);
  assert.strictEqual(isType(99, isNumOrStr), true);
  assert.strictEqual(isType(true, isNumOrStr), false);
});

// FUNCTION / SYMBOL / BIGINT

const isFunction: TypeGuard<Function> = (v): v is Function =>
  typeof v === "function";

test("isType: function guard works", () => {
  assert.strictEqual(isType(() => {}, isFunction), true);
});

const isSymbol: TypeGuard<symbol> = (v): v is symbol =>
  typeof v === "symbol";

test("isType: symbol guard works", () => {
  assert.strictEqual(isType(Symbol("x"), isSymbol), true);
});

const isBigInt: TypeGuard<bigint> = (v): v is bigint =>
  typeof v === "bigint";

test("isType: bigint guard works", () => {
  assert.strictEqual(isType(10n, isBigInt), true);
});

// TYPE NARROWING TEST

test("isType: narrowing works correctly", () => {
  const maybe: unknown = "hello";

  if (isType(maybe, (v): v is string => typeof v === "string")) {
    const len = maybe.length;
    assert.strictEqual(len, 5);
  } else {
    assert.fail("Should have narrowed to string");
  }
});

// TYPE ERROR TESTS (compile-time)

test("isType: type guard function signature correctness", () => {
  const guard: TypeGuard<number> = (v) => typeof v === "number";

  isType(123, guard);

  isType(123, (v: string) => !!v);

  assert.ok(true);
});
