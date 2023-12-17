import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistStore,
} from "redux-persist";

import { userSlice } from "./user/user.slice";
import { timerSlice } from "./timer/timer.slice";
import { pressedKeySlice } from "./pressed-key/pressedKey.slice";

const isClient = typeof window !== "undefined";

const combinedReducers = combineReducers({
  user: userSlice.reducer,
  timer: timerSlice.reducer,
  pressedKey: pressedKeySlice.reducer,
});

let mainReducer = combinedReducers;

if (isClient) {
  const { persistReducer } = require("redux-persist");
  const storage = require("redux-persist/lib/storage").default;

  const persistConfig = {
    key: "keyboard-trainer",
    storage,
    whitelist: ["pressedKey"],
  };

  mainReducer = persistReducer(persistConfig, combinedReducers);
}

export const store = configureStore({
  reducer: mainReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type TypeRootState = ReturnType<typeof mainReducer>;
