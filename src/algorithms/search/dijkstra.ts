import {IWeightedGraph} from "../../data-structures/graph/types.ts";
import {MinHeap} from "../../data-structures/heap/min/minHeap.ts";

interface VertexDistance<V> {
    vertex: V;
    distance: number;
}

/**
 * Computes the shortest distances from a starting vertex to all other vertices in a weighted graph using Dijkstra's algorithm.
 * Assumes non-negative edge weights.
 * @template V The type of vertices in the graph.
 * @param {IWeightedGraph<V>} graph The weighted graph to perform Dijkstra's algorithm on.
 * @param {V} startVertex The vertex to start the shortest path calculation from.
 * @returns {Map<V, number>} A Map where keys are vertices in the graph and values are the shortest distances from the startVertex to each vertex.
 *   Vertices not reachable from the startVertex will have a distance of Infinity in the map.
 */
export function dijkstra<V>(graph: IWeightedGraph<V>, startVertex: V): Map<V, number> {
    if (!graph.getVertices().includes(startVertex)) {
        return new Map();
    }

    const distances = new Map<V, number>();
    const verticesToCalculateDistanceFor = graph.getVertices();
    const verticesVisited = new Set<V>();

    //initialize distances, 0 for start, Infinity for all others.
    for (const vertex of verticesToCalculateDistanceFor) {
        if (startVertex === vertex) {
            distances.set(startVertex, 0);
        } else {
            distances.set(vertex, Number.POSITIVE_INFINITY);
        }
    }

    // Use a MinHeap for efficient min-vertex-extraction
    const vertexMinHeap = new MinHeap<VertexDistance<V>>((a, b) => a.distance - b.distance);
    vertexMinHeap.insert({
        vertex: startVertex,
        distance: 0,
    });

    while (!vertexMinHeap.isEmpty()) {
        const currVertex = vertexMinHeap.extractMin();
        //if visited, move to next.
        if (currVertex === undefined || verticesVisited.has(currVertex.vertex)) {
            continue;
        }

        //mark as visited
        verticesVisited.add(currVertex.vertex);
        //get the neighbors of the current vertex
        const neighbors = graph.getWeightedNeighbors(currVertex.vertex);
        //loop through the weighted edges of the neighbors (vertex/weight to vertices).
        for (const neighborEdge of neighbors) {
            //get the current distance to the neighbor.
            const distanceToNeighbor = distances.get(neighborEdge.neighbor);
            //if the current vertex's distance + the distance (weight) to the neighbor is less than the current distance to the neighbor
            if (currVertex.distance + neighborEdge.weight < (distanceToNeighbor ?? Number.POSITIVE_INFINITY)) {
                //update the distance to be the current vertex's distance + the edges distance.
                distances.set(neighborEdge.neighbor, currVertex.distance + neighborEdge.weight);
                //then add the new node into the min heap.
                vertexMinHeap.insert({
                    vertex: neighborEdge.neighbor,
                    distance: currVertex.distance + neighborEdge.weight
                });
            }
        }
    }

    return distances;
}
