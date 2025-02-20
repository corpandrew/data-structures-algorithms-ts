import {describe, it, expect, beforeEach} from 'vitest';
import {IAutoComplete} from "../../../src/applications/auto-complete/types";
import {AutoComplete} from "../../../src/applications/auto-complete/autoComplete";

describe('AutoCompleteApp', () => {
    let autoCompleteApp: IAutoComplete;

    beforeEach(() => {
        autoCompleteApp = new AutoComplete(); // Instantiate your AutoCompleteApp implementation
    });

    describe('addWordToDictionary', () => {
        it('should add a single word to the dictionary', () => {
            autoCompleteApp.addWordToDictionary('hello');
            expect(autoCompleteApp.getTrie().search('hello')).toBe(true); // Verify word is in the underlying Trie
        });

        it('should add multiple words to the dictionary', () => {
            autoCompleteApp.addWordToDictionary('hello');
            autoCompleteApp.addWordToDictionary('world');
            autoCompleteApp.addWordToDictionary('hi');
            expect(autoCompleteApp.getTrie().search('hello')).toBe(true);
            expect(autoCompleteApp.getTrie().search('world')).toBe(true);
            expect(autoCompleteApp.getTrie().search('hi')).toBe(true);
        });

        it('should handle duplicate word additions (duplicates ignored in Trie - adjust test if you handle differently)', () => {
            autoCompleteApp.addWordToDictionary('test');
            autoCompleteApp.addWordToDictionary('test'); // Add duplicate
            // Verify word is present, but adding again doesn't change Trie structure in a way that affects search or autocomplete
            expect(autoCompleteApp.getTrie().search('test')).toBe(true);
            expect(autoCompleteApp.getAutocompleteSuggestions('te')).toContain('test'); // Suggestion still works
            expect(autoCompleteApp.getAutocompleteSuggestions('te').length).toBeGreaterThanOrEqual(1); // Suggestion list is not empty
        });
    });

    describe('findContact', () => {
        beforeEach(() => {
            autoCompleteApp.addWordToDictionary('Alice');
            autoCompleteApp.addWordToDictionary('Bob');
            autoCompleteApp.addWordToDictionary('Charlie');
        });

        it('should find an existing contact', () => {
            expect(autoCompleteApp.getTrie().search('Bob')).toBe(true);
        });

        it('should not find a non-existent contact', () => {
            expect(autoCompleteApp.getTrie().search('David')).toBe(false);
        });

        it('should return false when searching in an empty contact list', () => {
            const emptyList = new AutoComplete();
            expect(emptyList.getTrie().search('Alice')).toBe(false);
        });
    });

    describe('getAutocompleteSuggestions', () => {
        beforeEach(() => {
            autoCompleteApp.loadDictionary(['apple', 'apply', 'apricot', 'banana', 'bat', 'car', 'cat']); // Load dictionary for tests
        });

        it('should return autocomplete suggestions for a valid prefix', () => {
            expect(autoCompleteApp.getAutocompleteSuggestions('app')).toEqual(
                ['apple', 'apply'].sort() // Expecting alphabetically sorted suggestions - adjust if your app order differs
            );
            expect(autoCompleteApp.getAutocompleteSuggestions('ban')).toEqual(['banana'].sort());
            expect(autoCompleteApp.getAutocompleteSuggestions('c')).toEqual(['car', 'cat'].sort());
        });

        it('should return an empty array if no words match the prefix', () => {
            expect(autoCompleteApp.getAutocompleteSuggestions('ora')).toEqual([]);
            expect(autoCompleteApp.getAutocompleteSuggestions('banaz')).toEqual([]);
            expect(autoCompleteApp.getAutocompleteSuggestions('bananas')).toEqual([]); // 'bananas' is not a prefix, no suggestions
        });

        it('should return case-insensitive suggestions (if your app is case-insensitive - adjust if case-sensitive)', () => {
            expect(autoCompleteApp.getAutocompleteSuggestions('Ap')).toEqual([]);
            expect(autoCompleteApp.getAutocompleteSuggestions('AP')).toEqual([]);
            expect(autoCompleteApp.getAutocompleteSuggestions('ap')).toEqual(
                ['apple', 'apricot', 'apply'].sort()
            );
        });
    });

    describe('loadDictionary (Optional)', () => {
        it('should load words into the dictionary from an array', () => {
            const wordsToLoad = ['dog', 'deer', 'deal'];
            autoCompleteApp.loadDictionary?.(wordsToLoad); // Optional method call - use ?. to avoid error if not implemented
            expect(autoCompleteApp.getTrie().search('dog')).toBe(true);
            expect(autoCompleteApp.getTrie().search('deer')).toBe(true);
            expect(autoCompleteApp.getTrie().search('deal')).toBe(true);
        });

        it('should handle loading an empty array (no error)', () => {
            autoCompleteApp.loadDictionary?.([]); // Load empty array
            expect(autoCompleteApp.getTrie().toArray().length).toBe(0); // Trie should be empty after loading empty array
        });
    });

    describe('isWordInDictionary (Optional)', () => {
        beforeEach(() => {
            autoCompleteApp.loadDictionary?.(['cat', 'dog', 'fish']); // Load dictionary for tests
        });

        it('should return true if a word is in the dictionary', () => {
            expect(autoCompleteApp.isWordInDictionary?.('cat')).toBe(true); // Optional method call
            expect(autoCompleteApp.isWordInDictionary?.('dog')).toBe(true);
            expect(autoCompleteApp.isWordInDictionary?.('fish')).toBe(true);
        });

        it('should return false if a word is not in the dictionary', () => {
            expect(autoCompleteApp.isWordInDictionary?.('bird')).toBe(false); // Optional method call
            expect(autoCompleteApp.isWordInDictionary?.('ca')).toBe(false); // 'ca' is a prefix, not a word
            expect(autoCompleteApp.isWordInDictionary?.('doggy')).toBe(false); // 'doggy' is not in the dictionary
        });

        it('should return false for any word if the dictionary is empty', () => {
            const emptyApp = new AutoComplete();
            expect(emptyApp.isWordInDictionary?.('cat')).toBe(false); // Optional method call on empty app
            expect(emptyApp.isWordInDictionary?.('')).toBe(false); // Completed the assertion here - should return false for empty word in empty dictionary
        });
    });
});