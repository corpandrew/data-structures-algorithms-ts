import {describe, expect, test} from "vitest";
import {sumTo} from "../../../src/algorithms/recursion/sumTo";

describe("Given you are testing sumTo", () => {
    test("When calling with 6, then it returns 21", () => {
        expect(sumTo(6)).toEqual(21);
    });

    test("When calling with 1, then it returns 1", () => {
        expect(sumTo(1)).toEqual(1);
    });

    test("When calling with 0, then it returns 0", () => {
        expect(sumTo(0)).toEqual(0);
    });

    test("When calling with -100, then it returns -1", () => {
        expect(sumTo(-100)).toEqual(0);
    });
});