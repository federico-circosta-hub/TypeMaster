import Image from "next/image";
import NA from "../../app/imgs/7a929fe9ae9c9ffa3d17fe6b65142e4b copy.png";
import { Typography } from "@mui/material";
import { t } from "i18next";
import HoverButton from "./SentenceButtons/HoverButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

const NotAllowed = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col mt-14 items-center">
      <div className="space-y-2 text-center">
        <Typography variant="h4" color={"white"}>
          Ops
        </Typography>
        <Typography variant="h3" color={"white"} fontWeight={600}>
          {t("NotAllowed")}
        </Typography>
      </div>

      <Image src={NA} width={450} className="opacity-75" />
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
    </div>
  );
};

export default NotAllowed;
