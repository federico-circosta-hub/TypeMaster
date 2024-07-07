"use client";
import { useGetPersonalScoreQuery } from "../../services/scoreApi";

const UserPage = ({ params: { id } }) => {
  const { data: userScores } = useGetPersonalScoreQuery();
  return (
    <div>
      <h1>User Page</h1>
      <p>This is the page for user with ID: {id}</p>
    </div>
  );
};

export default UserPage;
