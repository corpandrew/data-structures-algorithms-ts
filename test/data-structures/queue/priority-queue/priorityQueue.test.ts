import { describe, it, expect, beforeEach } from 'vitest';
import {IPriorityQueue} from "../../../../src/data-structures/queue/priority-queue/types";
import {PriorityQueue} from "../../../../src/data-structures/queue/priority-queue/priorityQueue";

describe('PriorityQueue', () => {
    let priorityQueue: IPriorityQueue<string>; // Example PriorityQueue of strings (you can test with other types)

    beforeEach(() => {
        priorityQueue = new PriorityQueue<string>(); // Instantiate your PriorityQueue implementation (MinHeap or MaxHeap based)
    });

    describe('enqueue', () => {
        it('should enqueue items with priorities', () => {
            priorityQueue.enqueue('task1', 3); // Priority 3 (lower number = higher priority for MinHeap based PQ)
            priorityQueue.enqueue('task2', 1); // Priority 1 (highest)
            priorityQueue.enqueue('task3', 2); // Priority 2
            expect(priorityQueue.size()).toBe(3);
        });
    });

    describe('dequeue', () => {
        beforeEach(() => {
            priorityQueue.enqueue('task1', 3);
            priorityQueue.enqueue('task2', 1);
            priorityQueue.enqueue('task3', 2);
        });

        it('should dequeue items in priority order (highest priority first - MinHeap based PQ)', () => {
            expect(priorityQueue.dequeue()).toBe('task2'); // Priority 1 (highest)
            expect(priorityQueue.dequeue()).toBe('task3'); // Priority 2
            expect(priorityQueue.dequeue()).toBe('task1'); // Priority 3 (lowest)
            expect(priorityQueue.dequeue()).toBeUndefined(); // Queue should be empty now
        });

        it('should return undefined when dequeuing from an empty priority queue', () => {
            const emptyQueue = new PriorityQueue<string>();
            expect(emptyQueue.dequeue()).toBeUndefined();
        });

        it('should decrease the size after dequeue', () => {
            priorityQueue.dequeue();
            expect(priorityQueue.size()).toBe(2);
            priorityQueue.dequeue();
            expect(priorityQueue.size()).toBe(1);
            priorityQueue.dequeue();
            expect(priorityQueue.size()).toBe(0);
        });
    });

    describe('peek', () => {
        beforeEach(() => {
            priorityQueue.enqueue('task1', 3);
            priorityQueue.enqueue('task2', 1);
            priorityQueue.enqueue('task3', 2);
        });

        it('should peek at the highest priority item without removing it', () => {
            expect(priorityQueue.peek()).toBe('task2'); // Highest priority item should be 'task2'
            expect(priorityQueue.size()).toBe(3); // Size should remain the same after peek
        });

        it('should return undefined when peeking at an empty priority queue', () => {
            const emptyQueue = new PriorityQueue<string>();
            expect(emptyQueue.peek()).toBeUndefined();
        });
    });

    describe('size and isEmpty', () => {
        it('should be empty initially', () => {
            expect(priorityQueue.isEmpty()).toBe(true);
            expect(priorityQueue.size()).toBe(0);
        });

        it('should not be empty after enqueuing items', () => {
            priorityQueue.enqueue('task1', 3);
            expect(priorityQueue.isEmpty()).toBe(false);
            expect(priorityQueue.size()).toBe(1);
            priorityQueue.enqueue('task2', 1);
            expect(priorityQueue.size()).toBe(2);
        });

        it('should be empty after enqueuing and dequeuing all items', () => {
            priorityQueue.enqueue('task1', 3);
            priorityQueue.dequeue();
            expect(priorityQueue.isEmpty()).toBe(true);
            expect(priorityQueue.size()).toBe(0);
        });
    });

    describe('clear (Optional)', () => {
        it('should clear all items from the priority queue', () => {
            priorityQueue.enqueue('task1', 3);
            priorityQueue.enqueue('task2', 1);
            priorityQueue.clear?.(); // Optional method call - use ?. to avoid error if not implemented
            expect(priorityQueue.isEmpty()).toBe(true);
            expect(priorityQueue.size()).toBe(0);
            expect(priorityQueue.peek()).toBeUndefined();
            expect(priorityQueue.dequeue()).toBeUndefined();
        });
    });

    describe('toArray (Optional - for testing/debugging)', () => {
        it('should return an empty array for an empty priority queue', () => {
            expect(priorityQueue.toArray?.()).toEqual([]);
        });

        it('should return an array representation of the priority queue (order might not be strictly guaranteed)', () => {
            priorityQueue.enqueue('task1', 3);
            priorityQueue.enqueue('task2', 1);
            priorityQueue.enqueue('task3', 2);
            priorityQueue.enqueue('task4', 4);
            priorityQueue.enqueue('task5', 6);
            priorityQueue.enqueue('task6', 5);
            expect(priorityQueue.toArray?.()).toEqual(['task2', 'task1', 'task3', 'task4', 'task5', 'task6']);
        });
    });

    describe('Task Scheduler Application (Conceptual)', () => {
        it('should dequeue tasks in priority order (Conceptual Task Scheduler Example)', () => {
            priorityQueue.enqueue('Low Priority Task', 5);
            priorityQueue.enqueue('High Priority Task', 1);
            priorityQueue.enqueue('Medium Priority Task', 3);

            const taskOrder = [];
            while (!priorityQueue.isEmpty()) {
                taskOrder.push(priorityQueue.dequeue());
            }
            expect(taskOrder).toEqual(['High Priority Task', 'Medium Priority Task', 'Low Priority Task']); // Tasks dequeued in priority order
        });
    });
});