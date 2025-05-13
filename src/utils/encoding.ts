import { SINGLE_LETTER_MAP, LETTER_GROUP_MAP } from "@/constants/wordMaps";

/**
 * Reverse mapping for letter groups and single letters.
 */
const reverseSyllableMap = Object.fromEntries(
  Object.entries(LETTER_GROUP_MAP).map(([key, value]) => [value, key])
);
const reverseLetterMap = Object.fromEntries(
  Object.entries(SINGLE_LETTER_MAP).map(([key, value]) => [value, key])
);

/**
 * Encrypts an array of words by concatenating them with a hyphen and encoding them.
 * It prioritizes encoding common letter groups and falls back to single letter-based encoding.
 *
 * @param {string[]} words - The array of words to encrypt.
 * @returns {string} - The encrypted string.
 */
const encryptStringArray = (words: string[]): string => {
  const concatenated = words.join("-");
  let encrypted = "";

  let i = 0;
  while (i < concatenated.length) {
    if (i < concatenated.length - 1) {
      const syllable = concatenated.substring(i, i + 2);
      if (LETTER_GROUP_MAP[syllable]) {
        encrypted += LETTER_GROUP_MAP[syllable];
        i += 2;
        continue;
      }
    }
    const letter = concatenated[i];
    encrypted += SINGLE_LETTER_MAP[letter] || letter;
    i++;
  }

  return encrypted;
};

/**
 * Decrypts an encoded string back to its original words.
 *
 * @param {string} encrypted - The encrypted string to decrypt.
 * @returns {string} - The decrypted string.
 */
const decryptString = (encrypted: string | null): string => {
  if (!encrypted) return "";

  let decrypted = "";
  let i = 0;
  while (i < encrypted.length) {
    const char = encrypted[i];
    if (reverseSyllableMap[char]) {
      decrypted += reverseSyllableMap[char];
    } else {
      decrypted += reverseLetterMap[char] || char;
    }
    i++;
  }

  return decrypted;
};

export { encryptStringArray, decryptString };
