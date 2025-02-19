import {IBinaryTree, ITreeNode} from "./types.ts";
import {TreeNode} from "./treeNode.ts";
import {Queue} from "../../queue/queue.ts";

export class BinaryTree<T> implements IBinaryTree<T> {
    protected root: ITreeNode<T> | null;
    protected nodeCount: number = 0;

    public constructor() {
        this.root = null;
        this.nodeCount = 0;
    }

    getRoot(): ITreeNode<T> | null {
        return this.root;
    }

    isEmpty(): boolean {
        return this.nodeCount === 0;
    }

    size(): number {
        return this.nodeCount;
    }

    clear(): void {
        this.root = null;
        this.nodeCount = 0;
    }

    insert(data: T): void {
        const nodeToInsert = new TreeNode(data);

        //if there is no root, set it as root.
        if (this.root === null) {
            this.root = nodeToInsert
            this.nodeCount++;
            return;
        }

        //Queue of nodes to look at.
        const queue: Queue<ITreeNode<T>> = new Queue();
        queue.enqueue(this.root);
        //Use depth first, go until there is no left or right.
        //Is it worth caching the leaf node to use for the future?

        while (!queue.isEmpty()) {
            const currNode = queue.dequeue();

            if (currNode === undefined) {
                return;
            }

            const left = currNode.getLeft();

            if (left === null) {
                currNode.setLeft(nodeToInsert);
                break;
            } else {
                queue.enqueue(left);
            }

            const right = currNode.getRight();

            if (right === null) {
                currNode.setRight(nodeToInsert);
                break;
            } else {
                queue.enqueue(right);
            }
        }
        this.nodeCount++;
    }

    search(data: T): boolean {
        //if there is no root, return false
        if (this.root === null) {
            return false;
        }

        //Queue of nodes to look at.
        const queue: Queue<ITreeNode<T>> = new Queue();
        queue.enqueue(this.root);

        while (!queue.isEmpty()) {
            const currNode = queue.dequeue();

            if (currNode === undefined) {
                return false;
            }

            if (currNode.getData() === data) {
                return true;
            }

            const left = currNode.getLeft();

            if (left !== null) {
                queue.enqueue(left);
            }

            const right = currNode.getRight();

            if (right !== null) {
                queue.enqueue(right);
            }
        }
        return false;
    }

    inOrderTraversal(): T[] {
        const inOrderedArray: T[] = [];
        this.inOrder(this.root, inOrderedArray);
        return inOrderedArray;
    }

    private inOrder(node: ITreeNode<T> | null, inOrderedArray: T[]) {
        if (node === null) {
            return inOrderedArray;
        }

        this.inOrder(node.getLeft(), inOrderedArray);
        inOrderedArray.push(node.getData());
        this.inOrder(node.getRight(), inOrderedArray);
    }

    preOrderTraversal(): T[] {
        const preOrderedArray: T[] = [];
        this.preOrder(this.root, preOrderedArray);
        return preOrderedArray;
    }

    private preOrder(node: ITreeNode<T> | null, preOrderedArray: T[]) {
        if (node === null) {
            return preOrderedArray;
        }

        preOrderedArray.push(node.getData());
        this.preOrder(node.getLeft(), preOrderedArray);
        this.preOrder(node.getRight(), preOrderedArray);
    }

    postOrderTraversal(): T[] {
        const postOrderedArray: T[] = [];
        this.postOrder(this.root, postOrderedArray);
        return postOrderedArray;
    }

    private postOrder(node: ITreeNode<T> | null, postOrderedArray: T[]) {
        if (node === null) {
            return postOrderedArray;
        }

        this.postOrder(node.getLeft(), postOrderedArray);
        this.postOrder(node.getRight(), postOrderedArray);
        postOrderedArray.push(node.getData());
    }

    levelOrderTraversal(): T[] {
        const levelOrderedArray: T[] = [];
        
        //if there is no root, return false
        if (this.root === null) {
            return levelOrderedArray;
        }

        //Queue of nodes to look at.
        const queue: Queue<ITreeNode<T>> = new Queue();
        queue.enqueue(this.root);

        while (!queue.isEmpty()) {
            const currNode = queue.dequeue();

            if (currNode === undefined) {
                continue;
            }

            levelOrderedArray.push(currNode.getData());

            const left = currNode.getLeft();

            if (left !== null) {
                queue.enqueue(left);
            }

            const right = currNode.getRight();

            if (right !== null) {
                queue.enqueue(right);
            }
        }

        return levelOrderedArray;
    }

    getHeight(): number {
        return this.getNodeHeight(this.root);
    }

    private getNodeHeight(node: ITreeNode<T> | null): number {
        if (node === null) {
            return 0;
        }
        const leftHeight = this.getNodeHeight(node.getLeft());
        const rightHeight = this.getNodeHeight(node.getRight());

        return 1 + Math.max(leftHeight, rightHeight);
    }


    toArray(): T[] {
        return this.levelOrderTraversal();
    }

}