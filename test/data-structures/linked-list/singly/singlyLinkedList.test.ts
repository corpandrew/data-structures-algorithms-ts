import {SinglyLinkedList} from '../../../../src/data-structures/linked-list/singly/singlyLinkedList'; // Adjust path if needed
import {describe, it, expect, beforeEach} from 'vitest';

describe('SinglyLinkedList', () => { // Or whatever your LinkedList class name is
    let linkedList: SinglyLinkedList<number>; // Use the interface type

    beforeEach(() => {
        linkedList = new SinglyLinkedList<number>(); // Instantiate your LinkedList implementation
    });

    describe('getSize and isEmpty', () => {
        it('should be empty initially', () => {
            expect(linkedList.isEmpty()).toBe(true);
            expect(linkedList.getSize()).toBe(0);
        });

        it('should not be empty after adding elements', () => {
            linkedList.insertAtBeginning(10);
            expect(linkedList.isEmpty()).toBe(false);
            expect(linkedList.getSize()).toBe(1);
            linkedList.insertAtEnd(20);
            expect(linkedList.getSize()).toBe(2);
        });

        it('should be empty after adding and deleting all elements', () => {
            linkedList.insertAtBeginning(10);
            linkedList.deleteFromBeginning();
            expect(linkedList.isEmpty()).toBe(true);
            expect(linkedList.getSize()).toBe(0);
        });
    });

    describe('insertAtBeginning', () => {
        it('should insert at the beginning of an empty list', () => {
            linkedList.insertAtBeginning(10);
            expect(linkedList.getSize()).toBe(1);
            // You might need a way to peek at the head or convert to array for assertions
            expect(linkedList.toArray()).toEqual([10]);
        });

        it('should insert at the beginning of a non-empty list', () => {
            linkedList.insertAtBeginning(10);
            linkedList.insertAtBeginning(5);
            expect(linkedList.getSize()).toBe(2);
            expect(linkedList.toArray()).toEqual([5, 10]);
        });
    });

    describe('insertAtEnd', () => {
        it('should insert at the end of an empty list', () => {
            linkedList.insertAtEnd(10);
            expect(linkedList.getSize()).toBe(1);
            expect(linkedList.toArray()).toEqual([10]);
        });

        it('should insert at the end of a non-empty list', () => {
            linkedList.insertAtEnd(10);
            linkedList.insertAtEnd(20);
            expect(linkedList.getSize()).toBe(2);
            expect(linkedList.toArray()).toEqual([10, 20]);
        });
    });

    describe('insertAtIndex', () => {
        it('should insert at a valid index', () => {
            linkedList.insertAtEnd(10);
            linkedList.insertAtEnd(30);
            linkedList.insertAtIndex(20, 1);
            expect(linkedList.getSize()).toBe(3);
            expect(linkedList.toArray()).toEqual([10, 20, 30]);
        });

        it('should insert at the beginning (index 0)', () => {
            linkedList.insertAtIndex(10, 0);
            expect(linkedList.getSize()).toBe(1);
            expect(linkedList.toArray()).toEqual([10]);
        });

        it('should insert at the end (index = size)', () => {
            linkedList.insertAtEnd(10);
            linkedList.insertAtIndex(20, 1); // Index 1 is the end when size is 1
            expect(linkedList.getSize()).toBe(2);
            expect(linkedList.toArray()).toEqual([10, 20]);
        });

        it('should throw error for index out of bounds (negative index)', () => {
            expect(() => linkedList.insertAtIndex(10, -1)).toThrowError(); // Or adjust assertion based on your error handling
        });

        it('should throw error for index out of bounds (index > size)', () => {
            linkedList.insertAtEnd(10);
            expect(() => linkedList.insertAtIndex(20, 2)).toThrowError(); // Or adjust assertion based on your error handling
        });
    });

    describe('deleteFromBeginning', () => {
        it('should delete from the beginning of a non-empty list', () => {
            linkedList.insertAtEnd(10);
            linkedList.insertAtEnd(20);
            const deletedItem = linkedList.deleteFromBeginning();
            expect(deletedItem).toBe(10);
            expect(linkedList.getSize()).toBe(1);
            expect(linkedList.toArray()).toEqual([20]);
        });

        it('should return undefined when deleting from an empty list', () => {
            const deletedItem = linkedList.deleteFromBeginning();
            expect(deletedItem).toBeUndefined();
            expect(linkedList.isEmpty()).toBe(true);
        });
    });

    describe('deleteFromEnd', () => {
        it('should delete from the end of a non-empty list', () => {
            linkedList.insertAtEnd(10);
            linkedList.insertAtEnd(20);
            const deletedItem = linkedList.deleteFromEnd();
            expect(deletedItem).toBe(20);
            expect(linkedList.getSize()).toBe(1);
            expect(linkedList.toArray()).toEqual([10]);
        });

        it('should return undefined when deleting from an empty list', () => {
            const deletedItem = linkedList.deleteFromEnd();
            expect(deletedItem).toBeUndefined();
            expect(linkedList.isEmpty()).toBe(true);
        });
    });

    describe('deleteAtIndex', () => {
        it('should delete from a valid index', () => {
            linkedList.insertAtEnd(10);
            linkedList.insertAtEnd(20);
            linkedList.insertAtEnd(30);
            const deletedItem = linkedList.deleteAtIndex(1);
            expect(deletedItem).toBe(20);
            expect(linkedList.getSize()).toBe(2);
            expect(linkedList.toArray()).toEqual([10, 30]);
        });

        it('should delete from the beginning (index 0)', () => {
            linkedList.insertAtEnd(10);
            linkedList.insertAtEnd(20);
            const deletedItem = linkedList.deleteAtIndex(0);
            expect(deletedItem).toBe(10);
            expect(linkedList.getSize()).toBe(1);
            expect(linkedList.toArray()).toEqual([20]);
        });

        it('should delete from the end (index = size - 1)', () => {
            linkedList.insertAtEnd(10);
            linkedList.insertAtEnd(20);
            const deletedItem = linkedList.deleteAtIndex(1);
            expect(deletedItem).toBe(20);
            expect(linkedList.getSize()).toBe(1);
            expect(linkedList.toArray()).toEqual([10]);
        });

        it('should return undefined for index out of bounds (negative index)', () => {
            const deletedItem = linkedList.deleteAtIndex(-1);
            expect(deletedItem).toBeUndefined(); // Or adjust assertion based on your error handling
        });

        it('should return undefined for index out of bounds (index >= size)', () => {
            linkedList.insertAtEnd(10);
            const deletedItem = linkedList.deleteAtIndex(1);
            expect(deletedItem).toBeUndefined(); // Or adjust assertion based on your error handling
        });

        it('should return undefined when deleting from an empty list', () => {
            const deletedItem = linkedList.deleteAtIndex(0);
            expect(deletedItem).toBeUndefined();
        });
    });

    describe('search', () => {
        it('should find an element that exists', () => {
            linkedList.insertAtEnd(10);
            linkedList.insertAtEnd(20);
            linkedList.insertAtEnd(30);
            expect(linkedList.search(20)).toBe(true);
        });

        it('should not find an element that does not exist', () => {
            linkedList.insertAtEnd(10);
            linkedList.insertAtEnd(20);
            expect(linkedList.search(40)).toBe(false);
        });

        it('should return false when searching in an empty list', () => {
            expect(linkedList.search(10)).toBe(false);
        });
    });

    describe('reverseList', () => {
        it('should reverse an empty list (no change)', () => {
            linkedList.reverseList();
            expect(linkedList.toArray()).toEqual([]);
        });

        it('should reverse a list with one element (no change)', () => {
            linkedList.insertAtEnd(10);
            linkedList.reverseList();
            expect(linkedList.toArray()).toEqual([10]);
        });

        it('should reverse a list with multiple elements', () => {
            linkedList.insertAtEnd(10);
            linkedList.insertAtEnd(20);
            linkedList.insertAtEnd(30);
            linkedList.reverseList();
            expect(linkedList.toArray()).toEqual([30, 20, 10]);
        });
    });

    describe('toArray', () => {
        it('should return an empty array for an empty list', () => {
            expect(linkedList.toArray()).toEqual([]);
        });

        it('should return an array with elements in correct order', () => {
            linkedList.insertAtEnd(10);
            linkedList.insertAtEnd(20);
            linkedList.insertAtEnd(30);
            expect(linkedList.toArray()).toEqual([10, 20, 30]);
        });
    });


    describe('Iterable behavior (for...of loop)', () => {
        it('should iterate over elements using for...of loop', () => {
            linkedList.insertAtEnd(10);
            linkedList.insertAtEnd(20);
            linkedList.insertAtEnd(30);
            const elements = [];
            for (const element of linkedList) {
                elements.push(element);
            }
            expect(elements).toEqual([10, 20, 30]);
        });

        it('should work with spread syntax', () => {
            linkedList.insertAtEnd(10);
            linkedList.insertAtEnd(20);
            expect([...linkedList]).toEqual([10, 20]);
        });
    });
});