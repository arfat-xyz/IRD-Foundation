import { create } from "zustand";
import { LanguageCode } from "../interfaces/others";

interface LanguageStore {
  selectedLanguage: LanguageCode;
  setLanguage: (code: LanguageCode) => void;
}

export const useLanguageStore = create<LanguageStore>((set) => ({
  selectedLanguage: "en",
  setLanguage: (code) => set({ selectedLanguage: code }),
}));
