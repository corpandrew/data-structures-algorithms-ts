import {IDoublyLinkedList} from "./types.ts";

export class DoublyLinkedList<T> implements IDoublyLinkedList<T> {
    getSize(): number {
        throw new Error("Method not implemented.");
    }

    isEmpty(): boolean {
        throw new Error("Method not implemented.");
    }

    insertAtBeginning(data: T): void {
        throw new Error("Method not implemented.");
    }

    insertAtEnd(data: T): void {
        throw new Error("Method not implemented.");
    }

    insertAtIndex(data: T, index: number): void {
        throw new Error("Method not implemented.");
    }

    deleteFromBeginning(): T | undefined {
        throw new Error("Method not implemented.");
    }

    deleteFromEnd(): T | undefined {
        throw new Error("Method not implemented.");
    }

    deleteAtIndex(index: number): T | undefined {
        throw new Error("Method not implemented.");
    }

    search(data: T): boolean {
        throw new Error("Method not implemented.");
    }

    printList(): void {
        throw new Error("Method not implemented.");
    }

    reverseList(): void {
        throw new Error("Method not implemented.");
    }

    toArray(): T[] {
        throw new Error("Method not implemented.");
    }

    [Symbol.iterator](): Iterator<T> {

        return {
            next(): IteratorResult<T> {
                return {value: "", done: false}
            }
        }
    }

}

class Node<T> {
    /**
     * Data of the Node
     * @private
     */
    private data: T;
    /**
     * Pointer to the next node, null if it's the tail
     */
    next: IDoublyLinkedListItem<T> | null;
    /**
     * Pointer to the previous node, null if it's the head
     */
    prev: IDoublyLinkedListItem<T> | null;

}