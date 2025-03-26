import {describe, expect, test} from "vitest";
import {inOrderTraversal, TreeNode} from "../../../src/algorithms/recursion/inOrderTraversal";

describe("Given you are testing inOrderTraversal", () => {
    test("When calling with a tree [1,null,2,3], then it returns [1,3,2]", () => {
        const tree = new TreeNode(1);
        tree.right = new TreeNode(2);
        tree.right.left = new TreeNode(3);
        expect(inOrderTraversal(tree)).toEqual([1, 3, 2]);
    });

    test("When calling with a single node [1], then it returns [1]", () => {
        const tree = new TreeNode(1);
        expect(inOrderTraversal(tree)).toEqual([1]);
    });

    test("When calling with an empty tree, then it returns []", () => {
        expect(inOrderTraversal(null)).toEqual([]);
    });

    test("When calling with a balanced tree [1,2,3,4,5], then it returns [4,2,5,1,3]", () => {
        const tree = new TreeNode(1);
        tree.left = new TreeNode(2);
        tree.right = new TreeNode(3);
        tree.left.left = new TreeNode(4);
        tree.left.right = new TreeNode(5);
        expect(inOrderTraversal(tree)).toEqual([4, 2, 5, 1, 3]);
    });

    test("When calling with a right-heavy tree [1,null,2,null,3], then it returns [1,2,3]", () => {
        const tree = new TreeNode(1);
        tree.right = new TreeNode(2);
        tree.right.right = new TreeNode(3);
        expect(inOrderTraversal(tree)).toEqual([1, 2, 3]);
    });
});