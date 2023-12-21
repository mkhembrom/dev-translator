"use client";

import world from "../assets/world.json";

export const fetcher = async (from: string, to: string, text: string) => {
  let theto = world.find((country) => country.name === to)?.code!;
  let thefrom = world.find((country) => country.name === from)?.code!;

  const url =
    "https://google-translate113.p.rapidapi.com/api/v1/translator/text";
  const options = {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "X-RapidAPI-Key": "af19b5bb92msh85549fa79be3c0fp1a6b97jsn7f950539e4f0",
      "X-RapidAPI-Host": "google-translate113.p.rapidapi.com",
    },
    body: new URLSearchParams({
      from: thefrom,
      to: theto,
      text: text,
    }),
  };
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return { result };
  } catch (error) {
    console.error(error);
  }
};
