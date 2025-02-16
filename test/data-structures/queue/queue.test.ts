import { IQueue } from '../../../src/data-structures/queue/types';
import { Queue } from '../../../src/data-structures/queue/Queue';
import { describe, it, expect, beforeEach } from 'vitest';

describe('Queue', () => {
    let queue: IQueue<number>;

    beforeEach(() => {
        queue = new Queue<number>();
    });

    describe('getSize and isEmpty', () => {
        it('should be empty initially', () => {
            expect(queue.isEmpty()).toBe(true);
            expect(queue.size()).toBe(0);
        });

        it('should not be empty after enqueuing elements', () => {
            queue.enqueue(10);
            expect(queue.isEmpty()).toBe(false);
            expect(queue.size()).toBe(1);
            queue.enqueue(20);
            expect(queue.size()).toBe(2);
        });

        it('should be empty after enqueuing and dequeuing all elements', () => {
            queue.enqueue(10);
            queue.dequeue();
            expect(queue.isEmpty()).toBe(true);
            expect(queue.size()).toBe(0);
        });
    });

    describe('enqueue', () => {
        it('should enqueue elements to the queue', () => {
            queue.enqueue(10);
            expect(queue.peek()).toBe(10); // Front should be 10 after first enqueue
            queue.enqueue(20);
            expect(queue.peek()).toBe(10); // Front should still be 10 (FIFO)
        });

        it('should increase the size after enqueue', () => {
            queue.enqueue(10);
            expect(queue.size()).toBe(1);
            queue.enqueue(20);
            expect(queue.size()).toBe(2);
        });
    });

    describe('dequeue', () => {
        it('should dequeue the first enqueued element (FIFO)', () => {
            queue.enqueue(10);
            queue.enqueue(20);
            expect(queue.dequeue()).toBe(10); // First enqueued (10) should be dequeued first
            expect(queue.dequeue()).toBe(20); // Then the next (20)
        });

        it('should return undefined when dequeuing from an empty queue', () => {
            expect(queue.dequeue()).toBeUndefined();
        });

        it('should decrease the size after dequeue', () => {
            queue.enqueue(10);
            queue.enqueue(20);
            queue.dequeue();
            expect(queue.size()).toBe(1);
            queue.dequeue();
            expect(queue.size()).toBe(0);
        });

        it('should make the queue empty after dequeuing all elements', () => {
            queue.enqueue(10);
            queue.dequeue();
            expect(queue.isEmpty()).toBe(true);
        });
    });

    describe('peek', () => {
        it('should peek at the front element without removing it', () => {
            queue.enqueue(10);
            queue.enqueue(20);
            expect(queue.peek()).toBe(10); // Front should be 10
            expect(queue.size()).toBe(2); // Size should remain the same after peek
        });

        it('should return undefined when peeking at an empty queue', () => {
            expect(queue.peek()).toBeUndefined();
        });
    });

    describe('clear', () => {
        it('should clear all elements from the queue', () => {
            queue.enqueue(10);
            queue.enqueue(20);
            queue.clear();
            expect(queue.isEmpty()).toBe(true);
            expect(queue.size()).toBe(0);
            expect(queue.peek()).toBeUndefined();
            expect(queue.dequeue()).toBeUndefined();
        });
    });

    describe('toArray', () => {
        it('should return an empty array for an empty queue', () => {
            expect(queue.toArray()).toEqual([]);
        });

        it('should return an array with elements in FIFO order (front to back)', () => {
            queue.enqueue(10);
            queue.enqueue(20);
            queue.enqueue(30);
            expect(queue.toArray()).toEqual([10, 20, 30]); // FIFO order: Front (10) to Back (30)
        });
    });
});