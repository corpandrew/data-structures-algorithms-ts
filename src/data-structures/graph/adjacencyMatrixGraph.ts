import {IGraph} from "./types.ts";

/**
 * Graph using an adjacency matrix to store associations of vertices.
 * T = Type of Vertex
 */
export class AdjacencyMatrixGraph<T> implements IGraph<T> {
    private adjacencyMatrix: number[][]; // 2D array to store adjacency matrix (using numbers 0 and 1 for unweighted)
    private vertices: T[] = [];       // Array to store vertices in order of indices
    private vertexIndexMap: Map<T, number> = new Map(); // Map to translate vertex value to matrix index

    constructor() {
        this.adjacencyMatrix = [];
        this.vertices = []
        this.vertexIndexMap = new Map();
    }

    addVertex(vertex: T): void {
        if (this.vertexIndexMap.has(vertex)) {
            return; //ignore dupes
        }

        this.vertices.push(vertex);
        const index = this.vertices.length - 1;
        this.vertexIndexMap.set(vertex, index);

        if (this.adjacencyMatrix.length > 0) {
            for (let i = 0; i < this.adjacencyMatrix.length; i++) {
                this.adjacencyMatrix[i].push(0);
            }
        }
        this.adjacencyMatrix[index] = new Array(index).fill(0);
    }

    addEdge(vertex1: T, vertex2: T): void {
        const vertex1Index = this.vertexIndexMap.get(vertex1);
        const vertex2Index = this.vertexIndexMap.get(vertex2);

        if (vertex1Index === undefined || vertex2Index === undefined) {
            return;
        }

        this.adjacencyMatrix[vertex1Index][vertex2Index] = 1;
        this.adjacencyMatrix[vertex2Index][vertex1Index] = 1;
    }

    hasEdge(vertex1: T, vertex2: T): boolean {
        const vertex1Index = this.vertexIndexMap.get(vertex1);
        const vertex2Index = this.vertexIndexMap.get(vertex2);

        if (vertex1Index === undefined || vertex2Index === undefined) {
            return false;
        }

        return this.adjacencyMatrix[vertex1Index][vertex2Index] === 1;
    }

    getNeighbors(vertex: T): T[] {
        const vertexIndex = this.vertexIndexMap.get(vertex);

        if (vertexIndex === undefined) {
            return [];
        }

        //loop through matrix[vIndex]
        //if == 1, push to list vertices[index]

        const neighbors = [];

        for (let i = 0; i < this.adjacencyMatrix[vertexIndex].length; i++) {
            if (this.adjacencyMatrix[vertexIndex][i] === 1) {
                neighbors.push(this.vertices[i]);
            }
        }

        return neighbors;
    }

    getVertices(): T[] {
        return this.vertices;
    }

    size(): number {
        return this.vertices.length;
    }

    isEmpty(): boolean {
        return this.vertices.length === 0;
    }

    clear(): void {
        this.adjacencyMatrix = [];
        this.vertices = []
        this.vertexIndexMap = new Map();
    }

}