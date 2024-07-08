"use client";
import { useGetGlobalScoreQuery } from "../services/scoreApi";
import RankingTable from "../(components)/Table/RankingTable";
import { Typography } from "@mui/material";

const ranking = () => {
  const {
    data: globalScores,
    isLoading: isRankingLoading,
    isFetching: isRankingFetching,
  } = useGetGlobalScoreQuery();
  const cols = [
    { colId: "username", name: "Utente" },
    { colId: "highestScore", name: "Punteggio massimo" },
    { colId: "createdAt", name: "Data record" },
  ];

  return (
    <div className="flex flex-col w-full justify-center items-center gap-8">
      <Typography variant="h2" color={"whitesmoke"} fontWeight={700}>
        Ranking
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
