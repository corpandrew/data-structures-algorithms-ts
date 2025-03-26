export class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = val === undefined ? 0 : val;
        this.left = left === undefined ? null : left;
        this.right = right === undefined ? null : right;
    }
}

export function inOrderTraversal(root: TreeNode | null): number[] {
    if (!root) return [];
    return [...inOrderTraversal(root.left), root.val, ...inOrderTraversal(root.right)];
}