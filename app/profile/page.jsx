"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import RegisterDialog from "../(components)/Modal/RegisterDialog";

const Profile = () => {
  const router = useRouter();
  const account = useSelector((state) => state.account);

  useEffect(() => {
    if (account.userId) router.push(`/profile/${account.userId}`);
  }, [account.userId]);

  return (
    <div>
      <RegisterDialog />
    </div>
  );
};

export default Profile;
