import {
  faBolt,
  faHome,
  faInfo,
  faRankingStar,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import AvatarComponent from "./AvatarComponent";
import LanguageSettings from "./LanguageSettings";
import tm2 from "../../imgs/tm.png";
import { Typography } from "@mui/material";
import { t } from "i18next";
import { useSelector } from "react-redux";

const Nav = () => {
  const account = useSelector((state) => state.account);

  return (
    <nav className="w-full flex justify-between items-center bg-nav xl:p-6 lg:p-6 md:p-4 p-1">
      <div className="flex justify-start items-center xl:gap-16 lg:gap-10 md:gap-6 sm:gap-3 gap-4 overflow-x-auto px-2">
        <img
          className="select-none xl:w-36 lg:w-28 md:w-24 w-20"
          src={tm2.src}
          alt="typemaster logo"
        />
        <Link href="/" className="text-white flex gap-2 items-bottom">
          <FontAwesomeIcon icon={faHome} className="fa-xl" color="white" />
          <Typography variant="h6" color="whitesmoke">
            {t("Home")}
          </Typography>
        </Link>
        <Link
          href={`/profile/${account.userId}`}
          className="text-white flex gap-2 items-bottom"
        >
          <FontAwesomeIcon icon={faUser} className="fa-xl" color="white" />
          <Typography variant="h6" color="whitesmoke">
            {t("Profile")}
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
          <FontAwesomeIcon icon={faBolt} className="fa-xl" color="grey" />
          <Typography variant="h6" color="grey">
            {t("HowItWorks")} {t("ComingSoon")}
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
