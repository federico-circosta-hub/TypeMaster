"use client";
import dds from "@/app/imgs/_dds.png";
import { t } from "i18next";

const Footer = () => {
  return (
    <>
      <img
        className="absolute right-1 bottom-1 select-none opacity-25 z-0"
        width={150}
        src={dds.src}
        alt=""
      />
      <div className="w-full flex justify-center bg-transparent py-4 absolute bottom-0">
        <p className="text-center text-gray-400 text-sm">
          &copy; 2024 Typemaster. {t("AllRightsReserved")}
        </p>
      </div>
    </>
  );
};

export default Footer;
