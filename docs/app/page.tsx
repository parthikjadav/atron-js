export const revalidate = false;

export default function Home() {
  return (
    <div className="prose prose-gray dark:prose-invert max-w-none">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        Atron.js
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
        A focused utility toolkit for JavaScript & TypeScript with clear, well-tested helpers
      </p>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-8">
        <img src="https://img.shields.io/npm/v/atron-js?color=blue" alt="npm version" className="m-0" />
        <img src="https://img.shields.io/npm/l/atron-js?color=green" alt="MIT License" className="m-0" />
        <img src="https://img.shields.io/github/actions/workflow/status/parthikjadav/atron-js/ci.yml?branch=main" alt="Build Status" className="m-0" />
      </div>

      <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-8 mb-4">
        Overview
      </h2>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        Atron.js is a comprehensive utility toolkit designed for modern JavaScript and TypeScript projects. 
        It provides a collection of well-tested, focused helpers that solve common programming challenges 
        with clean, readable code.
      </p>

      <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-8 mb-4">
        Key Features
      </h2>
      <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
        <li><strong>TypeScript-First:</strong> Built with TypeScript, offering full type safety and excellent IntelliSense support</li>
        <li><strong>Tiny Surface Area:</strong> Minimal, focused API that's easy to learn and use</li>
        <li><strong>Well-Tested:</strong> Comprehensive test coverage using Node's native test runner</li>
        <li><strong>Simple & Readable:</strong> Clean, maintainable code that's easy to understand</li>
        <li><strong>Dual Module Support:</strong> Works with both ESM and CommonJS</li>
        <li><strong>Modern Standards:</strong> Built for modern JavaScript environments</li>
      </ul>

      <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-8 mb-4">
        Requirements
      </h2>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        Atron.js requires <strong>Node.js 18+</strong> for fetch-based helpers and modern JavaScript features.
      </p>

      <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-8 mb-4">
        Module Support
      </h2>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        Atron.js fully supports both <strong>ESM (ECMAScript Modules)</strong> and <strong>CommonJS</strong>, 
        making it compatible with any JavaScript environment and build system.
      </p>

      <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded">
        <p className="text-blue-900 dark:text-blue-300">
          <strong>Ready to get started?</strong> Check out the Installation guide to add Atron.js to your project.
        </p>
      </div>

      <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Created by <strong>Parthik Jadav</strong>
        </p>
      </div>
    </div>
  );
}
