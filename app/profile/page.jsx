"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import RegisterDialog from "../(components)/Modal/RegisterDialog";
import Restricted from "../(components)/Restricted";

const Profile = () => {
  const router = useRouter();
  const account = useSelector((state) => state.account);

  useEffect(() => {
    if (account && account?.userId) router.push(`/profile/${account.userId}`);
  }, [account?.userId]);

  return (
    <div className="flex flex-col w-full justify-center items-center gap-8">
      <Restricted />
      <RegisterDialog />
    </div>
  );
};

export default Profile;
