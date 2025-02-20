import { ITrie } from '../../../../src/data-structures/tree/trie/types';
import { Trie } from '../../../../src/data-structures/tree/trie/trie';
import { describe, it, expect, beforeEach } from 'vitest';

describe('Trie (Prefix Tree)', () => {
    let trie: ITrie;

    beforeEach(() => {
        trie = new Trie(); // Instantiate your Trie implementation
    });

    describe('insert', () => {
        it('should insert a single word into the trie', () => {
            trie.insert('apple');
            expect(trie.search('apple')).toBe(true);
        });

        it('should insert multiple words into the trie', () => {
            trie.insert('apple');
            trie.insert('banana');
            trie.insert('apricot');
            expect(trie.search('apple')).toBe(true);
            expect(trie.search('banana')).toBe(true);
            expect(trie.search('apricot')).toBe(true);
        });

        it('should handle inserting words with common prefixes', () => {
            trie.insert('apple');
            trie.insert('applesauce');
            expect(trie.search('apple')).toBe(true);
            expect(trie.search('applesauce')).toBe(true);
        });

        it('should return false when handling inserting an empty string', () => {
            trie.insert(''); // Insert empty string
            expect(trie.search('')).toBe(false);
        });
    });

    describe('search', () => {
        beforeEach(() => {
            trie.insert('apple');
            trie.insert('banana');
            trie.insert('apricot');
        });

        it('should find a word that exists in the trie', () => {
            expect(trie.search('apple')).toBe(true);
            expect(trie.search('banana')).toBe(true);
            expect(trie.search('apricot')).toBe(true);
        });

        it('should not find a word that does not exist', () => {
            expect(trie.search('orange')).toBe(false);
            expect(trie.search('appl')).toBe(false); // 'appl' is a prefix, not a complete word
            expect(trie.search('bananas')).toBe(false); // 'bananas' is not in the trie
        });

        it('should return false for an empty string search if empty string is not considered a valid word (adjust if your Trie handles empty strings differently)', () => {
            expect(trie.search('')).toBe(false); // Or adjust expectation based on your empty string handling
        });
    });

    describe('startsWith', () => {
        beforeEach(() => {
            trie.insert('apple');
            trie.insert('banana');
            trie.insert('apricot');
            trie.insert('applesauce');
        });

        it('should return true if there are words starting with the prefix', () => {
            expect(trie.startsWith('app')).toBe(true); // 'apple', 'apricot', 'applesauce' start with 'app'
            expect(trie.startsWith('ban')).toBe(true); // 'banana' starts with 'ban'
            expect(trie.startsWith('a')).toBe(true);   // 'apple', 'apricot', 'applesauce' start with 'a'
        });

        it('should return false if there are no words starting with the prefix', () => {
            expect(trie.startsWith('ora')).toBe(false); // No words start with 'ora'
            expect(trie.startsWith('bana')).toBe(true); // 'banana' starts with 'bana'
            expect(trie.startsWith('banaz')).toBe(false); // No words start with 'banaz'
        });

        it('should return false for an empty prefix', () => {
            expect(trie.startsWith('')).toBe(false);
        });

        it('should return false for any prefix if the trie is empty', () => {
            const emptyTrie = new Trie();
            expect(emptyTrie.startsWith('app')).toBe(false);
            expect(emptyTrie.startsWith('')).toBe(false); // Or adjust expectation if empty trie + empty prefix should be true
        });
    });

    describe('getWordsStartingWithPrefix', () => {
        beforeEach(() => {
            trie.insert('apple');
            trie.insert('banana');
            trie.insert('apricot');
            trie.insert('applesauce');
            trie.insert('apply');
        });

        it('should return words starting with the given prefix', () => {
            expect(trie.getWordsStartingWithPrefix('ap')).toEqual(
                ['apple', 'applesauce', 'apricot', 'apply'].sort() // Expecting alphabetically sorted results - adjust if your implementation order differs, but order doesn't strictly matter for autocomplete suggestions typically
            );
            expect(trie.getWordsStartingWithPrefix('ban')).toEqual(['banana']);
            expect(trie.getWordsStartingWithPrefix('a')).toEqual(['apple', 'apricot', 'applesauce', 'apply'].sort());
        });

        it('should return an empty array if no words start with the prefix', () => {
            expect(trie.getWordsStartingWithPrefix('ora')).toEqual([]);
            expect(trie.getWordsStartingWithPrefix('banaz')).toEqual([]);
        });

        it('should return an empty array for any prefix if the trie is empty', () => {
            const emptyTrie = new Trie();
            expect(emptyTrie.getWordsStartingWithPrefix('app')).toEqual([]);
            expect(emptyTrie.getWordsStartingWithPrefix('')).toEqual([]); // Should be empty even for empty prefix in empty trie
        });
    });

    describe('toArray', () => {
        it('should return an empty array for an empty trie', () => {
            expect(trie.toArray()).toEqual([]);
        });

        it('should return all words in the trie in alphabetical order (or consistent order)', () => {
            trie.insert('banana');
            trie.insert('apple');
            trie.insert('apricot');
            trie.insert('applesauce');
            trie.insert('apply');
            expect(trie.toArray()).toEqual(
                ['apple', 'applesauce', 'apricot', 'apply', 'banana'].sort()
            );
        });
    });
});