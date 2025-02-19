import {IContactList} from "./types.ts";
import {IBinaryTree, ITreeNode} from "../../data-structures/tree/binary-tree/types.ts";
import {AVLTree} from "../../data-structures/tree/avl-tree/avlTree.ts";

export class ContactList implements IContactList {

    private binaryTree: IBinaryTree<string>;

    public constructor() {
        this.binaryTree = new AVLTree<string>();
    }

    addContact(name: string): void {
        this.binaryTree.insert(name);
    }

    findContact(name: string): boolean {
        return this.binaryTree.search(name);
    }

    getContactCount(): number {
        return this.binaryTree.size();
    }

    listContactsAlphabetically(): string[] {
        return this.binaryTree.inOrderTraversal();
    }

    getRoot(): ITreeNode<string> | null {
        return this.binaryTree.getRoot();
    }

}