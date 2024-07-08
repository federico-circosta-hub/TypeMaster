"use client";
import { Typography } from "@mui/material";
import { useGetPersonalScoreQuery } from "../../services/scoreApi";
import RankingTable from "../../(components)/Table/RankingTable";

const UserPage = ({ params: { id } }) => {
  const {
    data: userScores,
    isLoading,
    isFetching,
  } = useGetPersonalScoreQuery();
  const cols = [
    //{ colId: "username", name: "Utente" },
    { colId: "score", name: "Punteggio" },
    { colId: "createdAt", name: "Data" },
  ];
  return (
    <div className="flex flex-col w-full justify-center items-center gap-8">
      <Typography variant="h2" color={"whitesmoke"} fontWeight={700}>
        Punteggi personali
      </Typography>

      <div className="flex w-4/5 h-fit justify-center ">
        <RankingTable
          header={cols}
          rows={userScores}
          isDataLoading={isLoading || isFetching}
        />
      </div>
    </div>
  );
};

export default UserPage;
