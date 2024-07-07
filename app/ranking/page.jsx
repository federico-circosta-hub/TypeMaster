"use client";
import { useGetGlobalScoreQuery } from "../services/scoreApi";
import RankingTable, { StyledTableCell } from "../(components)/RankingTable";
import { useEffect } from "react";
import { Typography } from "@mui/material";

const ranking = () => {
  //const [rows, setRows] = useState([]);

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

      <RankingTable header={cols} rows={globalScores} />
    </div>
  );
};

export default ranking;
