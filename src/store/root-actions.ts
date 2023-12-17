import { pressedKeySlice } from "./pressed-key/pressedKey.slice";
import { timerSlice } from "./timer/timer.slice";
import * as userActions from "./user/user.actions";

export const rootActions = {
  ...userActions,
  ...timerSlice.actions,
  ...pressedKeySlice.actions,
};
