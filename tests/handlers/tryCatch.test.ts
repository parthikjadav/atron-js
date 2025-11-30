import test from "node:test";
import assert from "node:assert/strict";
import { tryCatch } from "../../src";

// 1
test("sync success returns data and null error", async () => {
  const [data, error] = await tryCatch(() => 42);
  assert.equal(data, 42);
  assert.equal(error, null);
});

// 2
test("sync error returns null data and error object", async () => {
  const err = new Error("boom");
  const [data, error] = await tryCatch(() => {
    throw err;
  });
  assert.equal(data, null);
  assert.equal(error, err);
});

// 3
test("async success returns resolved value", async () => {
  const [data, error] = await tryCatch(async () => {
    return Promise.resolve("ok");
  });
  assert.equal(data, "ok");
  assert.equal(error, null);
});

// 4
test("async error returns null data and error", async () => {
  const err = new Error("async boom");
  const [data, error] = await tryCatch(async () => {
    throw err;
  });
  assert.equal(data, null);
  assert.equal(error, err);
});

// 5
test("sync function returning undefined is handled", async () => {
  const [data, error] = await tryCatch(() => {
    return undefined;
  });
  assert.equal(data, undefined);
  assert.equal(error, null);
});

// 6
test("sync function returning null is handled", async () => {
  const [data, error] = await tryCatch(() => null);
  assert.equal(data, null);
  assert.equal(error, null);
});

// 7
test("sync function returning 0 is handled", async () => {
  const [data, error] = await tryCatch(() => 0);
  assert.equal(data, 0);
  assert.equal(error, null);
});

// 8
test("sync function returning object is handled", async () => {
  const obj = { a: 1 };
  const [data, error] = await tryCatch(() => obj);
  assert.strictEqual(data, obj);
  assert.equal(error, null);
});

// 9
test("async function returning array is handled", async () => {
  const [data, error] = await tryCatch(async () => [1, 2, 3]);
  assert.deepEqual(data, [1, 2, 3]);
  assert.equal(error, null);
});

// 10
test("throws string error and returns it as error", async () => {
  const [data, error] = await tryCatch(() => {
    throw "string-error";
  });
  assert.equal(data, null);
  assert.equal(error, "string-error");
});

// 11
test("throws number error and returns it as error", async () => {
  const [data, error] = await tryCatch(() => {
    throw 123;
  });
  assert.equal(data, null);
  assert.equal(error, 123);
});

// 12
test("async function rejecting with Error is captured", async () => {
  const err = new Error("reject");
  const [data, error] = await tryCatch(async () => {
    return Promise.reject(err);
  });
  assert.equal(data, null);
  assert.equal(error, err);
});

// 13
test("async function rejecting with non-Error is captured", async () => {
  const [data, error] = await tryCatch(async () => {
    return Promise.reject("reject-string");
  });
  assert.equal(data, null);
  assert.equal(error, "reject-string");
});

// 14
test("multiple sequential calls do not leak state", async () => {
  const [d1, e1] = await tryCatch(() => 1);
  const [d2, e2] = await tryCatch(() => {
    throw new Error("second");
  });
  const [d3, e3] = await tryCatch(async () => 3);

  assert.equal(d1, 1);
  assert.equal(e1, null);
  assert.equal(d2, null);
  assert.ok(e2 instanceof Error);
  assert.equal(d3, 3);
  assert.equal(e3, null);
});

// 15
test("nested tryCatch where inner throws", async () => {
  const innerErr = new Error("inner");
  const [outerData, outerError] = await tryCatch(async () => {
    const [innerData, innerError] = await tryCatch(() => {
      throw innerErr;
    });
    assert.equal(innerData, null);
    assert.equal(innerError, innerErr);
    return "outer";
  });

  assert.equal(outerData, "outer");
  assert.equal(outerError, null);
});

// 16
test("function with side effects still runs before error", async () => {
  let counter = 0;
  const err = new Error("side-effect");
  const [data, error] = await tryCatch(() => {
    counter++;
    throw err;
  });

  assert.equal(counter, 1);
  assert.equal(data, null);
  assert.equal(error, err);
});

// 17
test("tryCatch can be reused with same function multiple times", async () => {
  let calls = 0;
  const fn = () => {
    calls++;
    return calls;
  };

  const [d1, e1] = await tryCatch(fn);
  const [d2, e2] = await tryCatch(fn);
  const [d3, e3] = await tryCatch(fn);

  assert.deepEqual([d1, d2, d3], [1, 2, 3]);
  assert.equal(e1, null);
  assert.equal(e2, null);
  assert.equal(e3, null);
});

// 18
test("async function with delay still works", async () => {
  const [data, error] = await tryCatch(async () => {
    await new Promise(resolve => setTimeout(resolve, 10));
    return "after-delay";
  });

  assert.equal(data, "after-delay");
  assert.equal(error, null);
});

// 19
test("function returning a promise that resolves is handled", async () => {
  const [data, error] = await tryCatch(() => Promise.resolve(99));
  assert.equal(data, 99);
  assert.equal(error, null);
});

// 20
test("function returning a promise that rejects is handled", async () => {
  const [data, error] = await tryCatch(() => Promise.reject("p-reject"));
  assert.equal(data, null);
  assert.equal(error, "p-reject");
});
