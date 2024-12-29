/**
 * Converts a number of seconds into a string formatted as "mm:ss".
 * Handles values greater than 60 seconds by converting them into minutes and seconds.
 *
 * @param {number} seconds - The number of seconds to format.
 * @returns {string} A string in the format "mm:ss".
 *
 * @example
 * formatTime(10); // Returns "00:10"
 * formatTime(80); // Returns "01:20"
 * formatTime(3670); // Returns "61:10"
 */
const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}`;
};

export { formatTime };
