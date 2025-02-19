import { IBinaryTree } from '../../../../src/data-structures/tree/binary-tree/types';
import { BinaryTree } from '../../../../src/data-structures/tree/binary-tree/binaryTree';
import { describe, it, expect, beforeEach } from 'vitest';
import {prettyPrintTree} from "../../../../src/data-structures/tree/prettyPrintTree";

describe('BinaryTree', () => {
    let binaryTree: IBinaryTree<number>;

    beforeEach(() => {
        binaryTree = new BinaryTree<number>(); // Instantiate your BinaryTree implementation
    });

    describe('isEmpty and size', () => {
        it('should be empty initially', () => {
            expect(binaryTree.isEmpty()).toBe(true);
            expect(binaryTree.size()).toBe(0);
        });

        it('should not be empty after inserting elements', () => {
            binaryTree.insert(10);
            expect(binaryTree.isEmpty()).toBe(false);
            expect(binaryTree.size()).toBe(1);
            binaryTree.insert(20);
            expect(binaryTree.size()).toBe(2);
        });

        it('should be empty after clearing', () => {
            binaryTree.insert(10);
            binaryTree.insert(20);
            binaryTree.clear();
            expect(binaryTree.isEmpty()).toBe(true);
            expect(binaryTree.size()).toBe(0);
        });
    });

    describe('insert', () => {
        it('should insert elements into the binary tree (structure not strictly defined in basic BinaryTree)', () => {
            binaryTree.insert(10);
            binaryTree.insert(5);
            binaryTree.insert(15);
            expect(binaryTree.size()).toBe(3);
            expect(binaryTree.search(10)).toBe(true);
            expect(binaryTree.search(5)).toBe(true);
            expect(binaryTree.search(15)).toBe(true);
        });

        it('should insert elements into the binary tree (structure not strictly defined in basic BinaryTree)', () => {
            for (let i = 0; i < 100; i++) {
                binaryTree.insert(i);
            }
            expect(binaryTree.size()).toBe(100);

            prettyPrintTree(binaryTree.getRoot());
        });
    });

    describe('search', () => {
        it('should find an element that exists', () => {
            binaryTree.insert(10);
            binaryTree.insert(20);
            binaryTree.insert(30);
            expect(binaryTree.search(20)).toBe(true);
        });

        it('should not find an element that does not exist', () => {
            binaryTree.insert(10);
            binaryTree.insert(20);
            expect(binaryTree.search(40)).toBe(false);
        });

        it('should return false when searching in an empty tree', () => {
            expect(binaryTree.search(10)).toBe(false);
        });
    });

    describe('traversals', () => {
        beforeEach(() => {
            // Example tree structure for traversal tests:
            //      10
            //     /  \
            //    5    15
            //   / \   / \
            //  3   7 12  18
            binaryTree.insert(10);
            binaryTree.insert(5);
            binaryTree.insert(15);
            binaryTree.insert(3);
            binaryTree.insert(7);
            binaryTree.insert(12);
            binaryTree.insert(18);
        });

        it('inOrderTraversal should return elements in correct order (Left-Root-Right)', () => {
            expect(binaryTree.inOrderTraversal()).toEqual([3, 5, 7, 10, 12, 15, 18]);
        });

        it('preOrderTraversal should return elements in correct order (Root-Left-Right)', () => {
            expect(binaryTree.preOrderTraversal()).toEqual([10, 5, 3, 7, 15, 12, 18]);
        });

        it('postOrderTraversal should return elements in correct order (Left-Right-Root)', () => {
            expect(binaryTree.postOrderTraversal()).toEqual([3, 7, 5, 12, 18, 15, 10]);
        });

        it('levelOrderTraversal should return elements in correct order (Breadth-First)', () => {
            expect(binaryTree.levelOrderTraversal()).toEqual([10, 5, 15, 3, 7, 12, 18]);
        });
    });

    describe('getHeight', () => {
        it('getHeight should return 0 for an empty tree', () => {
            expect(binaryTree.getHeight()).toBe(0);
        });

        it('getHeight should return correct height for a non-empty tree', () => {
            binaryTree.insert(10);
            expect(binaryTree.getHeight()).toBe(1); // Root only, height 1
            binaryTree.insert(5);
            binaryTree.insert(15);
            expect(binaryTree.getHeight()).toBe(2); // Two levels, height 2
            binaryTree.insert(3);
            binaryTree.insert(7);
            binaryTree.insert(12);
            binaryTree.insert(18);
            expect(binaryTree.getHeight()).toBe(3); // Three levels, height 3
        });

    });

    describe('clear', () => {
        it('should clear all nodes from the tree', () => {
            binaryTree.insert(10);
            binaryTree.insert(20);
            binaryTree.clear();
            expect(binaryTree.isEmpty()).toBe(true);
            expect(binaryTree.size()).toBe(0);
            expect(binaryTree.getRoot()).toBeNull();
        });
    });

    describe('toArray', () => {
        it('should return an empty array for an empty tree', () => {
            expect(binaryTree.toArray()).toEqual([]);
        });

        it('should return an array representation of the tree (e.g., level order)', () => {
            binaryTree.insert(10);
            binaryTree.insert(5);
            binaryTree.insert(15);
            expect(binaryTree.toArray()).toEqual([10, 5, 15]);
        });
    });
});