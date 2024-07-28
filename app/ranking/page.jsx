"use client";
import { useGetGlobalScoreQuery } from "../services/scoreApi";
import RankingTable from "../(components)/Table/RankingTable";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const ranking = () => {
  const { t } = useTranslation();
  const {
    data: globalScores,
    isLoading: isRankingLoading,
    isFetching: isRankingFetching,
  } = useGetGlobalScoreQuery();
  const cols = [
    { colId: "username", name: t("User") },
    { colId: "highestScore", name: t("UserRecord") },
    { colId: "createdAt", name: t("RecordDate") },
  ];

  return (
    <div className="flex flex-col w-full justify-center items-center gap-8">
      <Typography variant="h2" color={"whitesmoke"} fontWeight={700}>
        {t("Ranking")}
      </Typography>

      <div className="flex w-4/5 h-fit justify-center ">
        <RankingTable
          header={cols}
          rows={globalScores}
          isDataLoading={isRankingLoading || isRankingFetching}
        />
      </div>
    </div>
  );
};

export default ranking;
