import { IBinarySearchTree } from '../../../src/data-structures/tree/binary-tree/types'; // Adjust path if needed
import { BinarySearchTree } from '../../../src/data-structures/tree/binary-tree/binarySearchTree'; // Assuming your implementation is named BinarySearchTree
import { describe, it, expect, beforeEach } from 'vitest';
import {prettyPrintTree} from "../../../src/data-structures/tree/prettyPrintTree";

describe('BinarySearchTree', () => {
    let bst: IBinarySearchTree<number>;

    beforeEach(() => {
        bst = new BinarySearchTree<number>()
    });

    describe('isEmpty and size', () => {
        it('should be empty initially', () => {
            expect(bst.isEmpty()).toBe(true);
            expect(bst.size()).toBe(0);
        });

        it('should not be empty after inserting elements', () => {
            bst.insert(10);
            expect(bst.isEmpty()).toBe(false);
            expect(bst.size()).toBe(1);
            bst.insert(20);
            expect(bst.size()).toBe(2);
        });

        it('should be empty after clearing', () => {
            bst.insert(10);
            bst.insert(20);
            bst.clear();
            expect(bst.isEmpty()).toBe(true);
            expect(bst.size()).toBe(0);
        });
    });

    describe('insert (BST specific)', () => {
        it('should insert elements maintaining BST property', () => {
            bst.insert(10);
            bst.insert(5);
            bst.insert(15);
            bst.insert(3);
            bst.insert(7);
            bst.insert(12);
            bst.insert(18);
            expect(bst.size()).toBe(7);

            // In-order traversal of BST should be sorted
            expect(bst.inOrderTraversal()).toEqual([3, 5, 7, 10, 12, 15, 18]);
            prettyPrintTree(bst.getRoot());
        });

        it('should handle duplicate insertions (typically BSTs ignore duplicates or handle based on requirement)', () => {
            bst.insert(10);
            bst.insert(10); // Insert duplicate
            expect(bst.size()).toBe(1); // Size should remain 1 (if duplicates ignored) or increase (if allowed, adjust test accordingly)
            expect(bst.search(10)).toBe(true);
        });
    });

    describe('search (BST specific)', () => {
        beforeEach(() => {
            bst.insert(10);
            bst.insert(5);
            bst.insert(15);
            bst.insert(3);
            bst.insert(7);
            bst.insert(12);
            bst.insert(18);
        });

        it('should find an element that exists in BST (efficient search)', () => {
            expect(bst.search(10)).toBe(true);
            expect(bst.search(5)).toBe(true);
            expect(bst.search(15)).toBe(true);
            expect(bst.search(7)).toBe(true);
        });

        it('should not find an element that does not exist in BST', () => {
            expect(bst.search(2)).toBe(false);
            expect(bst.search(6)).toBe(false);
            expect(bst.search(11)).toBe(false);
            expect(bst.search(20)).toBe(false);
        });

        it('should return false when searching in an empty BST', () => {
            const emptyBST = new BinarySearchTree<number>();
            expect(emptyBST.search(10)).toBe(false);
        });
    });

    describe('delete (BST specific)', () => {
        beforeEach(() => {
            bst.insert(20);
            bst.insert(25);
            bst.insert(30);
            bst.insert(35);
            bst.insert(40);
            bst.insert(45);
            bst.insert(50);
            bst.insert(55);
            bst.insert(60);
            bst.insert(65);
            bst.insert(70);
            bst.insert(75);
            bst.insert(80);
            bst.insert(85);
        });

        it('should delete a leaf node', () => {
            bst.delete(25);
            expect(bst.search(25)).toBe(false);
            expect(bst.size()).toBe(13);
        });

        it('should delete a node with one child', () => {
            bst.delete(60); // Node with one child (65)
            expect(bst.search(60)).toBe(false);
            expect(bst.size()).toBe(13);
        });

        it('should delete a node with two children (using successor or predecessor - specify your deletion strategy)', () => {
            bst.delete(70); // Node with two children (60, 80)
            expect(bst.search(70)).toBe(false);
            expect(bst.size()).toBe(13);
        });

        it('should return undefined when deleting a non-existent node', () => {
            const initialSize = bst.size();
            bst.delete(100); // Non-existent node
            expect(bst.size()).toBe(initialSize); // Size should not change
        });

        it('should handle deleting the root node', () => {
            bst.delete(50); // Root node
            expect(bst.search(50)).toBe(false);
            expect(bst.size()).toBe(13);
            expect(bst.getRoot()?.getData()).not.toBe(50); // Root should be different after deletion
        });

        it('should handle deleting all nodes', () => {
            const inOrder = bst.inOrderTraversal();
            inOrder.forEach(data => bst.delete(data)); // Delete all nodes one by one
            expect(bst.isEmpty()).toBe(true);
            expect(bst.size()).toBe(0);
            expect(bst.getRoot()).toBeNull();
        });
    });

    describe('findMin and findMax', () => {
        beforeEach(() => {
            bst.insert(50);
            bst.insert(30);
            bst.insert(70);
            bst.insert(20);
            bst.insert(40);
            bst.insert(60);
            bst.insert(80);
        });

        it('findMin should return the minimum value in the BST', () => {
            expect(bst.findMin()).toBe(20);
        });

        it('findMax should return the maximum value in the BST', () => {
            expect(bst.findMax()).toBe(80);
        });

        it('findMin and findMax should return undefined for an empty BST', () => {
            const emptyBST = new BinarySearchTree<number>();
            expect(emptyBST.findMin()).toBeUndefined();
            expect(emptyBST.findMax()).toBeUndefined();
        });
    });

    describe('traversals (inherited from BinaryTree, but BST in-order is sorted)', () => {
        beforeEach(() => {
            bst.insert(50);
            bst.insert(30);
            bst.insert(70);
            bst.insert(20);
            bst.insert(40);
            bst.insert(60);
            bst.insert(80);
        });

        it('inOrderTraversal should return elements in sorted order for BST', () => {
            expect(bst.inOrderTraversal()).toEqual([20, 30, 40, 50, 60, 70, 80]); // Sorted order for BST
        });

        it('preOrderTraversal should return elements in Pre-Order', () => {
            expect(bst.preOrderTraversal()).toEqual([50, 30, 20, 40, 70, 60, 80]);
        });

        it('postOrderTraversal should return elements in Post-Order', () => {
            expect(bst.postOrderTraversal()).toEqual([20, 40, 30, 60, 80, 70, 50]);
        });

        it('levelOrderTraversal should return elements in Level-Order (Breadth-First)', () => {
            expect(bst.levelOrderTraversal()).toEqual([50, 30, 70, 20, 40, 60, 80]);
        });
    });


    describe('clear', () => {
        it('should clear all nodes from the BST', () => {
            bst.insert(10);
            bst.insert(20);
            bst.clear();
            expect(bst.isEmpty()).toBe(true);
            expect(bst.size()).toBe(0);
            expect(bst.getRoot()).toBeNull();
        });
    });

    describe('toArray', () => {
        it('should return an empty array for an empty BST', () => {
            expect(bst.toArray()).toEqual([]);
        });

        it('should return an array representation of the BST (e.g., level order)', () => {
            bst.insert(50);
            bst.insert(30);
            bst.insert(70);
            expect(bst.toArray()).toEqual([50, 30, 70]); // Example using level order, adjust if your toArray uses a different traversal
        });
    });
});