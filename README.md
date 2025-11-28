# atron-js

Utility toolkit for JavaScript & TypeScript.  
`atron-js` gives you a focused set of clear, well-tested helpers for working with strings, numbers, and time in projects of any size.

---

## Features

- **Simple, readable code** – written with clear, explicit logic.
- **TypeScript first** – full type definitions out of the box.
- **Tiny surface area** – a handful of core utilities instead of a huge API.
- **Well-tested** – uses Node's built-in test runner with lots of test cases.

---

## Installation

```bash
npm install atron-js
```

`atron-js` supports both **ES modules** and **CommonJS** in Node and bundlers.

```ts
// ESM / TypeScript
import { tryCatch, getJSON } from "atron-js";

// CommonJS
const { tryCatch, getJSON } = require("atron-js");
```

Fetch-based helpers (`getJSON`, `postJSON`, etc.) require environments with a
global `fetch` implementation (for example **Node 18+** or modern browsers).

---

## Quick start

### TypeScript / modern JavaScript (ES modules)

```ts
import {
  capitalize,
  reverse,
  isEmpty,
  randomNumber,
  isEven,
  clamp,
  delay,
  formatTime,
  unique,
  chunk,
  shuffle,
  flatten,
} from "atron-js";

console.log(capitalize("hello"));      // "Hello"
console.log(reverse("abc"));           // "cba"
console.log(isEmpty("   "));           // true

console.log(randomNumber(1, 6));        // e.g. 4
console.log(isEven(10));                // true
console.log(clamp(150, 0, 100));        // 100

console.log(unique([1, 2, 2, 3]));      // [1, 2, 3]
console.log(chunk([1, 2, 3, 4, 5], 2)); // [[1, 2], [3, 4], [5]]
console.log(shuffle([1, 2, 3, 4]));     // e.g. [3, 1, 4, 2]
console.log(flatten([1, [2, [3, 4]]])); // [1, 2, 3, 4]

await delay(1000);
console.log(formatTime(new Date()));    // e.g. "14:05"
```

---

## Why `atron-js`?

`atron-js` is designed as a small, focused utility library:

- The implementations are short and readable – you can open the source and understand them quickly.
- The functions do **one clear thing** with sensible, predictable behavior.
- The test suite covers many real-world cases to keep behavior reliable.

Use it for:

- Web and backend applications.
- Scripts, tools, and CLIs.
- Libraries, SDKs, or other shared codebases.

---

## API reference

All functions are exported from the root module:

```ts
import { ... } from "atron-js";
```

### Error handling

#### `tryCatch<T>(fn: () => Promise<T> | T): Promise<[T | null, unknown]>`

Wraps a value-returning or promise-returning function and returns a tuple
`[data, error]` instead of throwing.

```ts
import { tryCatch, getJSON } from "atron-js";

const [user, err] = await tryCatch(() => getJSON<User>("/api/user/1"));
if (err) {
  // handle error
} else {
  console.log(user.id);
}
```


### Arrays

#### `unique<T>(arr: T[]): T[]`

Returns a new array with duplicate values removed.

```ts
unique([1, 2, 2, 3, 3, 3]);     // [1, 2, 3]
unique(["a", "b", "a", "c"]);   // ["a", "b", "c"]
unique([]);                     // []
```

**How it works:**
- Uses `Set` to efficiently remove duplicates while preserving order.

---

#### `chunk<T>(arr: T[], size: number): T[][]`

Splits an array into smaller fixed-size groups.

```ts
chunk([1, 2, 3, 4, 5], 2);      // [[1, 2], [3, 4], [5]]
chunk([1, 2, 3, 4], 2);         // [[1, 2], [3, 4]]
chunk([1, 2, 3], 5);            // [[1, 2, 3]]
```

**How it works:**
- The last chunk may contain fewer elements if the array length is not evenly divisible by the chunk size.

---

#### `shuffle<T>(arr: T[]): T[]`

Randomizes the order of elements in the array.

```ts
shuffle([1, 2, 3, 4]);          // e.g. [3, 1, 4, 2]
shuffle(["a", "b", "c"]);        // e.g. ["c", "a", "b"]
```

**How it works:**
- Uses the Fisher-Yates shuffle algorithm to ensure uniform distribution.
- Returns a new array without modifying the original.

---

#### `flatten<T>(arr: any[]): T[]`

Flattens nested arrays of any depth into a single-level array.

```ts
flatten([1, [2, [3, 4]]]);      // [1, 2, 3, 4]
flatten([[1, 2], [3, 4]]);      // [1, 2, 3, 4]
flatten([1, 2, 3]);             // [1, 2, 3]
```

**How it works:**
- Recursively flattens all nested arrays regardless of nesting depth.

---

### Objects

#### `deepClone<T>(value: T): T`

Creates a deep copy of a value, supporting nested arrays, plain objects, `Date`, and `RegExp`.

```ts
import { deepClone } from "atron-js";

const original = { user: { id: 1 }, date: new Date() };
const copy = deepClone(original);

console.log(original === copy); // false
console.log(original.user === copy.user); // false (nested object is new instance)
````

**Caveats:**

  - **Circular references** are not supported.
  - Complex types like `Map`, `Set`, or functions are not cloned (they are copied by reference or ignored).

-----

#### `deepEqual(a: unknown, b: unknown): boolean`

Checks if two values are deeply equal in structure and value. Supports nested objects, arrays, `Date`, and `RegExp`.

```ts
import { deepEqual } from "atron-js";

deepEqual({ a: [1, 2] }, { a: [1, 2] }); // true
deepEqual(new Date("2023-01-01"), new Date("2023-01-01")); // true
deepEqual({ x: 1 }, { x: 2 }); // false
```

---

### Functions

#### `memoize<T>(fn: T, options?: { ttlMs?: number }): T`

Wraps a function to cache its results based on the arguments provided. Useful for expensive calculations or repetitive lookups.

```ts
import { memoize } from "atron-js";

// Basic usage
const heavyCalc = (num: number) => {
  console.log("Computing...");
  return num * 2;
};
const cachedCalc = memoize(heavyCalc);

cachedCalc(5); // Logs "Computing...", returns 10
cachedCalc(5); // Returns 10 (no log)

// Usage with Time-To-Live (TTL)
const fetchStatus = memoize(async () => {
  return await getJSON("/status");
}, { ttlMs: 5000 }); // Cache expires after 5 seconds

**Caveats:**
- Uses `JSON.stringify` internally to generate cache keys. This means `{ a: 1, b: 2 }` and `{ b: 2, a: 1 }` might be treated as different keys depending on JS engine key ordering, though usually consistent for simple objects.
- Not suitable for functions taking arguments that cannot be JSON stringified (like Functions or circular objects).

---

### Fetch helpers

#### `getJSON<T>(url: string, options?: GetJSONOptions): Promise<T>`

Fetch JSON from a URL with status checking, content-type validation, and
optional timeout.

```ts
import { getJSON } from "atron-js";

const user = await getJSON<User>("https://api.example.com/user/1", {
  timeoutMs: 5000,
});
```

#### `postJSON<TBody, TResponse>(url: string, body: TBody, options?: PostJSONOptions): Promise<TResponse>`

Send a JSON `POST` request and parse the JSON response.

```ts
import { postJSON } from "atron-js";

const created = await postJSON("https://api.example.com/users", {
  name: "Atron",
});
```

#### `retry<T>(fn: () => Promise<T>, attempts: number, delayMs?: number): Promise<T>`

Retry an async function a fixed number of times before failing.

```ts
import { retry, getJSON } from "atron-js";

const data = await retry(
  () => getJSON("https://api.example.com/flaky"),
  3,
  250
);
```

#### `timeout<T>(promise: Promise<T>, ms: number, message?: string): Promise<T>`

Wrap a promise and reject with a timeout error if it takes too long.

```ts
import { timeout, getJSON } from "atron-js";

const data = await timeout(getJSON("/slow-endpoint"), 2000);
```

#### `sleep(ms: number): Promise<void>`

Sleep for a given number of milliseconds.

```ts
import { sleep } from "atron-js";

await sleep(500);
```

#### `sequence<T>(tasks: Array<() => Promise<T>>): Promise<T[]>`

Run async tasks one-by-one and collect their results.

```ts
import { sequence, getJSON } from "atron-js";

const urls = ["/step1", "/step2", "/step3"];
const tasks = urls.map(url => () => getJSON(url));
const results = await sequence(tasks);
```

#### `parallel<T>(tasks: Array<() => Promise<T>>, limit?: number): Promise<T[]>`

Run async tasks in parallel with an optional concurrency limit.

```ts
import { parallel, getJSON } from "atron-js";

const urls = ["/a", "/b", "/c", "/d"]; 
const tasks = urls.map(url => () => getJSON(url));
const results = await parallel(tasks, 2); // at most 2 at a time
```

#### `batch<T>(items: T[], size: number): T[][]`

Split an array into evenly sized batches.

```ts
import { batch } from "atron-js";

const groups = batch([1, 2, 3, 4, 5], 2); // [[1,2],[3,4],[5]]
```

---

### Logging helpers

#### `success(message: string): void`

Log a checkmark with the message. Useful for positive status updates.

```ts
import { success } from "atron-js";

success("Deployment finished");
// ✔ Deployment finished
```

#### `error(message: string): void`

Log an error message with a leading "✖". Does **not** throw; only logs.

```ts
import { error } from "atron-js";

error("Failed to connect to database");
// ✖ Failed to connect to database
```

#### `warning(message: string): void`

Log a warning with a "⚠ Warning:" prefix.

```ts
import { warning } from "atron-js";

warning("Using default configuration");
// ⚠ Warning: Using default configuration
```

#### `info(message: string): void`

Log an informational message with a "ℹ Info:" prefix.

```ts
import { info } from "atron-js";

info("Server listening on port 3000");
// ℹ Info: Server listening on port 3000
```

#### `debug(message: string): void`

Log a debug message with a "🐞 Debug:" prefix. Only logs when
`NODE_ENV` is **not** `"production"`.

```ts
import { debug } from "atron-js";

debug("Got payload: " + JSON.stringify(payload));
// 🐞 Debug: Got payload ... (only when NODE_ENV !== "production")
```

#### `title(message: string): void`

Print a title to separate sections.

```ts
import { title } from "atron-js";

title("Build Summary");
```

#### `box(message: string): void`

Wrap a message (optionally multi-line) in an ASCII box.

```ts
import { box } from "atron-js";

box("Deployment complete\nAll services healthy");
```

#### `banner(text: string): void`

Print a simple uppercase banner framed by `=` characters.

```ts
import { banner } from "atron-js";

banner("ATRON JS");
```

#### `timestamp(message: string): void`

Log a message prefixed with a `[HH:MM:SS]` timestamp.

```ts
import { timestamp } from "atron-js";

timestamp("Job finished");
// [12:34:56] Job finished
```

#### `logJSON(obj: unknown): void`

Pretty-print JSON in a readable multi-line format.

```ts
import { logJSON } from "atron-js";

logJSON({ id: 1, name: "Atron", active: true });
```

---

### Strings

#### `capitalize(text: string): string`

Capitalizes the **first character** of the string. If the string is empty, returns `""`.

```ts
capitalize("hello");          // "Hello"
capitalize("hELLO");          // "HELLO"
capitalize("");               // ""
capitalize("  space");        // "  space" (leading space is unchanged)
```

**How it works:**
- If `text` is falsy (empty string), it returns `""`.
- Otherwise, it uppercases `text.charAt(0)` and appends the rest of the string.

---

#### `reverse(text: string): string`

Returns a new string with characters in reverse order.

```ts
reverse("abc");               // "cba"
reverse("racecar");           // "racecar"
reverse("hello world");       // "dlrow olleh"
```

**How it works:**
- Splits the string into an array of characters, reverses the array, and joins it back.

---

#### `isEmpty(text: string): boolean`

Checks if a string is **empty** or contains **only whitespace**.

```ts
isEmpty("");                  // true
isEmpty("   ");               // true
isEmpty("\n\t");              // true
isEmpty("hello");             // false
isEmpty("  hello  ");         // false
```

**How it works:**
- If `text` is falsy or `text.trim().length === 0`, it returns `true`.

---

### Numbers

#### `randomNumber(min: number, max: number): number`

Returns a **random integer** between `min` and `max` (inclusive).

```ts
randomNumber(1, 6);            // 1–6, like a dice roll
randomNumber(0, 0);            // always 0
randomNumber(-5, 5);           // -5..5
```

**How it works:**
- Uses `Math.random()` and `Math.floor()` to map the random value into the `[min, max]` range.

> Note: This is a simple helper, not cryptographically secure.

---

#### `isEven(num: number): boolean`

Returns `true` if the number is even, `false` otherwise.

```ts
isEven(2);                     // true
isEven(3);                     // false
isEven(0);                     // true
isEven(-4);                    // true
```

**How it works:**
- Uses the remainder operator: `num % 2 === 0`.

---

#### `clamp(num: number, min: number, max: number): number`

Restricts a number to stay within the `[min, max]` range.

```ts
clamp(5, 0, 10);               // 5 (already in range)
clamp(-5, 0, 10);              // 0 (clamped up)
clamp(15, 0, 10);              // 10 (clamped down)
```

**How it works:**
- First takes `Math.max(num, min)`, then `Math.min(result, max)`.

---

### Time

#### `delay(ms: number): Promise<void>`

"Sleep" for the given number of milliseconds. This is useful in async code, demos, or simple retry loops.

```ts
console.log("Start");
await delay(1000);
console.log("One second later");
```

**How it works:**
- Wraps `setTimeout` in a `Promise` that resolves after `ms` milliseconds.

---

#### `formatTime(date: Date): string`

Formats a `Date` into a simple 24-hour `"HH:MM"` string using your **local time zone**.

```ts
const date = new Date(2020, 0, 1, 14, 5); // 14:05 local time
formatTime(date);               // "14:05"
```

**How it works:**
- Uses `date.toTimeString()` and slices the first 5 characters (`HH:MM`).

---

## Project structure

```text
src/
  index.ts          # Re-exports all utilities
  utils/
    strings.ts      # String helpers
    numbers.ts      # Number helpers
    time.ts         # Time helpers
    arrays.ts       # Array helpers
tests/              # Node built-in tests (node:test)
dist/               # Compiled output (generated by tsc)
```

---

## Testing

This project uses **Node's built-in test runner** (`node:test`) with `tsx` for TypeScript.

```bash
npm test
```

Requirements:

- **Node.js 18+** (Node 20+ recommended) for the Node test runner.

---

## Contributing

Contributions are welcome! Please read the [contribution guide](./CONTRIBUTING.md)
for details on setup, testing, and proposing changes.

If you want to discuss ideas or coordinate work in real time, you can
join the Discord server: https://discord.gg/eAgnBPUf

---

## License

MIT – see the license in `package.json`.
