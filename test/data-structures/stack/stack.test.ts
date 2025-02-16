import { IStack } from '../../../src/data-structures/stack/types'; // Adjust path if needed
import { describe, it, expect, beforeEach } from 'vitest';
import {Stack} from "../../../src/data-structures/stack/stack";

describe('Stack', () => {
    let stack: IStack<number>; // Use the interface type

    beforeEach(() => {
        stack = new Stack<number>(); // Instantiate your Stack implementation (e.g., ArrayStack, LinkedListStack)
    });

    describe('getSize and isEmpty', () => {
        it('should be empty initially', () => {
            expect(stack.isEmpty()).toBe(true);
            expect(stack.size()).toBe(0);
        });

        it('should not be empty after pushing elements', () => {
            stack.push(10);
            expect(stack.isEmpty()).toBe(false);
            expect(stack.size()).toBe(1);
            stack.push(20);
            expect(stack.size()).toBe(2);
        });

        it('should be empty after pushing and popping all elements', () => {
            stack.push(10);
            stack.pop();
            expect(stack.isEmpty()).toBe(true);
            expect(stack.size()).toBe(0);
        });
    });

    describe('push', () => {
        it('should push elements onto the stack', () => {
            stack.push(10);
            expect(stack.peek()).toBe(10);
            stack.push(20);
            expect(stack.peek()).toBe(20);
        });

        it('should increase the size after push', () => {
            stack.push(10);
            expect(stack.size()).toBe(1);
            stack.push(20);
            expect(stack.size()).toBe(2);
        });
    });

    describe('pop', () => {
        it('should pop the last pushed element', () => {
            stack.push(10);
            stack.push(20);
            expect(stack.pop()).toBe(20);
            expect(stack.pop()).toBe(10);
        });

        it('should return undefined when popping from an empty stack', () => {
            expect(stack.pop()).toBeUndefined();
        });

        it('should decrease the size after pop', () => {
            stack.push(10);
            stack.push(20);
            stack.pop();
            expect(stack.size()).toBe(1);
            stack.pop();
            expect(stack.size()).toBe(0);
        });

        it('should make the stack empty after popping all elements', () => {
            stack.push(10);
            stack.pop();
            expect(stack.isEmpty()).toBe(true);
        });
    });

    describe('peek', () => {
        it('should peek at the top element without removing it', () => {
            stack.push(10);
            stack.push(20);
            expect(stack.peek()).toBe(20);
            expect(stack.size()).toBe(2); // Size should remain the same after peek
        });

        it('should return undefined when peeking at an empty stack', () => {
            expect(stack.peek()).toBeUndefined();
        });
    });

    describe('clear', () => {
        it('should clear all elements from the stack', () => {
            stack.push(10);
            stack.push(20);
            stack.clear();
            expect(stack.isEmpty()).toBe(true);
            expect(stack.size()).toBe(0);
            expect(stack.peek()).toBeUndefined();
            expect(stack.pop()).toBeUndefined();
        });
    });

    describe('toArray', () => {
        it('should return an empty array for an empty stack', () => {
            expect(stack.toArray()).toEqual([]);
        });

        it('should return an array with elements in LIFO order (top to bottom)', () => {
            stack.push(10);
            stack.push(20);
            stack.push(30);
            expect(stack.toArray()).toEqual([30, 20, 10]);
        });
    });
});