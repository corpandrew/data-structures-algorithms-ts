import {beforeEach, describe, expect, it} from "vitest";
import {IGraph} from "../../../src/data-structures/graph/types";
import {AdjacencyListGraph} from "../../../src/data-structures/graph/adjacencyListGraph";
import {breadthFirstSearch} from "../../../src/algorithms/search/breadthFirstSearch";


describe('Breadth First Search Traversal', () => {
    let graph: IGraph<string>; // Testing with string vertices

    beforeEach(() => {
        graph = new AdjacencyListGraph<string>(); // Instantiate your Graph implementation (AdjacencyListGraph or AdjacencyMatrixGraph)
        // Setup a sample graph for traversal tests
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

    it('should perform BFS traversal correctly starting from vertex A', () => {
        const bfsOrder = breadthFirstSearch(graph, 'A');
        expect(bfsOrder).toEqual(['A', 'B', 'C', 'D', 'E']); // Expected BFS order starting from 'A' (level by level)
    });

    it('should perform BFS traversal correctly starting from vertex B', () => {
        const bfsOrder = breadthFirstSearch(graph, 'B');
        expect(bfsOrder).toEqual(['B', 'A', 'D', 'C', 'E']); // Expected BFS order starting from 'B'
    });

    it('should perform BFS traversal correctly starting from vertex F (isolated vertex)', () => {
        const bfsOrder = breadthFirstSearch(graph, 'F');
        expect(bfsOrder).toEqual(['F']); // BFS from isolated vertex should only visit itself
    });

    it('should return an empty array for BFS traversal starting from a vertex not in the graph', () => {
        const bfsOrder = breadthFirstSearch(graph, 'G'); // 'G' is not in the graph
        expect(bfsOrder).toEqual([]); // BFS from non-existent vertex should return empty array
    });
});