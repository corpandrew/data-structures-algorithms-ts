import {describe, it, expect, beforeEach} from 'vitest';
import {IWeightedGraph} from "../../../src/data-structures/graph/types";
import {WeightedAdjacencyListGraph} from "../../../src/data-structures/graph/weightedAdjacencyListGraph";

describe('WeightedGraph (Abstract)', () => {
    let graph: IWeightedGraph<string>;

    beforeEach(() => {
        graph = new WeightedAdjacencyListGraph<string>(); // Instantiate graph implementation from factory
    });

    describe('addVertex', () => {
        it('should add a vertex to the graph', () => {
            graph.addVertex('A');
            expect(graph.size()).toBe(1);
            expect(graph.getVertices()).toEqual(['A']);
        });

        it('should add multiple vertices to the graph', () => {
            graph.addVertex('A');
            graph.addVertex('B');
            graph.addVertex('C');
            expect(graph.size()).toBe(3);
            expect(graph.getVertices()).toEqual(['A', 'B', 'C']);
        });

        it('should handle adding duplicate vertices (typically ignored - adjust test if your implementation handles differently)', () => {
            graph.addVertex('A');
            graph.addVertex('A'); // Add duplicate
            expect(graph.size()).toBe(1); // Size should remain 1 if duplicates are ignored
            expect(graph.getVertices()).toEqual(['A']);
        });
    });

    describe('addEdge (Weighted)', () => {
        beforeEach(() => {
            graph.addVertex('A');
            graph.addVertex('B');
            graph.addVertex('C');
        });

        it('should add a weighted edge between two vertices', () => {
            graph.addEdge('A', 'B', 10); // Add weighted edge with weight 10
            expect(graph.hasEdge('A', 'B')).toBe(true);
            // Weighted Graph Test Modification: You might want to add a way to get edge weight and assert it here, depending on your implementation. For now, just testing edge existence.
        });

        it('should add multiple weighted edges with different weights', () => {
            graph.addEdge('A', 'B', 10);
            graph.addEdge('B', 'C', 5);
            graph.addEdge('C', 'A', 15);
            expect(graph.hasEdge('A', 'B')).toBe(true);
            expect(graph.hasEdge('B', 'C')).toBe(true);
            expect(graph.hasEdge('C', 'A')).toBe(true);
            // Weighted Graph Test Modification:  Optionally add tests to assert weights are stored correctly.
        });

        it('should handle adding an edge to a non-existent vertex (same behavior as unweighted graph - adjust test)', () => {
            graph.addEdge('A', 'D', 20); // 'D' vertex not added yet, weight 20
            expect(graph.hasEdge('A', 'D')).toBe(false); // Edge should not exist
            expect(graph.getWeightedNeighbors('A'))
                .toEqual([]);
        });

        it('should handle adding a self-loop weighted edge', () => {
            graph.addEdge('A', 'A', 7); // Self-loop with weight 7
            expect(graph.hasEdge('A', 'A')).toBe(true); // Self-loop should exist
            // Weighted Graph Test Modification: Optionally assert weight of self-loop if you add weight retrieval methods.
            expect(graph.getWeightedNeighbors('A')).toContainEqual({neighbor: 'A', weight: 7}); // 'A' should be neighbor of itself
        });

        it('should handle adding duplicate weighted edges (typically overwrite or ignore - adjust test)', () => {
            graph.addEdge('A', 'B', 10);
            graph.addEdge('A', 'B', 25); // Add duplicate edge but with different weight - Behavior depends on your design.  This test assumes the *last* weight put is kept, or duplicates are ignored.
            expect(graph.hasEdge('A', 'B')).toBe(true); // Edge should still exist
            // Weighted Graph Test Modification: Optionally assert that weight is updated to 25 or remains 10, depending on your duplicate edge handling policy.
            // For now, just testing edge existence.
        });
    });

    describe('getWeightedNeighbors (Optional - if you implement getWeightedNeighbors)', () => { // New test suite for getWeightedNeighbors
        beforeEach(() => {
            graph.addVertex('A');
            graph.addVertex('B');
            graph.addVertex('C');
            graph.addEdge('A', 'B', 10);
            graph.addEdge('A', 'C', 15);
            graph.addEdge('B', 'C', 5);
        });

        it('should return weighted neighbors of a vertex with weighted edges', () => {
            expect(graph.getWeightedNeighbors?.('A')).toEqual([ // Optional method call - use ?.
                {neighbor: 'B', weight: 10},
                {neighbor: 'C', weight: 15}
            ]); // Neighbors of 'A' with weights (order might vary depending on implementation)
            expect(graph.getWeightedNeighbors?.('B')).toEqual([
                {neighbor: 'A', weight: 10},
                {neighbor: 'C', weight: 5}
            ]); // Neighbors of 'B' with weights
            expect(graph.getWeightedNeighbors?.('C')).toEqual([
                {neighbor: 'A', weight: 15},
                {neighbor: 'B', weight: 5}
            ]); // Neighbors of 'C' with weights
        });

        it('should return an empty array for a vertex with no neighbors', () => {
            graph.addVertex('D'); // Vertex 'D' with no edges
            expect(graph.getWeightedNeighbors?.('D')).toEqual([]); // No weighted neighbors for 'D'
        });

        it('should return an empty array for a non-existent vertex', () => {
            expect(graph.getWeightedNeighbors?.('E')).toEqual([]); // 'E' vertex does not exist, no weighted neighbors
        });
    });

    describe('hasEdge', () => {
        beforeEach(() => {
            graph.addVertex('A');
            graph.addVertex('B');
            graph.addVertex('C');
            graph.addEdge('A', 'B', 10);
            graph.addEdge('B', 'C', 5);
        });

        it('should return true if an edge exists', () => {
            expect(graph.hasEdge('A', 'B')).toBe(true);
            expect(graph.hasEdge('B', 'C')).toBe(true);
            expect(graph.hasEdge('B', 'A')).toBe(true); // Undirected graph - edge exists in both directions
            expect(graph.hasEdge('C', 'B')).toBe(true);
        });

        it('should return false if an edge does not exist', () => {
            expect(graph.hasEdge('A', 'C')).toBe(false); // No direct edge between A and C
            expect(graph.hasEdge('C', 'A')).toBe(false);
            expect(graph.hasEdge('A', 'A')).toBe(false); // No self-loop by default
            expect(graph.hasEdge('B', 'B')).toBe(false);
        });

        it('should return false for non-existent vertices (even if edge is checked)', () => {
            expect(graph.hasEdge('A', 'D')).toBe(false); // 'D' vertex does not exist
            expect(graph.hasEdge('D', 'A')).toBe(false);
            expect(graph.hasEdge('D', 'E')).toBe(false); // Both 'D' and 'E' do not exist
        });
    });

    describe('getNeighbors', () => {
        beforeEach(() => {
            graph.addVertex('A');
            graph.addVertex('B');
            graph.addVertex('C');
            graph.addVertex('D');
            graph.addEdge('A', 'B', 10);
            graph.addEdge('A', 'C', 15);
            graph.addEdge('B', 'C', 5);
        });

        it('should return neighbors of a vertex with neighbors', () => {
            expect(graph.getWeightedNeighbors('A')).toEqual([
                {
                    neighbor: "B",
                    weight: 10,
                },
                {
                    neighbor: "C",
                    weight: 15,
                },
            ]); // Neighbors of 'A' are 'B' and 'C' (order might vary depending on implementation)
            expect(graph.getWeightedNeighbors('B')).toEqual([
                {
                    neighbor: 'A',
                    weight: 10
                },
                {
                    neighbor: 'C',
                    weight: 5,
                }]);
            expect(graph.getWeightedNeighbors('C')).toEqual([{
                neighbor: 'A',
                weight: 15,
            }, {
                neighbor: 'B',
                weight: 5,
            }]);
        });

        it('should return an empty array for a vertex with no neighbors', () => {
            expect(graph.getWeightedNeighbors('D')).toEqual([]); // 'D' has no edges, no neighbors
        });

        it('should return an empty array for a non-existent vertex', () => {
            expect(graph.getWeightedNeighbors('E')).toEqual([]); // 'E' vertex does not exist, no neighbors
        });
    });

    describe('getVertices', () => {
        it('should return an empty array for a new graph', () => {
            expect(graph.getVertices()).toEqual([]);
        });

        it('should return all vertices in the graph', () => {
            graph.addVertex('A');
            graph.addVertex('B');
            graph.addVertex('C');
            expect(graph.getVertices()).toEqual(['A', 'B', 'C']); // Order might vary
        });
    });

    describe('size and isEmpty', () => {
        it('should be empty initially', () => {
            expect(graph.isEmpty()).toBe(true);
            expect(graph.size()).toBe(0);
        });

        it('should not be empty after adding vertices', () => {
            graph.addVertex('A');
            expect(graph.isEmpty()).toBe(false);
            expect(graph.size()).toBe(1);
            graph.addVertex('B');
            expect(graph.size()).toBe(2);
        });

        it('should be empty after clearing the graph', () => {
            graph.addVertex('A');
            graph.addVertex('B');
            graph.clear?.(); // Optional method call - use ?. to avoid error if not implemented
            expect(graph.isEmpty()).toBe(true);
            expect(graph.size()).toBe(0);
        });
    });

    describe('clear (Optional)', () => {
        it('should clear all vertices and edges from the graph', () => {
            graph.addVertex('A');
            graph.addVertex('B');
            graph.addEdge('A', 'B', 10);
            graph.clear?.(); // Optional method call
            expect(graph.isEmpty()).toBe(true);
            expect(graph.size()).toBe(0);
            expect(graph.getVertices()).toEqual([]);
            expect(graph.hasEdge('A', 'B')).toBe(false); // No edges after clear
        });

        it('should clear an already empty graph (no error)', () => {
            const emptyGraph = new WeightedAdjacencyListGraph();
            emptyGraph.clear?.(); // Clear already empty graph
            expect(emptyGraph.isEmpty()).toBe(true); // Should remain empty
            expect(emptyGraph.size()).toBe(0); // Size should remain 0
        });
    });
});