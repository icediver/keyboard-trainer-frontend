import { createSlice } from "@reduxjs/toolkit";
import { IPressedKey } from "./pressedKey.interface";

const initialState: IPressedKey = {
  pressedKey: {
    code: "",
    key: "",
  },
};

export const pressedKeySlice = createSlice({
  name: "pressedKey",
  initialState,
  reducers: {
    setPressedKey: (state, action) => {
      state.pressedKey = action.payload;
    },
    resetPressedKey: () => {},
  },
});
