"use client";
import {
  increaseErrorsCounter,
  increaseKeyPressCounter,
  incrementTimer,
  restart,
  startTimer,
  stopTimer,
  updateComplexStats,
} from "../../lib/features/currentStatsSlice";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoginDialog from "./RegisterDialog";
import { green } from "@mui/material/colors";
import { t } from "i18next";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getBpm, getPoints, getPrecision } from "../utils/StatsFunctions";

const UserInput = () => {
  const dispatch = useDispatch();
  const { isRunning, timer } = useSelector((state) => state.currentStats.time);
  const keyPressCounter = useSelector(
    (state) => state.currentStats.keyPressCounter
  );
  const errors = useSelector((state) => state.currentStats.errorsCounter);
  const username = useSelector((state) => state.account.username);
  const restarter = useSelector((state) => state.currentStats.restarter);
  const sentences = useSelector((state) => state.currentStats.sentences);
  const [inputValue, setInputValue] = useState("");
  const [end, setEnd] = useState(false);
  const [sentence, setSentence] = useState();

  useEffect(() => {
    dispatch(restart());
  }, []);

  useEffect(() => {
    dispatch(
      updateComplexStats({
        accuracy: getPrecision(errors, keyPressCounter),
        keyPerMinute: getBpm(keyPressCounter, timer),
        score: getPoints(errors, keyPressCounter, timer),
      })
    );
  }, [keyPressCounter, errors, timer]);

  useEffect(() => {
    document.getElementById("userInput").focus();
  }, [restarter]);

  useEffect(() => {
    document.getElementById(`CP-${t("Save")}`).focus();
  }, [end]);

  useEffect(() => {
    if (inputValue && inputValue !== sentence) handleStartTimer();
    if (inputValue === sentence) handleStopTimer();
  }, [inputValue]);

  useEffect(() => {
    let casualNumber = Math.floor(Math.random() * sentences.length);
    while (sentences[casualNumber] === sentence) {
      casualNumber = Math.floor(Math.random() * sentences.length);
    }
    setSentence(sentences[casualNumber]);
    setInputValue("");
    setEnd(false);
  }, [restarter]);

  useEffect(() => {
    let timerId;
    if (isRunning)
      timerId = setInterval(() => {
        dispatch(incrementTimer());
      }, 1000);
    return () => clearInterval(timerId);
  }, [dispatch, isRunning]);

  const handleStopTimer = () => {
    dispatch(stopTimer());
    setEnd(true);
  };

  const handleStartTimer = () => {
    dispatch(startTimer());
  };

  const handleBeforeInput = (e) => {
    dispatch(increaseKeyPressCounter());
    const value = e.target.value + e.data;
    if (value !== sentence.substring(0, value.length)) {
      if (
        !["à", "á", "è", "é", "ì", "í", "ò", "ó", "ù", "ú"].includes(
          sentence[value.length - 1]
        )
      )
        dispatch(increaseErrorsCounter());
      e.preventDefault();
      return;
    }
    setTimeout(() => {
      document
        .getElementById("userInput")
        .setSelectionRange(value.length, value.length);
    }, 0);
  };

  const handleInput = (e) => {
    const { value } = e.target;
    setInputValue(value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" || end) {
      e.preventDefault();
    }
  };

  return (
    <div className="relative w-full">
      <textarea
        onPaste={(e) => {
          e.preventDefault();
          return false;
        }}
        tabIndex={end ? "-1" : ""}
        style={{
          background: end ? green.A100 : "white",
          pointerEvents: end ? "none" : "auto",
        }}
        id="userInput"
        className="absolute w-full top-4 p-2 caret-black resize-none rounded-xl font-serif text-4xl shadow-md shadow-indigo-600/75 focus:shadow-lg focus:shadow-orange-600/50"
        value={inputValue}
        onInput={handleInput}
        onBeforeInput={handleBeforeInput}
        onKeyDown={handleKeyPress}
        rows={5}
      />
      {end && (
        <div className="w-fit h-fit absolute top-44 right-4 p-2">
          <FontAwesomeIcon
            icon={faCircleCheck}
            className="fa-2xl"
            color={green.A700}
          />
        </div>
      )}
      <div className="absolute top-4 p-2 text-blue-200 pointer-events-none font-serif text-4xl">
        {sentence}
      </div>
      <div className="absolute top-4 p-2 text-blue-600 pointer-events-none font-serif text-4xl">
        {inputValue}
      </div>
      {end && !username && <LoginDialog />}
    </div>
  );
};

export default UserInput;
