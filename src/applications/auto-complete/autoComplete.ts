import {ITrie} from "../../data-structures/tree/trie/types.ts";
import {IAutoComplete} from "./types.ts";
import {Trie} from "../../data-structures/tree/trie/trie.ts";

export class AutoComplete implements IAutoComplete {
    private trie: ITrie;

    public constructor() {
        this.trie = new Trie();
    }

    getTrie(): ITrie {
        return this.trie;
    }

    addWordToDictionary(word: string): void {
        this.trie.insert(word);
    }

    getAutocompleteSuggestions(prefix: string): string[] {
        return this.trie.getWordsStartingWithPrefix(prefix);
    }

    loadDictionary(words: string[]): void {
        for (const word of words) {
            this.trie.insert(word);
        }
    }

    isWordInDictionary(word: string): boolean {
        return this.trie.search(word);
    }

}