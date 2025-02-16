
/**
 * Interface for a DoublyLinkedList data structure.
 * Extends the base LinkedList interface if you have one, or define all methods here.
 * @template T The type of data stored in the DoublyLinkedList.
 */
export interface IDoublyLinkedList<T> {
    /**
     * Gets the number of elements in the DoublyLinkedList.
     * @returns The size of the DoublyLinkedList.
     */
    getSize(): number;

    /**
     * Checks if the DoublyLinkedList is empty.
     * @returns True if the DoublyLinkedList is empty, false otherwise.
     */
    isEmpty(): boolean;

    /**
     * Inserts a new element at the beginning of the DoublyLinkedList.
     * @param data The data to insert at the beginning.
     */
    insertAtBeginning(data: T): void;

    /**
     * Inserts a new element at the end of the DoublyLinkedList.
     * @param data The data to insert at the end.
     */
    insertAtEnd(data: T): void;

    /**
     * Inserts a new element at a specific index in the DoublyLinkedList.
     * @param data The data to insert.
     * @param index The index at which to insert the data (0-based).
     * @throws Error if the index is out of bounds.
     */
    insertAtIndex(data: T, index: number): void;

    /**
     * Deletes the element at the beginning of the DoublyLinkedList.
     * @returns The data of the deleted element, or undefined if the list was empty.
     */
    deleteFromBeginning(): T | undefined;

    /**
     * Deletes the element at the end of the DoublyLinkedList.
     * @returns The data of the deleted element, or undefined if the list was empty.
     */
    deleteFromEnd(): T | undefined;

    /**
     * Deletes the element at a specific index in the DoublyLinkedList.
     * @param index The index of the element to delete (0-based).
     * @returns The data of the deleted element, or undefined if the index is out of bounds or list is empty.
     * @throws Error if the index is out of bounds.
     */
    deleteAtIndex(index: number): T | undefined;

    /**
     * Searches for the first occurrence of a given data value in the DoublyLinkedList.
     * @param data The data to search for.
     * @returns True if the data is found, false otherwise.
     */
    search(data: T): boolean;

    /**
     * Prints all elements of the DoublyLinkedList to the console (for debugging/visualization).
     */
    printList(): void;

    /**
     * Reverses the DoublyLinkedList in-place.
     */
    reverseList(): void;

    /**
     * (Optional) Returns an array representation of the DoublyLinkedList.
     * @returns An array containing the data of each node in the DoublyLinkedList.
     */
    toArray(): T[];

    [Symbol.iterator](): Iterator<T>;
}