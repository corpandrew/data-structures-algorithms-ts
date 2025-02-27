import { describe, it, expect, beforeEach } from 'vitest';
import {MaxHeap} from "../../../../src/data-structures/heap/max/maxHeap";
import {IMaxHeap} from "../../../../src/data-structures/heap/max/types";

describe('MaxHeap', () => {
    let maxHeap: IMaxHeap<number>;

    beforeEach(() => {
        maxHeap = new MaxHeap<number>(); // Instantiate your MaxHeap implementation
    });

    // --- Reuse tests from min-heap.test.ts, but adapt assertions for Max-Heap behavior ---
    // (Copy and adapt tests for isEmpty, size, insert, extractMin/Max, peekMin/Max, heapify, clear, toArray from min-heap.test.ts, adjusting assertions to Max-Heap properties)

    describe('isEmpty and size', () => {
        it('should be empty initially', () => {
            expect(maxHeap.isEmpty()).toBe(true);
            expect(maxHeap.size()).toBe(0);
        });

        it('should not be empty after inserting elements', () => {
            maxHeap.insert(10);
            expect(maxHeap.isEmpty()).toBe(false);
            expect(maxHeap.size()).toBe(1);
            maxHeap.insert(20);
            expect(maxHeap.size()).toBe(2);
        });

        it('should be empty after inserting and extracting all elements', () => {
            maxHeap.insert(10);
            maxHeap.extractMax();
            expect(maxHeap.isEmpty()).toBe(true);
            expect(maxHeap.size()).toBe(0);
        });
    });

    describe('insert', () => {
        it('should insert elements into the max-heap', () => {
            maxHeap.insert(10);
            expect(maxHeap.peekMax()).toBe(10);
            maxHeap.insert(5);
            expect(maxHeap.peekMax()).toBe(10); // Max should still be 10
            maxHeap.insert(15);
            expect(maxHeap.peekMax()).toBe(15); // Max should be updated to 15
        });

        it('should increase the size after insert', () => {
            maxHeap.insert(10);
            expect(maxHeap.size()).toBe(1);
            maxHeap.insert(20);
            expect(maxHeap.size()).toBe(2);
        });
    });

    describe('extractMax', () => {
        beforeEach(() => {
            maxHeap.insert(10);
            maxHeap.insert(5);
            maxHeap.insert(15);
        });

        it('should extract the maximum element (root) and maintain max-heap property', () => {
            expect(maxHeap.extractMax()).toBe(15); // Extract max (15)
            expect(maxHeap.peekMax()).toBe(10); // New max should be 10 after heapify down
            expect(maxHeap.size()).toBe(2);

            expect(maxHeap.extractMax()).toBe(10); // Extract next max (10)
            expect(maxHeap.peekMax()).toBe(5); // New max should be 5
            expect(maxHeap.size()).toBe(1);

            expect(maxHeap.extractMax()).toBe(5); // Extract last max (5)
            expect(maxHeap.peekMax()).toBeUndefined(); // Heap should be empty
            expect(maxHeap.size()).toBe(0);
        });

        it('should return undefined when extracting from an empty heap', () => {
            const emptyHeap = new MaxHeap<number>();
            expect(emptyHeap.extractMax()).toBeUndefined();
        });
    });

    describe('peekMax', () => {
        beforeEach(() => {
            maxHeap.insert(10);
            maxHeap.insert(5);
            maxHeap.insert(15);
        });

        it('should peek at the maximum element (root) without removing it', () => {
            expect(maxHeap.peekMax()).toBe(15); // Max should be 15
            expect(maxHeap.size()).toBe(3); // Size should remain the same after peek
        });

        it('should return undefined when peeking at an empty heap', () => {
            const emptyHeap = new MaxHeap<number>();
            expect(emptyHeap.peekMax()).toBeUndefined();
        });
    });

    describe('heapify', () => {
        it('should heapify an array into a valid max-heap (in-place)', () => {
            const array = [5, 3, 8, 4, 1, 6, 7, 2];
            maxHeap.heapify(array); // Heapify in-place
            expect(maxHeap.size()).toBe(array.length);
            expect(maxHeap.extractMax()).toBe(8);
            expect(maxHeap.extractMax()).toBe(7);
            expect(maxHeap.extractMax()).toBe(6);
            expect(maxHeap.extractMax()).toBe(5);
            expect(maxHeap.extractMax()).toBe(4);
            expect(maxHeap.extractMax()).toBe(3);
            expect(maxHeap.extractMax()).toBe(2);
            expect(maxHeap.extractMax()).toBe(1);
            expect(maxHeap.isEmpty()).toBe(true); // After extracting all, heap should be empty
        });

        it('should handle heapifying an already heap-ordered array (no change needed)', () => {
            const heapArray = [8, 5, 7, 4, 1]; // Already a max-heap (example)
            maxHeap.heapify(heapArray);
            expect(maxHeap.toArray()).toEqual(heapArray); // Should remain the same
        });

        it('should handle heapifying an empty array', () => {
            const emptyArray: number[] = [];
            maxHeap.heapify(emptyArray);
            expect(maxHeap.isEmpty()).toBe(true);
            expect(maxHeap.size()).toBe(0);
        });
    });

    describe('clear', () => {
        it('should clear all elements from the max-heap', () => {
            maxHeap.insert(10);
            maxHeap.insert(20);
            maxHeap.clear();
            expect(maxHeap.isEmpty()).toBe(true);
            expect(maxHeap.size()).toBe(0);
            expect(maxHeap.peekMax()).toBeUndefined();
            expect(maxHeap.extractMax()).toBeUndefined();
        });
    });

    describe('toArray', () => {
        it('should return an empty array for an empty heap', () => {
            expect(maxHeap.toArray()).toEqual([]);
        });

        it('should return an array representation of the max-heap (heap array)', () => {
            maxHeap.insert(1);
            maxHeap.insert(5);
            maxHeap.insert(3);
            maxHeap.insert(2);
            maxHeap.insert(4);
            expect(maxHeap.toArray()).toEqual([5, 4, 3, 1, 2]);
        });
    });
});