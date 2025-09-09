import { APP_NAME_SHORT } from "./app";

const lowercaseAppName = APP_NAME_SHORT.toLowerCase();

// TODO: add typization for the values stored in localStorage
const LS_KEY_LIST = {
  GAME_MODE: `${lowercaseAppName}GameMode`,
  READ_NEWS: `${lowercaseAppName}ReadNews`,
  SOUNDS: `${lowercaseAppName}Sounds`,
  THEME: `${lowercaseAppName}Theme`,
  USER_DATA: `${lowercaseAppName}UserData`,
} as const;

export { LS_KEY_LIST };
