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
    sentences: {
      it: [
        "Ci sono due grandi tragedie nella vita: una è non ottenere ciò che si vuole, l'altra è ottenerlo.",
        "Ogni volta che la gente è d'accordo con me provo la sensazione di avere torto.",
        "Conversare sul tempo è l'ultimo rifugio di chi non ha immaginazione.",
        "Adoro i piaceri semplici. Sono l'ultimo rifugio delle persone complicate.",
        "Alcuni portano la felicità ovunque vadano. Altri quando se ne vanno.",
      ],
      en: [
        "There are only two tragedies in life: one is not getting what one wants, and the other is getting it.",
        "Whenever people agree with me I always feel I must be wrong.",
        "Conversation about the weather is the last refuge of the unimaginative.",
        "I adore simple pleasures. They are the last refuge of the complex.",
        "Some cause happiness wherever they go; others whenever they go.",
      ],
    },
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
