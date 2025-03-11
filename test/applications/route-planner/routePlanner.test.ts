import { describe, it, expect, beforeEach } from 'vitest';
import {RoutePlanner} from "../../../src/applications/route-planner/routePlanner";
import {IRoutePlanner} from "../../../src/applications/route-planner/types";

describe('RoutePlanner', () => {
    let routePlanner: IRoutePlanner<string>; // Testing with string location names

    beforeEach(() => {
        routePlanner = new RoutePlanner<string>(); // Instantiate your RoutePlanner implementation
    });

    describe('addLocation', () => {
        it('should add a location to the map', () => {
            routePlanner.addLocation('Location A');
            expect(routePlanner.getGraph().size()).toBe(1);
            expect(routePlanner.getGraph().getVertices()).toContain('Location A');
        });

        it('should add multiple locations to the map', () => {
            routePlanner.addLocation('Location A');
            routePlanner.addLocation('Location B');
            routePlanner.addLocation('Location C');
            expect(routePlanner.getGraph().size()).toBe(3);
            expect(routePlanner.getGraph().getVertices()).toEqual(expect.arrayContaining(['Location A', 'Location B', 'Location C']));
        });
    });

    describe('addRoad', () => {
        beforeEach(() => {
            routePlanner.addLocation('Location A');
            routePlanner.addLocation('Location B');
            routePlanner.addLocation('Location C');
        });

        it('should add a road between two locations with a given distance', () => {
            routePlanner.addRoad('Location A', 'Location B', 10);
            expect(routePlanner.getGraph().hasEdge('Location A', 'Location B')).toBe(true);
            // You could add more specific checks here if you add methods to retrieve edge weights in your IWeightedGraph interface and implementation.
        });

        it('should add multiple roads with different distances', () => {
            routePlanner.addRoad('Location A', 'Location B', 10);
            routePlanner.addRoad('Location B', 'Location C', 5);
            routePlanner.addRoad('Location C', 'Location A', 15);
            expect(routePlanner.getGraph().hasEdge('Location A', 'Location B')).toBe(true);
            expect(routePlanner.getGraph().hasEdge('Location B', 'Location C')).toBe(true);
            expect(routePlanner.getGraph().hasEdge('Location C', 'Location A')).toBe(true);
        });
    });

    describe('findShortestRoute', () => {
        beforeEach(() => {
            routePlanner.addLocation('A');
            routePlanner.addLocation('B');
            routePlanner.addLocation('C');
            routePlanner.addLocation('D');
            routePlanner.addLocation('E');
            routePlanner.addRoad('A', 'B', 4);
            routePlanner.addRoad('A', 'C', 2);
            routePlanner.addRoad('B', 'D', 5);
            routePlanner.addRoad('C', 'B', 1);
            routePlanner.addRoad('C', 'D', 8);
            routePlanner.addLocation('F'); // Vertex F is disconnected
        });

        it('should find the shortest route between two connected locations', () => {
            const route = routePlanner.findShortestRoute('A', 'D');
            expect(route).toBeDefined();
            expect(route?.distance).toBe(8); // Shortest distance should be 8 (A-C-B-D)
            expect(route?.path).toEqual(['A', 'C', 'B', 'D']); // Shortest path should be A-C-B-D
        });

        it('should return undefined if no route exists between two locations', () => {
            const route = routePlanner.findShortestRoute('A', 'F'); // 'F' is disconnected from 'A'
            expect(route).toEqual({
                distance: Number.POSITIVE_INFINITY,
                path: []
            }); // Should return undefined for no route
        });

        it('should return a route with distance 0 and path containing only the start location if start and end locations are the same', () => {
            const route = routePlanner.findShortestRoute('A', 'A');
            expect(route).toBeDefined();
            expect(route?.distance).toBe(0); // Distance to itself should be 0
            expect(route?.path).toEqual(['A']); // Path should just be the start location
        });

        it('should return undefined if start location does not exist', () => {
            const route = routePlanner.findShortestRoute('G', 'D'); // 'G' location does not exist
            expect(route).toEqual({
                distance: Number.POSITIVE_INFINITY,
                path: [],
            });
        });

        it('should return undefined if end location does not exist', () => {
            const route = routePlanner.findShortestRoute('A', 'G'); // 'G' location does not exist
            expect(route).toEqual({
                distance: Number.POSITIVE_INFINITY,
                path: [],
            });
        });
    });
});