import { isValidParenthesis } from '../../../src/algorithms/stack/isValidParenthesis'; // Adjust path to your isValidParentheses function
import { describe, it, expect } from 'vitest';

describe('isValidParentheses', () => {
    it('should return true for an empty string', () => {
        expect(isValidParenthesis('')).toBe(true);
    });

    it('should return true for valid single pair parentheses', () => {
        expect(isValidParenthesis('()')).toBe(true);
        expect(isValidParenthesis('[]')).toBe(true);
        expect(isValidParenthesis('{}')).toBe(true);
    });

    it('should return true for valid nested parentheses', () => {
        expect(isValidParenthesis('(())')).toBe(true);
        expect(isValidParenthesis('[{}]')).toBe(true);
        expect(isValidParenthesis('{{}}')).toBe(true);
        expect(isValidParenthesis('([{}])')).toBe(true);
        expect(isValidParenthesis('([]{})')).toBe(true);
    });

    it('should return true for valid mixed parentheses', () => {
        expect(isValidParenthesis('()[]{}')).toBe(true);
        expect(isValidParenthesis('([]){}')).toBe(true);
        expect(isValidParenthesis('{([])}')).toBe(true);
        expect(isValidParenthesis('({[]})')).toBe(true);
    });

    it('should return false for invalid unmatched opening parentheses', () => {
        expect(isValidParenthesis('(')).toBe(false);
        expect(isValidParenthesis('[')).toBe(false);
        expect(isValidParenthesis('{')).toBe(false);
        expect(isValidParenthesis('(((')).toBe(false);
        expect(isValidParenthesis('[[[')).toBe(false);
        expect(isValidParenthesis('{{{')).toBe(false);
        expect(isValidParenthesis('(}')).toBe(false); // Mismatched closing
        expect(isValidParenthesis('([)')).toBe(false); // Mismatched closing nested
    });

    it('should return false for invalid unmatched closing parentheses', () => {
        expect(isValidParenthesis(')')).toBe(false);
        expect(isValidParenthesis(']')).toBe(false);
        expect(isValidParenthesis('}')).toBe(false);
        expect(isValidParenthesis(')))')).toBe(false);
        expect(isValidParenthesis(']]]')).toBe(false);
        expect(isValidParenthesis('}}}')).toBe(false);
    });

    it('should return false for invalid incorrect order of parentheses', () => {
        expect(isValidParenthesis('}{')).toBe(false);
        expect(isValidParenthesis('][')).toBe(false);
        expect(isValidParenthesis(')(')).toBe(false);
        expect(isValidParenthesis('([)]')).toBe(false); // Incorrect nesting order
        expect(isValidParenthesis('{()}')).toBe(true); // Correct nesting order
        expect(isValidParenthesis('{(])}')).toBe(false); // Incorrect nesting order
    });

    it('should return true for strings with other characters besides parentheses', () => {
        expect(isValidParenthesis('a(b)c')).toBe(true);
        expect(isValidParenthesis('d[e]f')).toBe(true);
        expect(isValidParenthesis('g{h}i')).toBe(true);
        expect(isValidParenthesis('j(k[l{m}n]o)p')).toBe(true);
        expect(isValidParenthesis('text with (parentheses) and [brackets] and {braces}')).toBe(true);
    });

    it('should return false for invalid parentheses mixed with other characters', () => {
        expect(isValidParenthesis('a(bc')).toBe(false);
        expect(isValidParenthesis('d[ef}')).toBe(false);
        expect(isValidParenthesis('g{hi]')).toBe(false);
        expect(isValidParenthesis('j(k[l}m]o)p')).toBe(false); // Mismatched brace inside brackets
    });

    it('should handle long valid parentheses strings', () => {
        const longValidString = '()'.repeat(1000) + '[]'.repeat(500) + '{}'.repeat(250);
        expect(isValidParenthesis(longValidString)).toBe(true);
    });

    it('should handle long invalid parentheses strings', () => {
        const longInvalidString = '('.repeat(1000) + ')'.repeat(999); // One extra opening parenthesis
        expect(isValidParenthesis(longInvalidString)).toBe(false);
    });
});