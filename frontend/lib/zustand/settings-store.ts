// lib/zustand/settings-store.ts
import { create } from "zustand";

interface SettingsState {
  arabicFontSize: number;
  translationFontSize: number;
  showArabic: boolean;
  showTranslation: boolean;
  showTransliteration: boolean;
  showReference: boolean;

  // Actions
  setArabicFontSize: (size: number) => void;
  setTranslationFontSize: (size: number) => void;
  toggleArabic: () => void;
  toggleTranslation: () => void;
  toggleTransliteration: () => void;
  toggleReference: () => void;
  resetAllSettings: () => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  // Initial state
  arabicFontSize: 28,
  translationFontSize: 14,
  showArabic: true,
  showTranslation: true,
  showTransliteration: true,
  showReference: true,

  // Actions
  setArabicFontSize: (size) => set({ arabicFontSize: size }),
  setTranslationFontSize: (size) => set({ translationFontSize: size }),

  toggleArabic: () => set((state) => ({ showArabic: !state.showArabic })),
  toggleTranslation: () =>
    set((state) => ({ showTranslation: !state.showTranslation })),
  toggleTransliteration: () =>
    set((state) => ({ showTransliteration: !state.showTransliteration })),
  toggleReference: () =>
    set((state) => ({ showReference: !state.showReference })),

  resetAllSettings: () =>
    set({
      arabicFontSize: 28,
      translationFontSize: 14,
      showArabic: true,
      showTranslation: true,
      showTransliteration: true,
      showReference: true,
    }),
}));
