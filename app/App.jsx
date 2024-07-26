"use client";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import Nav from "./(components)/Nav/Nav";
import Footer from "./(components)/Footer/Footer";
import { useEffect } from "react";
import { logout } from "../lib/features/accountSlice";

const App = ({ children }) => {
  const dispatch = useDispatch();
  const exp = useSelector((state) => state.account.exp);
  useEffect(() => {
    if (!exp) return;
    try {
      if (new Date() > new Date(exp * 1000)) throw new Error("session expired");
    } catch (error) {
      if (error.message === "session expired")
        toast(
          <div>
            {"Sessione scaduta💨"}
            <br />
            {"Effettuare nuovamente il login!"}
          </div>,
          {
            theme: "light",
          }
        );
      dispatch(logout());
    }
  }, []);

  return (
    <>
      <div
        className={` w-full h-full flex flex-col xl:gap-14 gap-1 lg:gap-5 md:gap-5 items-center flex-grow overflow-y-auto bg-gradient-to-b from-bg1 to-bg2 bg-opacity-25 text-default-text relative`}
      >
        <Nav />
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
    </>
  );
};

export default App;
