import {describe, it, expect, beforeEach} from 'vitest';
import {IGraph} from "../../../src/data-structures/graph/types";
import {AdjacencyListGraph} from "../../../src/data-structures/graph/adjacencyListGraph";
import {depthFirstSearch} from "../../../src/algorithms/search/depthFirstSearch";

describe('Depth First Search Traversal', () => {
    let graph: IGraph<string>; // Testing with string vertices

    beforeEach(() => {
        graph = new AdjacencyListGraph<string>();
        graph.addVertex('A');
        graph.addVertex('B');
        graph.addVertex('C');
        graph.addVertex('D');
        graph.addVertex('E');
        graph.addVertex('F');
        graph.addEdge('A', 'B');
        graph.addEdge('A', 'C');
        graph.addEdge('B', 'D');
        graph.addEdge('C', 'E');
        // Graph Structure (Undirected):
        //     A --- B --- D
        //     |
        //     C --- E
        //     F (isolated)
    });

    describe('DFS Recursive', () => {
        it('should perform DFS traversal correctly (recursive) starting from vertex A', () => {
            const dfsOrder = depthFirstSearch(graph, 'A', 'recursive'); // Assuming 'recursive' option for recursive DFS
            expect(dfsOrder).toEqual(['A', 'C', 'E', 'B', 'D']); // Example DFS order starting from 'A' (recursive - order might vary slightly depending on implementation details of DFS)
        });

        it('should perform DFS traversal correctly (recursive) starting from vertex B', () => {
            const dfsOrder = depthFirstSearch(graph, 'B', 'recursive');
            expect(dfsOrder).toEqual(['B', 'D', 'A', 'C', 'E']); // Example DFS order starting from 'B' (recursive)
        });

        it('should perform DFS traversal correctly (recursive) starting from vertex F (isolated vertex)', () => {
            const dfsOrder = depthFirstSearch(graph, 'F', 'recursive');
            expect(dfsOrder).toEqual(['F']); // DFS from isolated vertex should only visit itself
        });
    });

    describe('DFS Iterative', () => {
        it('should perform DFS traversal correctly (iterative) starting from vertex A', () => {
            const dfsOrder = depthFirstSearch(graph, 'A', 'iterative'); // Assuming 'iterative' option for iterative DFS
            expect(dfsOrder).toEqual(['A', 'C', 'E', 'B', 'D']); // Example DFS order starting from 'A' (iterative - order might vary slightly)
        });

        it('should perform DFS traversal correctly (iterative) starting from vertex B', () => {
            const dfsOrder = depthFirstSearch(graph, 'B', 'iterative');
            expect(dfsOrder).toEqual(['B', 'D', 'A', 'C', 'E']); // Example DFS order starting from 'B' (iterative)
        });

        it('should perform DFS traversal correctly (iterative) starting from vertex F (isolated vertex)', () => {
            const dfsOrder = depthFirstSearch(graph, 'F', 'iterative');
            expect(dfsOrder).toEqual(['F']); // DFS from isolated vertex should only visit itself
        });
    });

    it('should return an empty array for DFS traversal starting from a vertex not in the graph', () => {
        const bfsOrder = depthFirstSearch(graph, 'G', 'recursive'); // 'G' is not in the graph
        expect(bfsOrder).toEqual([]); // DFS from non-existent vertex should return empty array
        const dfsOrderIterative = depthFirstSearch(graph, 'G', 'iterative');
        expect(dfsOrderIterative).toEqual([]); // Iterative DFS as well
    });
});