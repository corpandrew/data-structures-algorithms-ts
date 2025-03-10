import {IGraph} from "../../data-structures/graph/types.ts";
import {Stack} from "../../data-structures/stack/stack.ts";

export function depthFirstSearch<T>(graph: IGraph<T>, startVertex: T, mode: "recursive" | "iterative"): T[] {
    return mode === "recursive"
        ? depthFirstSearchRecursive(graph, startVertex)
        : depthFirstSearchIterative(graph, startVertex);
}

export function depthFirstSearchIterative<T>(graph: IGraph<T>, startVertex: T): T[] {
    if (!graph.getVertices().includes(startVertex)) {
        return [];
    }

    const nodesToExplore = new Stack<T>();
    const visitedVertices = new Set<T>();
    const nodesExplored: T[] = [];

    nodesToExplore.push(startVertex);
    visitedVertices.add(startVertex);

    while (!nodesToExplore.isEmpty()) {
        const currVertex = nodesToExplore.pop();
        if (currVertex === undefined) {
            continue;
        }

        nodesExplored.push(currVertex);
        const neighbors = graph.getNeighbors(currVertex);
        for (const neighbor of neighbors) {
            if (!visitedVertices.has(neighbor)) {
                visitedVertices.add(neighbor);
                nodesToExplore.push(neighbor)
            }
        }
    }

    return [...nodesExplored];
}

function recursiveDepthFirst<T>(graph: IGraph<T>, currVertex: T | undefined, nodesToExplore: Stack<T>, nodesExplored: T[], verticesVisited: Set<T>) {
    if (nodesToExplore.isEmpty() || currVertex === undefined) {
        return;
    }

    verticesVisited.add(currVertex);
    nodesExplored.push(currVertex)
    const neighbors = graph.getNeighbors(currVertex);
    for (const neighbor of neighbors) {
        if (!verticesVisited.has(neighbor)) {
            nodesToExplore.push(neighbor);
        }
    }

    const nextVertex = nodesToExplore.pop();
    return recursiveDepthFirst(graph, nextVertex, nodesToExplore, nodesExplored, verticesVisited);
}

export function depthFirstSearchRecursive<T>(graph: IGraph<T>, startVertex: T): T[] {
    if (!graph.getVertices().includes(startVertex)) {
        return [];
    }

    const nodesToExplore = new Stack<T>();
    const visitedVertices = new Set<T>();
    const nodesExplored: T[] = [];

    nodesToExplore.push(startVertex);
    visitedVertices.add(startVertex);

    recursiveDepthFirst(graph, startVertex, nodesToExplore, nodesExplored, visitedVertices);
    return nodesExplored;
}