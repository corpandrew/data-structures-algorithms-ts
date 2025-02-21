/**
 * Interface for a Cache Application built using a Hash Table.
 * Defines the contract for a simple in-memory cache that stores and retrieves data based on keys.
 * @template K The type of keys used for caching. Must be hashable.
 * @template V The type of data being cached.
 * @interface ICache
 */
export interface ICache<K, V> {
    /**
     * Caches data associated with a given key.
     * If data is already cached for this key, it should be updated (or replaced, depending on cache policy).
     * @param {K} key The key to cache the data under.
     * @param {V} data The data to be cached.
     * @returns {void}
     * @memberof ICache
     */
    cacheData(key: K, data: V): void;

    /**
     * Retrieves data from the cache for a given key.
     * @param {K} key The key to retrieve cached data for.
     * @returns {V | undefined} The cached data associated with the key, or undefined if no data is cached for this key.
     * @memberof ICache
     */
    getCachedData(key: K): V | undefined;

    /**
     * Invalidates or removes data from the cache for a given key.
     * @param {K} key The key to invalidate/remove from the cache.
     * @returns {boolean} True if data was removed (key existed), false otherwise.
     * @memberof ICache
     */
    invalidateCache(key: K): boolean;

    /**
     * Clears the entire cache, removing all cached data.
     * @returns {void}
     * @memberof ICache
     */
    clearCache(): void;

    /**
     * Gets the current number of items cached.
     * @returns {number} The number of items currently in the cache.
     * @memberof ICache
     */
    getCacheSize(): number;

    /**
     * Checks if the cache contains data for a given key.
     * @param {K} key The key to check for in the cache.
     * @returns {boolean} True if data is cached for the key, false otherwise.
     * @memberof ICache
     */
    isDataCached(key: K): boolean;

    /**
     * Checks if the cache is empty.
     * @returns {boolean} True if the cache is empty, false otherwise.
     * @memberOf ICache
     */
    isEmpty(): boolean;
}