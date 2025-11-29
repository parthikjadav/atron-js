export const revalidate = false;

export default function API() {
  return (
    <div className="prose prose-gray dark:prose-invert max-w-none">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">API Reference</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
        Complete API documentation for all Atron.js utilities organized by category.
      </p>

      {/* Quick Navigation */}
      <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-8">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">Quick Navigation</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
          <a href="#strings" className="text-blue-600 dark:text-blue-400 hover:underline">String Utils</a>
          <a href="#numbers" className="text-blue-600 dark:text-blue-400 hover:underline">Number Utils</a>
          <a href="#arrays" className="text-blue-600 dark:text-blue-400 hover:underline">Array Utils</a>
          <a href="#fetch" className="text-blue-600 dark:text-blue-400 hover:underline">Fetch Utils</a>
          <a href="#handlers" className="text-blue-600 dark:text-blue-400 hover:underline">Error Handlers</a>
          <a href="#logging" className="text-blue-600 dark:text-blue-400 hover:underline">Logging</a>
          <a href="#memoize" className="text-blue-600 dark:text-blue-400 hover:underline">Memoization</a>
          <a href="#time" className="text-blue-600 dark:text-blue-400 hover:underline">Time Utils</a>
        </div>
      </div>

      {/* String Utils */}
      <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mt-12 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2" id="strings">
        String Utilities
      </h2>
      <p className="text-gray-700 dark:text-gray-300 mb-6">
        Import from <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">atron-js/strings</code>
      </p>

      <div className="bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-lg overflow-x-auto mb-8">
        <pre className="text-sm"><code>{`import { 
  capitalize,    // Capitalize first letter
  reverse,       // Reverse string
  isEmpty,       // Check if empty/whitespace
  truncate,      // Truncate with suffix
  toSlug,        // Convert to URL slug
  camelCase,     // Convert to camelCase
  snakeCase,     // Convert to snake_case
  kebabCase,     // Convert to kebab-case
  titleCase      // Convert to Title Case
} from 'atron-js/strings';

capitalize('hello world');  // "Hello world"
toSlug('Hello World!');     // "hello-world"
truncate('Long text', 5);   // "Long ..."
isEmpty('   ');             // true`}</code></pre>
      </div>

      {/* Number Utils */}
      <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mt-12 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2" id="numbers">
        Number Utilities
      </h2>
      <p className="text-gray-700 dark:text-gray-300 mb-6">
        Import from <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">atron-js/numbers</code>
      </p>

      <div className="bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-lg overflow-x-auto mb-8">
        <pre className="text-sm"><code>{`import {
  randomNumber,  // Generate random number
  isEven,        // Check if even
  isOdd,         // Check if odd
  clamp,         // Clamp between min/max
  round,         // Round to decimals
  average,       // Calculate average
  sum,           // Sum of numbers
  percentage     // Calculate percentage
} from 'atron-js/numbers';

randomNumber(1, 100);     // Random: 1-100
clamp(15, 0, 10);         // 10
round(3.14159, 2);        // 3.14
isEven(4);                // true`}</code></pre>
      </div>

      {/* Array Utils */}
      <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mt-12 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2" id="arrays">
        Array Utilities
      </h2>
      <p className="text-gray-700 dark:text-gray-300 mb-6">
        Import from <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">atron-js/arrays</code>
      </p>

      <div className="bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-lg overflow-x-auto mb-8">
        <pre className="text-sm"><code>{`import {
  unique,        // Remove duplicates
  chunk,         // Split into chunks
  shuffle,       // Randomly shuffle
  flatten,       // Flatten nested arrays
  groupBy,       // Group by property
  sortBy,        // Sort by property
  findDuplicates,// Find duplicate items
  difference     // Array difference
} from 'atron-js/arrays';

unique([1, 2, 2, 3]);        // [1, 2, 3]
chunk([1, 2, 3, 4], 2);      // [[1, 2], [3, 4]]
flatten([1, [2, [3]]]);      // [1, 2, 3]
shuffle([1, 2, 3, 4]);       // Random order`}</code></pre>
      </div>

      {/* Object Utils */}
      <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mt-12 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2" id="objects">
        Object Utilities
      </h2>
      <p className="text-gray-700 dark:text-gray-300 mb-6">
        Import from <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">atron-js/object</code>
      </p>

      <div className="bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-lg overflow-x-auto mb-8">
        <pre className="text-sm"><code>{`import {
  deepClone,     // Deep copy object
  merge,         // Deep merge objects
  pick,          // Pick properties
  omit,          // Omit properties
  isEmpty,       // Check if empty
  isEqual,       // Deep equality check
  get,           // Safe nested access
  set            // Safe nested set
} from 'atron-js/object';

const obj = { a: 1, b: 2, c: 3 };
pick(obj, ['a', 'b']);       // { a: 1, b: 2 }
omit(obj, ['c']);            // { a: 1, b: 2 }
get(obj, 'a.b.c', 'default'); // Safe access`}</code></pre>
      </div>

      {/* Fetch Utils */}
      <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mt-12 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2" id="fetch">
        Fetch Utilities
      </h2>
      <p className="text-gray-700 dark:text-gray-300 mb-6">
        Import from <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">atron-js/fetch</code>
      </p>

      <div className="bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-lg overflow-x-auto mb-8">
        <pre className="text-sm"><code>{`import {
  getJSON,       // GET request
  postJSON,      // POST request
  putJSON,       // PUT request
  deleteJSON,    // DELETE request
  retry,         // Retry with backoff
  timeout,       // Timeout wrapper
  batch,         // Batch requests
  parallel,      // Parallel execution
  sequence       // Sequential execution
} from 'atron-js/fetch';

// Simple GET
const users = await getJSON('https://api.example.com/users');

// POST with data
const result = await postJSON('/api/users', {
  name: 'John',
  email: 'john@example.com'
});

// Retry on failure
const data = await retry(
  () => getJSON('/api/data'),
  { maxAttempts: 3, delay: 1000 }
);

// Parallel requests
const [users, posts] = await parallel([
  getJSON('/api/users'),
  getJSON('/api/posts')
]);`}</code></pre>
      </div>

      {/* Error Handlers */}
      <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mt-12 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2" id="handlers">
        Error Handlers
      </h2>
      <p className="text-gray-700 dark:text-gray-300 mb-6">
        Import from <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">atron-js/handlers</code>
      </p>

      <div className="bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-lg overflow-x-auto mb-8">
        <pre className="text-sm"><code>{`import { tryCatch } from 'atron-js/handlers';

// Returns [error, result] tuple
const [error, data] = await tryCatch(
  fetch('https://api.example.com/data')
);

if (error) {
  console.error('Failed:', error.message);
  // Handle error
} else {
  console.log('Success:', data);
  // Use data
}

// Works with sync functions too
const [err, result] = tryCatch(() => {
  return JSON.parse(jsonString);
});`}</code></pre>
      </div>

      {/* Logging */}
      <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mt-12 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2" id="logging">
        Logging Functions
      </h2>
      <p className="text-gray-700 dark:text-gray-300 mb-6">
        Import from <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">atron-js/log</code>
      </p>

      <div className="bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-lg overflow-x-auto mb-8">
        <pre className="text-sm"><code>{`import {
  success,       // Green success message
  error,         // Red error message
  warning,       // Yellow warning
  info,          // Blue info message
  debug,         // Gray debug message
  title,         // Bold title
  box,           // Boxed message
  banner,        // Banner message
  timestamp,     // With timestamp
  logJSON        // Pretty JSON
} from 'atron-js/log';

success('Operation completed!');
error('Something went wrong!');
warning('Be careful!');
info('FYI: Important info');
debug('Debug data:', { id: 123 });

box('Welcome to Atron.js!', 'INFO');
banner('Server Started');
logJSON({ name: 'John', age: 30 }, 'User');`}</code></pre>
      </div>

      {/* Memoization */}
      <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mt-12 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2" id="memoize">
        Memoization
      </h2>
      <p className="text-gray-700 dark:text-gray-300 mb-6">
        Import from <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">atron-js/memoize</code>
      </p>

      <div className="bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-lg overflow-x-auto mb-8">
        <pre className="text-sm"><code>{`import { memoize } from 'atron-js/memoize';

// Cache expensive operations
const expensiveFn = memoize((n: number) => {
  console.log('Computing...');
  let result = 0;
  for (let i = 0; i < n; i++) {
    result += i;
  }
  return result;
});

expensiveFn(1000000);  // Logs "Computing...", takes time
expensiveFn(1000000);  // Returns instantly from cache

// Custom cache key
const memoized = memoize(
  (user: User) => fetchUserData(user.id),
  { keyFn: (user) => user.id }
);`}</code></pre>
      </div>

      {/* Time Utils */}
      <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mt-12 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2" id="time">
        Time Utilities
      </h2>
      <p className="text-gray-700 dark:text-gray-300 mb-6">
        Import from <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">atron-js/time</code>
      </p>

      <div className="bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-lg overflow-x-auto mb-8">
        <pre className="text-sm"><code>{`import {
  delay,         // Promise-based delay
  formatTime,    // Format date/time
  timeAgo,       // Relative time (5 mins ago)
  duration,      // Calculate duration
  isToday,       // Check if today
  isSameDay,     // Compare dates
  addDays,       // Add days to date
  diffDays       // Days between dates
} from 'atron-js/time';

await delay(1000);  // Wait 1 second

formatTime(new Date());           // "2024-01-15 14:30:00"
timeAgo(new Date('2024-01-01'));  // "2 weeks ago"
isToday(new Date());              // true
addDays(new Date(), 7);           // Date 7 days from now`}</code></pre>
      </div>

      <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-l-4 border-blue-500 rounded">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">TypeScript Support</h3>
        <p className="text-gray-700 dark:text-gray-300 mb-2">
          All functions include full TypeScript type definitions with generics support for type safety.
        </p>
        <div className="bg-gray-900 dark:bg-gray-950 text-gray-100 p-3 rounded text-sm mt-3">
          <code>{`// TypeScript infers types automatically
const users = await getJSON<User[]>('/api/users');
const unique = unique<string>(['a', 'b', 'a']); // string[]`}</code>
        </div>
      </div>

      <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 rounded">
        <p className="text-yellow-900 dark:text-yellow-300">
          <strong>Need more details?</strong> Visit our <a href="https://github.com/parthikjadav/atron-js" className="underline">GitHub repository</a> for complete source code and additional examples.
        </p>
      </div>
    </div>
  );
}
