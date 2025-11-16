# Contributing to atron-js

Thanks for taking the time to contribute!

This guide explains how to set up the project, run tests, and propose changes in a way that keeps the library simple and reliable.

---

## Getting started

1. **Fork and clone** this repository.
2. Make sure you have **Node.js 18+** installed.
3. Install dependencies:

```bash
npm install
```

---

## Development workflow

### Running tests

The project uses **Node's built-in test runner** (`node:test`) with **tsx** for TypeScript.

```bash
npm test
```

Please ensure tests pass before opening a PR. If you add a new feature or change behavior, add or update tests under the `tests/` folder.

### Building the library

The library is built with **tsup**, producing both ESM and CommonJS outputs.

```bash
npm run build
```

This generates bundled files and type declarations in `dist/`.

For local development builds, you can run:

```bash
npm run dev
```

This starts tsup in watch mode.

### Local package testing

To test the library in another project without publishing:

```bash
npm run build
npm pack
```

Then, in your test project:

```bash
npm install ../atron-js/atron-js-1.1.0.tgz
```

---

## Code style & guidelines

- **TypeScript first**: all source lives in `src/` and is written in TypeScript.
- **Keep functions small and focused**: each utility should do one clear thing.
- **JSDoc for exported APIs**: every exported function should have a short JSDoc block with a description and at least one example.
- **No breaking changes without discussion**: if your change might break existing users, please open an issue first.

### Adding new utilities

When adding a new helper:

1. Place it in an appropriate module under `src/` (for example, `src/utils/` or `src/log/`).
2. Export it from `src/index.ts` so consumers can import it from `"atron-js"`.
3. Add tests in `tests/` that cover typical and edge cases.
4. Update the README API section with a short description and example.

---

## Commit messages

Use clear, descriptive commit messages, for example:

- `feat: add deepParse utility`
- `fix: handle non-json content-type in getJSON`
- `test: add coverage for logging helpers`
- `docs: document fetch helpers and logging`

You do not need to follow a strict convention, but consistency helps when scanning history.

---

## Community

If you would like to discuss ideas, ask questions, or coordinate work with
maintainers and other contributors, you can join the Discord server:

https://discord.gg/eAgnBPUf

just make sure your changes are well tested and documented.
