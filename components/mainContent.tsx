"use client";

import React, { useState } from "react";
import { CustomCard } from "./customCard";
import { useLanguageStore } from "@/store/general";
import { fetcher } from "@/lib/fetcher";
import Image from "next/image";

const MainContent = () => {
  const result = useLanguageStore((state) => state.result);

  return (
    <div className=" w-full flex items-center justify-center">
      <div className="lg:flex  z-20  absolute top-1/2 -translate-y-1/2 left-0 md:left-[20%] right-0 md:right-[20%]">
        <div className=" flex-1 p-4 ">
          <CustomCard translate />
        </div>
        <div className="flex-1 p-4">
          <CustomCard result={result} />
        </div>
      </div>
    </div>
  );
};

export default MainContent;
