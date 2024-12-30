/**
 * Normalizes a letter by removing any diacritical marks (accents).
 * Converts accented characters (e.g., "é", "à") to their base form (e.g., "e", "a").
 *
 * @param {string} letter - The input letter to be normalized.
 * @returns {string} The normalized letter without accents.
 *
 * @example
 * normalizeLetter("é"); // Returns "e"
 * normalizeLetter("à"); // Returns "a"
 * normalizeLetter("Z"); // Returns "Z"
 */
const normalizeLetter = (letter: string): string => {
  return letter.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

export { normalizeLetter };
