/**
 * Problem: Find a Path in a Maze
 * You’re given a 2D grid representing a maze, where:
 *
 * 0 represents an open path.
 * 1 represents a wall.
 * You start at the top-left corner (0, 0) and need to find a path to the bottom-right corner (rows - 1, cols - 1).
 * You can move in four directions: up, down, left, right (no diagonals).
 * Using DFS, determine if there’s a valid path from the start to the end, and if so, return the path as an array of coordinates.
 *
 * Example Input:
 * [
 *   [0, 0, 1, 0],
 *   [1, 0, 0, 0],
 *   [0, 0, 1, 0],
 *   [0, 1, 0, 0]
 * ]
 *
 * Start: (0, 0)
 * End: (3, 3)
 *
 * Output:
 * [(0, 0), (0, 1), (1, 1), (1, 2), (1, 3), (2, 3), (3, 3)] (or another valid path)
 * Problem Details
 * Input: A 2D array maze of 0s and 1s, where maze[0][0] is the start and maze[rows-1][cols-1] is the end.
 * Output: An array of [row, col] coordinates representing a path from start to end, or null if no path exists.
 *
 * Constraints:
 * The maze is at least 1x1.
 * You can only move to adjacent cells (up, down, left, right) that are 0 and within bounds.
 */

export type Point = [number, number];
type PointString = `${number}, ${number}`;
const POSSIBLE_DIRECTIONS: Point[] = [[-1, 0], [1, 0], [0, 1], [0, -1]];

export function findPath(maze: number[][]): Point[] | null {
    const rows = maze.length;
    const cols = maze[0].length;

    const visited: Set<PointString> = new Set();
    const path: Point[] = [];


    function dfs(row: number, col: number): boolean {
        if (row < 0 || col < 0 || row >= rows || col >= cols || maze[row][col] === 1 || visited.has(`${row}, ${col}`)) {
            return false;
        }
        path.push([row, col]);
        visited.add(`${row}, ${col}`);

        //if we've reached the end
        if (row === rows - 1 && col === cols - 1) {
            return true;
        }

        for (const [dr, dc] of POSSIBLE_DIRECTIONS) {
            const newRow = row + dr;
            const newCol = col + dc;

            if (dfs(newRow, newCol)) {
                return true;
            }
        }

        path.pop();
        return false;
    }

    if (dfs(0, 0)) {
        return path;
    }

    return null;
}

export function printPath(maze: number[][], path: Point[]) {
    let printedMazePath = "";

    for (let row = 0; row < maze.length; row++) {
        for (let col = 0; col < maze.length; col++) {
            printedMazePath += " ";
            const isInPath = path.some(([r, c]) => r === row && c === col);
            if (isInPath) {
                printedMazePath += "*"
            } else {
                printedMazePath += maze[row][col]
            }

            printedMazePath += " ";
        }

        printedMazePath += "\n";
    }

    console.log(printedMazePath);
}