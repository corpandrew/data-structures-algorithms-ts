import {IQueue} from "./types.ts";
import {SinglyLinkedList} from "../linked-list/singly/singlyLinkedList.ts";
import {ISinglyLinkedList} from "../linked-list/singly/types.ts";

export class Queue<T> implements IQueue<T> {
    private linkedList: ISinglyLinkedList<T>;

    constructor() {
        this.linkedList = new SinglyLinkedList<T>();
    }

    enqueue(item: T): void {
        this.linkedList.insertAtEnd(item);
    }

    dequeue(): T | undefined {
        return this.linkedList.deleteFromBeginning();
    }

    peek(): T | undefined {
        return this.linkedList.peekHead();
    }

    isEmpty(): boolean {
        return this.linkedList.isEmpty();
    }

    size(): number {
        return this.linkedList.getSize();
    }

    clear(): void {
        this.linkedList = new SinglyLinkedList();
    }

    toArray(): T[] {
        return this.linkedList.toArray();
    }

}