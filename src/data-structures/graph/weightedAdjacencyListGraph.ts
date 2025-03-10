import {IWeightedGraph} from "./types.ts";

/**
 * Weighted Edge (Relationship to a neighbor with an edge-weight).
 */
interface WeightedEdge<T> {
    /**
     * Neighbor of the Edge.
     */
    neighbor: T;

    /**
     * Weight of the edge to the neighbor.
     */
    weight: number;
}

export class WeightedAdjacencyListGraph<T> implements IWeightedGraph<T> {
    private verticesToListOfNeighbors: Map<T, WeightedEdge<T>[]>;

    constructor() {
        this.verticesToListOfNeighbors = new Map();
    }

    getWeightedNeighbors(vertex: T): WeightedEdge<T>[] {
        return this.verticesToListOfNeighbors.get(vertex) || [];
    }

    addVertex(vertex: T): void {
        this.verticesToListOfNeighbors.set(vertex, []);
    }

    addEdge(vertex1: T, vertex2: T, weight: number): void {
        if (!this.verticesToListOfNeighbors.has(vertex1) || !this.verticesToListOfNeighbors.has(vertex2)) {
            return; // either v1 or v2 is not valid.
        }

        const vertex1Neighbors = this.verticesToListOfNeighbors.get(vertex1);
        const vertex2Neighbors = this.verticesToListOfNeighbors.get(vertex2);

        //if v1 neighbors doesn't have v2, then add it.
        if (vertex1Neighbors !== undefined && !vertex1Neighbors.find(v => v === vertex2)) {
            vertex1Neighbors.push({
                neighbor: vertex2,
                weight,
            });
        }

        //if v2 neighbors doesn't have v1, then add it.
        if (vertex2Neighbors !== undefined && !vertex2Neighbors.find(v => v === vertex1)) {
            vertex2Neighbors.push({
                neighbor: vertex1,
                weight,
            });
        }
    }

    hasEdge(vertex1: T, vertex2: T): boolean {
        const neighbors = this.verticesToListOfNeighbors.get(vertex1);

        if (neighbors === undefined || neighbors.length === 0) {
            return false;
        }

        return neighbors.find(v => v.neighbor === vertex2) !== undefined;
    }

    getVertices(): T[] {
        return [...this.verticesToListOfNeighbors.keys()];
    }

    size(): number {
        return this.verticesToListOfNeighbors.size;
    }

    isEmpty(): boolean {
        return this.verticesToListOfNeighbors.size === 0;
    }

    clear(): void {
        this.verticesToListOfNeighbors = new Map();
    }

}