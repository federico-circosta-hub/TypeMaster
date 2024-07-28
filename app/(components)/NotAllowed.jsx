import Image from "next/image";
import { Typography } from "@mui/material";
import HoverButton from "./SentenceButtons/HoverButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

const NotAllowed = () => {
  const { t } = useTranslation();
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

      <Image
        src={"/imgs/7a929fe9ae9c9ffa3d17fe6b65142e4b copy.png"}
        width="0"
        height="0"
        sizes="100vw"
        className="opacity-75 w-96"
        alt="keycap illustration"
      />
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
