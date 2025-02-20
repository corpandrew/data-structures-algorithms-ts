import {ITrieNode} from "./types.ts";

export class TrieNode implements ITrieNode {
    private children: Map<string, ITrieNode>;
    private isEndOfWord: boolean;

    public constructor(isEndOfWord?: boolean) {
        this.children = new Map();
        this.isEndOfWord = isEndOfWord ?? false;
    }

    getChildren(): Map<string, ITrieNode> {
        return this.children;
    }

    addChild(character: string): void {
        if (character.length === 0) {
            return;
        }
        this.children.set(character, new TrieNode());
    }

    getIsEndOfWord(): boolean {
        return this.isEndOfWord;
    }

    setIsEndOfWord(isEndOfWord: boolean): void {
        this.isEndOfWord = isEndOfWord;
    }

}