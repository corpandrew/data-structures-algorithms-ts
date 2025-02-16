import {IStack} from "./types.ts";
import {ISinglyLinkedList} from "../linked-list/singly/types.ts";
import {SinglyLinkedList} from "../linked-list/singly/singlyLinkedList.ts";

export class Stack<T> implements IStack<T> {
    private linkedList: ISinglyLinkedList<T>;

    public constructor() {
        this.linkedList = new SinglyLinkedList<T>();
    }

    push(item: T): void {
        this.linkedList.insertAtBeginning(item);
    }

    pop(): T | undefined {
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