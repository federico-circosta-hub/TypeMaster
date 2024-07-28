"use client";
import React from "react";
import HoverButton from "./HoverButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotate, faShare } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { restart, saveScore } from "../../../lib/features/currentStatsSlice";
import { useCreateScoreMutation } from "../../services/scoreApi";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const ControlPanel = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isEnd = useSelector((state) => {
    return (
      Boolean(state.currentStats.keyPressCounter) &&
      !state.currentStats.time.isRunning
    );
  });
  const account = useSelector((state) => state.account);
  const score = useSelector((state) => state.currentStats.score);
  const isSavedScore = useSelector(
    (state) => state.currentStats.isCurrentScoreSaved
  );
  const [createScore, { isLoading: isCreatingScore }] =
    useCreateScoreMutation();

  const handleSaveScore = () => {
    const id = toast.loading(t("Saving..."), {
      type: "default",
    });
    createScore({
      userId: account.userId,
      score: score,
    })
      .then((res) => {
        if (res.error) {
          toast.update(id, {
            render: res.error.data.error || t("ScoreNotSaved"),
            type: "error",
            autoClose: 3000,
            isLoading: false,
          });
          return;
        }
        toast.update(id, {
          render: t("ScoreSaved"),
          type: "default",
          autoClose: 3000,
          isLoading: false,
        });
        dispatch(saveScore());
      })
      .catch(() => {
        toast.update(id, {
          render: t("ScoreNotSaved"),
          type: "error",
          autoClose: 3000,
          isLoading: false,
        });
      });
  };

  const Buttons = [
    {
      text: t("Restart"),
      icon: <FontAwesomeIcon icon={faRotate} className="fa-xl" />,
      action: () => dispatch(restart()),
      disabled: false,
    },
    {
      text: isSavedScore ? t("Saved") : t("Save"),
      icon: <FontAwesomeIcon icon={faShare} className="fa-xl" />,
      action: handleSaveScore,
      disabled: !isEnd || !account.username || isCreatingScore || isSavedScore,
    },
  ];

  return (
    <div className="w-full flex justify-center gap-10 z-10">
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
