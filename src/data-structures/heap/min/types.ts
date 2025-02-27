import {HeapNode} from "../types.ts";

/**
 * Interface for a Min-Heap data structure.
 * Defines the standard Min-Heap operations, ensuring the minimum element is always at the root.
 * @template T The type of elements stored in the Min-Heap. Must be comparable (for Min-Heap property).
 * @interface IMinHeap
 */
export interface IMinHeap<T> {
    /**
     * Inserts a new value into the Min-Heap.
     * Maintains the Min-Heap property after insertion (heapify up).
     * @param {T} value The value to insert.
     * @returns {void}
     * @memberof IMinHeap
     */
    insert(value: T): void;

    /**
     * Extracts and returns the minimum value (root) from the Min-Heap.
     * Maintains the Min-Heap property after extraction (heapify down).
     * @returns {HeapNode<T>} The minimum value, or undefined if the heap is empty.
     * @memberof IMinHeap
     */
    extractMin(): HeapNode<T>;

    /**
     * Returns the minimum value (root) from the Min-Heap without removing it.
     * @returns {HeapNode<T>} The minimum value, or undefined if the heap is empty.
     * @memberof IMinHeap
     */
    peekMin(): HeapNode<T>;

    /**
     * Builds a Min-Heap from an array of values (in-place heapify).
     * @param {T[]} array The array of values to heapify.
     * @returns {void}
     * @memberof IMinHeap
     */
    heapify(array: T[]): void; // Or potentially return a new MinHeap instance if not in-place

    /**
     * Gets the number of elements in the Min-Heap.
     * @returns {number} The size of the heap.
     * @memberof IMinHeap
     */
    size(): number;

    /**
     * Checks if the Min-Heap is empty.
     * @returns {boolean} True if the heap is empty, false otherwise.
     * @memberof IMinHeap
     */
    isEmpty(): boolean;

    /**
     * Clears all elements from the Min-Heap.
     * @returns {void}
     * @memberof IMinHeap
     */
    clear(): void;

    /**
     * Returns an array representation of the Min-Heap (e.g., heap array).
     * Useful for debugging and testing.
     * @returns {HeapNode<T>[]} An array representing the heap.
     * @memberof IMinHeap
     */
    toArray(): HeapNode<T>[];
}