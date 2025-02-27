import {IMinHeap} from "./types.ts";
import {HeapNode} from "../types.ts";

export class MinHeap<T> implements IMinHeap<T> {
    private heap: HeapNode<T>[];
    private nodeCount;

    constructor() {
        this.heap = [];
        this.nodeCount = 0;
    }

    private getLeftChildIndex(parentIndex: number): number {
        return 2 * parentIndex + 1;
    }

    private getRightChildIndex(parentIndex: number): number {
        return 2 * parentIndex + 2;
    }

    private getParentIndex(childIndex: number): number {
        return Math.floor((childIndex - 1) / 2);
    }

    private getLeftChild(parentIndex: number): HeapNode<T> {
        return this.heap[this.getLeftChildIndex(parentIndex)];
    }

    private getRightChild(parentIndex: number): HeapNode<T> {
        return this.heap[this.getRightChildIndex(parentIndex)]
    };

    private getParent(childIndex: number): HeapNode<T> {
        return this.heap[this.getParentIndex(childIndex)];
    }

    private hasLeftChild(index: number): boolean {
        return this.getLeftChild(index) !== undefined;
    }

    private hasRightChild(index: number): boolean {
        return this.getRightChild(index) !== undefined;
    }

    private hasParent(index: number): boolean {
        return this.getParent(index) !== undefined;
    }

    private swap(indexA: number, indexB: number) {
        [this.heap[indexA], this.heap[indexB]] = [this.heap[indexB], this.heap[indexA]];
    }

    insert(value: T): void {
        //insert at last empty spot.
        this.heap.push(value);
        let index = this.heap.length - 1;
        while (true) {
            const hasParent = this.hasParent(index);
            if (hasParent && this.heap[index]! < this.getParent(index)!) {
                this.swap(index, this.getParentIndex(index))
                index = this.getParentIndex(index);
            } else {
                break;
            }
        }

        this.nodeCount++;
    }

    extractMin(): T | undefined {
        if (this.isEmpty()) {
            return undefined;
        }

        const min = this.heap[0];
        if (this.nodeCount === 1) {
            this.heap.pop(); // remove the last element
            this.nodeCount--;
            return min;
        }

        this.heap[0] = this.heap.pop()!;
        this.nodeCount--;

        let index = 0;
        while (this.hasLeftChild(index)) {
            let smallerChildIndex = this.getLeftChildIndex(index);

            if (this.hasRightChild(index) && this.getRightChild(index)! < this.getLeftChild(index)!) {
                smallerChildIndex = this.getRightChildIndex(index);
            }

            if (this.heap[index]! <= this.heap[smallerChildIndex]!) {
                break;
            }

            this.swap(index, smallerChildIndex);
            index = smallerChildIndex;
        }
        return min;
    }

    peekMin(): T | undefined {
        return this.heap[0];
    }

    heapify(array: T[]): void {
        this.clear();
        for (const node of array) {
            this.insert(node);
        }
    }

    size(): number {
        return this.nodeCount;
    }

    isEmpty(): boolean {
        return this.nodeCount === 0;
    }

    clear(): void {
        this.heap = [];
        this.nodeCount = 0;
    }

    toArray(): HeapNode<T>[] {
        return this.heap;
    }

}