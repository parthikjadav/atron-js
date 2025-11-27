import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { deepClone, deepEqual } from '../src/utils/object';

describe('Object Utilities', () => {
  
  describe('deepClone', () => {
    test('clones primitives', () => {
      assert.strictEqual(deepClone(10), 10);
      assert.strictEqual(deepClone('hello'), 'hello');
      assert.strictEqual(deepClone(null), null);
    });

    test('clones nested objects and arrays', () => {
      const original = { a: 1, b: { c: 2 }, d: [3, 4] };
      const cloned = deepClone(original);

      // Verify structure matches
      // using Node's own deepStrictEqual to verify our clone worked
      assert.deepStrictEqual(cloned, original);
      
      // Verify references are different
      assert.notStrictEqual(cloned, original, 'Root objects should not share reference');
      assert.notStrictEqual(cloned.b, original.b, 'Nested objects should not share reference');
      assert.notStrictEqual(cloned.d, original.d, 'Nested arrays should not share reference');
    });

    test('clones Date and RegExp', () => {
      const date = new Date('2023-01-01');
      const regex = /test/gi;
      
      const clonedDate = deepClone(date);
      const clonedRegex = deepClone(regex);

      // Date Check
      assert.strictEqual(clonedDate.getTime(), date.getTime());
      assert.notStrictEqual(clonedDate, date);

      // RegExp Check
      assert.strictEqual(clonedRegex.toString(), regex.toString());
      assert.notStrictEqual(clonedRegex, regex);
    });
  });

  describe('deepEqual', () => {
    test('returns true for equal primitives', () => {
      assert.strictEqual(deepEqual(1, 1), true);
      assert.strictEqual(deepEqual('a', 'a'), true);
      assert.strictEqual(deepEqual(null, null), true);
    });

    test('returns false for unequal primitives', () => {
      assert.strictEqual(deepEqual(1, 2), false);
      assert.strictEqual(deepEqual('a', 'b'), false);
      assert.strictEqual(deepEqual(null, undefined), false);
    });

    test('handles deep nested structures', () => {
      const obj1 = { a: 1, b: { c: [1, 2] } };
      const obj2 = { a: 1, b: { c: [1, 2] } };
      const obj3 = { a: 1, b: { c: [1, 3] } }; // Different

      assert.strictEqual(deepEqual(obj1, obj2), true);
      assert.strictEqual(deepEqual(obj1, obj3), false);
    });

    test('handles Date and RegExp', () => {
      const d1 = new Date('2025-01-01');
      const d2 = new Date('2025-01-01');
      const d3 = new Date('2026-01-01');

      assert.strictEqual(deepEqual(d1, d2), true);
      assert.strictEqual(deepEqual(d1, d3), false);

      const r1 = /abc/g;
      const r2 = /abc/g;
      const r3 = /abc/i; // different flag

      assert.strictEqual(deepEqual(r1, r2), true);
      assert.strictEqual(deepEqual(r1, r3), false);
    });
  });

  // --- MINI CHALLENGE ---
  test('Mini Challenge: Clone object with Date/Array and assert deep equality', () => {
    const original = {
      id: 1,
      createdAt: new Date('2025-08-20T10:00:00Z'),
      tags: ['typescript', 'mern'],
      meta: {
        active: true
      }
    };

    const cloned = deepClone(original);

    // 1. deepEqual must be true
    assert.strictEqual(deepEqual(original, cloned), true, 'Structures should match');

    // 2. References must be different
    assert.notStrictEqual(original, cloned, 'Root reference check');
    assert.notStrictEqual(original.tags, cloned.tags, 'Array reference check');
    assert.notStrictEqual(original.meta, cloned.meta, 'Nested object reference check');
    assert.notStrictEqual(original.createdAt, cloned.createdAt, 'Date object reference check');
  });
});