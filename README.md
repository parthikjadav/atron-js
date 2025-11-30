# atron-js

Utility toolkit for JavaScript & TypeScript.  
`atron-js` gives you a focused set of clear, well-tested helpers for working with strings, numbers, and time in projects of any size.

---

[![Join Community](https://github.com/parthikjadav/atron-js/assets/discord.svg)](https://discord.gg/xqgmDXgked)

## Features

- **Simple, readable code** – written with clear, explicit logic.
- **TypeScript first** – full type definitions out of the box.
- **Tiny surface area** – a handful of core utilities instead of a huge API.
- **Well-tested** – uses Node's built-in test runner with lots of test cases.

---

## Installation

<details>
<summary>Install</summary>

```bash
npm install atron-js
```

</details>

`atron-js` supports both **ES modules** and **CommonJS** in Node and bundlers.

<details>
<summary>Import examples</summary>

```ts
// ESM / TypeScript
import { tryCatch, getJSON } from "atron-js";

// CommonJS
const { tryCatch, getJSON } = require("atron-js");
```

</details>

Fetch-based helpers (`getJSON`, `postJSON`, etc.) require environments with a
global `fetch` implementation (for example **Node 18+** or modern browsers).

---

## Quick start

### TypeScript / modern JavaScript (ES modules)

<details>
<summary>Quick start code</summary>

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

console.log(capitalize("hello")); // "Hello"
console.log(reverse("abc")); // "cba"
console.log(isEmpty("   ")); // true

console.log(randomNumber(1, 6)); // e.g. 4
console.log(isEven(10)); // true
console.log(clamp(150, 0, 100)); // 100

console.log(unique([1, 2, 2, 3])); // [1, 2, 3]
console.log(chunk([1, 2, 3, 4, 5], 2)); // [[1, 2], [3, 4], [5]]
console.log(shuffle([1, 2, 3, 4])); // e.g. [3, 1, 4, 2]
console.log(flatten([1, [2, [3, 4]]])); // [1, 2, 3, 4]

await delay(1000);
console.log(formatTime(new Date())); // e.g. "14:05"
```

</details>

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

<details>
<summary>Import pattern</summary>

```ts
import { ... } from "atron-js";
```

</details>

### Error handling

#### `tryCatch<T>(fn: () => Promise<T> | T): Promise<[T | null, unknown]>`

Wraps a value-returning or promise-returning function and returns a tuple
`[data, error]` instead of throwing.

<details>
<summary>Example</summary>

```ts
import { tryCatch, getJSON } from "atron-js";

const [user, err] = await tryCatch(() => getJSON<User>("/api/user/1"));
if (err) {
  // handle error
} else {
  console.log(user.id);
}
```

</details>

### Arrays

#### `unique<T>(arr: T[]): T[]`

Returns a new array with duplicate values removed.

<details>
<summary>Examples</summary>

```ts
unique([1, 2, 2, 3, 3, 3]); // [1, 2, 3]
unique(["a", "b", "a", "c"]); // ["a", "b", "c"]
unique([]); // []
```

</details>

**How it works:**

- Uses `Set` to efficiently remove duplicates while preserving order.

---

#### `chunk<T>(arr: T[], size: number): T[][]`

Splits an array into smaller fixed-size groups.

<details>
<summary>Examples</summary>

```ts
chunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]
chunk([1, 2, 3, 4], 2); // [[1, 2], [3, 4]]
chunk([1, 2, 3], 5); // [[1, 2, 3]]
```

</details>

**How it works:**

- The last chunk may contain fewer elements if the array length is not evenly divisible by the chunk size.

---

#### `shuffle<T>(arr: T[]): T[]`

Randomizes the order of elements in the array.

<details>
<summary>Examples</summary>

```ts
shuffle([1, 2, 3, 4]); // e.g. [3, 1, 4, 2]
shuffle(["a", "b", "c"]); // e.g. ["c", "a", "b"]
```

</details>

**How it works:**

- Uses the Fisher-Yates shuffle algorithm to ensure uniform distribution.
- Returns a new array without modifying the original.

---

#### `flatten<T>(arr: any[]): T[]`

Flattens nested arrays of any depth into a single-level array.

<details>
<summary>Examples</summary>

```ts
flatten([1, [2, [3, 4]]]); // [1, 2, 3, 4]
flatten([
  [1, 2],
  [3, 4],
]); // [1, 2, 3, 4]
flatten([1, 2, 3]); // [1, 2, 3]
```

</details>

**How it works:**

- Recursively flattens all nested arrays regardless of nesting depth.

---

### Objects

#### `deepClone<T>(value: T): T`

Creates a deep copy of a value, supporting nested arrays, plain objects, `Date`, and `RegExp`.

<details>
<summary>Example</summary>

```ts
import { deepClone } from "atron-js";

const original = { user: { id: 1 }, date: new Date() };
const copy = deepClone(original);

console.log(original === copy); // false
console.log(original.user === copy.user); // false (nested object is new instance)
```

</details>

**Caveats:**

- **Circular references** are not supported.
- Complex types like `Map`, `Set`, or functions are not cloned (they are copied by reference or ignored).

---

#### `deepEqual(a: unknown, b: unknown): boolean`

Checks if two values are deeply equal in structure and value. Supports nested objects, arrays, `Date`, and `RegExp`.

<details>
<summary>Example</summary>

```ts
import { deepEqual } from "atron-js";

deepEqual({ a: [1, 2] }, { a: [1, 2] }); // true
deepEqual(new Date("2023-01-01"), new Date("2023-01-01")); // true
deepEqual({ x: 1 }, { x: 2 }); // false
```

</details>

---

### Functions

#### `memoize<T>(fn: T, options?: { ttlMs?: number }): T`

Wraps a function to cache its results based on the arguments provided. Useful for expensive calculations or repetitive lookups.

<details>
<summary>Examples</summary>

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
```

</details>

**Caveats:**

- Uses `JSON.stringify` internally to generate cache keys. This means `{ a: 1, b: 2 }` and `{ b: 2, a: 1 }` might be treated as different keys depending on JS engine key ordering, though usually consistent for simple objects.
- Not suitable for functions taking arguments that cannot be JSON stringified (like Functions or circular objects).

---

#### `debounce<T extends (...args: any[]) => any>(fn: T, ms?: number, options?: { leading?: boolean; trailing?: boolean; }): (...args: Parameters<T>) => void`

Creates a debounced version of a function.

<details>
<summary>Examples</summary>

```ts
import { debounce } from "atron-js";

// Trailing (default): fires once after silence
const onResize = debounce(() => console.log("resized"), 200);
window.addEventListener("resize", onResize);

// Leading: fire immediately, no trailing by default
const onInputImmediate = debounce(val => console.log("immediate:", val), 300, { leading: true });
onInputImmediate("a"); // logs immediately

// Leading + trailing: first immediately, last after wait
const onScroll = debounce(() => console.log("scroll"), 100, { leading: true, trailing: true });
```

</details>

---

#### `throttle<T extends (...args: any[]) => any>(fn: T, ms?: number, options?: { leading?: boolean; trailing?: boolean; }): (...args: Parameters<T>) => void`

Ensures a function runs at most once every `ms` milliseconds.

<details>
<summary>Examples</summary>

```ts
import { throttle } from "atron-js";

// Default: leading and trailing
const onScroll = throttle(() => console.log("scroll"), 100);
window.addEventListener("scroll", onScroll);

// Only trailing calls
const onDrag = throttle(() => console.log("drag"), 50, { leading: false, trailing: true });
```

</details>

---

### Fetch helpers

#### `getJSON<T>(url: string, options?: GetJSONOptions): Promise<T>`

Fetch JSON from a URL with status checking, content-type validation, and
optional timeout.

<details>
<summary>Example</summary>

```ts
import { getJSON } from "atron-js";

const user = await getJSON<User>("https://api.example.com/user/1", {
  timeoutMs: 5000,
});
```

</details>

#### `postJSON<TBody, TResponse>(url: string, body: TBody, options?: PostJSONOptions): Promise<TResponse>`

Send a JSON `POST` request and parse the JSON response.

<details>
<summary>Example</summary>

```ts
import { postJSON } from "atron-js";

const created = await postJSON("https://api.example.com/users", {
  name: "Atron",
});
```

</details>

#### `retry<T>(fn: () => Promise<T>, attempts: number, delayMs?: number): Promise<T>`

Retry an async function a fixed number of times before failing.

<details>
<summary>Example</summary>

```ts
import { retry, getJSON } from "atron-js";

const data = await retry(() => getJSON("https://api.example.com/flaky"), 3, 250);
```

</details>

#### `timeout<T>(promise: Promise<T>, ms: number, message?: string): Promise<T>`

Wrap a promise and reject with a timeout error if it takes too long.

<details>
<summary>Example</summary>

```ts
import { timeout, getJSON } from "atron-js";

const data = await timeout(getJSON("/slow-endpoint"), 2000);
```

</details>

#### `sleep(ms: number): Promise<void>`

Sleep for a given number of milliseconds.

<details>
<summary>Example</summary>

```ts
import { sleep } from "atron-js";

await sleep(500);
```

</details>

#### `sequence<T>(tasks: Array<() => Promise<T>>): Promise<T[]>`

Run async tasks one-by-one and collect their results.

<details>
<summary>Example</summary>

```ts
import { sequence, getJSON } from "atron-js";

const urls = ["/step1", "/step2", "/step3"];
const tasks = urls.map((url) => () => getJSON(url));
const results = await sequence(tasks);
```

</details>

#### `parallel<T>(tasks: Array<() => Promise<T>>, limit?: number): Promise<T[]>`

Run async tasks in parallel with an optional concurrency limit.

<details>
<summary>Example</summary>

```ts
import { parallel, getJSON } from "atron-js";

const urls = ["/a", "/b", "/c", "/d"];
const tasks = urls.map((url) => () => getJSON(url));
const results = await parallel(tasks, 2); // at most 2 at a time
```

</details>

#### `batch<T>(items: T[], size: number): T[][]`

Split an array into evenly sized batches.

<details>
<summary>Example</summary>

```ts
import { batch } from "atron-js";

const groups = batch([1, 2, 3, 4, 5], 2); // [[1,2],[3,4],[5]]
```

</details>

---

### Logging helpers

#### `success(message: string): void`

Log a checkmark with the message. Useful for positive status updates.

<details>
<summary>Example</summary>

```ts
import { success } from "atron-js";

success("Deployment finished");
// ✔ Deployment finished
```

</details>

#### `error(message: string): void`

Log an error message with a leading "✖". Does **not** throw; only logs.

<details>
<summary>Example</summary>

```ts
import { error } from "atron-js";

error("Failed to connect to database");
// ✖ Failed to connect to database
```

</details>

#### `warning(message: string): void`

Log a warning with a "⚠ Warning:" prefix.

<details>
<summary>Example</summary>

```ts
import { warning } from "atron-js";

warning("Using default configuration");
// ⚠ Warning: Using default configuration
```

</details>

#### `info(message: string): void`

Log an informational message with a "ℹ Info:" prefix.

<details>
<summary>Example</summary>

```ts
import { info } from "atron-js";

info("Server listening on port 3000");
// ℹ Info: Server listening on port 3000
```

</details>

#### `debug(message: string): void`

Log a debug message with a "🐞 Debug:" prefix. Only logs when
`NODE_ENV` is **not** `"production"`.

<details>
<summary>Example</summary>

```ts
import { debug } from "atron-js";

debug("Got payload: " + JSON.stringify(payload));
// 🐞 Debug: Got payload ... (only when NODE_ENV !== "production")
```

</details>

#### `title(message: string): void`

Print a title to separate sections.

<details>
<summary>Example</summary>

```ts
import { title } from "atron-js";

title("Build Summary");
```

</details>

#### `box(message: string): void`

Wrap a message (optionally multi-line) in an ASCII box.

<details>
<summary>Example</summary>

```ts
import { box } from "atron-js";

box("Deployment complete\nAll services healthy");
```

</details>

#### `banner(text: string): void`

Print a simple uppercase banner framed by `=` characters.

<details>
<summary>Example</summary>

```ts
import { banner } from "atron-js";

banner("ATRON JS");
```

</details>

#### `timestamp(message: string): void`

Log a message prefixed with a `[HH:MM:SS]` timestamp.

<details>
<summary>Example</summary>

```ts
import { timestamp } from "atron-js";

timestamp("Job finished");
// [12:34:56] Job finished
```

</details>

#### `logJSON(obj: unknown): void`

Pretty-print JSON in a readable multi-line format.

<details>
<summary>Example</summary>

```ts
import { logJSON } from "atron-js";

logJSON({ id: 1, name: "Atron", active: true });
```

</details>

---

### Strings

#### `capitalize(text: string): string`

Capitalizes the **first character** of the string. If the string is empty, returns `""`.

<details>
<summary>Examples</summary>

```ts
capitalize("hello"); // "Hello"
capitalize("hELLO"); // "HELLO"
capitalize(""); // ""
capitalize("  space"); // "  space" (leading space is unchanged)
```

</details>

**How it works:**

- If `text` is falsy (empty string), it returns `""`.
- Otherwise, it uppercases `text.charAt(0)` and appends the rest of the string.

---

#### `reverse(text: string): string`

Returns a new string with characters in reverse order.

<details>
<summary>Examples</summary>

```ts
reverse("abc"); // "cba"
reverse("racecar"); // "racecar"
reverse("hello world"); // "dlrow olleh"
```

</details>

**How it works:**

- Splits the string into an array of characters, reverses the array, and joins it back.

---

#### `camelCase(text: string): string`

Converts a string into camelCase.

<details>
<summary>Examples</summary>

```ts
camelCase("hello world"); // "helloWorld"
camelCase("hello-world_test"); // "helloWorldTest"
camelCase("--Hello WORLD--"); // "helloWorld"
camelCase("version-2-update"); // "version2Update"
```

</details>

---

#### `kebabCase(text: string): string`

Converts a string into kebab-case.

<details>
<summary>Examples</summary>

```ts
kebabCase("hello world"); // "hello-world"
kebabCase("helloWorld"); // "hello-world"
kebabCase("XMLHttpRequest"); // "xml-http-request"
kebabCase("ver1Test2"); // "ver1-test2"
kebabCase("--héllo Wørld--"); // "héllo-wørld"
```

</details>

---

#### `isEmpty(text: string): boolean`

Checks if a string is **empty** or contains **only whitespace**.

<details>
<summary>Examples</summary>

```ts
isEmpty(""); // true
isEmpty("   "); // true
isEmpty("\n\t"); // true
isEmpty("hello"); // false
isEmpty("  hello  "); // false
```

</details>

**How it works:**

- If `text` is falsy or `text.trim().length === 0`, it returns `true`.

---

#### `toSlug(text: string, options?: ToSlugOptions): string`

Convert arbitrary text into a URL/path-friendly slug.

<details>
<summary>Examples</summary>

```ts
import { toSlug } from "atron-js";

toSlug("Hello World"); // "hello-world"
toSlug("École", { removeDiacritics: true }); // "ecole"
toSlug("Привет мир", { allowUnicode: true }); // "привет-мир"
toSlug("$%#", { fallback: "n-a" }); // "n-a"
toSlug("Hello World", { separator: "_" }); // "hello_world"
toSlug("Hello World", { lowercase: false }); // "Hello-World"
toSlug("abcdef ghi", { maxLength: 5 }); // "abcde"
```

</details>

`ToSlugOptions`:

- `separator?: string` – character used between words (default `"-"`).
- `lowercase?: boolean` – lowercases the slug when `true` (default `true`).
- `removeDiacritics?: boolean` – strip accents/diacritics when `true` (default `true`).
- `maxLength?: number` – optional max length; trailing separators are trimmed after truncation.
- `allowUnicode?: boolean` – when `true`, keep non-Latin letters instead of removing them (default `false`).
- `fallback?: string` – value to return if the slug would otherwise be empty (default `""`).

---

### Numbers

#### `randomNumber(min: number, max: number): number`

Returns a **random integer** between `min` and `max` (inclusive).

<details>
<summary>Examples</summary>

```ts
randomNumber(1, 6); // 1–6, like a dice roll
randomNumber(0, 0); // always 0
randomNumber(-5, 5); // -5..5
```

</details>

**How it works:**

- Uses `Math.random()` and `Math.floor()` to map the random value into the `[min, max]` range.

> Note: This is a simple helper, not cryptographically secure.

---

#### `isEven(num: number): boolean`

Returns `true` if the number is even, `false` otherwise.

<details>
<summary>Examples</summary>

```ts
isEven(2); // true
isEven(3); // false
isEven(0); // true
isEven(-4); // true
```

</details>

**How it works:**

- Uses the remainder operator: `num % 2 === 0`.

---

#### `clamp(num: number, min: number, max: number): number`

Restricts a number to stay within the `[min, max]` range.

<details>
<summary>Examples</summary>

```ts
clamp(5, 0, 10); // 5 (already in range)
clamp(-5, 0, 10); // 0 (clamped up)
clamp(15, 0, 10); // 10 (clamped down)
```

</details>

**How it works:**

- First takes `Math.max(num, min)`, then `Math.min(result, max)`.

---

### Time

#### `delay(ms: number): Promise<void>`

"Sleep" for the given number of milliseconds. This is useful in async code, demos, or simple retry loops.

<details>
<summary>Example</summary>

```ts
console.log("Start");
await delay(1000);
console.log("One second later");
```

</details>

**How it works:**

- Wraps `setTimeout` in a `Promise` that resolves after `ms` milliseconds.

---

#### `formatTime(date: Date): string`

Formats a `Date` into a simple 24-hour `"HH:MM"` string using your **local time zone**.

<details>
<summary>Example</summary>

```ts
const date = new Date(2020, 0, 1, 14, 5); // 14:05 local time
formatTime(date); // "14:05"
```

</details>

**How it works:**

- Uses `date.toTimeString()` and slices the first 5 characters (`HH:MM`).

---

## Project structure

<details>
<summary>Project structure</summary>

```text
src/
  index.ts           # Re-exports all public utilities
  utils/
    strings.ts       # String helpers (capitalize, camelCase, kebabCase, toSlug, ...)
    numbers.ts       # Number helpers (randomNumber, isEven, clamp)
    arrays.ts        # Array helpers (unique, chunk, shuffle, flatten, batch)
    time.ts          # Time helpers (delay, formatTime)
    object.ts        # Object helpers (deepClone, deepEqual)
    memoize.ts       # Function memoization helper
    debounce.ts
    throttle.ts
  handlers/
    tryCatch.ts      # Error-handling helper returning [data, error]
  fetch/
    index.ts         # getJSON, postJSON, retry, timeout, sequence, parallel, sleep, batch
  log/
    *.ts             # Console logging helpers (success, error, warning, info, debug, ...)
  types/
    fetch.ts         # Types for fetch helpers
    handlers.ts      # Types for handlers

tests/               # Node built-in tests (node:test + tsx) for all utilities
dist/                # Compiled output (built by tsup)
```

</details>

---

## Testing

This project uses **Node's built-in test runner** (`node:test`) with `tsx` for TypeScript.

<details>
<summary>Run tests</summary>

```bash
npm test
```

</details>

Requirements:

- **Node.js 18+** (Node 20+ recommended) for the Node test runner.

---

## Contributing

Contributions are welcome! Please read the [contribution guide](./CONTRIBUTING.md)
for details on setup, testing, and proposing changes.

If you want to discuss ideas or coordinate work in real time, you can
join the Discord server: https://discord.gg/xqgmDXgked

---

## License

MIT – see the license in `package.json`.
