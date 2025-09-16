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

/**
 * Applies a simple XOR cipher to a string with the given key.
 * Used for both encryption and decryption.
 *
 * @param text - The input string (JSON string)
 * @param key  - The secret key (string)
 * @returns The transformed string (Base64)
 */
const xorTransform = (text: string, key: string): string => {
  const textChars = Array.from(text);
  const keyChars = Array.from(key);

  const transformed = textChars.map((char, i) => {
    const textCode = char.codePointAt(0)!;
    const keyCode = keyChars[i % keyChars.length].codePointAt(0)!;
    return String.fromCodePoint(textCode ^ keyCode);
  });

  return btoa(transformed.join(""));
};

/**
 * Encrypts a JSON object into a base64 string using XOR cipher.
 *
 * @param data - The JSON object to encrypt
 * @param key  - The secret key (string)
 * @returns The encrypted string (base64)
 */
const encryptData = (data: object, key: string): string => {
  const jsonString = JSON.stringify(data);
  return xorTransform(jsonString, key);
};

/**
 * Decrypts a base64 string into a JSON object using XOR cipher.
 *
 * @param encryptedData - The encrypted string (base64)
 * @param key           - The secret key (string)
 * @returns The original JSON object
 */
const decryptData = <T = Record<string, unknown>>(
  encryptedData: string,
  key: string
): T => {
  const decoded = atob(encryptedData);
  const keyChars = Array.from(key);

  const restored = Array.from(decoded).map((char, i) => {
    const charCode = char.codePointAt(0)!;
    const keyCode = keyChars[i % keyChars.length].codePointAt(0)!;
    return String.fromCodePoint(charCode ^ keyCode);
  });

  return JSON.parse(restored.join(""));
};

export { normalizeLetter, encryptData, decryptData };
