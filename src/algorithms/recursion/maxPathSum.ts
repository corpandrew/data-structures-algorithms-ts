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

//Global max tracker, should be within something a bit cleaner.
let maxSum = -Infinity;

export function maxPathSum(root: TreeNode | null): number {
    if (root === null) {
        return -Infinity;
    }
    // reset the value of maxSum with this dirty approach.
    maxSum = -Infinity;

    inOrderTraversalMaxSum(root, 0); // this will set maxSum
    return maxSum;
}

function inOrderTraversalMaxSum(node: TreeNode | null, currMax: number): number {
    if (node === null) {
        return 0;
    }

    //max sums for left and right.
    const left = Math.max(0, inOrderTraversalMaxSum(node.left, 0));
    const right = Math.max(0, inOrderTraversalMaxSum(node.right, 0));

    //calculate all the different types of paths which could be the best.
    const combined = left + right + node.val;
    const leftAndRoot = left + node.val;
    const rightAndRoot = right + node.val

    //update the max sum with the best.
    maxSum = Math.max(maxSum, node.val, combined, leftAndRoot, rightAndRoot)

    //the local sub-tree max's value, through the parent node.
    //above the left and right will recalculate if this is the best, this is the local maximum.
    return currMax + node.val + Math.max(left, right);
}