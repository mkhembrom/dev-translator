"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import world from "../assets/world.json";

import { useLanguageStore } from "@/store/general";

interface customSelectProps {}

type Icountry = {
  code: string;
  name: string;
};

function CustomSelect({}: customSelectProps) {
  const langtoChange = useLanguageStore((state) => state.selecttoLanguage);
  const langfromChange = useLanguageStore((state) => state.selectfromLanguage);
  const tolang = useLanguageStore((state) => state.toLanguage);
  const fromlang = useLanguageStore((state) => state.fromLanguage);
  const toActive = useLanguageStore((state) => state.toActive);
  const fromActive = useLanguageStore((state) => state.fromActive);

  const languageChange = (txt: string) => {
    if (toActive) {
      langtoChange(txt);
    }

    if (fromActive) {
      langfromChange(txt);
    }
  };

  return (
    <Select
      onValueChange={(value) => languageChange(value)}
      defaultValue={toActive ? tolang : fromlang}
    >
      <SelectTrigger className="w-[140px] rounded-2xl text-white outline-none  bg-transparent border-none focus:ring-transparent ring-offset-transparent border-slate-500 focus:border-none focus:outline-transparent focus:ring-0 focus:ring-slate-500">
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent className=" text-white border text-card-foreground shadow-sm w-full rounded-2xl backdrop-blur-sm border-[#4D5562] bg-[#212936cc]/90">
        {world.map((country: Icountry) => {
          return (
            <SelectItem
              className="text-white"
              key={country.code}
              value={country.name}
            >
              {country.name}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}

export default CustomSelect;
