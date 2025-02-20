import {ITrie, ITrieNode} from "./types.ts";
import {TrieNode} from "./trieNode.ts";

export class Trie implements ITrie {

    private readonly root: ITrieNode;

    public constructor() {
        this.root = new TrieNode();
    }

    insert(word: string): void {
        if (word.trim().length === 0) {
            return;
        }

        let currNode = this.root;

        for (const char of word) {
            if (!currNode.getChildren().get(char)) {
                currNode.addChild(char);
            }

            currNode = currNode.getChildren().get(char)!;//! here because we know it exists because of the above.
        }
        currNode.setIsEndOfWord(true);
    }

    search(word: string): boolean {
        if (word.trim().length === 0) {
            return false;
        }

        let currNode = this.root;

        for (const char of word) {
            if (!currNode.getChildren().get(char)) {
                return false;
            }

            currNode = currNode.getChildren().get(char)!;
        }

        return currNode.getIsEndOfWord();
    }

    startsWith(prefix: string): boolean {
        if (prefix.trim().length === 0) {
            return false;
        }

        let currNode = this.root;

        for (const char of prefix) {
            if (!currNode.getChildren().get(char)) {
                return false;
            }

            currNode = currNode.getChildren().get(char)!;
        }

        return true;
    }

    getWordsStartingWithPrefix(prefix: string): string[] {
        if (prefix.trim().length === 0) {
            return [];
        }
        return this.localGetWordsStartingWithPrefix(prefix);
    }

    private localGetWordsStartingWithPrefix(prefix: string) {
        let currNode = this.root;

        for (const char of prefix) {
            const currNodeChildren = currNode.getChildren();

            if (!currNodeChildren.get(char)) {
                return [];
            }

            currNode = currNodeChildren.get(char)!;
        }

        const wordsResult: string[] = [];
        this.getWords(currNode, prefix, wordsResult);

        return wordsResult;
    }

    getWords(node: ITrieNode, prefixSoFar: string, words: string[]) {
        if (node.getIsEndOfWord()) {
            words.push(prefixSoFar);
        }

        for (const [char, child] of node.getChildren()) {
            this.getWords(child, prefixSoFar + char, words);
        }
    }

    toArray?(): string[] {
        return this.localGetWordsStartingWithPrefix("").sort();
    }

}