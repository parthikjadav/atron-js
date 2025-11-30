// ESLint v9+ flat config for TypeScript + Prettier
// See: https://eslint.org/docs/latest/use/configure/migration-guide

import parser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import importPlugin from "eslint-plugin-import";
import prettierConfig from "eslint-config-prettier";

export default [
  // Ignore patterns (replaces .eslintignore)
  {
    ignores: ["dist/**", "node_modules/**", "coverage/**"],
  },

  // Project TypeScript files
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser,
      sourceType: "module",
      ecmaVersion: "latest",
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      import: importPlugin,
    },
    rules: {
      // Recommended rule sets
      ...tsPlugin.configs.recommended.rules,
      ...importPlugin.configs.recommended.rules,

      // Project tweaks
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "import/no-unresolved": "off",
    },
  },

  // Test overrides
  {
    files: ["tests/**/*.ts"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
    },
  },

  // Prettier compatibility (disables formatting-related ESLint rules)
  prettierConfig,
];
