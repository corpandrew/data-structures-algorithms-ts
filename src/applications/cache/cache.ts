import {ICache} from "./types.ts";
import {IHashTable} from "../../data-structures/hash-table/types.ts";
import {HashTable} from "../../data-structures/hash-table/hashTable.ts";

export class Cache<K, V> implements ICache<K, V> {
    private hashTable: IHashTable<K, V>;

    public constructor() {
        this.hashTable = new HashTable();
    }

    cacheData(key: K, data: V): void {
        this.hashTable.put(key, data);
    }

    getCachedData(key: K): V | undefined {
        return this.hashTable.get(key);
    }

    invalidateCache(key: K): boolean {
        return this.hashTable.remove(key);
    }

    clearCache(): void {
        this.hashTable.clear();
    }

    getCacheSize(): number {
        return this.hashTable.size();
    }

    isDataCached(key: K): boolean {
        return this.hashTable.containsKey(key);
    }

    isEmpty(): boolean {
        return this.hashTable.isEmpty();
    }
} 