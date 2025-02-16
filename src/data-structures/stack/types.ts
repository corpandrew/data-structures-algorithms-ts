/**
 * Interface for a Stack data structure.
 * Defines the standard Stack operations: LIFO (Last-In, First-Out).
 * @template T The type of elements stored in the Stack.
 */
export interface IStack<T> {
    /**
     * Adds an element to the top of the stack.
     * @param item The element to push onto the stack.
     */
    push(item: T): void;

    /**
     * Removes and returns the element at the top of the stack.
     * @returns The element removed from the top, or undefined if the stack is empty.
     */
    pop(): T | undefined;

    /**
     * Returns the element at the top of the stack without removing it.
     * @returns The element at the top of the stack, or undefined if the stack is empty.
     */
    peek(): T | undefined;

    /**
     * Checks if the stack is empty.
     * @returns True if the stack is empty, false otherwise.
     */
    isEmpty(): boolean;

    /**
     * Returns the number of elements in the stack.
     * @returns The size of the stack.
     */
    size(): number;

    /**
     * (Optional) Clears all elements from the stack.
     */
    clear(): void; // Optional, but often useful for Stack ADT

    /**
     * (Optional) Returns an array representation of the Stack (from bottom to top).
     * Useful for debugging and testing.
     * @returns An array of elements in the stack.
     */
    toArray(): T[]; // Optional, for testing and debugging
}