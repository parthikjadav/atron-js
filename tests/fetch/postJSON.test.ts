import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { postJSON } from "../../src/fetch";

interface RecordedRequest {
  url: string;
  init: RequestInit | undefined;
}

interface MockResponseConfig {
  status?: number;
  body?: unknown;
  contentType?: string;
}

/**
 * A mock fetch wrapper that records requests and supports AbortSignal/Timeouts.
 */
function withRecordingFetch(
  responses: Array<MockResponseConfig>,
  fn: (records: RecordedRequest[]) => Promise<void>
) {
  return async () => {
    const originalFetch = (globalThis as any).fetch;
    const records: RecordedRequest[] = [];
    let callIndex = 0;

    (globalThis as any).fetch = async (url: string, init?: RequestInit) => {
      // 1. Record the request
      records.push({ url, init });

      // 2. Handle AbortSignal (Crucial for timeout tests)
      if (init?.signal?.aborted) {
        throw new DOMException("The operation was aborted", "AbortError");
      }

      // 3. Prepare response data
      const config = responses[Math.min(callIndex++, responses.length - 1)] || {};
      const { status = 200, body = { ok: true }, contentType = "application/json" } = config;

      // 4. Simulate network delay/race with signal
      if (init?.signal) {
        await new Promise<void>((resolve, reject) => {
          const abortHandler = () => reject(new DOMException("The operation was aborted", "AbortError"));
          init.signal!.addEventListener("abort", abortHandler);
          // Resolve immediately in next tick to allow signal to fire if already aborted
          setImmediate(() => {
            init.signal!.removeEventListener("abort", abortHandler);
            resolve();
          });
        });
      }

      // 5. Return Mock Response
      return {
        ok: status >= 200 && status < 300,
        status,
        headers: {
          get(name: string) {
            if (name.toLowerCase() === "content-type") return contentType;
            return null;
          },
        },
        async json() {
          return body;
        },
        async text() {
          return JSON.stringify(body);
        }
      } as any;
    };

    try {
      await fn(records);
    } finally {
      (globalThis as any).fetch = originalFetch;
    }
  };
}

describe("postJSON", () => {
  
  test(
    "sends JSON body and returns parsed response",
    withRecordingFetch([{ body: { success: true } }], async (records) => {
      const result = await postJSON("https://example.com/post", { a: 1 });
      assert.deepEqual(result, { success: true });

      assert.equal(records.length, 1);
      const [req] = records;
      assert.equal(req.url, "https://example.com/post");
      assert.equal(req.init?.method, "POST");

      // Check Headers (postJSON uses Headers API now)
      const headers = req.init?.headers as Headers;
      assert.ok(headers instanceof Headers, "Headers should be a Headers object");
      assert.equal(headers.get("Content-Type"), "application/json");
      
      assert.equal(req.init?.body, JSON.stringify({ a: 1 }));
    })
  );

  test(
    "correctly serializes different bodies",
    withRecordingFetch(
      [
        { body: { id: 1 } },
        { body: { id: 2 } },
        { body: { id: 3 } },
        { body: { id: 4 } },
        { body: { id: 5 } },
      ],
      async (records) => {
        const bodies = [
          { a: 1 },
          { b: "two" },
          [1, 2, 3],
          { nested: { x: true } },
          null,
        ];

        const results: any[] = [];
        for (let i = 0; i < bodies.length; i++) {
          const res = await postJSON(`https://example.com/multi/${i}`, bodies[i]);
          results.push(res);
        }

        assert.deepEqual(results, [
          { id: 1 },
          { id: 2 },
          { id: 3 },
          { id: 4 },
          { id: 5 },
        ]);

        assert.equal(records.length, bodies.length);
        for (let i = 0; i < records.length; i++) {
          const { url, init } = records[i];
          assert.equal(url, `https://example.com/multi/${i}`);
          assert.equal(init?.method, "POST");
          
          const headers = init?.headers as Headers;
          assert.equal(headers.get("Content-Type"), "application/json");
          
          assert.equal(init?.body, JSON.stringify(bodies[i]));
        }
      }
    )
  );

  test(
    "allows overriding Content-Type header",
    withRecordingFetch([{ body: { ok: true } }], async (records) => {
      await postJSON(
        "https://example.com/custom-header",
        { a: 1 },
        { headers: { "Content-Type": "application/vnd.custom+json" } }
      );

      const [req] = records;
      const headers = req.init?.headers as Headers;
      assert.equal(headers.get("Content-Type"), "application/vnd.custom+json");
    })
  );

  test(
    "respects timeoutMs option",
    withRecordingFetch(
      [], // No response needed, we expect timeout
      async () => {
        // We override the fetch inside withRecordingFetch to strictly hang
        const originalFetch = (globalThis as any).fetch;
        (globalThis as any).fetch = (url: string, init: RequestInit) => {
          // Listen for abort signal to simulate real timeout behavior
          return new Promise((_, reject) => {
            if (init?.signal) {
              init.signal.addEventListener("abort", () => {
                reject(new DOMException("The operation was aborted", "AbortError"));
              });
            }
          });
        };

        try {
          await assert.rejects(
            postJSON("https://example.com/slow-post", { a: 1 }, { timeoutMs: 10 }),
            /timed out/
          );
        } finally {
          // Restore the recording fetch
          (globalThis as any).fetch = originalFetch;
        }
      }
    )
  );

});