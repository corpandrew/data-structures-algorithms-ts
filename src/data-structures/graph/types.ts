/**
 * Weighted Edge (Relationship to a neighbor with an edge-weight).
 */
export interface IWeightedEdge<T> {
    /**
     * Neighbor of the Edge.
     */
    neighbor: T;

    /**
     * Weight of the edge to the neighbor.
     */
    weight: number;
}

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

/**
 * Interface for a generic Weighted Graph data structure.
 * Defines graph operations for weighted edges.
 * @template V The type of vertices in the graph.
 * @interface IWeightedGraph // Renamed interface to IWeightedGraph to indicate weighted nature
 * @extends {IGraph<V>} // You could extend the unweighted IGraph, or define methods directly
 */
export interface IWeightedGraph<V> extends IGraph<V> { // Renamed interface to IWeightedGraph
    /**
     * Adds a vertex to the graph.
     * @param {V} vertex The vertex to add.
     * @returns {void}
     * @memberof IWeightedGraph
     */
    addVertex(vertex: V): void;

    /**
     * Adds a weighted edge between two vertices in the graph.
     * For an undirected weighted graph, this adds a weighted edge in both directions (vertex1 to vertex2 and vertex2 to vertex1).
     * @param {V} vertex1 The first vertex of the edge.
     * @param {V} vertex2 The second vertex of the edge.
     * @param {number} weight The weight of the edge.
     * @returns {void}
     * @memberof IWeightedGraph
     */
    addEdge(vertex1: V, vertex2: V): void;
    addEdge(vertex1: V, vertex2: V, weight: number): void;

    /**
     * Checks if an edge exists between two vertices in the graph.
     * @param {V} vertex1 The first vertex to check.
     * @param {V} vertex2 The second vertex to check.
     * @returns {boolean} True if an edge exists between vertex1 and vertex2, false otherwise.
     * @memberof IWeightedGraph
     */
    hasEdge(vertex1: V, vertex2: V): boolean; // Remains the same - just checks for edge existence

    /**
     * Gets a list of neighbors (adjacent vertices) along with the weight of the edge to each neighbor.
     * @param {V} vertex The vertex to get weighted neighbors for.
     * @returns {Array<{neighbor: V, weight: number}>} An array of objects, each containing a neighbor vertex and the edge weight.
     * @memberof IWeightedGraph
     */
    getWeightedNeighbors(vertex: V): Array<IWeightedEdge<V>>;

    /**
     * Gets a list of all vertices in the graph.
     * @returns {V[]} An array of all vertices in the graph.
     * @memberof IWeightedGraph
     */
    getVertices(): V[];

    /**
     * Gets the number of vertices in the graph.
     * @returns {number} The number of vertices in the graph.
     * @memberof IWeightedGraph
     */
    size(): number;

    /**
     * Checks if the graph is empty (contains no vertices).
     * @returns {boolean} True if the graph is empty, false otherwise.
     * @memberof IWeightedGraph
     */
    isEmpty(): boolean;

    /**
     * Clears all vertices and edges from the graph, making it empty.
     * @returns {void}
     * @memberof IWeightedGraph
     */
    clear(): void;
}