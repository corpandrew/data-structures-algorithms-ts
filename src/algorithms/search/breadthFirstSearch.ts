import {IGraph} from "../../data-structures/graph/types.ts";
import {Queue} from "../../data-structures/queue/queue.ts";

export function breadthFirstSearch<T>(graph: IGraph<T>, startVertex: T): T[] {
    if (!graph.getVertices().includes(startVertex)) {
        return [];
    }

    const nodesToExplore = new Queue<T>();
    const visitedVertices = new Set<T>();
    const nodesExplored: T[] = [];

    nodesToExplore.enqueue(startVertex);
    visitedVertices.add(startVertex);

    while (!nodesToExplore.isEmpty()) {
        const currVertex = nodesToExplore.dequeue();
        if (currVertex === undefined) {
            continue;
        }

        nodesExplored.push(currVertex);
        const neighbors = graph.getNeighbors(currVertex);
        for (const neighbor of neighbors) {
            if (!visitedVertices.has(neighbor)) {
                visitedVertices.add(neighbor);
                nodesToExplore.enqueue(neighbor)
            }
        }
    }

    return [...nodesExplored];
}