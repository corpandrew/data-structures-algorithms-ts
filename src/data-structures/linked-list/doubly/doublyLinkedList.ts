import {IDoublyLinkedList} from "./types.ts";

export class DoublyLinkedList<T> implements IDoublyLinkedList<T> {
    private head: Node<T> | null;
    private tail: Node<T> | null;
    private length: number;

    public constructor() {
        this.length = 0;
        this.head = null;
        this.tail = null;
    }

    getSize(): number {
        return this.length;
    }

    isEmpty(): boolean {
        return this.length === 0;
    }

    insertAtBeginning(data: T): void {
        const newNode = new Node(data);
        if (!this.head) {
            this.head = newNode;
            this.tail = this.head;
        } else {
            const next = this.head;
            next?.setPrev(newNode);
            this.head = newNode;
            this.head.setNext(next);
        }

        this.length++;
    }

    insertAtEnd(data: T): void {
        const newNode = new Node(data);
        if (!this.tail) {
            this.head = newNode;
            this.tail = this.head;
        } else {
            const prev = this.tail;
            prev.setNext(newNode);
            newNode.setPrev(prev);
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

        if (0 > index || index > this.length) {
            throw new Error("Out of bounds exception");
        }


        const newNode = new Node(data);
        let currNode: Node<T> | null;
        let i = 0;

        if (index <= this.length / 2) {
            // Start from head
            currNode = this.head;
            while (i < index - 1 && currNode) {
                currNode = currNode.getNext();
                i++;
            }
        } else {
            // Start from tail (optimized for indices closer to the end)
            currNode = this.tail;
            i = this.length - 1;
            while (i > index && currNode) {
                currNode = currNode.getPrev();
                i--;
            }
            currNode = currNode?.getPrev() ?? null;
        }

        if (!currNode) {
            // Should not happen in valid index range, but for safety
            return;
        }

        const nextNode = currNode.getNext();
        newNode.setPrev(currNode);
        newNode.setNext(nextNode);
        currNode.setNext(newNode);
        if (nextNode) {
            nextNode.setPrev(newNode);
        } else {
            this.tail = newNode; // Update tail if inserting at the end
        }
        this.length++;
    }

    deleteFromBeginning(): T | undefined {
        if (this.isEmpty()) {
            return undefined;
        }

        const headNext = this.head?.getNext();
        const tmpHead = this.head;
        if (headNext) {
            this.head = headNext;
            this.head.setPrev(null);
        } else {
            this.head = null;
            this.tail = null;
        }
        this.length--;
        return tmpHead?.getData();
    }

    deleteFromEnd(): T | undefined {
        if (this.isEmpty()) {
            return undefined;
        }

        const tailPrev = this.tail?.getPrev();
        const tmpTail = this.tail;
        if (tailPrev) {
            this.tail = tailPrev;
            this.tail.setNext(null);
        } else {
            this.head = null;
            this.tail = null;
        }
        this.length--;
        return tmpTail?.getData();
    }

    deleteAtIndex(index: number): T | undefined {
        if (index === 0) {
            return this.deleteFromBeginning();
        }
        if (index === this.length - 1) {
            return this.deleteFromEnd();
        }
        if (0 > index || index >= this.length) {
            return undefined;
        }

        let currNode: Node<T> | null = this.head;
        let prevNode: Node<T> | null = null;
        let i = 0;

        while (currNode && i < index) {
            prevNode = currNode;
            currNode = currNode.getNext();
            i++;
        }

        if (!currNode) {
            return undefined;
        }

        const removedData = currNode.getData();
        const nextNode = currNode.getNext();

        if (prevNode) {
            prevNode.setNext(nextNode);
        }
        if (nextNode) {
            nextNode.setPrev(prevNode);
        }
        this.length--;
        return removedData;
    }

    search(data: T): boolean {
        if (this.isEmpty()) {
            return false;
        }

        let currNode = this.head;

        while (currNode !== null) {
            if (currNode && currNode.getData() === data) {
                return true;
            }
            currNode = currNode.getNext() ?? null;
        }

        return false;
    }

    printList(): void {
        console.log(this.toArray());
    }

    reverseList(): void {
        if (!this.tail) {
            return;
        }

        let currNode: Node<T> | null = this.tail;
        let tempPrevious = null;
        while (currNode !== null) {
            tempPrevious = currNode.getPrev();
            currNode.setNext(currNode.getPrev());
            if (tempPrevious) {
                currNode.setPrev(tempPrevious);
            }
            currNode = tempPrevious;
        }

        const tmp = this.tail;
        this.tail = this.head;
        this.head = tmp;
    }

    toArray(): T[] {
        if (this.isEmpty()) {
            return [];
        }

        const arr: T[] = [];

        for (const item of this) {
            arr.push(item);
        }

        return arr;
    }

    [Symbol.iterator](): Iterator<T> {
        let currNode = this.head;

        return {
            next(): IteratorResult<T> {
                if (currNode === null) {
                    return {value: undefined, done: true};
                }

                const retValue = {value: currNode.getData(), done: false};
                currNode = currNode.getNext();
                return retValue;
            }
        }
    }

}

class Node<T> {
    /**
     * Data of the Node
     * @private
     */
    private readonly data: T;

    /**
     * Pointer to the next node, null if it's the tail
     */
    private next: Node<T> | null;

    /**
     * Pointer to the previous node, null if it's the head
     */
    private prev: Node<T> | null;

    public constructor(data: T) {
        this.data = data;
        this.prev = null;
        this.next = null;
    }

    public getNext(): Node<T> | null {
        return this.next;
    }

    public setNext(next: Node<T> | null): void {
        this.next = next;
    }

    public getPrev(): Node<T> | null {
        return this.prev;
    }

    public setPrev(prev: Node<T> | null): void {
        this.prev = prev;
    }

    public getData(): T {
        return this.data;
    }
}