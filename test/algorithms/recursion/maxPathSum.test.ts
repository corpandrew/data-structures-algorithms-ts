import { describe, expect, test } from "vitest";
import {maxPathSum, TreeNode} from "../../../src/algorithms/recursion/maxPathSum";

describe("Given you are testing maxPathSum", () => {
    test("When calling with tree [1,2,3], then it returns 6", () => {
        const tree = new TreeNode(1);
        tree.left = new TreeNode(2);
        tree.right = new TreeNode(3);
        expect(maxPathSum(tree)).toEqual(6); // Path: 2-1-3
    });

    test("When calling with a single node [5], then it returns 5", () => {
        const tree = new TreeNode(5);
        expect(maxPathSum(tree)).toEqual(5); // Single node path
    });

    test("When calling with an empty tree, then it returns -Infinity", () => {
        expect(maxPathSum(null)).toEqual(-Infinity); // No paths
    });

    test("When calling with tree [-10,9,20,null,null,15,7], then it returns 42", () => {
        const tree = new TreeNode(-10);
        tree.left = new TreeNode(9);
        tree.right = new TreeNode(20);
        tree.right.left = new TreeNode(15);
        tree.right.right = new TreeNode(7);
        expect(maxPathSum(tree)).toEqual(42); // Path: 15-20-7
    });

    test("When calling with a negative tree [-3], then it returns -3", () => {
        const tree = new TreeNode(-3);
        expect(maxPathSum(tree)).toEqual(-3); // Best path is just -3
    });
});