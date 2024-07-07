"use client";
import { useGetGlobalScoreQuery } from "../services/scoreApi";
import RankingTable from "../(components)/RankingTable";
import { Typography } from "@mui/material";

const ranking = () => {
  const { data: globalScores, isLoading: isRankingLoading } =
    useGetGlobalScoreQuery();
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

      <div className="relative flex w-full h-fit justify-center ">
        <RankingTable header={cols} rows={globalScores} />
      </div>
    </div>
  );
};

export default ranking;
