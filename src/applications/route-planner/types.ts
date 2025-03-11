import {IWeightedGraph} from "../../data-structures/graph/types.ts";

/**
 * Interface for a Route Planning Graph Application.
 * Defines the contract for an application built on a Weighted Graph to find shortest routes between locations.
 * @template Location The type representing a location (vertex) on the map.
 * @interface IRoutePlanner
 */
export interface IRoutePlanner<Location> {
    /**
     * Gets the underlying Weighted Graph data structure used by the Route Planning Application.
     * This is primarily for testing and inspection, not typically part of the core application interface.
     * @returns {IWeightedGraph<Location>} The Weighted Graph instance.
     * @memberof IRoutePlanner
     * @internal - Marked as internal as it's mainly for testing
     */
    getGraph(): IWeightedGraph<Location>;

    /**
     * Adds a location (vertex) to the route planning map.
     * @param {Location} location The location to add.
     * @returns {void}
     * @memberof IRoutePlanner
     */
    addLocation(location: Location): void;

    /**
     * Adds a road (weighted edge) between two locations on the map.
     * Road has a distance (weight). Assumes undirected roads (travel is possible in both directions).
     * @param {Location} location1 The first location.
     * @param {Location} location2 The second location.
     * @param {number} distance The distance (weight) of the road between the locations. Must be non-negative.
     * @returns {void}
     * @memberof IRoutePlanner
     */
    addRoad(location1: Location, location2: Location, distance: number): void;

    /**
     * Finds the shortest route (path) between two locations using Dijkstra's algorithm.
     * @param {Location} startLocation The starting location.
     * @param {Location} endLocation The destination location.
     * @returns {{ distance: number, path: Location[] } | undefined} An object containing the shortest distance and the path (array of locations) if a route exists, or undefined if no route is found.
     * @memberof IRoutePlanner
     */
    findShortestRoute(startLocation: Location, endLocation: Location): { distance: number, path: Location[] } | undefined;
}