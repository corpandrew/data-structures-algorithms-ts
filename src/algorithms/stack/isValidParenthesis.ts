import {Stack} from "../../data-structures/stack/stack.ts";

const PARENTHESIS_MAPPING = new Map([
    [")", "("],
    ["]", "["],
    ["}", "{"],
]);

const PARENTHESIS = ["(", "[", "{"];

export function isValidParenthesis(s: string): boolean {
    const stack = new Stack<string>();

    for (const character of s) {
       if (PARENTHESIS.includes(character)) {
           stack.push(character);
           continue;
       }

       if (PARENTHESIS_MAPPING.has(character)) {
           if (PARENTHESIS_MAPPING.get(character) !== stack.peek()) {
               return false;
           }
           stack.pop();
       }
    }

    return stack.isEmpty();
}