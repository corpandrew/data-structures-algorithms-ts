import {HeapNode} from "../types.ts";

/**
 * Interface for a Max-Heap data structure.
 * Defines the standard Max-Heap operations, ensuring the maximum element is always at the root.
 * @template T The type of elements stored in the Max-Heap. Must be comparable (for Max-Heap property).
 * @interface IMaxHeap
 */
export interface IMaxHeap<T> {
    /**
     * Inserts a new value into the Max-Heap.
     * Maintains the Max-Heap property after insertion (heapify up).
     * @param {T} value The value to insert.
     * @returns {void}
     * @memberof IMaxHeap
     */
    insert(value: T): void;

    /**
     * Extracts and returns the maximum value (root) from the Max-Heap.
     * Maintains the Max-Heap property after extraction (heapify down).
     * @returns {HeapNode<T>} The maximum value, or undefined if the heap is empty.
     * @memberof IMaxHeap
     */
    extractMax(): HeapNode<T>;

    /**
     * Returns the maximum value (root) from the Max-Heap without removing it.
     * @returns {HeapNode<T>} The maximum value, or undefined if the heap is empty.
     * @memberof IMaxHeap
     */
    peekMax(): HeapNode<T>;

    /**
     * Builds a Max-Heap from an array of values (in-place heapify).
     * @param {T[]} array The array of values to heapify.
     * @returns {void}
     * @memberof IMaxHeap
     */
    heapify(array: T[]): void; // Or potentially return a new MaxHeap instance if not in-place

    /**
     * Gets the number of elements in the Max-Heap.
     * @returns {number} The size of the heap.
     * @memberof IMaxHeap
     */
    size(): number;

    /**
     * Checks if the Max-Heap is empty.
     * @returns {boolean} True if the heap is empty, false otherwise.
     * @memberof IMaxHeap
     */
    isEmpty(): boolean;

    /**
     * Clears all elements from the Max-Heap.
     * @returns {void}
     * @memberof IMaxHeap
     */
    clear(): void;

    /**
     * Returns an array representation of the Max-Heap (e.g., heap array).
     * Useful for debugging and testing.
     * @returns {HeapNode<T>} An array representing the heap.
     * @memberof IMaxHeap
     */
    toArray(): HeapNode<T>[];
}