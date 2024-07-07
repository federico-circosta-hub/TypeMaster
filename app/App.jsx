"use client";
import { I18nextProvider } from "react-i18next";
import { Bounce, ToastContainer } from "react-toastify";
import { persistor, store } from "../lib/store";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import Nav from "./(components)/Nav/Nav";
import Footer from "./(components)/Footer/Footer";
import i18n from "./i18n";
import { PersistGate } from "redux-persist/integration/react";

const App = ({ children }) => {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <I18nextProvider i18n={i18n}>
            <Nav />
            <div
              className={`px-10 w-full h-full flex flex-col xl:gap-14 sm:gap-1 lg:gap-5 md:gap-5 items-center flex-grow overflow-y-auto bg-gradient-to-b from-bg1 to-bg2 bg-opacity-25 text-default-text relative`}
            >
              <ToastContainer
                position="top-center"
                autoClose={4000}
                theme="colored"
                closeOnClick
                newestOnTop
                limit={3}
                transition={Bounce}
              />
              {children}
              <Footer />
            </div>
          </I18nextProvider>
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
