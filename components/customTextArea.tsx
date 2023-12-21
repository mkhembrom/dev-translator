"use client";
import React, { useEffect, useRef, useState } from "react";
import { Textarea, TextareaProps } from "@/components/ui/textarea";
import { fetcher } from "@/lib/fetcher";
import { useLanguageStore } from "@/store/general";

interface customTextAreaProps {
  txt?: string;
}
const CustomTextArea = ({ txt: msgs }: customTextAreaProps) => {
  const [msg, setMsg] = useState("");
  const setMessage = useLanguageStore((state) => state.setMessage);
  const message = useLanguageStore((state) => state.message);

  const textChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (msg.length < 500) {
      setMsg(e.target.value);
      setMessage(e.target.value);
    } else if (msg.length > 500) {
      return;
    }
  };

  return (
    <div className="relative">
      {msgs ? (
        <Textarea
          value={msgs}
          onChange={textChange}
          className="text-md caret-slate-800 cursor-context-menu overflow-y-hidden overflow-hidden resize-none text-white h-40 mt-4 bg-transparent ring-offset-transparent border-none focus-visible:border-none focus-visible:outline-transparent focus-visible:ring-0 focus-visible:ring-transparent"
        />
      ) : (
        <Textarea
          value={message}
          onChange={textChange}
          className="text-md overflow-y-hidden overflow-hidden resize-none text-white h-40 mt-4 bg-transparent ring-offset-transparent border-none focus-visible:border-none focus-visible:outline-transparent focus-visible:ring-0 focus-visible:ring-transparent"
        />
      )}

      {msgs ? (
        <p className="absolute bottom-1 right-4 text-slate-600 bg-transparent px-2 rounded-full text-sm"></p>
      ) : (
        <p className="absolute bottom-1 right-4 text-slate-600 bg-transparent px-2 rounded-full text-sm">
          {msg.length}/{"500"}
        </p>
      )}
    </div>
  );
};

export default CustomTextArea;
