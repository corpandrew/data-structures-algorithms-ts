export function factorial(n: number, depth: number = 0): number {
    const indent = "  ".repeat(depth);
    console.log(`${indent}Entering factorial(${n})`);

    if (n < 0) {
        console.log(`${indent}Returning -1 (invalid)`);
        return -1;
    }
    if (n === 0) {
        console.log(`${indent}Returning 1 (base case)`);
        return 1;
    }

    const result = n * factorial(n - 1, depth + 1);
    console.log(`${indent}Returning ${result} for factorial(${n})`);
    return result;
}