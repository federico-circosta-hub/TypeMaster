import { createSlice } from "@reduxjs/toolkit";

const accountSlice = createSlice({
  name: "account",
  initialState: {
    jwt: "",
    username: "",
    userId: "",
    userColor: "",
    exp: "",
    persistedLang: "it",
  },
  reducers: {
    setUser: (state, action) => {
      const { jwt, username, userId, usercolor, exp } = action.payload;
      state.jwt = jwt;
      state.username = username;
      state.userId = userId;
      state.userColor = usercolor;
      state.exp = exp;
    },
    logout: (state) => {
      state.jwt = "";
      state.username = "";
      state.userId = "";
      state.userColor = "";
      state.exp = "";
    },
    setPersistedLanguage: (state, action) => {
      state.persistedLang = action.payload;
    },
  },
});
const { actions, reducer } = accountSlice;
export const { setUser, logout, setPersistedLanguage } = actions;
export default reducer;
