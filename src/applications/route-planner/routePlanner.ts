import {IWeightedGraph} from "../../data-structures/graph/types.ts";
import {WeightedAdjacencyListGraph} from "../../data-structures/graph/weightedAdjacencyListGraph.ts";
import {dijkstra} from "../../algorithms/search/dijkstra.ts";
import {IRoutePlanner} from "./types.ts";

export class RoutePlanner<Location> implements IRoutePlanner<Location> {
    private graph: IWeightedGraph<Location>;

    constructor() {
        this.graph = new WeightedAdjacencyListGraph<Location>();
    }

    getGraph(): IWeightedGraph<Location> {
        return this.graph;
    }

    addLocation(location: Location): void {
        this.graph.addVertex(location);
    }

    addRoad(location1: Location, location2: Location, distance: number): void {
        this.graph.addEdge(location1, location2, distance);
    }

    findShortestRoute(startLocation: Location, endLocation: Location): {
        distance: number;
        path: Location[];
    } | undefined {
        const distancesFromStartLocation = dijkstra<Location>(this.graph, startLocation);
        const distanceToEndLocation = distancesFromStartLocation.get(endLocation);

        return {
            distance: distanceToEndLocation?.distance ?? Number.POSITIVE_INFINITY,
            path: distanceToEndLocation?.path ?? [],
        }
    }

}