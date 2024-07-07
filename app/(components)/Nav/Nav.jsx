import {
  faBolt,
  faHome,
  faInfo,
  faRankingStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import AvatarComponent from "./AvatarComponent";
import LanguageSettings from "./LanguageSettings";
import tm2 from "@/app/imgs/tm.png";
import { Typography } from "@mui/material";
import { t } from "i18next";

const Nav = () => {
  return (
    <nav className="w-full flex justify-between items-center bg-nav p-6">
      <div className="flex justify-start items-center gap-16">
        <img className="select-none" width={150} src={tm2.src} alt="" />
        <Link href="/" className="text-white flex gap-2 items-bottom">
          <FontAwesomeIcon icon={faHome} className="fa-xl" color="white" />
          <Typography variant="h6" color="whitesmoke">
            {t("Home")}
          </Typography>
        </Link>
        <Link href="/ranking" className="text-white flex gap-2 items-bottom">
          <FontAwesomeIcon
            icon={faRankingStar}
            className="fa-xl"
            color="white"
          />
          <Typography variant="h6" color="whitesmoke">
            {t("Ranking")}
          </Typography>
        </Link>
        <Link href="/" className="text-white flex gap-2 items-bottom">
          <FontAwesomeIcon icon={faBolt} className="fa-xl" color="white" />
          <Typography variant="h6" color="whitesmoke">
            {t("HowItWorks")}
          </Typography>
        </Link>
      </div>

      <div className="flex items-center justify-end gap-4 w-fit">
        <LanguageSettings />
        <AvatarComponent />
      </div>
    </nav>
  );
};

export default Nav;
