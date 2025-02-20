/**
 * Interface to use for a TrieNode, Which is one link in the chain of a Trie.
 */
export interface ITrieNode {
    /**
     * The character in the node.
     */
    getChildren(): Map<string, ITrieNode>;

    /**
     * Helper function to add a Child to the TrieNode.
     * @param character character to add as child.
     */
    addChild(character: string): void;

    /**
     * Denotes that the Node is the end of a word.
     */
    getIsEndOfWord(): boolean;

    /**
     * Setter to set the isEndOfWord value.
     * @param isEndOfWord if the node is at the end of a word.
     */
    setIsEndOfWord(isEndOfWord: boolean): void;
}

/**
 * Interface for a Trie (Prefix Tree) data structure.
 * Used for efficient storage and retrieval of strings, especially for prefix-based operations.
 * @interface ITrie
 */
export interface ITrie {
    /**
     * Inserts a word into the Trie.
     * @param {string} word The word to insert.
     * @returns {void}
     * @memberof ITrie
     */
    insert(word: string): void;

    /**
     * Searches for a complete word in the Trie.
     * @param {string} word The word to search for.
     * @returns {boolean} True if the word exists in the Trie, false otherwise.
     * @memberof ITrie
     */
    search(word: string): boolean;

    /**
     * Checks if there is any word in the Trie that starts with the given prefix.
     * @param {string} prefix The prefix to search for.
     * @returns {boolean} True if at least one word starts with the prefix, false otherwise.
     * @memberof ITrie
     */
    startsWith(prefix: string): boolean;

    /**
     * Returns a list of all words in the Trie that start with the given prefix.
     * @param {string} prefix The prefix to search for.
     * @returns {string[]} An array of words starting with the prefix. Returns an empty array if no words start with the prefix.
     * @memberof ITrie
     */
    getWordsStartingWithPrefix(prefix: string): string[];

    /**
     * (Optional) Returns an array representation of all words in the Trie (e.g., in alphabetical order).
     * Useful for debugging and testing.
     * @returns {string[]} An array of all words in the Trie.
     * @memberof ITrie
     */
    toArray?(): string[];
}