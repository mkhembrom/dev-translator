import Image from "next/image";
import bg from "../assets/hero_img.jpg";
import { CustomCard } from "@/components/customCard";
import { useLanguageStore } from "@/store/general";
import { fetcher } from "@/lib/fetcher";
import { useState } from "react";
import MainContent from "@/components/mainContent";
import svg from "../assets/logo.svg";

export default function Home() {
  return (
    <div className="relative w-full h-screen ">
      <Image
        className="w-screen h-[400px] object-cover z-10"
        src={bg}
        alt="background"
      />
      <div className="absolute top-0 left-0 right-0 bottom-0 z-20 bg-gradient-to-b from-0%  from-transparent to-black to-40%"></div>
      <Image
        className="absolute top-2 md:top-40 z-50 left-1/2 -translate-x-1/2"
        src={svg}
        alt="center"
        width={150}
        height={50}
      />
      <MainContent />
    </div>
  );
}
