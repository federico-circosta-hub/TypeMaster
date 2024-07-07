import { createSlice } from "@reduxjs/toolkit";

const currentStatsSlice = createSlice({
  name: "currentStats",
  initialState: {
    currentSentence: "",
    keyPressCounter: 0,
    keyPerMinute: 0,
    score: 0,
    accuracy: 0,
    errorsCounter: 0,
    time: {
      timer: 0,
      isRunning: false,
    },
    isCurrentScoreSaved: false,
    /* sentences: [
      "Una frase incredibilmente molto lunga tipo questa qui",
      "Questa frase anche non è affatto male",
      "Ottimo! Questa frase ha proprio dell'incredibile",
      "Tale frase ha un non so che di importante da esprimere",
    ], */
    sentences: [
      "aa",
      "bbb",
      "cc",
      "Due elementi devono quindi essere sradicati una volta per tutte: la paura della sofferenza futura e il ricordo della sofferenza passata; poiché il secondo non mi riguarda più, e il primo non mi riguarda ancora.",
    ],
    restarter: 0,
  },
  reducers: {
    restart: (state) => {
      state.score = 0;
      state.currentSentence = "";
      state.keyPressCounter = 0;
      state.accuracy = 0;
      state.errorsCounter = 0;
      state.keyPerMinute = 0;
      state.time = { timer: 0, isRunning: false };
      state.restarter += 1;
      state.isCurrentScoreSaved = false;
    },
    startTimer: (state) => {
      state.time.isRunning = true;
    },
    stopTimer: (state) => {
      state.time.isRunning = false;
    },
    incrementTimer: (state) => {
      state.time.timer += 1;
    },
    increaseKeyPressCounter: (state) => {
      state.keyPressCounter += 1;
    },
    increaseErrorsCounter: (state) => {
      state.errorsCounter += 1;
    },
    updateComplexStats: (state, action) => {
      const { accuracy, keyPerMinute, score } = action.payload;
      state.score = score;
      state.accuracy = accuracy;
      state.keyPerMinute = keyPerMinute;
    },
    saveScore: (state) => {
      state.isCurrentScoreSaved = true;
    },
  },
});
const { actions, reducer } = currentStatsSlice;
export const {
  restart,
  increaseKeyPressCounter,
  increaseErrorsCounter,
  incrementTimer,
  startTimer,
  stopTimer,
  updateComplexStats,
  saveScore,
} = actions;
export default reducer;
