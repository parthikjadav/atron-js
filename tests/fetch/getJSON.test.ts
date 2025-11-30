import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { getJSON } from "../../src";

// --- Mocking Infrastructure ---

interface MockResponseInit {
  ok: boolean;
  status: number;
  statusText?: string;
  headers?: Record<string, string>;
  body?: unknown;
}

function createMockResponse(init: MockResponseInit) {
  const headers = init.headers || { "content-type": "application/json" };
  return {
    ok: init.ok,
    status: init.status,
    statusText: init.statusText || "Mock Status",
    headers: {
      get(name: string) {
        return headers[name.toLowerCase()] ?? headers[name] ?? null;
      },
      has(name: string) {
        return (headers[name.toLowerCase()] ?? headers[name]) !== undefined;
      }
    },
    async json() {
      return init.body;
    },
    async text() {
      return typeof init.body === "string" ? init.body : JSON.stringify(init.body);
    }
  };
}

/**
 * Wraps global fetch with a mock implementation.
 * Supports AbortSignal to correctly test timeouts.
 */
function withMockFetch(
  impl: (url: string, init: RequestInit | undefined, callIndex: number) => Promise<MockResponseInit>,
  fn: () => Promise<void>
) {
  return async () => {
    const originalFetch = (globalThis as any).fetch;
    let callIndex = 0;

    (globalThis as any).fetch = async (url: string, init?: RequestInit) => {
      // 1. Support AbortSignal so we can test timeouts properly
      if (init?.signal?.aborted) {
        throw new DOMException("The operation was aborted", "AbortError");
      }

      const promise = impl(url, init, callIndex++);

      // 2. Race the mock implementation against the abort signal
      if (init?.signal) {
        return new Promise((resolve, reject) => {
          const abortHandler = () => reject(new DOMException("The operation was aborted", "AbortError"));
          init.signal!.addEventListener("abort", abortHandler);

          promise.then(
            (mock) => {
              init.signal!.removeEventListener("abort", abortHandler);
              resolve(createMockResponse(mock) as any);
            },
            (err) => {
              init.signal!.removeEventListener("abort", abortHandler);
              reject(err);
            }
          );
        });
      }

      const mock = await promise;
      return createMockResponse(mock) as any;
    };

    try {
      await fn();
    } finally {
      (globalThis as any).fetch = originalFetch;
    }
  };
}

// --- Tests ---

describe("getJSON", () => {
  
  test(
    "returns parsed JSON for multiple success cases",
    withMockFetch(async (url, _init, idx) => {
      const bodies = [
        { a: 1 },
        { b: "two" },
        [1, 2, 3],
        { nested: { value: true } },
        null,
        123,
        "text",
        false,
        { arr: [1, 2] },
        { mixed: [1, "two", { three: 3 }] },
      ];

      return {
        ok: true,
        status: 200,
        headers: { "content-type": "application/json" },
        body: bodies[idx],
      };
    }, async () => {
      const urls = Array.from({ length: 10 }, (_, i) => `https://example.com/success/${i}`);
      const expectedBodies = [
        { a: 1 },
        { b: "two" },
        [1, 2, 3],
        { nested: { value: true } },
        null,
        123,
        "text",
        false,
        { arr: [1, 2] },
        { mixed: [1, "two", { three: 3 }] },
      ];

      for (let i = 0; i < urls.length; i++) {
        const data = await getJSON(urls[i]);
        assert.deepEqual(data, expectedBodies[i]);
      }
    })
  );

  test(
    "throws for non-ok HTTP statuses",
    withMockFetch(async (url, _init, idx) => {
      const statuses = [400, 401, 403, 404, 500, 502, 503];
      return {
        ok: false,
        status: statuses[idx],
        headers: { "content-type": "application/json" },
        body: { error: "fail" },
      };
    }, async () => {
      const urls = [400, 401, 403, 404, 500, 502, 503].map(code => `https://example.com/status/${code}`);

      for (const url of urls) {
        // Updated regex to match new error message: "Request to ... failed with status ..."
        await assert.rejects(
          getJSON(url),
          /failed with status/
        );
      }
    })
  );

  test(
    "throws for non-JSON content-type",
    withMockFetch(async (_url, _init, idx) => {
      const contentTypes = [
        "text/plain",
        "text/html",
        "application/xml",
        "image/png",
        "application/octet-stream",
      ];
      return {
        ok: true,
        status: 200,
        headers: { "content-type": contentTypes[idx] },
        body: "not-json",
      };
    }, async () => {
      const urls = [0, 1, 2, 3, 4].map(i => `https://example.com/non-json/${i}`);

      for (const url of urls) {
        // Updated regex to match new error message: "Expected JSON from ..."
        await assert.rejects(
          getJSON(url),
          /Expected JSON from/
        );
      }
    })
  );

  test(
    "times out when fetch is too slow",
    withMockFetch(async () => {
      // Return a promise that never resolves
      // The AbortSignal in withMockFetch will catch the timeout abort
      return new Promise<MockResponseInit>(() => {});
    }, async () => {
      await assert.rejects(
        getJSON("https://example.com/slow", { timeoutMs: 10 }),
        /timed out/
      );
    })
  );

  test(
    "passes method and headers to fetch",
    withMockFetch(async (_url, init) => {
      assert.equal(init?.method, "PUT");
      
      // The new implementation normalizes headers to a Headers object
      const headers = init?.headers as Headers;
      assert.ok(headers instanceof Headers, "Should use Headers object");
      assert.equal(headers.get("X-Test"), "1");
      // It should also auto-add Accept: application/json
      assert.equal(headers.get("Accept"), "application/json");

      return {
        ok: true,
        status: 200,
        headers: { "content-type": "application/json" },
        body: { ok: true },
      };
    }, async () => {
      const data = await getJSON("https://example.com/with-options", {
        method: "PUT",
        headers: { "X-Test": "1" },
      });
      assert.deepEqual(data, { ok: true });
    })
  );

});