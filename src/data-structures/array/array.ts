import {linearSearch} from "../../algorithms/searching/linear.ts";

/**
 * Rough implementation of a wrapping array. Pretty simple...
 */
export class MyArray<T> {
    private array: T[];

    public constructor(array: T[] = []) {
        this.array = array;
    }

    // Overload signatures (no implementation here)
    public add(items: T[]): void;
    public add(item: T): void;

    // Implementation signature (must be compatible with all overload signatures)
    public add(itemOrItems: T | T[]): void {
        if (Array.isArray(itemOrItems)) {
            this.array.push(...itemOrItems);
        } else {
            this.array.push(itemOrItems);
        }
    }

    public get(index: number): T | undefined {
        return this.array[index];
    }

    public print(): void {
        console.log(this.array);
    }

    public setAt(index: number, value: T): void {
        this.array[index] = value;
    }

    public removeAt(index: number): T {
        return this.array.splice(index, 1)[0];
    }

    public length(): number {
        return this.array.length;
    }

    /**
     * Returns the index of the value or -1 if not found.
     *
     * @param value to search for.
     */
    public linearSearch(value: T): number {
        return linearSearch(this, value);
    }

    [Symbol.iterator](): Iterator<T> {
        let index = 0;
        const data = this.array;

        return {
            next(): IteratorResult<T> {
                if (index < data.length) {
                    return { value: data[index++], done: false };
                }

                return { value: undefined, done: true };
            }
        }
    }
}