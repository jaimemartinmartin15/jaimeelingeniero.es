/**
 * @param n maximum value in the array
 * @returns an array with numbers from 1 to n: [1, ... , n]
 */
 export const intervalArray = (n: number): number[] => {
    return Array.from({ length: n }, (_, i) => i + 1);
}