import {IAVLTreeNode} from "./types.ts";

export class AVLTreeNode<T> implements IAVLTreeNode<T> {
    private data: T;
    private height: number;
    private left: IAVLTreeNode<T> | null;
    private right: IAVLTreeNode<T> | null;

    public constructor(data: T) {
        this.data = data;
        this.height = 0;
        this.left = null;
        this.right = null;
    }

    getData(): T {
        return this.data;
    }

    setData(data: T): void {
        this.data = data;
    }

    getHeight(): number {
        return this.height;
    }

    setHeight(height: number): void {
        this.height = height;
    }

    getLeft(): IAVLTreeNode<T> | null {
        return this.left;
    }

    setLeft(left: IAVLTreeNode<T> | null){
       this.left = left;
    }

    getRight(): IAVLTreeNode<T> | null {
       return this.right;
    }

    setRight(right: IAVLTreeNode<T> | null) {
        this.right = right;
    }

}