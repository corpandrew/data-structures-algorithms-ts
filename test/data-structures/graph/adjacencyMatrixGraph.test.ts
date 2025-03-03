import { IGraph } from '../../../src/data-structures/graph/types';
import { AdjacencyMatrixGraph } from '../../../src/data-structures/graph/AdjacencyMatrixGraph';
import { describe, it, expect, beforeEach } from 'vitest';

describe('Graph (Abstract)', () => { // Abstract test suite - should work for any IGraph implementation
    let graph: IGraph<string>; // Use the interface type, testing with string vertices

    beforeEach(() => {
        graph = new AdjacencyMatrixGraph<string>(); // Instantiate your Graph implementation (AdjacencyMatrixGraph or AdjacencyListGraph) - start with AdjacencyMatrix for initial tests
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
            expect(graph.getVertices()).toEqual(['A', 'B', 'C']); // Order might not be guaranteed, depending on implementation, but should contain all vertices
        });

        it('should handle adding duplicate vertices (typically ignored - adjust test if your implementation handles differently)', () => {
            graph.addVertex('A');
            graph.addVertex('A'); // Add duplicate
            expect(graph.size()).toBe(1); // Size should remain 1 if duplicates are ignored
            expect(graph.getVertices()).toEqual(['A']);
        });
    });

    describe('addEdge', () => {
        beforeEach(() => {
            graph.addVertex('A');
            graph.addVertex('B');
            graph.addVertex('C');
        });

        it('should add an edge between two vertices', () => {
            graph.addEdge('A', 'B');
            expect(graph.hasEdge('A', 'B')).toBe(true); // Edge should exist A->B
            expect(graph.hasEdge('B', 'A')).toBe(true); // Edge should exist B->A (undirected graph)
        });

        it('should add multiple edges', () => {
            graph.addEdge('A', 'B');
            graph.addEdge('B', 'C');
            graph.addEdge('C', 'A');
            expect(graph.hasEdge('A', 'B')).toBe(true);
            expect(graph.hasEdge('B', 'C')).toBe(true);
            expect(graph.hasEdge('C', 'A')).toBe(true);
        });

        it('should handle adding an edge to a non-existent vertex (behavior depends on implementation - adjust test)', () => {
            graph.addEdge('A', 'D'); // 'D' vertex not added yet
            expect(graph.hasEdge('A', 'D')).toBe(false); // Edge should not exist
            expect(graph.getNeighbors('A')).toEqual([]); // Neighbors of 'A' should not include 'D'
        });

        it('should handle adding a self-loop edge (edge to itself)', () => {
            graph.addEdge('A', 'A'); // Self-loop on 'A'
            expect(graph.hasEdge('A', 'A')).toBe(true); // Self-loop should exist
            expect(graph.getNeighbors('A')).toContain('A'); // 'A' should be neighbor of itself
        });

        it('should handle adding duplicate edges (typically ignored - adjust test if your implementation handles differently)', () => {
            graph.addEdge('A', 'B');
            graph.addEdge('A', 'B'); // Add duplicate edge
            expect(graph.hasEdge('A', 'B')).toBe(true); // Edge should still exist
            // For Adjacency Matrix, duplicate edge addition usually has no effect.
            // For Adjacency List, it should not add duplicate entries in neighbor lists. (More detailed test needed for Adjacency List if you want to verify no duplicate neighbors)
        });
    });

    describe('hasEdge', () => {
        beforeEach(() => {
            graph.addVertex('A');
            graph.addVertex('B');
            graph.addVertex('C');
            graph.addEdge('A', 'B');
            graph.addEdge('B', 'C');
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
            graph.addEdge('A', 'B');
            graph.addEdge('A', 'C');
            graph.addEdge('B', 'C');
        });

        it('should return neighbors of a vertex with neighbors', () => {
            expect(graph.getNeighbors('A')).toEqual(['B', 'C']); // Neighbors of 'A' are 'B' and 'C' (order might vary depending on implementation)
            expect(graph.getNeighbors('B')).toEqual(['A', 'C']); // Neighbors of 'B' are 'A' and 'C'
            expect(graph.getNeighbors('C')).toEqual(['A', 'B']); // Neighbors of 'C' are 'A' and 'B'
        });

        it('should return an empty array for a vertex with no neighbors', () => {
            expect(graph.getNeighbors('D')).toEqual([]); // 'D' has no edges, no neighbors
        });

        it('should return an empty array for a non-existent vertex', () => {
            expect(graph.getNeighbors('E')).toEqual([]); // 'E' vertex does not exist, no neighbors
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
            graph.addEdge('A', 'B');
            graph.clear?.(); // Optional method call
            expect(graph.isEmpty()).toBe(true);
            expect(graph.size()).toBe(0);
            expect(graph.getVertices()).toEqual([]);
            expect(graph.hasEdge('A', 'B')).toBe(false); // No edges after clear
        });

        it('should clear an already empty graph (no error)', () => {
            const emptyGraph = new AdjacencyMatrixGraph<string>();
            emptyGraph.clear?.(); // Clear already empty graph
            expect(emptyGraph.isEmpty()).toBe(true); // Should remain empty
            expect(emptyGraph.size()).toBe(0); // Size should remain 0
        });
    });
});