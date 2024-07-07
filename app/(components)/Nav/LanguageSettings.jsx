"use client";
import { FormControl, MenuItem, Select } from "@mui/material";
import i18n from "../../i18n";
import { useState } from "react";
import { useRouter } from "next/navigation";

const LanguageSettings = () => {
  const router = useRouter();
  const [lang, setLang] = useState("it");
  const AvailableLanguages = [
    { code: "GB", label: "English", value: "en" },
    { code: "IT", label: "Italiano", value: "it" },
  ];
  const handleChange = (event) => {
    const lng = event.target.value;
    setLang(lng);
    i18n.changeLanguage(lng);
    router.refresh();
  };
  return (
    <FormControl className="w-24 flex items-center justify-center">
      <Select
        value={lang}
        onChange={handleChange}
        sx={{
          flexDirection: "row",
          boxShadow: "none",
          ".MuiOutlinedInput-notchedOutline": { border: 0 },
        }}
      >
        {AvailableLanguages.map((option) => (
          <MenuItem value={option.value} key={option.code}>
            <div>
              <img
                loading="lazy"
                width="24"
                srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                alt={`${option.code} national flag`}
              />
            </div>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default LanguageSettings;
