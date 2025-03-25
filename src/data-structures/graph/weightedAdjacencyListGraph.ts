import {IWeightedEdge, IWeightedGraph} from "./types.ts";

export class WeightedAdjacencyListGraph<T> implements IWeightedGraph<T> {
    private verticesToListOfNeighbors: Map<T, IWeightedEdge<T>[]>;

    constructor() {
        this.verticesToListOfNeighbors = new Map();
    }

    getWeightedNeighbors(vertex: T): IWeightedEdge<T>[] {
        return this.verticesToListOfNeighbors.get(vertex) || [];
    }

    addVertex(vertex: T): void {
        this.verticesToListOfNeighbors.set(vertex, []);
    }

    addEdge(vertex1: T, vertex2: T, weight?: number): void {
        if (!this.verticesToListOfNeighbors.has(vertex1) || !this.verticesToListOfNeighbors.has(vertex2)) {
            return; // either v1 or v2 is not valid.
        }

        const vertex1Neighbors = this.verticesToListOfNeighbors.get(vertex1);
        const vertex2Neighbors = this.verticesToListOfNeighbors.get(vertex2);

        //if v1 neighbors doesn't have v2, then add it.
        if (vertex1Neighbors !== undefined && !vertex1Neighbors.find(v => v.neighbor === vertex2)) {
            vertex1Neighbors.push({ neighbor: vertex2, weight: weight ?? 0 });
        }

        //if v2 neighbors doesn't have v1, then add it.
        if (vertex2Neighbors !== undefined && !vertex2Neighbors.find(v => v.neighbor === vertex1)) {
            vertex2Neighbors.push({ neighbor: vertex1, weight: weight ?? 0 });
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

    getNeighbors(vertex: T): T[] {
        return [...(this.verticesToListOfNeighbors?.get(vertex) ?? []).map(edge => edge.neighbor)];
    }

}