import {describe, expect, it} from "vitest";
import {count, isPalindrome, reverseString} from "../src/algorithms/strings";

describe('When using strings', () => {
    it('Reversing', () => {
        expect(reverseString("hello")).toBe("olleh");
    });

    it("isPalindrome", () => {
        expect(isPalindrome("racecar")).toBeTruthy();

        expect(isPalindrome("poodawg")).toBeFalsy();
    });

    it("count", () => {
        expect(count("attempt", "t")).toBe(3);
    })

});