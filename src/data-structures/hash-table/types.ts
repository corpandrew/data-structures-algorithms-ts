
/**
 * Interface for a Hash Table (or Hash Map) data structure.
 * Defines the standard Hash Table operations for storing and retrieving key-value pairs.
 * @template K The type of keys stored in the Hash Table. Must be hashable (often strings or numbers).
 * @template V The type of values stored in the Hash Table.
 * @interface IHashTable
 */
export interface IHashTable<K, V> {
    /**
     * Inserts a key-value pair into the Hash Table.
     * If the key already exists, the value is updated.
     * @param {K} key The key to insert or update.
     * @param {V} value The value associated with the key.
     * @returns {void}
     * @memberof IHashTable
     */
    put(key: K, value: V): void;

    /**
     * Retrieves the value associated with a given key from the Hash Table.
     * @param {K} key The key to look up.
     * @returns {V | undefined} The value associated with the key, or undefined if the key is not found.
     * @memberof IHashTable
     */
    get(key: K): V | undefined;

    /**
     * Removes a key-value pair from the Hash Table, given its key.
     * @param {K} key The key to remove.
     * @returns {boolean} True if a key-value pair was removed (key existed), false otherwise.
     * @memberof IHashTable
     */
    remove(key: K): boolean;

    /**
     * Checks if the Hash Table contains a key.
     * @param {K} key The key to check for.
     * @returns {boolean} True if the key exists in the Hash Table, false otherwise.
     * @memberof IHashTable
     */
    containsKey(key: K): boolean;

    /**
     * Gets the number of key-value pairs in the Hash Table.
     * @returns {number} The size of the Hash Table.
     * @memberof IHashTable
     */
    size(): number;

    /**
     * Checks if the Hash Table is empty.
     * @returns {boolean} True if the Hash Table is empty, false otherwise.
     * @memberof IHashTable
     */
    isEmpty(): boolean;

    /**
     * Clears all key-value pairs from the Hash Table.
     * @returns {void}
     * @memberof IHashTable
     */
    clear(): void; // Optional clear operation

    /**
     * Returns an array of all keys in the Hash Table.
     * Useful for debugging and testing.
     * @returns {K[]} An array of keys in the Hash Table.
     * @memberof IHashTable
     */
    keys(): K[];

    /**
     * Returns an array of all values in the Hash Table.
     * Useful for debugging and testing.
     * @returns {V[]} An array of values in the Hash Table.
     * @memberof IHashTable
     */
    values(): V[];
}