import {describe, expect, test} from "vitest";
import {factorial} from "../../../src/algorithms/recursion/factorial";

describe("Given you are testing factorial", () => {
    test("When calling factorial with 5, then it returns 120", () => {
        expect(factorial(5)).toEqual(120);
    });

    test("When calling factorial with 1, then it returns 1", () => {
        expect(factorial(1)).toEqual(1);
    });

    test("When calling factorial with -100, then it returns -1", () => {
        expect(factorial(-100)).toEqual(-1);
    });

    test("When calling factorial with 0, then it returns 0", () => {
        expect(factorial(0)).toEqual(-0);
    });
});