import { configureStore } from "@reduxjs/toolkit";
import currentStatsReducer from "../lib/features/currentStatsSlice";
import accountReducer from "../lib/features/accountSlice";
import { scoreApi } from "../app/services/scoreApi";
import { authApi } from "../app/services/authApi";

export const store = configureStore({
  reducer: {
    account: accountReducer,
    currentStats: currentStatsReducer,
    [scoreApi.reducerPath]: scoreApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      scoreApi.middleware,
      scoreApi.middleware,
      authApi.middleware,
      authApi.middleware
    ),
});
