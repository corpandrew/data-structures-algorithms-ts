export function reverseString(s: string): string {
    let reversedString = "";
    for (let i = s.length - 1; i >= 0; i--) {
        reversedString += s[i];
    }

    return reversedString;
}

export function isPalindrome(s: string): boolean {
    let backPointer = s.length - 1;
    let forwardPointer = 0;

    while (backPointer >= forwardPointer) {
        if (s[backPointer] !== s[forwardPointer]) {
            return false;
        }

        backPointer--;
        forwardPointer++;
    }

    return true;
}

export function count(s: string, char: string) {
    let counter = 0;

    for (let i = 0; i < s.length; i++) {
        if (s[i] === char) {
            counter++;
        }
    }

    return counter;
}