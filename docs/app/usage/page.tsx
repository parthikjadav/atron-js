export const revalidate = false;

export default function Usage() {
  return (
    <div className="prose prose-gray dark:prose-invert max-w-none">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">Getting Started</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
        Learn how to use Atron.js utilities in your projects with practical examples.
      </p>

      <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-8 mb-4">
        Quick Start
      </h2>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        Here's a simple example to get you started with Atron.js utilities:
      </p>

      <div className="bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
        <pre className="text-sm">
          <code>{`import { capitalize, truncate } from 'atron-js/strings';
import { randomNumber } from 'atron-js/numbers';
import { unique } from 'atron-js/arrays';

// String utilities
const title = capitalize('hello world');  // "Hello world"
const short = truncate('Long text here', 10);  // "Long text..."

// Number utilities
const rand = randomNumber(1, 100);  // Random number between 1-100

// Array utilities
const items = [1, 2, 2, 3, 3, 4];
const uniqueItems = unique(items);  // [1, 2, 3, 4]`}</code>
        </pre>
      </div>

      <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-8 mb-4">
        Common Use Cases
      </h2>

      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Working with API Calls
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-3">
            Use fetch utilities for clean, robust API interactions:
          </p>
          <div className="bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-lg overflow-x-auto">
            <pre className="text-sm">
              <code>{`import { getJSON, postJSON, retry } from 'atron-js/fetch';

// Simple GET request
const users = await getJSON('https://api.example.com/users');

// POST with retry logic
const result = await retry(
  () => postJSON('https://api.example.com/data', { name: 'John' }),
  { maxAttempts: 3, delay: 1000 }
);`}</code>
            </pre>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Safe Error Handling
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-3">
            Handle errors gracefully without try-catch blocks:
          </p>
          <div className="bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-lg overflow-x-auto">
            <pre className="text-sm">
              <code>{`import { tryCatch } from 'atron-js/handlers';

const [error, data] = await tryCatch(
  fetch('https://api.example.com/data')
);

if (error) {
  console.error('Failed:', error);
} else {
  console.log('Success:', data);
}`}</code>
            </pre>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Performance Optimization
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-3">
            Use memoization for expensive computations:
          </p>
          <div className="bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-lg overflow-x-auto">
            <pre className="text-sm">
              <code>{`import { memoize } from 'atron-js/memoize';

// Memoize expensive function
const expensiveOperation = memoize((n: number) => {
  // Complex calculation
  return n * n;
});

expensiveOperation(10);  // Calculates
expensiveOperation(10);  // Returns cached result`}</code>
            </pre>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Logging Made Easy
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-3">
            Beautiful, colored console output:
          </p>
          <div className="bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-lg overflow-x-auto">
            <pre className="text-sm">
              <code>{`import { success, error, warning, box } from 'atron-js/log';

success('Operation completed!');
error('Something went wrong');
warning('Be careful!');

box('Welcome to Atron.js!', 'INFO');`}</code>
            </pre>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-8 mb-4">
        Best Practices
      </h2>
      <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
        <li>Import only what you need to keep your bundle size minimal</li>
        <li>Use TypeScript for full type safety and autocomplete support</li>
        <li>Leverage memoization for frequently called expensive operations</li>
        <li>Use error handlers for cleaner async/await code</li>
        <li>Combine utilities for powerful data transformations</li>
        <li>Use logging functions for better debugging experience</li>
      </ul>

      <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-8 mb-4">
        TypeScript Configuration Tips
      </h2>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        For the best experience with Atron.js in TypeScript projects:
      </p>
      <div className="bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
        <pre className="text-sm">
          <code>{`// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}`}</code>
        </pre>
      </div>

      <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-8 mb-4">
        Tree-Shaking Support
      </h2>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        Atron.js is designed with tree-shaking in mind. When using modern bundlers 
        (Webpack 5+, Vite, Rollup), only the functions you import will be included 
        in your final bundle.
      </p>
      <div className="bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
        <pre className="text-sm">
          <code>{`// Only 'capitalize' and 'truncate' will be in your bundle
import { capitalize, truncate } from 'atron-js/strings';

// This works too - bundler will tree-shake unused exports
import * as strings from 'atron-js/strings';
const result = strings.capitalize('hello');`}</code>
        </pre>
      </div>

      <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 rounded">
        <p className="text-yellow-900 dark:text-yellow-300">
          <strong>Next Steps:</strong> Explore the API Reference for detailed documentation 
          on all available utilities, or check out the Examples page for real-world use cases.
        </p>
      </div>
    </div>
  );
}
