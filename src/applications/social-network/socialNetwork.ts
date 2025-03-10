import {IGraph} from "../../data-structures/graph/types.ts";
import {ISocialNetworkGraphApplication} from "./types.ts";
import {AdjacencyListGraph} from "../../data-structures/graph/adjacencyListGraph.ts";
import {breadthFirstSearch} from "../../algorithms/search/breadthFirstSearch.ts";
import {depthFirstSearchRecursive} from "../../algorithms/search/depthFirstSearch.ts";

export class SocialNetwork<T> implements ISocialNetworkGraphApplication<T> {
    private socialNetworkGraph: IGraph<T>;

    constructor() {
        this.socialNetworkGraph = new AdjacencyListGraph<T>();
    }

    getGraph(): IGraph<T> {
        return this.socialNetworkGraph;
    }

    addPerson(person: T): void {
        this.socialNetworkGraph.addVertex(person);
    }

    addFriendship(person1: T, person2: T): void {
        this.socialNetworkGraph.addEdge(person1, person2);
    }

    areConnected(person1: T, person2: T, traversalType?: "bfs" | "dfs"): boolean {
        if (traversalType === "bfs") {
            return breadthFirstSearch(this.socialNetworkGraph, person1).includes(person2);
        }

        return depthFirstSearchRecursive(this.socialNetworkGraph, person1).includes(person2);
    }

}