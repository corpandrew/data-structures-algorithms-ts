import {MyArray} from "../../data-structures/array/array.ts";

export function linearSearch<T>(arr: MyArray<T>, value: T): number {
    for (let i = 0; i < arr.length(); i++) {
        if (arr.get(i) === value) {
            return i;
        }
    }

    return -1;
}