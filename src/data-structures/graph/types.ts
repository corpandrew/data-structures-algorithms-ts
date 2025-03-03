/**
 * Interface for a generic Graph data structure.
 * Defines the basic graph operations, independent of specific representations (Adjacency Matrix, Adjacency List).
 * @template V The type of vertices in the graph.
 * @interface IGraph
 */
export interface IGraph<V> {
    /**
     * Adds a vertex to the graph.
     * @param {V} vertex The vertex to add.
     * @returns {void}
     * @memberof IGraph
     */
    addVertex(vertex: V): void;

    /**
     * Adds an edge between two vertices in the graph.
     * For an undirected graph, this adds an edge in both directions (vertex1 to vertex2 and vertex2 to vertex1).
     * @param {V} vertex1 The first vertex of the edge.
     * @param {V} vertex2 The second vertex of the edge.
     * @returns {void}
     * @memberof IGraph
     */
    addEdge(vertex1: V, vertex2: V): void;

    /**
     * Checks if an edge exists between two vertices in the graph.
     * @param {V} vertex1 The first vertex to check.
     * @param {V} vertex2 The second vertex to check.
     * @returns {boolean} True if an edge exists between vertex1 and vertex2, false otherwise.
     * @memberof IGraph
     */
    hasEdge(vertex1: V, vertex2: V): boolean;

    /**
     * Gets a list of neighbors (adjacent vertices) for a given vertex.
     * @param {V} vertex The vertex to get neighbors for.
     * @returns {V[]} An array of vertices that are neighbors of the given vertex. Returns an empty array if the vertex has no neighbors or if the vertex is not in the graph.
     * @memberof IGraph
     */
    getNeighbors(vertex: V): V[];

    /**
     * Gets a list of all vertices in the graph.
     * @returns {V[]} An array of all vertices in the graph.
     * @memberof IGraph
     */
    getVertices(): V[];

    /**
     * Gets the number of vertices in the graph.
     * @returns {number} The number of vertices in the graph.
     * @memberof IGraph
     */
    size(): number;

    /**
     * Checks if the graph is empty (contains no vertices).
     * @returns {boolean} True if the graph is empty, false otherwise.
     * @memberof IGraph
     */
    isEmpty(): boolean;

    /**
     * Clears all vertices and edges from the graph, making it empty.
     * @returns {void}
     * @memberof IGraph
     */
    clear(): void;
}