import {ITreeNode} from "./types.ts";

/**
 * A node of a Tree Data Structure.
 */
export class TreeNode<T> implements ITreeNode<T> {
    private data: T;
    protected left: ITreeNode<T> | null;
    protected right: ITreeNode<T> | null;

    public constructor(data: T) {
        this.data = data;
        this.left = null;
        this.right = null;
    }

    getData(): T {
        return this.data;
    }

    setData(data: T) {
        this.data = data;
    }

    getLeft(): ITreeNode<T> | null {
        return this.left;
    }

    setLeft(left: ITreeNode<T> | null): void {
        this.left = left;
    }

    getRight(): ITreeNode<T> | null {
        return this.right;
    }

    setRight(right: ITreeNode<T> | null): void {
        this.right = right;
    }

}