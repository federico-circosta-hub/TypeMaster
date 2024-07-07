"use client";
import { I18nextProvider } from "react-i18next";
import { persistor, store } from "../lib/store";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import i18n from "./i18n";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App";

const AppWrapper = ({ children }) => {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <I18nextProvider i18n={i18n}>
            <App>{children}</App>
          </I18nextProvider>
        </PersistGate>
      </Provider>
    </>
  );
};

export default AppWrapper;
