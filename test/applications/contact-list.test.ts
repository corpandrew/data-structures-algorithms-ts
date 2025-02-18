import {ContactList} from '../../src/applications/contact-list/contact-list'; // Adjust path to your ContactList class
import {describe, it, expect, beforeEach} from 'vitest';
import {prettyPrintTree} from "../../src/data-structures/tree/prettyPrintTree";
import {IContactList} from "../../src/applications/contact-list/types";

describe('ContactList Application', () => {
    let contactList: IContactList;

    beforeEach(() => {
        contactList = new ContactList();
    });

    describe('addContact', () => {
        it('should add a single contact to the contact list', () => {
            contactList.addContact('Alice');
            expect(contactList.findContact('Alice')).toBe(true);
            expect(contactList.getContactCount()).toBe(1);
        });

        it('should add multiple contacts to the contact list', () => {
            contactList.addContact('Alice');
            contactList.addContact('Bob');
            contactList.addContact('Charlie');
            expect(contactList.findContact('Alice')).toBe(true);
            expect(contactList.findContact('Bob')).toBe(true);
            expect(contactList.findContact('Charlie')).toBe(true);
            expect(contactList.getContactCount()).toBe(3);
        });

        it('should handle duplicate contact names (ignore duplicates - or adjust test if you handle differently)', () => {
            contactList.addContact('Alice');
            contactList.addContact('Alice'); // Add duplicate
            expect(contactList.getContactCount()).toBe(1);
            expect(contactList.findContact('Alice')).toBe(true);
        });

        it('should maintain alphabetical order after adding contacts (implicitly tested in listContactsAlphabetically tests)', () => {
            contactList.addContact('Charlie');
            contactList.addContact('Alice');
            contactList.addContact('Bob');
            expect(contactList.getContactCount()).toBe(3);
        });
    });

    describe('findContact', () => {
        beforeEach(() => {
            contactList.addContact('Alice');
            contactList.addContact('Bob');
            contactList.addContact('Charlie');
        });

        it('should find an existing contact', () => {
            expect(contactList.findContact('Bob')).toBe(true);
        });

        it('should not find a non-existent contact', () => {
            expect(contactList.findContact('David')).toBe(false);
        });

        it('should return false when searching in an empty contact list', () => {
            const emptyList = new ContactList();
            expect(emptyList.findContact('Alice')).toBe(false);
        });
    });

    describe('listContactsAlphabetically', () => {
        it('should return an empty array for an empty contact list', () => {
            expect(contactList.listContactsAlphabetically()).toEqual([]);
        });

        it('should return contacts in alphabetical order for a list with contacts', () => {
            contactList.addContact('Charlie');
            contactList.addContact('Alice');
            contactList.addContact('Bob');
            expect(contactList.listContactsAlphabetically()).toEqual(['Alice', 'Bob', 'Charlie']);
        });

        it('should handle contacts with similar prefixes correctly', () => {
            contactList.addContact('Ava');
            contactList.addContact('Adam');
            contactList.addContact('Amy');
            expect(contactList.listContactsAlphabetically()).toEqual(['Adam', 'Amy', 'Ava']);
        });

        it('should handle contacts with different casing correctly (case-insensitive alphabetical order - if your app is case-insensitive)', () => {
            contactList.addContact('bob');
            contactList.addContact('Alice');
            contactList.addContact('Bob'); // Duplicate, should be ignored or handled as per your app's logic
            contactList.addContact('charlie');
            expect(contactList.listContactsAlphabetically()).toEqual(['Alice', 'Bob', 'bob', 'charlie']); // Or ['Alice', 'Bob', 'Charlie'] if you want to enforce case-insensitive and remove duplicates
            prettyPrintTree(contactList.getRoot())
        });
    });

    describe('getContactCount', () => {
        it('should return 0 for a new contact list', () => {
            expect(contactList.getContactCount()).toBe(0);
        });

        it('should return the correct count after adding contacts', () => {
            contactList.addContact('Alice');
            expect(contactList.getContactCount()).toBe(1);
            contactList.addContact('Bob');
            contactList.addContact('Charlie');
            expect(contactList.getContactCount()).toBe(3);
        });

        it('count should not increase for duplicate additions (if duplicates are ignored)', () => {
            contactList.addContact('Alice');
            contactList.addContact('Alice');
            expect(contactList.getContactCount()).toBe(1);
        });
    });
});