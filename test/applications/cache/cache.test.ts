import { describe, it, expect, beforeEach } from 'vitest';
import {ICache} from "../../../src/applications/cache/types";
import {Cache} from "../../../src/applications/cache/cache";

describe('Cache', () => {
    let cache: ICache<string, number>; // Use the interface type

    beforeEach(() => {
        cache = new Cache<string, number>(); // Instantiate your Cache implementation
    });

    describe('cacheData', () => {
        it('should cache a single key-value pair', () => {
            cache.cacheData('item1', 100);
            expect(cache.getCachedData('item1')).toBe(100);
            expect(cache.getCacheSize?.()).toBe(1); // Optional size check
            expect(cache.isDataCached?.('item1')).toBe(true); // Optional cached check
        });

        it('should cache multiple key-value pairs', () => {
            cache.cacheData('item1', 100);
            cache.cacheData('item2', 200);
            cache.cacheData('item3', 300);
            expect(cache.getCachedData('item1')).toBe(100);
            expect(cache.getCachedData('item2')).toBe(200);
            expect(cache.getCachedData('item3')).toBe(300);
            expect(cache.getCacheSize?.()).toBe(3); // Optional size check
        });

        it('should update data for an existing key', () => {
            cache.cacheData('item1', 100);
            cache.cacheData('item1', 150); // Update data for 'item1'
            expect(cache.getCachedData('item1')).toBe(150); // Should return updated value
            expect(cache.getCacheSize?.()).toBe(1); // Size should remain the same
        });
    });

    describe('getCachedData', () => {
        beforeEach(() => {
            cache.cacheData('item1', 100);
            cache.cacheData('item2', 200);
        });

        it('should retrieve data for an existing key', () => {
            expect(cache.getCachedData('item1')).toBe(100);
            expect(cache.getCachedData('item2')).toBe(200);
        });

        it('should return undefined for a non-existent key', () => {
            expect(cache.getCachedData('item3')).toBeUndefined();
            expect(cache.getCachedData('item4')).toBeUndefined();
        });
    });

    describe('invalidateCache (Optional)', () => {
        beforeEach(() => {
            cache.cacheData('item1', 100);
            cache.cacheData('item2', 200);
        });

        it('should invalidate (remove) data for an existing key', () => {
            expect(cache.invalidateCache?.('item1')).toBe(true); // Invalidate 'item1'
            expect(cache.getCachedData('item1')).toBeUndefined(); // Data should no longer be cached
            expect(cache.getCacheSize?.()).toBe(1); // Size should decrease
            expect(cache.isDataCached?.('item1')).toBe(false); // Optional cached check
        });

        it('should return false when invalidating a non-existent key', () => {
            expect(cache.invalidateCache?.('item3')).toBe(false); // Invalidate non-existent 'item3'
            expect(cache.getCacheSize?.()).toBe(2); // Size should remain unchanged
        });

        it('should handle invalidating from an empty cache (no error, return false)', () => {
            const emptyCache = new Cache<string, number>();
            expect(emptyCache.invalidateCache?.('item1')).toBe(false); // Invalidate from empty cache
            expect(emptyCache.getCacheSize?.()).toBe(0); // Size should remain 0
        });
    });

    describe('clearCache (Optional)', () => {
        beforeEach(() => {
            cache.cacheData('item1', 100);
            cache.cacheData('item2', 200);
            cache.cacheData('item3', 300);
        });

        it('should clear all data from the cache', () => {
            cache.clearCache?.(); // Clear the cache
            expect(cache.isEmpty()).toBe(true);
            expect(cache.getCacheSize?.()).toBe(0); // Size should be 0
            expect(cache.getCachedData('item1')).toBeUndefined(); // Data for 'item1' should be gone
            expect(cache.getCachedData('item2')).toBeUndefined();
            expect(cache.getCachedData('item3')).toBeUndefined();
            expect(cache.isDataCached?.('item1')).toBe(false); // Optional cached check
            expect(cache.isDataCached?.('item2')).toBe(false);
            expect(cache.isDataCached?.('item3')).toBe(false);
        });

        it('should clear an already empty cache (no error)', () => {
            const emptyCache = new Cache<string, number>();
            emptyCache.clearCache?.(); // Clear already empty cache
            expect(emptyCache.isEmpty()).toBe(true); // Should remain empty
            expect(emptyCache.getCacheSize?.()).toBe(0); // Size should remain 0
        });
    });

    describe('getCacheSize (Optional)', () => {
        it('should return 0 for a new cache application', () => {
            expect(cache.getCacheSize?.()).toBe(0);
        });

        it('should return the correct size after caching data', () => {
            cache.cacheData('item1', 100);
            expect(cache.getCacheSize?.()).toBe(1);
            cache.cacheData('item2', 200);
            cache.cacheData('item3', 300);
            expect(cache.getCacheSize?.()).toBe(3);
        });

        it('should return the correct size after invalidating cache entries', () => {
            cache.cacheData('item1', 100);
            cache.cacheData('item2', 200);
            cache.invalidateCache?.('item1');
            expect(cache.getCacheSize?.()).toBe(1); // Size should decrease after invalidation
            cache.invalidateCache?.('item2');
            expect(cache.getCacheSize?.()).toBe(0); // Size should decrease again
        });
    });

    describe('isDataCached (Optional)', () => {
        beforeEach(() => {
            cache.cacheData('item1', 100);
            cache.cacheData('item2', 200);
        });

        it('should return true if data is cached for a key', () => {
            expect(cache.isDataCached?.('item1')).toBe(true);
            expect(cache.isDataCached?.('item2')).toBe(true);
        });

        it('should return false if data is not cached for a key', () => {
            expect(cache.isDataCached?.('item3')).toBe(false);
            expect(cache.isDataCached?.('item4')).toBe(false);
        });

        it('should return false for any key in an empty cache', () => {
            const emptyCache = new Cache<string, number>();
            expect(emptyCache.isDataCached?.('item1')).toBe(false);
            expect(emptyCache.isDataCached?.('item2')).toBe(false);
        });
    });

    describe('isEmpty', () => {
        it('should return true for a new cache application', () => {
            expect(cache.isEmpty()).toBe(true);
        });

        it('should return false after caching data', () => {
            cache.cacheData('item1', 100);
            expect(cache.isEmpty()).toBe(false);
        });

        it('should return true after clearing the cache', () => {
            cache.cacheData('item1', 100);
            cache.clearCache?.();
            expect(cache.isEmpty()).toBe(true);
        });
    });
});