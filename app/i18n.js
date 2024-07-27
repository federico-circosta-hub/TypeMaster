import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "../public/locales/en/common.json";
import translationIT from "../public/locales/it/common.json";

const lng = "it";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: translationEN,
    },
    it: {
      translation: translationIT,
    },
  },
  lng: lng,

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
