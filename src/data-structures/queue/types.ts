/**
 * Interface for a Queue data structure.
 * Defines the standard Queue operations: FIFO (First-In, First-Out).
 * @template T The type of elements stored in the Queue.
 */
export interface IQueue<T> {
    /**
     * Adds an element to the back (end) of the queue.
     * @param item The element to enqueue.
     */
    enqueue(item: T): void;

    /**
     * Removes and returns the element from the front (beginning) of the queue.
     * @returns The element dequeued from the front, or undefined if the queue is empty.
     */
    dequeue(): T | undefined;

    /**
     * Returns the element at the front (beginning) of the queue without removing it.
     * @returns The element at the front of the queue, or undefined if the queue is empty.
     */
    peek(): T | undefined; // or peekFront(), just peek is common

    /**
     * Checks if the queue is empty.
     * @returns True if the queue is empty, false otherwise.
     */
    isEmpty(): boolean;

    /**
     * Returns the number of elements in the queue.
     * @returns The size of the queue.
     */
    size(): number;

    /**
     * (Optional) Clears all elements from the queue.
     */
    clear(): void; // Optional, but often useful for Queue ADT

    /**
     * (Optional) Returns an array representation of the Queue (from front to back).
     * Useful for debugging and testing.
     * @returns An array of elements in the queue.
     */
    toArray(): T[]; // Optional, for testing and debugging
}