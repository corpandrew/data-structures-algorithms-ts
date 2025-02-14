import {MyArray} from '../../../src/data-structures/array/array';
import {describe, expect, it} from "vitest";

describe('When using MyArray', () => {
    it('When adding elements, then it should be correctly set', () => {
        const arr = new MyArray<number>();
        arr.add(10);
        arr.add(20);
        expect(arr.get(0)).toBe(10);
        expect(arr.get(1)).toBe(20);
    });

    it("When removing items, then they should be correctly removed.", () => {
        const arr = new MyArray<number>();
        arr.setAt(0, 10);
        arr.setAt(1, 100);
        arr.setAt(10, 10000);

        expect(arr.get(0)).toBe(10);
        expect(arr.removeAt(0)).toBe(10);
        expect(arr.get(0)).toBe(100);
        expect(arr.length()).toBe(10);

        arr.print();
    });

});