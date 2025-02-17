/**
 * Returns a random integer between the specified minimum and maximum values.
 * This function first ensures that the minimum and maximum values are rounded accordingly,
 * and then generates a random integer between them.
 *
 * @param {number} min - The minimum value. This value will be adjusted based on `inclusiveMin`.
 * @param {number} max - The maximum value. This value will be adjusted based on `inclusiveMax`.
 * @param {boolean} [inclusiveMin=true] - Whether the range should be inclusive of `min`.
 * @param {boolean} [inclusiveMax=true] - Whether the range should be inclusive of `max`.
 * @returns {number} - A random integer between the `min` and `max`, inclusive or exclusive based on the flags.
 *
 * @example
 * const randomInt = getRandomInt(1, 10); // Default is inclusive min and max
 * console.log(randomInt); // Example output: 4
 *
 * const exclusiveRandomInt = getRandomInt(1, 10, false, false); // Exclusive min and max
 * console.log(exclusiveRandomInt); // Example output: 3
 */
const getRandomInt = (
  min: number,
  max: number,
  inclusiveMin: boolean = true,
  inclusiveMax: boolean = true
): number => {
  const minAdjusted = inclusiveMin ? Math.ceil(min) : Math.ceil(min) + 1;
  const maxAdjusted = inclusiveMax ? Math.floor(max) : Math.floor(max) - 1;
  return Math.floor(
    Math.random() * (maxAdjusted - minAdjusted + 1) + minAdjusted
  );
};

export { getRandomInt };
