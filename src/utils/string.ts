/**
 * Normalizes a letter by removing any diacritical marks (accents).
 * Converts accented characters (e.g., "é", "à") to their form with grave accent (e.g., "è", "à").
 *
 * @param {string} letter - The input letter to be normalized.
 * @returns {string} The normalized letter without accents.
 *
 * @example
 * normalizeLetter("é"); // Returns "è"
 * normalizeLetter("à"); // Returns "à"
 * normalizeLetter("Z"); // Returns "Z"
 */
const normalizeLetter = (letter: string): string => {
  return letter
    .normalize("NFD")
    .replace(/[\u0301]/g, "̀")
    .replace(/[\u0302-\u036f]/g, "")
    .normalize("NFC");
};

export { normalizeLetter };
