import { describe, it, expect, beforeEach } from 'vitest';
import {ISocialNetwork} from "../../../src/applications/social-network/types";
import {SocialNetwork} from "../../../src/applications/social-network/socialNetwork";

describe('SocialNetwork', () => {
    let socialNetworkApp: ISocialNetwork<string>; // Testing with string person names

    beforeEach(() => {
        socialNetworkApp = new SocialNetwork<string>(); // Instantiate your SocialNetwork implementation
        // Setup a sample social network for connection tests
        socialNetworkApp.addPerson('Alice');
        socialNetworkApp.addPerson('Bob');
        socialNetworkApp.addPerson('Charlie');
        socialNetworkApp.addPerson('David');
        socialNetworkApp.addPerson('Eve');
        socialNetworkApp.addFriendship('Alice', 'Bob');
        socialNetworkApp.addFriendship('Bob', 'Charlie');
        socialNetworkApp.addFriendship('Charlie', 'David');
        // Social Network (Friendships):
        // Alice --- Bob --- Charlie --- David
        //         |
        //         Eve (not connected to the main chain in this setup)
    });

    describe('areConnected (using BFS)', () => {
        it('should return true if two people are connected (BFS)', () => {
            expect(socialNetworkApp.areConnected('Alice', 'Charlie', 'bfs')).toBe(true); // Alice - Bob - Charlie path exists
            expect(socialNetworkApp.areConnected('Bob', 'David', 'bfs')).toBe(true); // Bob - Charlie - David path exists
            expect(socialNetworkApp.areConnected('Alice', 'David', 'bfs')).toBe(true); // Alice - Bob - Charlie - David path exists (longer path)
        });

        it('should return false if two people are not connected (BFS)', () => {
            expect(socialNetworkApp.areConnected('Alice', 'Eve', 'bfs')).toBe(false); // Alice and Eve are not connected
            expect(socialNetworkApp.areConnected('David', 'Eve', 'bfs')).toBe(false); // David and Eve are not connected
        });

        it('should return true if a person is connected to themselves (direct or indirect - depends on your definition of "connected" - this test assumes self-connection is true)', () => {
            expect(socialNetworkApp.areConnected('Alice', 'Alice', 'bfs')).toBe(true); // A person is considered connected to themselves
            expect(socialNetworkApp.areConnected('Bob', 'Bob', 'bfs')).toBe(true);
        });

        it('should return false if checking connection in an empty social network', () => {
            const emptyNetwork = new SocialNetwork<string>();
            expect(emptyNetwork.areConnected('Alice', 'Bob', 'bfs')).toBe(false); // No one is connected in an empty network
        });

        it('should return false if one person is in network but the other is not (BFS)', () => {
            expect(socialNetworkApp.areConnected('Alice', 'Frank', 'bfs')).toBe(false); // 'Frank' is not in the network
            expect(socialNetworkApp.areConnected('Frank', 'Alice', 'bfs')).toBe(false); // 'Frank' not in network, order doesn't matter for undirected graph
        });
    });

    describe('areConnected (using DFS)', () => { // Re-run similar tests but using DFS traversal
        it('should return true if two people are connected (DFS)', () => {
            expect(socialNetworkApp.areConnected('Alice', 'Charlie', 'dfs')).toBe(true); // Alice - Bob - Charlie path exists (DFS)
            expect(socialNetworkApp.areConnected('Bob', 'David', 'dfs')).toBe(true); // Bob - Charlie - David path exists (DFS)
            expect(socialNetworkApp.areConnected('Alice', 'David', 'dfs')).toBe(true); // Alice - Bob - Charlie - David path exists (DFS)
        });

        it('should return false if two people are not connected (DFS)', () => {
            expect(socialNetworkApp.areConnected('Alice', 'Eve', 'dfs')).toBe(false); // Alice and Eve are not connected (DFS)
            expect(socialNetworkApp.areConnected('David', 'Eve', 'dfs')).toBe(false); // David and Eve are not connected (DFS)
        });

        it('should return true if a person is connected to themselves (DFS)', () => {
            expect(socialNetworkApp.areConnected('Alice', 'Alice', 'dfs')).toBe(true); // A person is considered connected to themselves (DFS)
            expect(socialNetworkApp.areConnected('Bob', 'Bob', 'dfs')).toBe(true);
        });

        it('should return false if checking connection in an empty social network (DFS)', () => {
            const emptyNetwork = new SocialNetwork<string>();
            expect(emptyNetwork.areConnected('Alice', 'Bob', 'dfs')).toBe(false); // No one is connected in an empty network (DFS)
        });

        it('should return false if one person is in network but the other is not (DFS)', () => {
            expect(socialNetworkApp.areConnected('Alice', 'Frank', 'dfs')).toBe(false); // 'Frank' is not in the network (DFS)
            expect(socialNetworkApp.areConnected('Frank', 'Alice', 'dfs')).toBe(false); // 'Frank' not in network, order doesn't matter for undirected graph (DFS)
        });
    });
});