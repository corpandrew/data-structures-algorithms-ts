// Problem: Given an array [1, 2, 3, 4, 5] and k = 3, find the maximum sum of any subarray of size 3.
export function maxFixedWindowSizeSubArray(nums: number[], size: number): number {
    if (nums.length < size) {
        return -1;
    }

    let windowSum = 0;
    for (let i = 0; i < size; i++) {
        windowSum += nums[i];
    }

    let maxSum = windowSum;

    for (let i = size; i < nums.length; i++) {
        windowSum = windowSum + nums[i] - nums[i - size];
        maxSum = Math.max(windowSum, maxSum);
    }

    return maxSum;
}

export function lengthOfLongestSubstringKDistinct(s: string, k: number): number {
    if (s.length === 0 || k < 0) {
        return 0;
    }

    let start = 0;
    let maxLen = 0;
    const distinctWindowCharacters = new Map<string, number>();

    for (let end = 0; end < s.length; end++) {
        distinctWindowCharacters.set(s[end], (distinctWindowCharacters.get(s[end]) ?? 0) + 1);

        while (distinctWindowCharacters.size > k) {
            const charAtStart = s[start];
            const count = distinctWindowCharacters.get(charAtStart)!;

            if (count === 1) {
                distinctWindowCharacters.delete(charAtStart);
            } else {
                distinctWindowCharacters.set(charAtStart, count - 1);
            }
            start++;
        }

        maxLen = Math.max(maxLen, end - start + 1);
    }

    return maxLen;
}