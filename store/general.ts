import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface languageState {
  message: string;
  result: string;
  toLanguage: string;
  toCode: string;
  fromLanguage: string;
  fromCode: string;
  toActive: boolean;
  fromActive: boolean;
  selecttoLanguage: (txt: string) => void;
  setMessage: (txt: string) => void;
  setResult: (txt: string) => void;
  selectfromLanguage: (txt: string) => void;
  toActiveBtn: () => void;
  fromActiveBtn: () => void;
  swapBtn: () => void;
}

const useLanguageStore = create<languageState>()(
  devtools(
    persist(
      (set) => ({
        message: "",
        result: "",
        toLanguage: "",
        toCode: "",
        fromLanguage: "",
        fromCode: "",
        toActive: true,
        fromActive: false,
        swapBtn: () => set(() => ({})),
        selecttoLanguage: (txt: string) => set(() => ({ toLanguage: txt })),
        selectfromLanguage: (txt: string) => set(() => ({ fromLanguage: txt })),
        setMessage: (txt: string) => set((state) => ({ message: txt })),
        setResult: (txt: string) => set((state) => ({ result: txt })),
        toActiveBtn() {
          set(() => ({
            toActive: true,
            fromActive: false,
          }));
        },
        fromActiveBtn() {
          set(() => ({
            fromActive: true,
            toActive: false,
          }));
        },
      }),
      { name: "langStore" }
    )
  )
);

export { useLanguageStore };
