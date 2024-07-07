"use client";
import React from "react";
import HoverButton from "./HoverButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotate, faShare } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { restart } from "../../../lib/features/currentStatsSlice";
import { t } from "i18next";
import { useCreateScoreMutation } from "../../services/scoreApi";
import { toast } from "react-toastify";

const ControlPanel = () => {
  const dispatch = useDispatch();
  const isEnd = useSelector((state) => {
    return (
      Boolean(state.currentStats.keyPressCounter) &&
      !state.currentStats.time.isRunning
    );
  });
  const account = useSelector((state) => state.account);
  const score = useSelector((state) => state.currentStats.score);
  const [createScore, { isLoading: isCreatingScore }] =
    useCreateScoreMutation();

  const handleSaveScore = async () => {
    const id = toast.loading("Saving...", {
      type: "default",
    });
    try {
      await createScore({
        userId: account.userId,
        score: score,
      });
      toast.update(id, {
        render: "Punteggio salvato!",
        type: "default",
        autoClose: 3000,
        isLoading: false,
      });
    } catch (error) {
      toast.update(id, {
        render: "C'è stato un errore",
        type: "error",
        autoClose: 3000,
        isLoading: false,
      });
    }
  };

  const Buttons = [
    {
      text: t("Restart"),
      icon: <FontAwesomeIcon icon={faRotate} className="fa-xl" />,
      action: () => dispatch(restart()),
      disabled: false,
    },
    {
      text: t("Save"),
      icon: <FontAwesomeIcon icon={faShare} className="fa-xl" />,
      action: handleSaveScore,
      disabled: !isEnd || !account.username || isCreatingScore,
    },
  ];

  return (
    <div className="w-full flex justify-center gap-10">
      {Buttons.map((button, key) => (
        <HoverButton
          key={key}
          text={button.text}
          icon={button.icon}
          action={button.action}
          disabled={button.disabled}
        />
      ))}
    </div>
  );
};

export default ControlPanel;
