export const revalidate = false;

export default function Examples() {
  return (
    <div className="prose prose-gray dark:prose-invert max-w-none">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">Examples</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
        Real-world examples and integration patterns using Atron.js in various scenarios.
      </p>

      {/* String Manipulation */}
      <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mt-12 mb-4">
        String Manipulation
      </h2>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        Building a blog post slug generator:
      </p>
      <div className="bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
        <pre className="text-sm"><code>{`import { toSlug, truncate, capitalize } from 'atron-js/strings';

function createBlogPost(title: string, content: string) {
  return {
    title: capitalize(title),
    slug: toSlug(title),
    excerpt: truncate(content, 150),
    url: \`/blog/\${toSlug(title)}\`
  };
}

const post = createBlogPost(
  'Getting Started with Atron.js!',
  'This is a comprehensive guide to using Atron.js in your projects...'
);

// Result:
// {
//   title: "Getting started with atron.js!",
//   slug: "getting-started-with-atron-js",
//   excerpt: "This is a comprehensive guide to using Atron.js in your projects...",
//   url: "/blog/getting-started-with-atron-js"
// }`}</code></pre>
      </div>

      {/* Array Processing */}
      <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mt-12 mb-4">
        Array Processing
      </h2>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        Processing and paginating data:
      </p>
      <div className="bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
        <pre className="text-sm"><code>{`import { chunk, unique, shuffle } from 'atron-js/arrays';

// Paginate items
function paginateItems<T>(items: T[], itemsPerPage: number) {
  return chunk(items, itemsPerPage);
}

// Remove duplicate user IDs
function getUniqueUsers(userIds: number[]) {
  return unique(userIds);
}

// Randomize quiz questions
function randomizeQuiz(questions: Question[]) {
  return shuffle(questions);
}

// Usage
const items = Array.from({ length: 50 }, (_, i) => ({ id: i }));
const pages = paginateItems(items, 10);  // [[0-9], [10-19], ...]

const userIds = [1, 2, 2, 3, 3, 3, 4];
const uniqueIds = getUniqueUsers(userIds);  // [1, 2, 3, 4]`}</code></pre>
      </div>

      {/* API Integration with Retry */}
      <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mt-12 mb-4">
        Robust API Integration
      </h2>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        Building a resilient API client with retry logic:
      </p>
      <div className="bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
        <pre className="text-sm"><code>{`import { getJSON, postJSON, retry, parallel } from 'atron-js/fetch';
import { tryCatch } from 'atron-js/handlers';
import { error, success } from 'atron-js/log';

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async getUsers() {
    // Retry up to 3 times on failure
    const [err, users] = await tryCatch(
      () => retry(
        () => getJSON<User[]>(\`\${this.baseUrl}/users\`),
        { maxAttempts: 3, delay: 1000 }
      )
    );

    if (err) {
      error('Failed to fetch users:', err.message);
      return [];
    }

    success(\`Fetched \${users.length} users\`);
    return users;
  }

  async createUser(userData: CreateUserDto) {
    return postJSON<User>(\`\${this.baseUrl}/users\`, userData);
  }

  // Fetch multiple resources in parallel
  async getDashboardData() {
    const [users, posts, comments] = await parallel([
      getJSON(\`\${this.baseUrl}/users\`),
      getJSON(\`\${this.baseUrl}/posts\`),
      getJSON(\`\${this.baseUrl}/comments\`)
    ]);

    return { users, posts, comments };
  }
}

// Usage
const api = new ApiClient('https://api.example.com');
const users = await api.getUsers();
const dashboard = await api.getDashboardData();`}</code></pre>
      </div>

      {/* Error Handling Pattern */}
      <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mt-12 mb-4">
        Clean Error Handling
      </h2>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        Handling errors without try-catch blocks:
      </p>
      <div className="bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
        <pre className="text-sm"><code>{`import { tryCatch } from 'atron-js/handlers';
import { error, warning, success } from 'atron-js/log';

async function processUserData(userId: string) {
  // Fetch user
  const [fetchError, user] = await tryCatch(
    () => fetch(\`/api/users/\${userId}\`).then(r => r.json())
  );

  if (fetchError) {
    error('Failed to fetch user:', fetchError.message);
    return null;
  }

  // Validate user
  const [validationError, validatedUser] = tryCatch(
    () => validateUser(user)
  );

  if (validationError) {
    warning('Invalid user data:', validationError.message);
    return null;
  }

  // Process user
  const [processError, result] = await tryCatch(
    () => processUser(validatedUser)
  );

  if (processError) {
    error('Processing failed:', processError.message);
    return null;
  }

  success('User processed successfully!');
  return result;
}`}</code></pre>
      </div>

      {/* Performance Optimization */}
      <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mt-12 mb-4">
        Performance Optimization
      </h2>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        Using memoization for expensive computations:
      </p>
      <div className="bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
        <pre className="text-sm"><code>{`import { memoize } from 'atron-js/memoize';

// Expensive calculation
const calculateFibonacci = memoize((n: number): number => {
  if (n <= 1) return n;
  return calculateFibonacci(n - 1) + calculateFibonacci(n - 2);
});

// API call memoization
const fetchUserProfile = memoize(
  async (userId: string) => {
    const response = await fetch(\`/api/users/\${userId}\`);
    return response.json();
  }
);

// Usage
console.time('First call');
calculateFibonacci(40);  // Takes time
console.timeEnd('First call');

console.time('Second call');
calculateFibonacci(40);  // Instant (cached)
console.timeEnd('Second call');

// API results are cached
await fetchUserProfile('user-123');  // Makes API call
await fetchUserProfile('user-123');  // Returns cached result`}</code></pre>
      </div>

      {/* React Integration */}
      <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mt-12 mb-4">
        React Integration
      </h2>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        Using Atron.js in React components:
      </p>
      <div className="bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
        <pre className="text-sm"><code>{`import { useState, useEffect } from 'react';
import { getJSON, retry } from 'atron-js/fetch';
import { tryCatch } from 'atron-js/handlers';
import { unique, sortBy } from 'atron-js/arrays';
import { truncate } from 'atron-js/strings';

function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    setLoading(true);
    
    const [err, data] = await tryCatch(
      () => retry(
        () => getJSON<User[]>('/api/users'),
        { maxAttempts: 3 }
      )
    );

    if (err) {
      setError(err.message);
    } else {
      // Remove duplicates and sort
      const uniqueUsers = unique(data, 'id');
      const sortedUsers = sortBy(uniqueUsers, 'name');
      setUsers(sortedUsers);
    }
    
    setLoading(false);
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>
          <h3>{user.name}</h3>
          <p>{truncate(user.bio, 100)}</p>
        </li>
      ))}
    </ul>
  );
}`}</code></pre>
      </div>

      {/* Express.js Integration */}
      <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mt-12 mb-4">
        Express.js Integration
      </h2>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        Building an Express API with Atron.js utilities:
      </p>
      <div className="bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
        <pre className="text-sm"><code>{`import express from 'express';
import { tryCatch } from 'atron-js/handlers';
import { success, error, box } from 'atron-js/log';
import { isEmpty, toSlug } from 'atron-js/strings';
import { clamp } from 'atron-js/numbers';

const app = express();
app.use(express.json());

app.post('/api/posts', async (req, res) => {
  const [err, post] = await tryCatch(async () => {
    const { title, content } = req.body;

    // Validation
    if (isEmpty(title)) {
      throw new Error('Title is required');
    }

    // Create post with slug
    const newPost = {
      id: Date.now(),
      title,
      slug: toSlug(title),
      content,
      createdAt: new Date()
    };

    // Save to database
    await db.posts.create(newPost);
    
    return newPost;
  });

  if (err) {
    error('Failed to create post:', err.message);
    return res.status(400).json({ error: err.message });
  }

  success('Post created:', post.title);
  res.json(post);
});

app.get('/api/posts', async (req, res) => {
  const page = clamp(parseInt(req.query.page as string) || 1, 1, 100);
  const limit = clamp(parseInt(req.query.limit as string) || 10, 1, 50);

  const posts = await db.posts.findMany({
    skip: (page - 1) * limit,
    take: limit
  });

  res.json({ posts, page, limit });
});

const PORT = 3000;
app.listen(PORT, () => {
  box(\`Server running on port \${PORT}\`, 'SUCCESS');
});`}</code></pre>
      </div>

      {/* Vue Integration */}
      <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mt-12 mb-4">
        Vue.js Integration
      </h2>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        Using Atron.js in Vue components:
      </p>
      <div className="bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
        <pre className="text-sm"><code>{`<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getJSON, parallel } from 'atron-js/fetch';
import { tryCatch } from 'atron-js/handlers';
import { capitalize } from 'atron-js/strings';
import { chunk } from 'atron-js/arrays';

const users = ref<User[]>([]);
const posts = ref<Post[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

onMounted(async () => {
  await loadData();
});

async function loadData() {
  loading.value = true;
  
  const [err, [usersData, postsData]] = await tryCatch(
    () => parallel([
      getJSON<User[]>('/api/users'),
      getJSON<Post[]>('/api/posts')
    ])
  );

  if (err) {
    error.value = err.message;
  } else {
    users.value = usersData;
    posts.value = postsData;
  }
  
  loading.value = false;
}

// Computed pagination
const pagedPosts = computed(() => {
  return chunk(posts.value, 10);
});
</script>

<template>
  <div>
    <h1>{{ capitalize('user dashboard') }}</h1>
    
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">Error: {{ error }}</div>
    
    <div v-else>
      <p>Users: {{ users.length }}</p>
      <p>Posts: {{ posts.length }}</p>
    </div>
  </div>
</template>`}</code></pre>
      </div>

      {/* CLI Tool Example */}
      <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mt-12 mb-4">
        CLI Tool Example
      </h2>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        Building a command-line tool with beautiful logging:
      </p>
      <div className="bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
        <pre className="text-sm"><code>{`#!/usr/bin/env node
import { banner, success, error, info, box } from 'atron-js/log';
import { getJSON } from 'atron-js/fetch';
import { tryCatch } from 'atron-js/handlers';
import { delay } from 'atron-js/time';

async function main() {
  banner('MY CLI TOOL');
  console.log();

  info('Fetching data...');
  await delay(500);

  const [err, data] = await tryCatch(
    () => getJSON('https://api.github.com/users/github')
  );

  if (err) {
    error('Failed to fetch data!');
    error(err.message);
    process.exit(1);
  }

  success('Data fetched successfully!');
  console.log();
  
  box(\`User: \${data.name}\`, 'INFO');
  info(\`Followers: \${data.followers}\`);
  info(\`Following: \${data.following}\`);
  
  console.log();
  success('Done!');
}

main().catch(err => {
  error('Unexpected error:', err);
  process.exit(1);
});`}</code></pre>
      </div>

      <div className="mt-12 p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-l-4 border-purple-500 rounded">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">More Examples</h3>
        <p className="text-gray-700 dark:text-gray-300 mb-3">
          Looking for more integration examples or have a use case to share?
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 text-sm">
          <li>Visit our <a href="https://github.com/parthikjadav/atron-js/tree/main/examples" className="text-purple-600 dark:text-purple-400 underline">GitHub examples directory</a></li>
          <li>Check out the <a href="https://github.com/parthikjadav/atron-js/discussions" className="text-purple-600 dark:text-purple-400 underline">community discussions</a></li>
          <li>Contribute your own examples via pull request</li>
        </ul>
      </div>
    </div>
  );
}
