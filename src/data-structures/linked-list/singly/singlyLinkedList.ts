import {ISinglyLinkedList} from "./types.ts";

export class SinglyLinkedList<T> implements ISinglyLinkedList<T> {
    private head: Node<T> | null;
    private tail: Node<T> | null;
    private length: number;

    public constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    getSize(): number {
        return this.length;
    }

    isEmpty(): boolean {
        return this.length === 0;
    }

    insertAtBeginning(data: T): void {
        this.head = new Node(data, this.head);
        if (this.tail === null) {
            this.tail = this.head;
        }
        this.length++;
    }

    insertAtEnd(data: T): void {
        const newNode = new Node(data, null);

        //insert at beginning
        if (this.head === null) {
            this.head = newNode;
            this.tail = newNode;
        } else if (this.tail !== null) {
            this.tail.setNext(newNode);
            this.tail = newNode;
        }

        this.length++;
    }

    insertAtIndex(data: T, index: number): void {
        if (index === 0) {
            this.insertAtBeginning(data);
            return;
        }

        if (index === this.length) {
            this.insertAtEnd(data);
            return;
        }

        if (index > this.length - 1 || index < 0) {
            throw new Error("Index out of bounds exception");
        }

        let currNode = this.head;
        let i = 0;
        while (currNode !== null) {
            if (i + 1 === index) {
                currNode.setNext(new Node(data, currNode?.getNext()));
                this.length++;
                return;
            }

            currNode = currNode?.getNext();
            i++;
        }
    }

    deleteFromBeginning(): T | undefined {
        const currHead = this.head;
        if (currHead !== null) {
            this.head = currHead.getNext();
            if (this.head === null) {
                this.tail = null;
            }
        } else {
            return undefined;
        }

        this.length--;
        return currHead?.getValue();
    }

    deleteFromEnd(): T | undefined {
        if (!this.head) { // Empty list
            return undefined;
        }

        if (!this.head.getNext()) { // List with only one node
            const removedData = this.head.getValue();
            this.head = null;
            this.tail = null; // Need to update tail too if you have one
            this.length--;
            return removedData;
        }

        let currNode: Node<T> | null = this.head.getNext();
        let secondToLastNode: Node<T> | null = this.head;

        while (currNode !== this.tail) {
            secondToLastNode = currNode;
            currNode = currNode?.getNext() ?? null;
        }

        const returnVal = this.tail?.getValue();
        if (secondToLastNode) {
            secondToLastNode.setNext(null);
        }
        this.tail = secondToLastNode;
        this.length--;
        return returnVal;
    }

    deleteAtIndex(index: number): T | undefined {
        if (index > this.length - 1 || index < 0) {
            return undefined;
        }

        if (index === 0) {
            return this.deleteFromBeginning();
        }

        // Correction needed in the loop condition:
        let currNode = this.head;
        let nodeBefore: Node<T> | null = null;
        let i = 0;
        while (currNode !== null) {
            if (i + 1 === index) { // Correct condition: check if i+1 === index
                const returnVal = currNode.getValue();
                nodeBefore?.setNext(currNode.getNext());
                currNode.setNext(null);//Do I need to do this?? - Good Question! Answer below
                this.length--;
                return returnVal;
            }
            nodeBefore = currNode;
            currNode = currNode?.getNext();
            i++;
        }
        return undefined; // Should not reach here in normal cases after checks, but good to have a return
    }

    search(data: T): boolean {
        if (!this.head) {
            return false;
        }

        let currNode: Node<T> | null = this.head;
        while (currNode !== null) {
            if (currNode.getValue() === data) {
                return true;
            }
            currNode = currNode.getNext();
        }

        return false;
    }

    printList(): void {
        console.log(this.toArray());
    }

    reverseList(): void {
        let currNode: Node<T> | null = this.head;
        if (!currNode) {
            return;
        }
        const originalHead = this.head; // Save the original head before reversal
        this.head = this.tail; // New head will be the original tail
        let nextNode = null;
        let prevNode = null;

        while (currNode !== null) {
            nextNode = currNode?.getNext();
            if (prevNode) {
                currNode.setNext(prevNode);
            } else {
                currNode.setNext(null); // New tail's next should be null
            }
            prevNode = currNode;
            currNode = nextNode;
        }

        this.tail = originalHead; // Correctly set tail to the original head
    }

    toArray(): T[] {
        let currNode = this.head;

        if (currNode === null) {
            return [];
        }

        const array: T[] = [];
        while (currNode !== null) {
            array.push(currNode.getValue());
            currNode = currNode.getNext();
        }

        return array;
    }

    [Symbol.iterator](): Iterator<T> {
        let currNode = this.head;

        return {
            next(): IteratorResult<T> {
                if (currNode === null) {
                    return {value: undefined, done: true};
                }

                const retValue = {value: currNode.getValue(), done: false};
                currNode = currNode.getNext();
                return retValue;
            }
        }
    }
}

class Node<T> {
    private readonly value: T;
    private next: Node<T> | null;

    public constructor(value: T, next?: Node<T> | null) {
        this.value = value;
        if (next) {
            this.next = next;
        } else {
            this.next = null;
        }
    }

    public setNext(next: Node<T> | null) {
        this.next = next;
    }

    public getNext(): Node<T> | null {
        return this.next;
    }

    public getValue(): T {
        return this.value;
    }
}