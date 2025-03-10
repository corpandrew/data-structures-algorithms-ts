import {IGraph} from "../../data-structures/graph/types.ts";

/**
 * Interface for a Conceptual Social Network Graph Application.
 * Defines the contract for an application built on a Graph to represent a social network.
 * @template Person The type representing a person (vertex) in the social network.
 * @interface ISocialNetwork
 */
export interface ISocialNetwork<Person> {
    /**
     * Gets the underlying Graph data structure used by the Social Network Application.
     * This is primarily for testing and inspection, not typically part of the core application interface.
     * @returns {IGraph<Person>} The Graph instance.
     * @memberof ISocialNetwork
     * @internal - Marked as internal as it's mainly for testing
     */
    getGraph(): IGraph<Person>; // Primarily for testing - not usually part of the app's public API

    /**
     * Adds a person (vertex) to the social network.
     * @param {Person} person The person to add.
     * @returns {void}
     * @memberof ISocialNetwork
     */
    addPerson(person: Person): void;

    /**
     * Adds a friendship (edge) between two people in the social network.
     * Assumes an undirected graph representing mutual friendships.
     * @param {Person} person1 The first person.
     * @param {Person} person2 The second person.
     * @returns {void}
     * @memberof ISocialNetwork
     */
    addFriendship(person1: Person, person2: Person): void;

    /**
     * Checks if two people are connected in the social network (if there is a path of friendships between them).
     * Uses Breadth-First Search (BFS) or Depth-First Search (DFS) internally.
     * @param {Person} person1 The first person.
     * @param {Person} person2 The second person.
     * @param {string} traversalType Optional traversal type to use ('bfs' or 'dfs', default 'bfs').
     * @returns {boolean} True if person1 and person2 are connected, false otherwise.
     * @memberof ISocialNetwork
     */
    areConnected(person1: Person, person2: Person, traversalType?: 'bfs' | 'dfs'): boolean;
}