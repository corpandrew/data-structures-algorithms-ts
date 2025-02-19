import { IAVLTree } from '../../../../src/data-structures/tree/avl-tree/types';
import { AVLTree } from '../../../../src/data-structures/tree/avl-tree/avlTree';
import { describe, it, expect, beforeEach } from 'vitest';

describe('AVLTree', () => {
    let avlTree: IAVLTree<number>;

    beforeEach(() => {
        avlTree = new AVLTree<number>();
    });

    describe('AVL Tree Balancing - Insertions', () => {
        it('should maintain AVL balance after LL rotation (Left-Left case)', () => {
            avlTree.insert(5);
            avlTree.insert(4);
            avlTree.insert(3);
            expect(avlTree.inOrderTraversal()).toEqual([3, 4, 5]);
            expect(avlTree.getHeight()).toBeLessThanOrEqual(2 * Math.log2(avlTree.size() + 1));
        });

        it('should maintain AVL balance after RR rotation (Right-Right case)', () => {
            avlTree.insert(3);
            avlTree.insert(4);
            avlTree.insert(5); // Triggers RR rotation at node 3
            expect(avlTree.inOrderTraversal()).toEqual([3, 4, 5]);
            expect(avlTree.getHeight()).toBeLessThanOrEqual(2 * Math.log2(avlTree.size() + 1)); // Rough balance check
        });

        it('should maintain AVL balance after LR rotation (Left-Right case)', () => {
            avlTree.insert(5);
            avlTree.insert(3);
            avlTree.insert(4); // Triggers LR rotation at node 5
            expect(avlTree.inOrderTraversal()).toEqual([3, 4, 5]);
            expect(avlTree.getHeight()).toBeLessThanOrEqual(2 * Math.log2(avlTree.size() + 1)); // Rough balance check
        });

        it('should maintain AVL balance after RL rotation (Right-Left case)', () => {
            avlTree.insert(3);
            avlTree.insert(5);
            avlTree.insert(4); // Triggers RL rotation at node 3
            expect(avlTree.inOrderTraversal()).toEqual([3, 4, 5]);
            expect(avlTree.getHeight()).toBeLessThanOrEqual(2 * Math.log2(avlTree.size() + 1)); // Rough balance check
        });

        it('should maintain AVL balance after multiple insertions and rotations - sequence 1', () => {
            // Sequence to trigger multiple rotations and different rotation types
            const values = [10, 5, 15, 3, 7, 12, 18, 2, 4, 6, 8, 11, 13, 17, 19];
            values.forEach(val => avlTree.insert(val));
            expect(avlTree.size()).toBe(values.length);
            expect(avlTree.inOrderTraversal()).toEqual([...values].sort((a, b) => a - b)); // In-order should be sorted
            expect(avlTree.getHeight()).toBeLessThanOrEqual(2 * Math.log2(avlTree.size() + 1)); // Rough balance check
        });

        it('should maintain AVL balance after multiple insertions and rotations - sequence 2 (skewed input)', () => {
            // Skewed input sequence (nearly sorted) to heavily test balancing
            const values = Array.from({ length: 20 }, (_, i) => i + 1); // [1, 2, 3, ..., 20] - nearly sorted
            values.forEach(val => avlTree.insert(val));
            expect(avlTree.size()).toBe(values.length);
            expect(avlTree.inOrderTraversal()).toEqual(values); // In-order should be sorted (same as input in this case)
            expect(avlTree.getHeight()).toBeLessThanOrEqual(2 * Math.log2(avlTree.size() + 1)); // Rough balance check
        });

        it('should maintain AVL balance after inserting many random values', () => {
            let values: number[] = Array.from({ length: 100 }, () => Math.floor(Math.random() * 10000))
            values = values.filter(a => values.indexOf(a) === -1);
            values.forEach(val => avlTree.insert(val));
            expect(avlTree.size()).toBe(values.length);
            expect(avlTree.inOrderTraversal()).toEqual([...values].sort((a, b) => a - b)); // In-order should be sorted
            expect(avlTree.getHeight()).toBeLessThanOrEqual(2 * Math.log2(avlTree.size() + 1)); // Rough balance check
        });
    });

    describe('AVL Tree Balancing - Deletions', () => {
        beforeEach(() => {
            // Example tree for deletion tests - a more balanced initial tree
            const initialValues = [50, 30, 70, 20, 40, 60, 80, 10, 25, 35, 45, 55, 65, 75, 90];
            initialValues.forEach(val => avlTree.insert(val));
        });

        it('should maintain AVL balance after deleting a leaf node (no rotation needed)', () => {
            avlTree.delete(10); // Delete leaf node 10
            expect(avlTree.search(10)).toBe(false);
            expect(avlTree.size()).toBe(14);
            expect(avlTree.getHeight()).toBeLessThanOrEqual(2 * Math.log2(avlTree.size() + 1)); // Rough balance check
        });

        it('should maintain AVL balance after deleting a node with one child (no rotation needed)', () => {
            avlTree.delete(60); // Delete node 60 (one child: 65)
            expect(avlTree.search(60)).toBe(false);
            expect(avlTree.size()).toBe(14);
            expect(avlTree.getHeight()).toBeLessThanOrEqual(2 * Math.log2(avlTree.size() + 1)); // Rough balance check
        });

        it('should maintain AVL balance after deleting a node with two children (rotation might be needed)', () => {
            avlTree.delete(50); // Delete root node 50 (two children) - Might trigger rotations
            expect(avlTree.search(50)).toBe(false);
            expect(avlTree.size()).toBe(14);
            expect(avlTree.getHeight()).toBeLessThanOrEqual(2 * Math.log2(avlTree.size() + 1)); // Rough balance check
            expect(avlTree.getRoot()?.getData()).not.toBe(50); // Root should change
        });

        it('should maintain AVL balance after multiple deletions and rotations - sequence 1', () => {
            const valuesToDelete = [25, 40, 65, 80]; // Sequence of deletions that might trigger rotations
            valuesToDelete.forEach(val => avlTree.delete(val));
            expect(avlTree.size()).toBe(11);
            expect(avlTree.inOrderTraversal()).toEqual(
                [10, 20, 30, 35, 45, 50, 55, 60, 70, 75, 90] // Expected in-order after deletions - adjust if needed
            );
            expect(avlTree.getHeight()).toBeLessThanOrEqual(2 * Math.log2(avlTree.size() + 1)); // Rough balance check
        });


        it('should maintain AVL balance after deleting many random values', () => {
            const initialValues = Array.from({ length: 100 }, () => Math.floor(Math.random() * 10000));
            initialValues.forEach(val => avlTree.insert(val));
            const valuesToDelete = initialValues.filter((_, index) => index % 2 === 0); // Delete every other inserted value
            valuesToDelete.forEach(val => avlTree.delete(val));

            expect(avlTree.getHeight()).toBeLessThanOrEqual(2 * Math.log2(avlTree.size() + 1)); // Rough balance check
        });
    });

});