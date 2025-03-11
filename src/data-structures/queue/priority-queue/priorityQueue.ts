import {HeapNode} from "../../heap/types.ts";
import {IPriorityQueue} from "./types.ts";
import {MinHeap} from "../../heap/min/minHeap.ts";

/**
 * A wrapper class for items in the Priority Queue, pairing an item with its priority.
 * Implements comparison logic so MinHeap can order it naturally.
 */
class PriorityEntry<T> {
    constructor(public item: T, public priority: number) {

    }

    valueOf(): number {
        return this.priority;
    }
}

/**
 * A Priority Queue implementation using an unmodified MinHeap, where lower priority values indicate higher priority.
 * @template T The type of items stored in the Priority Queue.
 */
export class PriorityQueue<T> implements IPriorityQueue<T> {
    private heap: MinHeap<PriorityEntry<T>>;

    constructor() {
        this.heap = new MinHeap<PriorityEntry<T>>((a, b) => a.priority - b.priority);
    }

    enqueue(item: T, priority: number): void {
        this.heap.insert(new PriorityEntry(item, priority));
    }

    dequeue(): HeapNode<T> {
        return this.heap.extractMin()?.item;
    }

    peek(): HeapNode<T> {
        return this.heap.peekMin()?.item;
    }

    size(): number {
        return this.heap.size();
    }

    isEmpty(): boolean {
        return this.heap.isEmpty();
    }

    clear(): void {
        this.heap.clear();
    }

    toArray(): HeapNode<T>[] {
        return this.heap.toArray().map(entry => entry?.item);
    }
}