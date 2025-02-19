import {BinarySearchTree} from "../binary-tree/binarySearchTree.ts";
import {IAVLTree, IAVLTreeNode} from "./types.ts";
import {AVLTreeNode} from "./avlTreeNode.ts";

export class AVLTree<T> extends BinarySearchTree<T> implements IAVLTree<T> {
    protected root: IAVLTreeNode<T> | null;

    public constructor() {
        super();
        this.root = null;
    }

    getRoot(): IAVLTreeNode<T> | null {
        return this.root;
    }

    private getLocalHeight(node: IAVLTreeNode<T> | null): number {
        if (node === null) {
            return -1;
        }
        return 1 + Math.max(this.getLocalHeight(node.getLeft()), this.getLocalHeight(node.getRight()));
    }

    private getBalanceFactor(node: IAVLTreeNode<T> | null): number {
        if (node === null) {
            return 0;
        }
        return this.getLocalHeight(node.getLeft()) - this.getLocalHeight(node.getRight());
    }

    private rotateLeft(x: IAVLTreeNode<T>): IAVLTreeNode<T> | null {
        const y = x.getRight();
        const t2 = y?.getLeft() ?? null;

        y?.setLeft(x);
        x.setRight(t2);

        x.setHeight(this.getLocalHeight(x));
        y?.setHeight(this.getLocalHeight(y));

        return y;
    }

    private rotateRight(x: IAVLTreeNode<T>): IAVLTreeNode<T> | null {
        const y = x.getLeft();
        const t2 = y?.getRight() ?? null;

        y?.setRight(x);
        x.setLeft(t2);

        x.setHeight(this.getLocalHeight(x));
        y?.setHeight(this.getLocalHeight(y));

        return y;
    }

    insert(data: T): void {
        const nodeToInsert = new AVLTreeNode(data);

        const insertRec = (node: IAVLTreeNode<T> | null): IAVLTreeNode<T> | null => {
            if (node === null) {
                this.nodeCount++;
                nodeToInsert.setHeight(0);
                return nodeToInsert;
            }

            if (data < node.getData()) {
                node.setLeft(insertRec(node.getLeft()));
            } else if (data > node.getData()) {
                node.setRight(insertRec(node.getRight()));
            } else {
                return node; // No duplicates
            }

            node.setHeight(1 + Math.max(this.getLocalHeight(node.getLeft()), this.getLocalHeight(node.getRight())));
            const balance = this.getBalanceFactor(node);

            if (balance > 1) {
                const leftChild = node.getLeft();
                if (leftChild && this.getBalanceFactor(leftChild) >= 0) {
                    return this.rotateRight(node);
                } else if (leftChild) {
                    node.setLeft(this.rotateLeft(leftChild));
                    return this.rotateRight(node);
                }
            }
            if (balance < -1) {
                const rightChild = node.getRight();
                if (rightChild && this.getBalanceFactor(rightChild) <= 0) {
                    return this.rotateLeft(node);
                } else if (rightChild) {
                    node.setRight(this.rotateRight(rightChild));
                    return this.rotateLeft(node);
                }
            }

            return node;
        };

        this.root = insertRec(this.root);
    }

    delete(data: T): IAVLTreeNode<T> | null {
        let deletedNode: IAVLTreeNode<T> | null = null;

        const deleteRec = (node: IAVLTreeNode<T> | null): IAVLTreeNode<T> | null => {
            if (node === null) {
                return null; // Value not found
            }

            if (data < node.getData()) {
                node.setLeft(deleteRec(node.getLeft()));
            } else if (data > node.getData()) {
                node.setRight(deleteRec(node.getRight()));
            } else { // Found the node to delete
                deletedNode = node;

                // Case 1: No children
                if (node.getLeft() === null && node.getRight() === null) {
                    this.nodeCount--;
                    return null;
                }
                // Case 2: One child (right only)
                else if (node.getLeft() === null) {
                    this.nodeCount--;
                    return node.getRight();
                }
                // Case 3: One child (left only)
                else if (node.getRight() === null) {
                    this.nodeCount--;
                    return node.getLeft();
                }
                // Case 4: Two children
                else {
                    const successor = this.findMinNode(node.getRight());
                    if (successor) {
                        // I hate this, but I can't find a better way to maintain the 2 children case. It's too
                        // complicated with recursion without adding another parameter
                        // (which would potentially add more complexity)
                        node.setData(successor.getData());
                        // Temporarily adjust data to delete the successor
                        const originalData = data;
                        data = successor.getData();
                        node.setRight(deleteRec(node.getRight()));
                        // Restore original data for subsequent calls
                        data = originalData;
                    }
                }
            }

            if (node) {
                node.setHeight(1 + Math.max(this.getLocalHeight(node.getLeft()), this.getLocalHeight(node.getRight())));
                const balance = this.getBalanceFactor(node);

                if (balance > 1) { // Left-heavy
                    const leftChild = node.getLeft();
                    if (leftChild && this.getBalanceFactor(leftChild) >= 0) {
                        return this.rotateRight(node);
                    } else if (leftChild) {
                        node.setLeft(this.rotateLeft(leftChild));
                        return this.rotateRight(node);
                    }
                }
                if (balance < -1) { // Right-heavy
                    const rightChild = node.getRight();
                    if (rightChild && this.getBalanceFactor(rightChild) <= 0) {
                        return this.rotateLeft(node);
                    } else if (rightChild) {
                        node.setRight(this.rotateRight(rightChild));
                        return this.rotateLeft(node);
                    }
                }
            }

            return node;
        };

        this.root = deleteRec(this.root);
        return deletedNode;
    }

}