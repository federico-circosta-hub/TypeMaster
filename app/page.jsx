"use client";
import { useDispatch } from "react-redux";
import ControlPanel from "./(components)/SentenceButtons/ControlPanel";
import Statistics from "./(components)/Statistics";
import UserInput from "./(components)/UserInput";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { setUser } from "../lib/features/accountSlice";
import { toast } from "react-toastify";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    try {
      const lsAccount = JSON.parse(localStorage.getItem("account"));
      const decodedJWT = jwtDecode(lsAccount.jwt);
      if (new Date() > new Date(decodedJWT.exp * 1000))
        throw new Error("session expired");
      dispatch(setUser({ jwt: lsAccount.jwt, ...decodedJWT }));
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
    }
  }, []);

  return (
    <>
      <div className="w-11/12">
        <Statistics />
      </div>
      <div className="w-11/12 h-60 relative">
        <UserInput />
      </div>
      <div>
        <ControlPanel />
      </div>
    </>
  );
};

export default Home;
