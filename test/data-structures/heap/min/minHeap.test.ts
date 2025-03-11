import { describe, it, expect, beforeEach } from 'vitest';
import {MinHeap} from "../../../../src/data-structures/heap/min/minHeap";
import {IMinHeap} from "../../../../src/data-structures/heap/min/types";

describe('MinHeap', () => {
    let minHeap: IMinHeap<number>;

    beforeEach(() => {
        minHeap = new MinHeap<number>((a, b) => a - b); // Instantiate your MinHeap implementation
    });

    describe('isEmpty and size', () => {
        it('should be empty initially', () => {
            expect(minHeap.isEmpty()).toBe(true);
            expect(minHeap.size()).toBe(0);
        });

        it('should not be empty after inserting elements', () => {
            minHeap.insert(10);
            expect(minHeap.isEmpty()).toBe(false);
            expect(minHeap.size()).toBe(1);
            minHeap.insert(20);
            expect(minHeap.size()).toBe(2);
        });

        it('should be empty after inserting and extracting all elements', () => {
            minHeap.insert(10);
            minHeap.extractMin();
            expect(minHeap.isEmpty()).toBe(true);
            expect(minHeap.size()).toBe(0);
        });
    });

    describe('insert', () => {
        it('should insert elements into the min-heap', () => {
            minHeap.insert(10);
            expect(minHeap.peekMin()).toBe(10);
            minHeap.insert(5);
            expect(minHeap.peekMin()).toBe(5); // Min should be updated to 5
            minHeap.insert(15);
            expect(minHeap.peekMin()).toBe(5); // Min should still be 5
        });

        it('should increase the size after insert', () => {
            minHeap.insert(10);
            expect(minHeap.size()).toBe(1);
            minHeap.insert(20);
            expect(minHeap.size()).toBe(2);
        });
    });

    describe('extractMin', () => {
        beforeEach(() => {
            minHeap.insert(10);
            minHeap.insert(5);
            minHeap.insert(15);
        });

        it('should extract the minimum element (root) and maintain min-heap property', () => {
            expect(minHeap.extractMin()).toBe(5); // Extract min (5)
            expect(minHeap.peekMin()).toBe(10); // New min should be 10 after heapify down
            expect(minHeap.size()).toBe(2);

            expect(minHeap.extractMin()).toBe(10); // Extract next min (10)
            expect(minHeap.peekMin()).toBe(15); // New min should be 15
            expect(minHeap.size()).toBe(1);

            expect(minHeap.extractMin()).toBe(15); // Extract last min (15)
            expect(minHeap.peekMin()).toBeUndefined(); // Heap should be empty
            expect(minHeap.size()).toBe(0);
        });

        it('should return undefined when extracting from an empty heap', () => {
            const emptyHeap = new MinHeap<number>((a, b) => b - a);
            expect(emptyHeap.extractMin()).toBeUndefined();
        });

        it('should decrease the size after extractMin', () => {
            minHeap.extractMin();
            expect(minHeap.size()).toBe(2);
            minHeap.extractMin();
            expect(minHeap.size()).toBe(1);
            minHeap.extractMin();
            expect(minHeap.size()).toBe(0);
        });
    });

    describe('peekMin', () => {
        beforeEach(() => {
            minHeap.insert(10);
            minHeap.insert(5);
            minHeap.insert(15);
        });

        it('should peek at the minimum element (root) without removing it', () => {
            expect(minHeap.peekMin()).toBe(5); // Min should be 5
            expect(minHeap.size()).toBe(3); // Size should remain the same after peek
        });

        it('should return undefined when peeking at an empty heap', () => {
            const emptyHeap = new MinHeap<number>((a, b) => a - b);
            expect(emptyHeap.peekMin()).toBeUndefined();
        });
    });

    describe('heapify', () => {
        it('should heapify an array into a valid min-heap (in-place)', () => {
            const array = [5, 3, 8, 4, 1, 6, 7, 2];
            minHeap.heapify(array); // Heapify in-place
            expect(minHeap.size()).toBe(array.length);
            expect(minHeap.extractMin()).toBe(1);
            expect(minHeap.extractMin()).toBe(2);
            expect(minHeap.extractMin()).toBe(3);
            expect(minHeap.extractMin()).toBe(4);
            expect(minHeap.extractMin()).toBe(5);
            expect(minHeap.extractMin()).toBe(6);
            expect(minHeap.extractMin()).toBe(7);
            expect(minHeap.extractMin()).toBe(8);
            expect(minHeap.isEmpty()).toBe(true); // After extracting all, heap should be empty
        });

        it('should handle heapifying an already heap-ordered array (no change needed)', () => {
            const heapArray = [1, 2, 3, 4, 5]; // Already a min-heap
            minHeap.heapify(heapArray);
            expect(minHeap.toArray()).toEqual(heapArray); // Should remain the same
        });

        it('should handle heapifying an empty array', () => {
            const emptyArray: number[] = [];
            minHeap.heapify(emptyArray);
            expect(minHeap.isEmpty()).toBe(true);
            expect(minHeap.size()).toBe(0);
        });
    });

    describe('clear', () => {
        it('should clear all elements from the min-heap', () => {
            minHeap.insert(10);
            minHeap.insert(20);
            minHeap.clear();
            expect(minHeap.isEmpty()).toBe(true);
            expect(minHeap.size()).toBe(0);
            expect(minHeap.peekMin()).toBeUndefined();
            expect(minHeap.extractMin()).toBeUndefined();
        });
    });

    describe('toArray', () => {
        it('should return an empty array for an empty heap', () => {
            expect(minHeap.toArray()).toEqual([]);
        });

        it('should return an array representation of the heap (heap array)', () => {
            minHeap.insert(1);
            minHeap.insert(5);
            minHeap.insert(3);
            minHeap.insert(2);
            minHeap.insert(4);
            expect(minHeap.toArray()).toEqual([1, 2, 3, 5, 4]); // Example heap array representation - order might vary slightly depending on implementation, but should represent a valid heap
        });
    });
});