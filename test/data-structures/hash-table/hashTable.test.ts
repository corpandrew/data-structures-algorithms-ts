import {describe, it, expect, beforeEach} from 'vitest';
import {IHashTable} from "../../../src/data-structures/hash-table/types";
import {HashTable} from "../../../src/data-structures/hash-table/hashTable";

describe('HashTable', () => {
    let hashTable: IHashTable<string, number>;

    beforeEach(() => {
        hashTable = new HashTable<string, number>();
    });

    describe('put', () => {
        it('should put a single key-value pair', () => {
            hashTable.put('apple', 1);
            expect(hashTable.containsKey('apple')).toBe(true);
            expect(hashTable.get('apple')).toBe(1);
            expect(hashTable.size()).toBe(1);
        });

        it('should put multiple key-value pairs', () => {
            hashTable.put('apple', 1);
            hashTable.put('banana', 2);
            hashTable.put('cherry', 3);
            expect(hashTable.containsKey('apple')).toBe(true);
            expect(hashTable.get('apple')).toBe(1);
            expect(hashTable.containsKey('banana')).toBe(true);
            expect(hashTable.get('banana')).toBe(2);
            expect(hashTable.containsKey('cherry')).toBe(true);
            expect(hashTable.get('cherry')).toBe(3);
            expect(hashTable.size()).toBe(3);
        });

        it('should update the value for an existing key', () => {
            hashTable.put('apple', 1);
            hashTable.put('apple', 10); // Update value for 'apple'
            expect(hashTable.get('apple')).toBe(10); // Value should be updated
            expect(hashTable.size()).toBe(1); // Size should remain the same
        });

        it('should handle different data types for keys and values (string keys, number values example)', () => {
            hashTable.put('key1', 100);
            hashTable.put('key2', 200);
            expect(hashTable.get('key1')).toBe(100);
            expect(hashTable.get('key2')).toBe(200);
        });
    });

    describe('get', () => {
        beforeEach(() => {
            hashTable.put('apple', 1);
            hashTable.put('banana', 2);
        });

        it('should get the value for an existing key', () => {
            expect(hashTable.get('apple')).toBe(1);
            expect(hashTable.get('banana')).toBe(2);
        });

        it('should return undefined for a non-existent key', () => {
            expect(hashTable.get('cherry')).toBeUndefined();
            expect(hashTable.get('grape')).toBeUndefined();
        });

        it('should return undefined for null or undefined keys (if your implementation treats them as non-existent - adjust if you handle null/undefined keys)', () => {
            expect(hashTable.get(null as never)).toBeUndefined();
            expect(hashTable.get(undefined as never)).toBeUndefined();
        });
    });

    describe('remove', () => {
        beforeEach(() => {
            hashTable.put('apple', 1);
            hashTable.put('banana', 2);
            hashTable.put('cherry', 3);
        });

        it('should remove an existing key-value pair', () => {
            expect(hashTable.remove('banana')).toBe(true); // Remove 'banana'
            expect(hashTable.containsKey('banana')).toBe(false); // 'banana' should no longer be present
            expect(hashTable.get('banana')).toBeUndefined(); // get should return undefined
            expect(hashTable.size()).toBe(2); // Size should decrease
        });

        it('should return false when removing a non-existent key', () => {
            expect(hashTable.remove('grape')).toBe(false); // 'grape' is not in the table
            expect(hashTable.size()).toBe(3); // Size should remain unchanged
        });

        it('should handle removing from the beginning, middle, and end of the hash table (or collision chain - for Separate Chaining)', () => {
            hashTable.remove('apple'); // Remove from beginning (conceptually - depends on hash function and collision)
            expect(hashTable.containsKey('apple')).toBe(false);
            hashTable.remove('cherry'); // Remove from end (conceptually)
            expect(hashTable.containsKey('cherry')).toBe(false);
            hashTable.remove('banana'); // Remove from middle (conceptually)
            expect(hashTable.containsKey('banana')).toBe(false);
            expect(hashTable.isEmpty()).toBe(true); // Table should be empty after removing all
        });

        it('should return false when removing from an empty hash table', () => {
            const emptyHashTable = new HashTable<string, number>();
            expect(emptyHashTable.remove('apple')).toBe(false); // Remove from empty table
            expect(emptyHashTable.isEmpty()).toBe(true); // Table should still be empty
        });
    });

    describe('containsKey', () => {
        beforeEach(() => {
            hashTable.put('apple', 1);
            hashTable.put('banana', 2);
        });

        it('should return true if the key exists', () => {
            expect(hashTable.containsKey('apple')).toBe(true);
            expect(hashTable.containsKey('banana')).toBe(true);
        });

        it('should return false if the key does not exist', () => {
            expect(hashTable.containsKey('cherry')).toBe(false);
            expect(hashTable.containsKey('grape')).toBe(false);
        });
    });

    describe('size and isEmpty', () => {
        it('should be empty initially', () => {
            expect(hashTable.isEmpty()).toBe(true);
            expect(hashTable.size()).toBe(0);
        });

        it('should not be empty after putting elements', () => {
            hashTable.put('apple', 1);
            expect(hashTable.isEmpty()).toBe(false);
            expect(hashTable.size()).toBe(1);
            hashTable.put('banana', 2);
            expect(hashTable.size()).toBe(2);
        });

        it('should be empty after putting and removing all elements', () => {
            hashTable.put('apple', 1);
            hashTable.remove('apple');
            expect(hashTable.isEmpty()).toBe(true);
            expect(hashTable.size()).toBe(0);
        });
    });

    describe('clear (Optional)', () => {
        it('should clear all key-value pairs from the hash table', () => {
            hashTable.put('apple', 1);
            hashTable.put('banana', 2);
            hashTable.clear?.(); // Optional method call - use ?. to avoid error if not implemented
            expect(hashTable.isEmpty()).toBe(true);
            expect(hashTable.size()).toBe(0);
            expect(hashTable.containsKey('apple')).toBe(false);
            expect(hashTable.containsKey('banana')).toBe(false);
        });
    });

    describe('keys and values (Optional - for testing/debugging)', () => {
        beforeEach(() => {
            hashTable.put('apple', 1);
            hashTable.put('banana', 2);
            hashTable.put('cherry', 3);
        });

        it('should return an array of keys', () => {
            expect(hashTable.keys?.()).toEqual(['apple', 'banana', 'cherry'].sort()); // Order might not be guaranteed in Hash Tables, so sort for comparison
        });

        it('should return an array of values', () => {
            expect(hashTable.values?.()).toEqual([1, 2, 3].sort()); // Order might not be guaranteed, so sort for comparison
        });

        it('should return empty arrays for keys and values in an empty hash table', () => {
            const emptyHashTable = new HashTable<string, number>();
            expect(emptyHashTable.keys?.()).toEqual([]);
            expect(emptyHashTable.values?.()).toEqual([]);
        });
    });

    describe('Collision Handling (Separate Chaining Example - Adapt for Open Addressing if needed)', () => {
        it('should handle collisions correctly with separate chaining (insert and get)', () => {
            // Example: Assume 'apple' and 'apricot' might collide with a simple hash function (e.g., modulo based on first letter or similar)
            hashTable.put('apple', 1);
            hashTable.put('apricot', 3); // Might collide with 'apple' depending on hash function
            expect(hashTable.get('apple')).toBe(1);
            expect(hashTable.get('apricot')).toBe(3);
            expect(hashTable.size()).toBe(2);
        });

        it('should handle collisions correctly with separate chaining (remove)', () => {
            // Example: Assume 'apple' and 'apricot' collide
            hashTable.put('apple', 1);
            hashTable.put('apricot', 3);
            hashTable.remove('apple'); // Remove one of the colliding keys
            expect(hashTable.containsKey('apple')).toBe(false);
            expect(hashTable.get('apple')).toBeUndefined();
            expect(hashTable.get('apricot')).toBe(3); // Other colliding key should still be accessible
            expect(hashTable.size()).toBe(1);
        });
    });
});