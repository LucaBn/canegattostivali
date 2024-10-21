/**
 * Returns a random integer between the specified minimum and maximum values, inclusive.
 * This function first ensures that the minimum value is rounded up and the maximum value is
 * rounded down to the nearest integers, and then generates a random integer between them.
 *
 * @param {number} min - The minimum value (inclusive). This value will be rounded up if it's not an integer.
 * @param {number} max - The maximum value (inclusive). This value will be rounded down if it's not an integer.
 * @returns {number} - A random integer between the `min` and `max`, inclusive.
 *
 * @example
 * const randomInt = getRandomIntInclusive(1, 10);
 * console.log(randomInt); // Example output: 4
 *
 * const anotherRandomInt = getRandomIntInclusive(5.2, 9.8);
 * console.log(anotherRandomInt); // Example output: 7
 */
const getRandomIntInclusive = (min: number, max: number): number => {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
};

export { getRandomIntInclusive };
