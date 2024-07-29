"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import RegisterDialog from "../(components)/Modal/RegisterDialog";
import Restricted from "../(components)/Restricted";
import { CircularProgress } from "@mui/material";

const Profile = () => {
  const router = useRouter();
  const account = useSelector((state) => state.account);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    if (account && account?.userId) router.push(`/profile/${account.userId}`);
    if (!account || !account?.userId) setPageLoading(false);
  }, [account?.userId]);

  if (pageLoading)
    return (
      <div className="flex flex-col w-full justify-center items-center gap-8">
        <CircularProgress style={{ color: "#fa91ff" }} size={"3rem"} />
      </div>
    );

  return (
    <div className="flex flex-col w-full justify-center items-center gap-8">
      <Restricted />
      <RegisterDialog />
    </div>
  );
};

export default Profile;
