import {ITreeNode} from "../../data-structures/tree/binary-tree/types.ts";

export interface IContactList {
    /**
     * Adds a contact into the Contact List.
     * @param name name to add to the Contact List
     */
    addContact(name: string): void;

    /**
     * Contact to find in the Contact List.
     * @param name name to find in the Contact List.
     */
    findContact(name: string): boolean;

    /**
     * Gets the count of contacts in the Contact List.
     */
    getContactCount(): number;

    /**
     * Gets the root of the Contact List.
     */
    getRoot(): ITreeNode<string> | null;

    /**
     * Gets the list of contacts in the ContactList alphabetically.
     */
    listContactsAlphabetically(): string[];
}