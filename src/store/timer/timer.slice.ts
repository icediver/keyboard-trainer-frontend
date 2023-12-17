import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isTimerStarted: false,
};

export const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    startTimer: (state) => {
      state.isTimerStarted = true;
    },
    stopTimer: (state) => {
      state.isTimerStarted = false;
    },
  },
});
