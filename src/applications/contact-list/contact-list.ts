import {IContactList} from "./types.ts";
import {IBinarySearchTree, ITreeNode} from "../../data-structures/tree/binary-tree/types.ts";
import {BinarySearchTree} from "../../data-structures/tree/binary-tree/binarySearchTree.ts";

export class ContactList implements IContactList {

    private binarySearchTree: IBinarySearchTree<string>;

    public constructor() {
        this.binarySearchTree = new BinarySearchTree<string>();
    }

    addContact(name: string): void {
        this.binarySearchTree.insert(name);
    }

    findContact(name: string): boolean {
        return this.binarySearchTree.search(name);
    }

    getContactCount(): number {
        return this.binarySearchTree.size();
    }

    listContactsAlphabetically(): string[] {
        return this.binarySearchTree.inOrderTraversal();
    }

    getRoot(): ITreeNode<string> | null {
        return this.binarySearchTree.getRoot();
    }

}