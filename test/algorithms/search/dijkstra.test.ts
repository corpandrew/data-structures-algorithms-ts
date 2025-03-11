import { describe, it, expect, beforeEach } from 'vitest';
import {IWeightedGraph} from "../../../src/data-structures/graph/types";
import {WeightedAdjacencyListGraph} from "../../../src/data-structures/graph/weightedAdjacencyListGraph";
import {dijkstra} from "../../../src/algorithms/search/dijkstra";

describe('Dijkstra Algorithm', () => {
    let graph: IWeightedGraph<string>;

    beforeEach(() => {
        graph = new WeightedAdjacencyListGraph<string>(); // Or use AdjacencyMatrixGraphWeighted for testing
    });

    it('should return correct shortest distances for a simple graph', () => {
        graph.addVertex('A');
        graph.addVertex('B');
        graph.addVertex('C');
        graph.addVertex('D');
        graph.addEdge('A', 'B', 4);
        graph.addEdge('A', 'C', 2);//A-C = 2, C-B = 1, B-D = 5
        graph.addEdge('B', 'D', 5);
        graph.addEdge('C', 'B', 1);
        graph.addEdge('C', 'D', 8);

        const distances = dijkstra(graph, 'A');

        expect(distances.get('A')).toBe(0); // Distance from A to A is 0
        expect(distances.get('B')).toBe(3); // Shortest path A-C-B (2+1=3)
        expect(distances.get('C')).toBe(2); // Shortest path A-C (2)
        expect(distances.get('D')).toBe(8); // Shortest path A-C-B-D (2+1+5=8)
        expect(distances.get('E')).toBe(undefined);
    });

    it('should return correct shortest distances for a graph with a longer path as the shortest', () => {
        graph.addVertex('S');
        graph.addVertex('A');
        graph.addVertex('B');
        graph.addVertex('C');
        graph.addEdge('S', 'A', 10);
        graph.addEdge('S', 'C', 3);
        graph.addEdge('A', 'B', 1);
        graph.addEdge('B', 'C', 1);

        const distances = dijkstra(graph, 'S');

        expect(distances.get('S')).toBe(0);// S->S = 0
        expect(distances.get('A')).toBe(5);// S->C=3, C->B=1, B->A=1
        expect(distances.get('B')).toBe(4); // Shortest path S-C-B (3+1=4)
        expect(distances.get('C')).toBe(3); // Shortest path S-C (3)
        expect(distances.get('D')).toBe(undefined);
    });

    it('should handle a graph with no edges (distances to all vertices except start should be Number.POSITIVE_INFINITY)', () => {
        graph.addVertex('A');
        graph.addVertex('B');
        graph.addVertex('C');

        const distances = dijkstra(graph, 'A');

        expect(distances.get('A')).toBe(0);
        expect(distances.get('B')).toBe(Number.POSITIVE_INFINITY); // No path from A to B
        expect(distances.get('C')).toBe(Number.POSITIVE_INFINITY); // No path from A to C
    });

    it('should handle a graph with a single vertex (distance to itself is 0)', () => {
        graph.addVertex('A');
        const distances = dijkstra(graph, 'A');
        expect(distances.get('A')).toBe(0); // Distance from A to A is 0
    });

    it('should handle an empty graph (return empty distances map or map with start vertex and distance 0 - adjust assertion based on your expected behavior for empty graph)', () => {
        const emptyGraph = new WeightedAdjacencyListGraph<string>(); // Create an empty graph
        const distances = dijkstra(emptyGraph, 'A'); // Dijkstra on empty graph - starting from 'A' which is also not in graph, but Dijkstra should handle gracefully.
        expect(distances.size).toBe(0); // Or adjust assertion to check for specific behavior in empty graph case - e.g., if it returns a map with only startVertex and distance Number.POSITIVE_INFINITY, or empty map. This test expects empty map for empty graph and non-existent start vertex.
    });

    it('should handle a start vertex that is not in the graph (return empty distances map or map with start vertex and distance Number.POSITIVE_INFINITY - adjust assertion based on your expected behavior)', () => {
        graph.addVertex('A');
        graph.addVertex('B');
        const distances = dijkstra(graph, 'C'); // 'C' is not in the graph
        expect(distances.size).toBe(0); // Or adjust assertion based on your expected behavior for non-existent start vertex - e.g., if it returns a map with only startVertex and distance Number.POSITIVE_INFINITY, or empty map. This test expects empty map for non-existent start vertex.
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

        expect(distances.get(1)).toBe(0);
        expect(distances.get(2)).toBe(5);
        expect(distances.get(3)).toBe(7); // Shortest path 1-2-3 (5+2=7)
    });

    it('should handle disconnected components - distances to unreachable components should be Number.POSITIVE_INFINITY', () => {
        graph.addVertex('A');
        graph.addVertex('B');
        graph.addVertex('C');
        graph.addVertex('D');
        graph.addVertex('E'); // Vertex 'E' is in a separate component
        graph.addEdge('A', 'B', 1);
        graph.addEdge('B', 'C', 1);
        // 'E' is disconnected

        const distances = dijkstra(graph, 'A');

        expect(distances.get('A')).toBe(0);
        expect(distances.get('B')).toBe(1);
        expect(distances.get('C')).toBe(2);
        expect(distances.get('D')).toBe(Number.POSITIVE_INFINITY); // Vertex 'D' was never connected, should be Number.POSITIVE_INFINITY
        expect(distances.get('E')).toBe(Number.POSITIVE_INFINITY); // Vertex 'E' is in a separate component, should be Number.POSITIVE_INFINITY
    });
});