import {HeapNode} from "../../heap/types.ts";

/**
 * Interface for a Priority Queue data structure.
 * Allows enqueuing items with priorities and dequeuing items with the highest priority.
 * @template T The type of items stored in the Priority Queue.
 */
export interface IPriorityQueue<T> {
    /**
     * Enqueues an item into the Priority Queue with a given priority.
     * The priority determines the order in which items are dequeued. Higher priority items are dequeued first (in a Max-Priority Queue, for Min-Priority Queue, lower priority values might mean higher priority).
     * @param {T} item The item to enqueue.
     * @param {number} priority The priority of the item (lower number typically means higher priority in Min-Priority Queue, adjust based on your priority queue definition).
     * @returns {void}
     * @memberof IPriorityQueue
     */
    enqueue(item: T, priority: number): void;

    /**
     * Dequeues and returns the item with the highest priority from the Priority Queue.
     * @returns {HeapNode<T>} The item with the highest priority, or undefined if the queue is empty.
     * @memberof IPriorityQueue
     */
    dequeue(): HeapNode<T>;

    /**
     * Returns the item with the highest priority from the Priority Queue without removing it.
     * @returns {HeapNode<T>} The item with the highest priority, or undefined if the queue is empty.
     * @memberof IPriorityQueue
     */
    peek(): HeapNode<T>;

    /**
     * Gets the number of items in the Priority Queue.
     * @returns {number} The size of the priority queue.
     * @memberof IPriorityQueue
     */
    size(): number;

    /**
     * Checks if the Priority Queue is empty.
     * @returns {boolean} True if the priority queue is empty, false otherwise.
     * @memberof IPriorityQueue
     */
    isEmpty(): boolean;

    /**
     * Clears all items from the Priority Queue.
     * @returns {void}
     * @memberof IPriorityQueue
     */
    clear(): void;

    /**
     * Returns an array representation of the items in the Priority Queue (order might not be guaranteed, often based on heap structure).
     * Useful for debugging and testing.
     * @returns {HeapNode<T>[]} An array of items in the priority queue.
     * @memberof IPriorityQueue
     */
    toArray(): HeapNode<T>[];
}