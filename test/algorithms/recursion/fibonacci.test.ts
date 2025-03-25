import {describe, expect, test} from "vitest";
import {fibonacci} from "../../../src/algorithms/recursion/fibonacci";

describe("Given you are testing fibonacci", () => {
    test("When calling with 6, then it returns 8", () => {
        expect(fibonacci(6)).toEqual(8);
    });

    test("When calling with 1, then it returns 1", () => {
        expect(fibonacci(1)).toEqual(1);
    });

    test("When calling with 0, then it returns 0", () => {
        expect(fibonacci(0)).toEqual(0);
    });

    test("When calling with -100, then it returns -1", () => {
        expect(fibonacci(-100)).toEqual(-1);
    });
});