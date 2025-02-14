import {MyArray} from '../../../src/data-structures/array/array';
import {describe, expect, it} from "vitest";

describe('When Linear Searching MyArray', () => {
    it('When element is in the array, then the index is returned', () => {
        const arr = new MyArray<number>([10, 20, 30, 40]);

        expect(arr.linearSearch(30)).toBe(2);
    });

    it('When element isn\'t in the array, then -1 is returned', () => {
        const arr = new MyArray<number>([10, 20, 30, 40]);
        
        expect(arr.linearSearch(50)).toBe(-1);
    });

});