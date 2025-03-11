import { describe, it, expect, beforeEach } from 'vitest';
import {IWeightedGraph} from "../../../src/data-structures/graph/types";
import {WeightedAdjacencyListGraph} from "../../../src/data-structures/graph/weightedAdjacencyListGraph";
import {dijkstra} from "../../../src/algorithms/search/dijkstra";

describe('Dijkstra Algorithm', () => {
    let graph: IWeightedGraph<string>;

    beforeEach(() => {
        graph = new WeightedAdjacencyListGraph<string>();
    });

    it('should return correct shortest distances and paths for a simple graph', () => {
        graph.addVertex('A');
        graph.addVertex('B');
        graph.addVertex('C');
        graph.addVertex('D');
        graph.addEdge('A', 'B', 4);
        graph.addEdge('A', 'C', 2); // A-C = 2, C-B = 1, B-D = 5
        graph.addEdge('B', 'D', 5);
        graph.addEdge('C', 'B', 1);
        graph.addEdge('C', 'D', 8);

        const distances = dijkstra(graph, 'A');

        expect(distances.get('A')).toEqual({ distance: 0, path: ['A'] });
        expect(distances.get('B')).toEqual({ distance: 3, path: ['A', 'C', 'B'] }); // A-C-B (2+1=3)
        expect(distances.get('C')).toEqual({ distance: 2, path: ['A', 'C'] }); // A-C (2)
        expect(distances.get('D')).toEqual({ distance: 8, path: ['A', 'C', 'B', 'D'] }); // A-C-B-D (2+1+5=8)
        expect(distances.get('E')).toBe(undefined); // E not in graph
    });

    it('should return correct shortest distances and paths for a graph with a longer path as the shortest', () => {
        graph.addVertex('S');
        graph.addVertex('A');
        graph.addVertex('B');
        graph.addVertex('C');
        graph.addEdge('S', 'A', 10);
        graph.addEdge('S', 'C', 3);
        graph.addEdge('A', 'B', 1);
        graph.addEdge('B', 'C', 1);

        const distances = dijkstra(graph, 'S');

        expect(distances.get('S')).toEqual({ distance: 0, path: ['S'] }); // S->S = 0
        expect(distances.get('A')).toEqual({ distance: 5, path: ['S', 'C', 'B', 'A'] }); // S->C->B->A (3+1+1=5)
        expect(distances.get('B')).toEqual({ distance: 4, path: ['S', 'C', 'B'] }); // S->C->B (3+1=4)
        expect(distances.get('C')).toEqual({ distance: 3, path: ['S', 'C'] }); // S->C (3)
        expect(distances.get('D')).toBe(undefined); // D not in graph
    });

    it('should handle a graph with no edges (distances to all vertices except start should be Infinity)', () => {
        graph.addVertex('A');
        graph.addVertex('B');
        graph.addVertex('C');

        const distances = dijkstra(graph, 'A');

        expect(distances.get('A')).toEqual({ distance: 0, path: ['A'] });
        expect(distances.get('B')).toEqual({ distance: Number.POSITIVE_INFINITY, path: [] }); // No path from A to B
        expect(distances.get('C')).toEqual({ distance: Number.POSITIVE_INFINITY, path: [] }); // No path from A to C
    });

    it('should handle a graph with a single vertex (distance to itself is 0)', () => {
        graph.addVertex('A');
        const distances = dijkstra(graph, 'A');
        expect(distances.get('A')).toEqual({ distance: 0, path: ['A'] }); // Distance from A to A is 0
    });

    it('should handle an empty graph (return empty distances map)', () => {
        const emptyGraph = new WeightedAdjacencyListGraph<string>();
        const distances = dijkstra(emptyGraph, 'A');
        expect(distances.size).toBe(0); // Empty graph, start vertex not present, returns empty map
    });

    it('should handle a start vertex that is not in the graph (return empty distances map)', () => {
        graph.addVertex('A');
        graph.addVertex('B');
        const distances = dijkstra(graph, 'C'); // 'C' is not in the graph
        expect(distances.size).toBe(0); // Start vertex not present, returns empty map
    });

    it('should work correctly with vertices of different types (example: number vertices)', () => {
        const numberGraph = new WeightedAdjacencyListGraph<number>();
        numberGraph.addVertex(1);
        numberGraph.addVertex(2);
        numberGraph.addVertex(3);
        numberGraph.addEdge(1, 2, 5);
        numberGraph.addEdge(1, 3, 10);
        numberGraph.addEdge(2, 3, 2);

        const distances = dijkstra(numberGraph, 1);

        expect(distances.get(1)).toEqual({ distance: 0, path: [1] });
        expect(distances.get(2)).toEqual({ distance: 5, path: [1, 2] }); // 1->2 (5)
        expect(distances.get(3)).toEqual({ distance: 7, path: [1, 2, 3] }); // 1->2->3 (5+2=7)
    });

    it('should handle disconnected components - distances to unreachable components should be Infinity', () => {
        graph.addVertex('A');
        graph.addVertex('B');
        graph.addVertex('C');
        graph.addVertex('D');
        graph.addVertex('E'); // Vertex 'E' is in a separate component
        graph.addEdge('A', 'B', 1);
        graph.addEdge('B', 'C', 1);

        const distances = dijkstra(graph, 'A');

        expect(distances.get('A')).toEqual({ distance: 0, path: ['A'] });
        expect(distances.get('B')).toEqual({ distance: 1, path: ['A', 'B'] }); // A->B (1)
        expect(distances.get('C')).toEqual({ distance: 2, path: ['A', 'B', 'C'] }); // A->B->C (1+1=2)
        expect(distances.get('D')).toEqual({ distance: Number.POSITIVE_INFINITY, path: [] }); // Unreachable
        expect(distances.get('E')).toEqual({ distance: Number.POSITIVE_INFINITY, path: [] }); // Unreachable
    });
});