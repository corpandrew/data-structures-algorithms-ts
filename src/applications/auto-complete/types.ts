import {ITrie} from '../../data-structures/tree/trie/types.ts'; // Adjust path if needed

/**
 * Interface for an Autocomplete Trie Application.
 * Defines the contract for an application that uses a Trie for autocomplete functionality.
 * @interface IAutoComplete
 */
export interface IAutoComplete {
    /**
     * Gets the underlying Trie data structure used by the application.
     * This is primarily for testing and inspection, not typically part of the core application interface.
     * @returns {ITrie} The Trie instance.
     * @memberof IAutoComplete
     * @internal - Marked as internal as it's mainly for testing
     */
    getTrie(): ITrie; // Primarily for testing - not usually part of the app's public API

    /**
     * Adds a word to the dictionary (Trie) used for autocomplete suggestions.
     * @param {string} word The word to add to the dictionary.
     * @returns {void}
     * @memberof IAutoComplete
     */
    addWordToDictionary(word: string): void;

    /**
     * Gets autocomplete suggestions for a given prefix.
     * Returns a list of words from the dictionary that start with the prefix.
     * @param {string} prefix The prefix to get autocomplete suggestions for.
     * @returns {string[]} An array of autocomplete suggestion words. Returns an empty array if no suggestions are found.
     * @memberof IAutoComplete
     */
    getAutocompleteSuggestions(prefix: string): string[];

    /**
     * Loads a list of words into the dictionary (for bulk loading).
     * @param {string[]} words An array of words to load into the dictionary.
     * @returns {void}
     * @memberof IAutoComplete
     */
    loadDictionary?(words: string[]): void;

    /**
     * Checks if a word exists in the dictionary.
     * @param {string} word The word to check for existence in the dictionary.
     * @returns {boolean} True if the word exists, false otherwise.
     * @memberof IAutoComplete
     */
    isWordInDictionary?(word: string): boolean;
}