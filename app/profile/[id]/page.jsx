"use client";
import { Typography } from "@mui/material";
import { useGetPersonalScoreQuery } from "../../services/scoreApi";
import RankingTable from "../../(components)/Table/RankingTable";
import NotAllowed from "../../(components)/NotAllowed";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const UserPage = ({ params: { id } }) => {
  const { t } = useTranslation();
  const currentLoggedId = useSelector((state) => state.account.userId);
  const {
    data: userScores,
    isLoading,
    isFetching,
  } = useGetPersonalScoreQuery();

  const cols = [
    { colId: "score", name: t("Score") },
    { colId: "createdAt", name: t("Date") },
  ];
  if (currentLoggedId !== id)
    return (
      <div className="flex flex-col w-full justify-center items-center gap-8">
        <NotAllowed />
      </div>
    );
  else
    return (
      <div className="flex flex-col w-full justify-center items-center gap-8">
        <Typography variant="h2" color={"whitesmoke"} fontWeight={700}>
          {t("PersonalScore")}
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
