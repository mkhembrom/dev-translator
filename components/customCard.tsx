"use client";
import * as React from "react";
import { HiVolumeUp } from "react-icons/hi";
import { IoIosPhotos } from "react-icons/io";
import { MdTextFormat } from "react-icons/md";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import CustomSelect from "./customSelect";
import CustomTextArea from "./customTextArea";
import { useLanguageStore } from "@/store/general";
import { cn } from "../lib/utils";
import { fetcher } from "@/lib/fetcher";
import swap from "../assets/Horizontal_top_left_main.svg";
import copy from "../assets/Copy.svg";
import sound from "../assets/sound_max_fill.svg";
import AA from "../assets/Sort_alfa.svg";
import Image from "next/image";

interface customCardProps {
  translate?: boolean;
  result?: string;
}

export function CustomCard({ translate, result }: customCardProps) {
  const langtoChange = useLanguageStore((state) => state.selecttoLanguage);
  const langfromChange = useLanguageStore((state) => state.selectfromLanguage);
  const tolang = useLanguageStore((state) => state.toLanguage) || "English";
  const fromlang = useLanguageStore((state) => state.fromLanguage) || "English";
  const toActive = useLanguageStore((state) => state.toActive);
  const fromActive = useLanguageStore((state) => state.fromActive);
  const toActiveBtn = useLanguageStore((state) => state.toActiveBtn);
  const fromActiveBtn = useLanguageStore((state) => state.fromActiveBtn);
  const setResult = useLanguageStore((state) => state.setResult);
  const [txt, setTxt] = useState<string>("");
  const message = useLanguageStore((state) => state.message);
  const setMessage = useLanguageStore((state) => state.setMessage);

  const handleTranslate = async () => {
    const data = await fetcher(tolang, fromlang, message);
    setResult(data?.result.trans);
    setTxt(data?.result.trans);
  };

  const handleSpeech = (value: string, lang: string) => {
    const utterance = new SpeechSynthesisUtterance(value);
    utterance.rate = 1;

    utterance.pitch = 1.5;
    utterance.lang = "hi-Hindi";
    // utterance.lang = "hindi";
    // utterance.addEventListener("end", () => {});
    speechSynthesis.speak(utterance);
    console.log(utterance);
  };

  const handleSwap = (tolang: string, fromlang: string) => {
    [tolang, fromlang] = [fromlang, tolang];
    langtoChange(tolang);
    langfromChange(fromlang);
    setResult(message);
    setMessage(result as string);
  };

  return (
    <Card className="w-full rounded-2xl backdrop-blur-sm border-[#4D5562]	bg-[#212936cc]/70">
      <CardContent className="rounded-2xl w-full">
        <div className="flex items-center pt-4 space-between text-[#212936cc] font-bold border-b border-slate-600 pb-4 w-full">
          <div className="flex items-center space-x-4 w-full">
            {translate && (
              <p className="text-slate-400 text-nowrap truncate">
                Detect language
              </p>
            )}

            {translate ? (
              <>
                <Button
                  variant={toActive ? "outline" : "ghost"}
                  className={cn(
                    "rounded-2xl",
                    toActive
                      ? "text-white bg-[#4D5562] border-none"
                      : "text-slate-200"
                  )}
                  onClick={() => {
                    toActiveBtn();
                    // langtoChange(tolang);
                  }}
                >
                  {tolang}
                </Button>

                <Button
                  variant={fromActive ? "outline" : "ghost"}
                  className={cn(
                    "rounded-2xl",
                    fromActive
                      ? "text-white bg-[#4D5562] border-none"
                      : "text-slate-200"
                  )}
                  onClick={() => {
                    fromActiveBtn();
                    // langfromChange(fromlang);
                  }}
                >
                  {fromlang}
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant={fromActive ? "outline" : "ghost"}
                  className={cn(
                    "rounded-2xl",
                    fromActive
                      ? "text-white bg-[#4D5562] border-none"
                      : "text-slate-200"
                  )}
                  onClick={() => {
                    fromActiveBtn();
                  }}
                >
                  {fromlang}
                </Button>
                <Button
                  variant={toActive ? "outline" : "ghost"}
                  className={cn(
                    "rounded-2xl",
                    toActive
                      ? "text-white bg-[#4D5562] border-none"
                      : "text-slate-200"
                  )}
                  onClick={() => {
                    toActiveBtn();
                  }}
                >
                  {tolang}
                </Button>
              </>
            )}

            <CustomSelect />
          </div>
          <div className="flex justify-end w-full">
            {!translate && (
              <Button
                onClick={() => handleSwap(tolang, fromlang)}
                variant={"outline"}
                size={"icon"}
                className="bg-transparent border-2 rounded-xl border-[#4D5562]"
              >
                <Image
                  src={swap}
                  alt="swap"
                  width="20"
                  height="20"
                  className="rotate-90 lg:rotate-0"
                />
              </Button>
            )}
          </div>
        </div>
        {result ? <CustomTextArea txt={result} /> : <CustomTextArea />}
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="space-x-4">
          {translate ? (
            <Button
              variant={"outline"}
              size={"icon"}
              className="bg-transparent border-2 rounded-xl border-[#4D5562]"
              onClick={() => handleSpeech(message, tolang)}
            >
              {/* <HiVolumeUp size={20} color="#94a3b8" /> */}

              <Image src={sound} alt="sound" width={20} height={20} />
            </Button>
          ) : (
            <Button
              variant={"outline"}
              size={"icon"}
              className="bg-transparent border-2 rounded-xl border-[#4D5562]"
              onClick={() => handleSpeech(result as string, fromlang)}
            >
              {/* <HiVolumeUp size={20} color="#94a3b8" /> */}
              <Image src={sound} alt="sound" width={20} height={20} />
            </Button>
          )}

          {translate ? (
            <Button
              variant={"outline"}
              size={"icon"}
              className="bg-transparent border-2 rounded-xl border-[#4D5562]"
              onClick={() => navigator.clipboard.writeText(`${message}`)}
            >
              {/* <IoIosPhotos size={20} color="#94a3b8" /> */}
              <Image src={copy} alt="copy" width={20} height={20} />
            </Button>
          ) : (
            <Button
              variant={"outline"}
              size={"icon"}
              className="bg-transparent border-2 rounded-xl border-[#4D5562]"
              onClick={() => navigator.clipboard.writeText(`${result}`)}
            >
              {/* <IoIosPhotos size={20} color="#94a3b8" /> */}
              <Image src={copy} alt="copy" width={20} height={20} />
            </Button>
          )}
        </div>
        {translate && (
          <Button
            variant={"default"}
            size={"lg"}
            className="flex border-2 border-blue-600 rounded-xl"
            onClick={handleTranslate}
          >
            <div className="flex space-x-2 text-[16px]">
              <span className="mx-0">
                {/* <MdTextFormat size={24} color="#ffffff" /> */}
                <Image src={AA} alt="AA" width={24} height={24} />
              </span>
              <p>Translate</p>
            </div>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
