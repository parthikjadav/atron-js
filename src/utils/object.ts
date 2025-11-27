/**
 * src/utils/object.ts
 */

/**
 * Creates a deep copy of the value.
 * Supports: Primitives, Arrays, Plain Objects, Date, RegExp.
 * Warning: Does not support Circular References, Maps, Sets, or Functions.
 */
export function deepClone<T>(value: T): T {
  // Handle primitives and null
  if (value === null || typeof value !== 'object') {
    return value;
  }

  // Handle Date
  if (value instanceof Date) {
    return new Date(value.getTime()) as unknown as T;
  }

  // Handle RegExp
  if (value instanceof RegExp) {
    return new RegExp(value) as unknown as T;
  }

  // Handle Arrays
  if (Array.isArray(value)) {
    return value.map((item) => deepClone(item)) as unknown as T;
  }

  // Handle Plain Objects
  const clonedObj = {} as T;
  for (const key in value) {
    if (Object.prototype.hasOwnProperty.call(value, key)) {
      clonedObj[key] = deepClone(value[key]);
    }
  }

  return clonedObj;
}

/**
 * Performs a deep equality check between two values.
 * Supports: Nested Arrays, Objects, Date, RegExp.
 */
export function deepEqual(a: unknown, b: unknown): boolean {
  // strict reference check covers primitives and same-reference objects
  if (a === b) return true;

  // If either is null or not an object (and didn't pass strict check), they aren't equal
  if (a === null || b === null || typeof a !== 'object' || typeof b !== 'object') {
    return false;
  }

  // Handle Date equality
  if (a instanceof Date && b instanceof Date) {
    return a.getTime() === b.getTime();
  }

  // Handle RegExp equality
  if (a instanceof RegExp && b instanceof RegExp) {
    return a.toString() === b.toString();
  }

  // Handle Array equality
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (!deepEqual(a[i], b[i])) return false;
    }
    return true;
  }

  // Prevent Array vs Object comparison
  if (Array.isArray(a) || Array.isArray(b)) {
    return false;
  }

  // Handle Plain Object equality
  const keysA = Object.keys(a as object);
  const keysB = Object.keys(b as object);

  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if (!Object.prototype.hasOwnProperty.call(b, key)) return false;
    
    // Recursive check
    if (!deepEqual((a as any)[key], (b as any)[key])) return false;
  }

  return true;
}

