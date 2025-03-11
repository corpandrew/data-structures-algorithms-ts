import {IWeightedGraph} from "../../data-structures/graph/types.ts";
import {MinHeap} from "../../data-structures/heap/min/minHeap.ts";

interface VertexDistance<V> {
    vertex: V;
    distance: number;
}

interface DistanceAndPath<V> {
    distance: number;
    path: V[]
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
export function dijkstra<V>(graph: IWeightedGraph<V>, startVertex: V): Map<V, DistanceAndPath<V>> {
    if (!graph.getVertices().includes(startVertex)) {
        return new Map();
    }

    const distances = new Map<V, DistanceAndPath<V>>();
    const verticesToCalculateDistanceFor = graph.getVertices();
    const verticesVisited = new Set<V>();

    //initialize distances, 0 for start, Infinity for all others.
    for (const vertex of verticesToCalculateDistanceFor) {
        distances.set(vertex, {
            distance: vertex === startVertex ? 0 : Number.POSITIVE_INFINITY,
            path: vertex === startVertex ? [startVertex] : []
        });
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
        const currentDistanceAndPath = distances.get(currVertex.vertex)!;
        //get the neighbors of the current vertex
        const neighbors = graph.getWeightedNeighbors(currVertex.vertex);
        //loop through the weighted edges of the neighbors (vertex/weight to vertices).
        for (const neighborEdge of neighbors) {
            //get the current distance to the neighbor.
            const distanceToNeighbor = distances.get(neighborEdge.neighbor)!;
            const newDistance = currVertex.distance + neighborEdge.weight;
            //if the current vertex's distance + the distance (weight) to the neighbor is less than the current distance to the neighbor
            if (newDistance < distanceToNeighbor.distance) {
                //update the distance to be the current vertex's distance + the edges distance.
                distances.set(neighborEdge.neighbor, {
                    distance: newDistance,
                    path: [...currentDistanceAndPath.path, neighborEdge.neighbor]
                });
                //then add the new node into the min heap.
                vertexMinHeap.insert({
                    vertex: neighborEdge.neighbor,
                    distance: newDistance
                });
            }
        }
    }

    return distances;
}
