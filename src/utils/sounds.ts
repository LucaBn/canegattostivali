// Utils
import { readFromLocalStorage } from "@/utils/localStorage";

// Constants
import { LS_KEY_LIST } from "@/constants/localStorage";

/**
 * Plays an audio file from the given source path.
 *
 * This utility creates a new `HTMLAudioElement` for each call, resets its playback
 * position to the beginning, and attempts to play it. Errors related to autoplay
 * restrictions or user interaction requirements are silently ignored.
 *
 * @param {string} src - The path or URL of the audio file to play.
 */
export function playSound(src: string) {
  const storedSounds: boolean | null = readFromLocalStorage(LS_KEY_LIST.SOUNDS);

  if (storedSounds) {
    try {
      const audio = new Audio(src);
      audio.currentTime = 0;
      audio.play().catch(() => {
        //
      });
    } catch (e) {
      console.error("Error:", e);
    }
  }
}
