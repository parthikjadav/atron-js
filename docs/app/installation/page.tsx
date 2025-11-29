export const revalidate = false;

export default function Installation() {
  return (
    <div className="prose prose-gray dark:prose-invert max-w-none">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">Installation</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
        Get started with Atron.js in your JavaScript or TypeScript project.
      </p>

      <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-8 mb-4">
        System Requirements
      </h2>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        Before you begin, ensure you have the following installed:
      </p>
      <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-6">
        <li>Node.js 18.x or higher (required for fetch-based helpers)</li>
        <li>npm, yarn, or pnpm package manager</li>
      </ul>

      <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-8 mb-4">
        Install via npm
      </h2>

      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Using npm
          </h3>
          <div className="bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-lg overflow-x-auto">
            <code>npm install atron-js</code>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Using yarn
          </h3>
          <div className="bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-lg overflow-x-auto">
            <code>yarn add atron-js</code>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Using pnpm
          </h3>
          <div className="bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-lg overflow-x-auto">
            <code>pnpm add atron-js</code>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-8 mb-4">
        Import Examples
      </h2>

      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            ESM (ECMAScript Modules)
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-3">
            For modern JavaScript/TypeScript projects using ES6+ modules:
          </p>
          <div className="bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-lg overflow-x-auto">
            <pre className="text-sm">
              <code>{`// Import specific utilities
import { capitalize, isEmpty } from 'atron-js/strings';
import { randomNumber, clamp } from 'atron-js/numbers';
import { unique, chunk } from 'atron-js/arrays';
import { getJSON, postJSON } from 'atron-js/fetch';
import { success, error } from 'atron-js/log';

// Or import everything from a category
import * as strings from 'atron-js/strings';
import * as arrays from 'atron-js/arrays';`}</code>
            </pre>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            CommonJS
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-3">
            For Node.js projects using require:
          </p>
          <div className="bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-lg overflow-x-auto">
            <pre className="text-sm">
              <code>{`// Import specific utilities
const { capitalize, isEmpty } = require('atron-js/strings');
const { randomNumber, clamp } = require('atron-js/numbers');
const { unique, chunk } = require('atron-js/arrays');
const { getJSON, postJSON } = require('atron-js/fetch');
const { success, error } = require('atron-js/log');

// Or import everything from a category
const strings = require('atron-js/strings');
const arrays = require('atron-js/arrays');`}</code>
            </pre>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-8 mb-4">
        TypeScript Setup
      </h2>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        Atron.js is built with TypeScript and includes full type definitions out of the box. 
        No additional @types packages are needed.
      </p>
      <div className="bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
        <pre className="text-sm">
          <code>{`// TypeScript automatically infers types
import { capitalize } from 'atron-js/strings';

const result = capitalize('hello'); // Type: string
// Full autocomplete and type checking available!`}</code>
        </pre>
      </div>

      <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-8 mb-4">
        JavaScript Setup
      </h2>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        For JavaScript projects, simply import and use the utilities. While you won't get 
        compile-time type checking, the library works perfectly with vanilla JavaScript.
      </p>
      <div className="bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
        <pre className="text-sm">
          <code>{`// Works great in vanilla JavaScript
import { capitalize, truncate } from 'atron-js/strings';

const text = capitalize('hello world');
const short = truncate(text, 10);`}</code>
        </pre>
      </div>

      <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-8 mb-4">
        Peer Dependencies
      </h2>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        Atron.js has no peer dependencies. It's a standalone library with zero runtime dependencies, 
        keeping your bundle size minimal.
      </p>

      <div className="mt-8 p-4 bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 rounded">
        <p className="text-green-900 dark:text-green-300">
          <strong>Success!</strong> You're all set! Check out the{" "}
          <a href="/usage" className="underline">Usage guide</a> to start using Atron.js in your project.
        </p>
      </div>
    </div>
  );
}
