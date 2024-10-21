/**
 * Randomly shuffles the elements of an array.
 * This function uses the `Array.prototype.sort` method with a comparator
 * that returns a random value to shuffle the array.
 *
 * @template T
 * @param {T[]} array - The array of elements to shuffle.
 * @returns {T[]} - The shuffled array.
 *
 * @example
 * const numbers = [1, 2, 3, 4];
 * const shuffledNumbers = shuffle(numbers);
 * console.log(shuffledNumbers); // Example output: [3, 1, 4, 2]
 *
 * const letters = ['A', 'B', 'C', 'D'];
 * const shuffledLetters = shuffle(letters);
 * console.log(shuffledLetters); // Example output: ['C', 'A', 'D', 'B']
 */
const shuffle = <T>(array: T[]): T[] => {
  return array.sort(() => Math.random() - 0.5);
};

export { shuffle };
