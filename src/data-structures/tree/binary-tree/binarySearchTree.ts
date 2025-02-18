import {IBinarySearchTree, ITreeNode} from "./types.ts";
import {BinaryTree} from "./binaryTree.ts";
import {TreeNode} from "./TreeNode.ts";

export class BinarySearchTree<T> extends BinaryTree<T> implements IBinarySearchTree<T> {

    insert(data: T): void {
        if (this.root === null) {
            this.root = new TreeNode(data);
            this.nodeCount++;
            return;
        }

        let currNode: ITreeNode<T> | null = this.root;

        while (currNode != null) {
            if (data === currNode.getData()) {
                //ignore duplicate insertions.
                return;
            } else if (data > currNode.getData()) {
                if (currNode.getRight()) {
                    currNode = currNode.getRight();
                } else {
                    currNode.setRight(new TreeNode(data));
                    break;
                }
            } else if (data < currNode.getData()) {
                if (currNode.getLeft()) {
                    currNode = currNode.getLeft();
                } else {
                    currNode.setLeft(new TreeNode(data));
                    break;
                }
            }
        }

        this.nodeCount++;
    }

    delete(data: T): ITreeNode<T> | null {
        const [newRoot, deleted] = this.deleteNode(this.root, data);
        this.root = newRoot;
        if (deleted) {
            this.nodeCount--;
        }
        return deleted ? newRoot : null;
    }

    private deleteNode(node: ITreeNode<T> | null, data: T): [ITreeNode<T> | null, boolean] {
        if (node === null) return [null, false];

        if (data < node.getData()) {
            const [left, deleted] = this.deleteNode(node.getLeft(), data);
            node.setLeft(left);
            return [node, deleted];
        } else if (data > node.getData()) {
            const [right, deleted] = this.deleteNode(node.getRight(), data);
            node.setRight(right);
            return [node, deleted];
        } else {
            // Node to delete found
            if (node.getLeft() === null) {
                return [node.getRight(), true];
            } else if (node.getRight() === null) {
                return [node.getLeft(), true];
            }

            const minNode = this.findMinNode(node.getRight());
            if (minNode !== null) {
                node.setData(minNode.getData());
                const [right, deleted] = this.deleteNode(node.getRight(), minNode.getData());
                node.setRight(right);
                return [node, deleted];
            } else {
                return [node.getLeft(), true];
            }
        }
    }

    search(data: T): boolean {
        if (this.root === null) {
            return false;
        } else if (this.root.getData() === data) {
            return true;
        }

        let currNode: ITreeNode<T> | null = this.root;
        while (currNode !== null) {
            if (data === currNode.getData()) {
                return true;
            } else if (data > currNode.getData()) {
                if (currNode.getRight()) {
                    currNode = currNode.getRight();
                } else {
                    return false;
                }
            } else if (data < currNode.getData()) {
                if (currNode.getLeft()) {
                    currNode = currNode.getLeft();
                } else {
                    return false;
                }
            }
        }

        return false;
    }

    findMin(): T | undefined {
        const minNode = this.findMinNode(this.root);
        return minNode ? minNode.getData() : undefined;
    }

    private findMinNode(node: ITreeNode<T> | null): ITreeNode<T> | null {
        let current = node;
        while (current && current.getLeft()) {
            current = current.getLeft();
        }
        return current;
    }

    findMax(): T | undefined {
        const maxNode = this.findMaxNode(this.root);
        return maxNode ? maxNode.getData() : undefined;
    }

    private findMaxNode(node: ITreeNode<T> | null): ITreeNode<T> | null {
        let current = node;
        while (current && current.getRight()) {
            current = current.getRight();
        }

        return current;
    }


}