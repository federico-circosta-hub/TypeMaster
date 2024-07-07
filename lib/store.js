import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import currentStatsReducer from "../lib/features/currentStatsSlice";
import accountReducer from "../lib/features/accountSlice";
import { scoreApi } from "../app/services/scoreApi";
import { authApi } from "../app/services/authApi";

const accountPersistConfig = {
  key: "account",
  storage,
};

const persistedAccountReducer = persistReducer(
  accountPersistConfig,
  accountReducer
);

const rootReducer = combineReducers({
  account: persistedAccountReducer,
  currentStats: currentStatsReducer,
  [scoreApi.reducerPath]: scoreApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      scoreApi.middleware,
      scoreApi.middleware,
      authApi.middleware,
      authApi.middleware
    ),
});

export const persistor = persistStore(store);
