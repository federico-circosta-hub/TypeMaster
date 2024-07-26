import Image from "next/image";
import Restr from "../../app/imgs/f6930566c7ffb2b734f668754c171f5a (1).png";
import { Typography } from "@mui/material";
import { t } from "i18next";
import HoverButton from "./SentenceButtons/HoverButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft, faPenNib } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import RegisterDialog from "./Modal/RegisterDialog";
import { useState } from "react";

const Restricted = () => {
  const [openRegisterDialog, setOpenRegisterDialog] = useState({
    tab: 1,
    open: false,
  });
  const router = useRouter();
  return (
    <div className="flex flex-col mt-14 items-center">
      <div className="space-y-2 text-center">
        <Typography variant="h4" color={"white"} fontWeight={600}>
          {t("Restricted")}
        </Typography>
      </div>

      <Image src={Restr} width={450} className="opacity-60" />
      <div className="flex justify-center gap-4">
        <HoverButton
          icon={
            <FontAwesomeIcon
              icon={faCircleArrowLeft}
              className="fa-xl"
              color="white"
            />
          }
          text={t("Home")}
          action={() => router.push("/")}
        />
        <HoverButton
          icon={
            <FontAwesomeIcon icon={faPenNib} className="fa-xl" color="white" />
          }
          text={t("Register")}
          action={() => setOpenRegisterDialog({ tab: 1, open: true })}
        />
      </div>
      {openRegisterDialog.open && (
        <RegisterDialog
          setOpenRegisterDialog={setOpenRegisterDialog}
          defaultTab={openRegisterDialog}
        />
      )}
    </div>
  );
};

export default Restricted;
