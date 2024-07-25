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
import LoginDialog from "./Modal/RegisterDialog";
import { green } from "@mui/material/colors";
import { t } from "i18next";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getBpm, getPoints, getPrecision } from "../utils/StatsFunctions";
import { useTranslation } from "react-i18next";

const UserInput = () => {
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;
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
  const [sentence, setSentence] = useState("");

  useEffect(() => {
    dispatch(restart());
  }, []);

  useEffect(() => {
    dispatch(
      updateComplexStats({
        accuracy: getPrecision(errors, keyPressCounter),
        keyPerMinute: getBpm(keyPressCounter, timer),
        score: getPoints(
          errors,
          keyPressCounter,
          timer,
          sentence?.sentence?.length
        ),
      })
    );
  }, [keyPressCounter, errors, timer]);

  useEffect(() => {
    document.getElementById("userInput")?.focus();
  }, [restarter]);

  useEffect(() => {
    document.getElementById(`CP-${t("Save")}`)?.focus();
  }, [end]);

  useEffect(() => {
    if (inputValue && inputValue !== sentence.sentence) handleStartTimer();
    if (inputValue === sentence.sentence) handleStopTimer();
  }, [inputValue]);

  useEffect(() => {
    let casualNumber = Math.floor(
      Math.random() * sentences[currentLanguage].length
    );
    while (
      sentences[currentLanguage][casualNumber].sentence === sentence.sentence
    )
      casualNumber = Math.floor(
        Math.random() * sentences[currentLanguage].length
      );
    setSentence(sentences[currentLanguage][casualNumber]);
    setInputValue("");
    setEnd(false);
  }, [restarter, currentLanguage]);

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
    if (value !== sentence.sentence.substring(0, value.length)) {
      if (
        !["à", "á", "è", "é", "ì", "í", "ò", "ó", "ù", "ú"].includes(
          sentence.sentence[value.length - 1]
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
    <div className="relative w-full z-10">
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
        <div className="w-fit h-fit absolute top-6 right-4 p-2">
          <FontAwesomeIcon
            icon={faCircleCheck}
            className="fa-2xl"
            color={green.A700}
          />
        </div>
      )}
      <div className="absolute top-4 p-2 text-blue-200 pointer-events-none font-serif text-4xl">
        {sentence.sentence}
      </div>
      <div className="absolute top-4 p-2 text-blue-600 pointer-events-none font-serif text-4xl">
        {inputValue}
      </div>
      <div className="absolute right-4 top-44 p-2 text-right italic text-orange-600/75 pointer-events-none font-serif text-2xl">
        {sentence.author}
      </div>
      {end && !username && <LoginDialog />}
    </div>
  );
};

export default UserInput;
