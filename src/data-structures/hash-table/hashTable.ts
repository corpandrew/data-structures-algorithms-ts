import {IHashTable} from "./types.ts";
import {ISinglyLinkedList} from "../linked-list/singly/types.ts";
import {SinglyLinkedList} from "../linked-list/singly/singlyLinkedList.ts";

const DEFAULT_SIZE = 13;

class HashEntry<K, V> {
    private readonly key: K;
    private value: V;

    constructor(key: K, value: V) {
        this.key = key;
        this.value = value;
    }

    getKey(): K {
        return this.key;
    }

    getValue(): V {
        return this.value;
    }

    setValue(value: V) {
        this.value = value;
    }
}

export class HashTable<K, V> implements IHashTable<K, V> {
    private buckets: Array<ISinglyLinkedList<HashEntry<K, V>>>;
    private tableSize: number;
    private count: number;

    public constructor(size: number = DEFAULT_SIZE) {
        this.tableSize = size;
        this.buckets = new Array(size);
        this.count = 0;

        for (let i = 0; i < size; i++) {
            this.buckets[i] = new SinglyLinkedList<HashEntry<K, V>>();
        }
    }

    private hashKey(key: K): number {
        const strKey = String(key); // Convert key to string for generality, may use json.stringify later on.
        let hash = 0;
        for (let i = 0; i < strKey.length; i++) {
            hash = (hash * 31 + strKey.charCodeAt(i)) % this.tableSize; // Prime 31 for distribution
        }
        return hash;
    }

    put(key: K, value: V): void {
        const hashKey = this.hashKey(key);
        const bucketEntry = this.buckets[hashKey];
        const hashEntry = new HashEntry(key, value);

        for (const entry of bucketEntry) {
            if (entry.getKey() === key) {
                entry.setValue(value);
                return;
            }
        }

        bucketEntry.insertAtEnd(hashEntry);
        this.count++;
    }

    get(key: K): V | undefined {
        const hashKey = this.hashKey(key);
        const bucketEntry = this.buckets[hashKey];

        for (const entry of bucketEntry) {
            if (entry.getKey() === key) {
                return entry.getValue();
            }
        }

        return undefined;
    }

    remove(key: K): boolean {
        const hashKey = this.hashKey(key);
        const bucketEntry = this.buckets[hashKey];

        let index = 0;
        for (const entry of bucketEntry) {
            if (entry.getKey() === key) {
                const deletedEntry = bucketEntry.deleteAtIndex(index);
                if (deletedEntry) {
                    this.count--;
                }
                return deletedEntry !== undefined;
            }
            index++;
        }

        return false;
    }

    containsKey(key: K): boolean {
        const hashKey = this.hashKey(key);
        const bucketEntry = this.buckets[hashKey];

        for (const entry of bucketEntry) {
            if (entry.getKey() === key) {
                return true;
            }
        }

        return false;
    }

    size(): number {
        return this.count;
    }

    isEmpty(): boolean {
        return this.count === 0;
    }

    clear(): void {
        this.buckets = new Array(this.tableSize);
        this.count = 0;

        for (let i = 0; i < this.tableSize; i++) {
            this.buckets[i] = new SinglyLinkedList<HashEntry<K, V>>();
        }
    }

    keys(): K[] {
        const keys: K[] = [];
        for (let i = 0; i < this.buckets.length; i++) {
            for (const entry of this.buckets[i]) {
                keys.push(entry.getKey());
            }
        }

        return keys;
    }

    values(): V[] {
        const values: V[] = [];
        for (let i = 0; i < this.buckets.length; i++) {
            for (const entry of this.buckets[i]) {
                values.push(entry.getValue());
            }
        }

        return values;
    }

}