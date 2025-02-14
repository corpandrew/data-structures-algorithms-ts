import { IDoublyLinkedList } from '../../../../src/data-structures/linked-list/doubly/types';
import { DoublyLinkedList } from '../../../../src/data-structures/linked-list/doubly/doublyLinkedList';
import {describe, it, expect, beforeEach} from 'vitest';

describe('DoublyLinkedList', () => {
    let doublyLinkedList: IDoublyLinkedList<number>; // Use the interface type

    beforeEach(() => {
        doublyLinkedList = new DoublyLinkedList<number>(); // Instantiate your DoublyLinkedList implementation
    });

    describe('getSize and isEmpty', () => {
        it('should be empty initially', () => {
            expect(doublyLinkedList.isEmpty()).toBe(true);
            expect(doublyLinkedList.getSize()).toBe(0);
        });

        it('should not be empty after adding elements', () => {
            doublyLinkedList.insertAtBeginning(10);
            expect(doublyLinkedList.isEmpty()).toBe(false);
            expect(doublyLinkedList.getSize()).toBe(1);
            doublyLinkedList.insertAtEnd(20);
            expect(doublyLinkedList.getSize()).toBe(2);
        });

        it('should be empty after adding and deleting all elements', () => {
            doublyLinkedList.insertAtBeginning(10);
            doublyLinkedList.deleteFromBeginning();
            expect(doublyLinkedList.isEmpty()).toBe(true);
            expect(doublyLinkedList.getSize()).toBe(0);
        });
    });

    describe('insertAtBeginning', () => {
        it('should insert at the beginning of an empty list', () => {
            doublyLinkedList.insertAtBeginning(10);
            expect(doublyLinkedList.getSize()).toBe(1);
            expect(doublyLinkedList.toArray()).toEqual([10]);
        });

        it('should insert at the beginning of a non-empty list', () => {
            doublyLinkedList.insertAtBeginning(10);
            doublyLinkedList.insertAtBeginning(5);
            expect(doublyLinkedList.getSize()).toBe(2);
            expect(doublyLinkedList.toArray()).toEqual([5, 10]);
        });
    });

    describe('insertAtEnd', () => {
        it('should insert at the end of an empty list', () => {
            doublyLinkedList.insertAtEnd(10);
            expect(doublyLinkedList.getSize()).toBe(1);
            expect(doublyLinkedList.toArray()).toEqual([10]);
        });

        it('should insert at the end of a non-empty list', () => {
            doublyLinkedList.insertAtEnd(10);
            doublyLinkedList.insertAtEnd(20);
            expect(doublyLinkedList.getSize()).toBe(2);
            expect(doublyLinkedList.toArray()).toEqual([10, 20]);
        });
    });

    describe('insertAtIndex', () => {
        it('should insert at a valid index', () => {
            doublyLinkedList.insertAtEnd(10);
            doublyLinkedList.insertAtEnd(30);
            doublyLinkedList.insertAtIndex(20, 1);
            expect(doublyLinkedList.getSize()).toBe(3);
            expect(doublyLinkedList.toArray()).toEqual([10, 20, 30]);
        });

        it('should insert at the beginning (index 0)', () => {
            doublyLinkedList.insertAtIndex(10, 0);
            expect(doublyLinkedList.getSize()).toBe(1);
            expect(doublyLinkedList.toArray()).toEqual([10]);
        });

        it('should insert at the end (index = size)', () => {
            doublyLinkedList.insertAtEnd(10);
            doublyLinkedList.insertAtIndex(20, 1); // Index 1 is the end when size is 1
            expect(doublyLinkedList.getSize()).toBe(2);
            expect(doublyLinkedList.toArray()).toEqual([10, 20]);
        });

        it('should throw error for index out of bounds (negative index)', () => {
            expect(() => doublyLinkedList.insertAtIndex(10, -1)).toThrowError(); // Or adjust assertion based on your error handling
        });

        it('should throw error for index out of bounds (index > size)', () => {
            doublyLinkedList.insertAtEnd(10);
            expect(() => doublyLinkedList.insertAtIndex(20, 2)).toThrowError(); // Or adjust assertion based on your error handling
        });
    });

    describe('deleteFromBeginning', () => {
        it('should delete from the beginning of a non-empty list', () => {
            doublyLinkedList.insertAtEnd(10);
            doublyLinkedList.insertAtEnd(20);
            const deletedItem = doublyLinkedList.deleteFromBeginning();
            expect(deletedItem).toBe(10);
            expect(doublyLinkedList.getSize()).toBe(1);
            expect(doublyLinkedList.toArray()).toEqual([20]);
        });

        it('should return undefined when deleting from an empty list', () => {
            const deletedItem = doublyLinkedList.deleteFromBeginning();
            expect(deletedItem).toBeUndefined();
            expect(doublyLinkedList.isEmpty()).toBe(true);
        });
    });

    describe('deleteFromEnd', () => {
        it('should delete from the end of a non-empty list', () => {
            doublyLinkedList.insertAtEnd(10);
            doublyLinkedList.insertAtEnd(20);
            const deletedItem = doublyLinkedList.deleteFromEnd();
            expect(deletedItem).toBe(20);
            expect(doublyLinkedList.getSize()).toBe(1);
            expect(doublyLinkedList.toArray()).toEqual([10]);
        });

        it('should return undefined when deleting from an empty list', () => {
            const deletedItem = doublyLinkedList.deleteFromEnd();
            expect(deletedItem).toBeUndefined();
            expect(doublyLinkedList.isEmpty()).toBe(true);
        });
    });

    describe('deleteAtIndex', () => {
        it('should delete from a valid index', () => {
            doublyLinkedList.insertAtEnd(10);
            doublyLinkedList.insertAtEnd(20);
            doublyLinkedList.insertAtEnd(30);
            const deletedItem = doublyLinkedList.deleteAtIndex(1);
            expect(deletedItem).toBe(20);
            expect(doublyLinkedList.getSize()).toBe(2);
            expect(doublyLinkedList.toArray()).toEqual([10, 30]);
        });

        it('should delete from the beginning (index 0)', () => {
            doublyLinkedList.insertAtEnd(10);
            doublyLinkedList.insertAtEnd(20);
            const deletedItem = doublyLinkedList.deleteAtIndex(0);
            expect(deletedItem).toBe(10);
            expect(doublyLinkedList.getSize()).toBe(1);
            expect(doublyLinkedList.toArray()).toEqual([20]);
        });

        it('should delete from the end (index = size - 1)', () => {
            doublyLinkedList.insertAtEnd(10);
            doublyLinkedList.insertAtEnd(20);
            const deletedItem = doublyLinkedList.deleteAtIndex(1);
            expect(deletedItem).toBe(20); // In DoublyLinkedList, deleteFromEnd might be O(1) so testing index=size-1 in deleteAtIndex is still relevant
            expect(doublyLinkedList.getSize()).toBe(1);
            expect(doublyLinkedList.toArray()).toEqual([10]);
        });

        it('should return undefined for index out of bounds (negative index)', () => {
            const deletedItem = doublyLinkedList.deleteAtIndex(-1);
            expect(deletedItem).toBeUndefined(); // Or adjust assertion based on your error handling
        });

        it('should return undefined for index out of bounds (index >= size)', () => {
            doublyLinkedList.insertAtEnd(10);
            const deletedItem = doublyLinkedList.deleteAtIndex(1);
            expect(deletedItem).toBeUndefined(); // Or adjust assertion based on your error handling
        });

        it('should return undefined when deleting from an empty list', () => {
            const deletedItem = doublyLinkedList.deleteAtIndex(0);
            expect(deletedItem).toBeUndefined();
        });
    });

    describe('search', () => {
        it('should find an element that exists', () => {
            doublyLinkedList.insertAtEnd(10);
            doublyLinkedList.insertAtEnd(20);
            doublyLinkedList.insertAtEnd(30);
            expect(doublyLinkedList.search(20)).toBe(true);
        });

        it('should not find an element that does not exist', () => {
            doublyLinkedList.insertAtEnd(10);
            doublyLinkedList.insertAtEnd(20);
            expect(doublyLinkedList.search(40)).toBe(false);
        });

        it('should return false when searching in an empty list', () => {
            expect(doublyLinkedList.search(10)).toBe(false);
        });
    });

    describe('reverseList', () => {
        it('should reverse an empty list (no change)', () => {
            doublyLinkedList.reverseList();
            expect(doublyLinkedList.toArray()).toEqual([]);
        });

        it('should reverse a list with one element (no change)', () => {
            doublyLinkedList.insertAtEnd(10);
            doublyLinkedList.reverseList();
            expect(doublyLinkedList.toArray()).toEqual([10]);
        });

        it('should reverse a list with multiple elements', () => {
            doublyLinkedList.insertAtEnd(10);
            doublyLinkedList.insertAtEnd(20);
            doublyLinkedList.insertAtEnd(30);
            doublyLinkedList.reverseList();
            expect(doublyLinkedList.toArray()).toEqual([30, 20, 10]);
        });
    });

    describe('toArray', () => {
        it('should return an empty array for an empty list', () => {
            expect(doublyLinkedList.toArray()).toEqual([]);
        });

        it('should return an array with elements in correct order', () => {
            doublyLinkedList.insertAtEnd(10);
            doublyLinkedList.insertAtEnd(20);
            doublyLinkedList.insertAtEnd(30);
            expect(doublyLinkedList.toArray()).toEqual([10, 20, 30]);
        });
    });

    describe('Iterable behavior (for...of loop)', () => {
        it('should iterate over elements using for...of loop', () => {
            doublyLinkedList.insertAtEnd(10);
            doublyLinkedList.insertAtEnd(20);
            doublyLinkedList.insertAtEnd(30);
            const elements = [];
            for (const element of doublyLinkedList) {
                elements.push(element);
            }
            expect(elements).toEqual([10, 20, 30]);
        });

        it('should work with spread syntax', () => {
            doublyLinkedList.insertAtEnd(10);
            doublyLinkedList.insertAtEnd(20);
            expect([...doublyLinkedList]).toEqual([10, 20]);
        });
    });
});