"use client";
import React from "react";
import { useSelector } from "react-redux";
import SingleStatistic from "./SingleStatistic";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartSimple,
  faCircleExclamation,
  faClock,
  faGauge,
  faKeyboard,
  faTrophy,
} from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";
import { t } from "i18next";

const Statistics = () => {
  const currentStats = useSelector((state) => state.currentStats);
  const errors = useSelector((state) => state.currentStats.errorsCounter);
  const { timer, isRunning } = useSelector((state) => state.currentStats.time);

  return (
    <div className="w-4/5 text-black grid justify-center xl:gap-4 lg:gap-4 gap-1 grid-cols-2 lg:grid-cols-2 xl:grid-cols-6">
      <SingleStatistic
        title={t("KeysPressed")}
        data={currentStats.keyPressCounter}
        icon={
          <FontAwesomeIcon
            icon={faKeyboard}
            className="fa-xl"
            color={currentStats.keyPressCounter ? "lightblue" : "grey"}
          />
        }
      />
      <SingleStatistic
        title={t("Errors")}
        data={errors}
        icon={
          <FontAwesomeIcon
            icon={faCircleExclamation}
            className="fa-xl"
            color={errors ? "red" : "grey"}
          />
        }
      />
      <SingleStatistic
        title={t("Accuracy")}
        data={`${
          currentStats.keyPressCounter ? currentStats.accuracy : "0.00"
        }%`}
        icon={
          <FontAwesomeIcon
            icon={faChartSimple}
            className="fa-xl"
            color={"green"}
          />
        }
      />
      <SingleStatistic
        title={"Timer"}
        data={format(new Date(0).setSeconds(timer), "mm:ss")}
        icon={
          <FontAwesomeIcon
            icon={faClock}
            className="fa-xl"
            color={timer ? "royalblue" : "grey"}
          />
        }
      />
      <SingleStatistic
        title={"Bpm"}
        data={currentStats.keyPressCounter ? currentStats.keyPerMinute : "0"}
        icon={
          <FontAwesomeIcon
            icon={faGauge}
            className="fa-xl"
            color={currentStats.keyPressCounter ? "coral" : "grey"}
          />
        }
      />
      <SingleStatistic
        title={t("Points")}
        data={
          !isRunning && !currentStats.keyPressCounter ? "0" : currentStats.score
        }
        icon={
          <FontAwesomeIcon icon={faTrophy} className="fa-xl" color={"gold"} />
        }
      />
    </div>
  );
};

export default Statistics;
