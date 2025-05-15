"use client";
import React, { useState } from "react";
import { Icons } from "../icons";
import { useUIStore } from "@/lib/zustand/ui-store";
import LanguageSelect from "../navbar/language-select";
import { useSettingsStore } from "@/lib/zustand/settings-store";
import { useTheme } from "next-themes";

const RightSidebar = () => {
  const { showRightSidebar, toggleSidebar } = useUIStore();
  const { setTheme, resolvedTheme } = useTheme();
  const [selectedTab, setSelectedTab] = useState<
    "font" | "view" | "appearance" | "language"
  >("font");
  const {
    arabicFontSize,
    translationFontSize,
    showArabic,
    showTranslation,
    showTransliteration,
    showReference,
    setArabicFontSize,
    setTranslationFontSize,
    toggleArabic,
    toggleTranslation,
    toggleTransliteration,
    toggleReference,
  } = useSettingsStore();
  return (
    <aside
      className={`fixed 2xl:sticky top-0 h-screen 2xl:max-h-[calc(100vh-100px)] w-full md:w-3/5 lg:w-2/6 2xl:w-full transition-all duration-300 2xl:col-span-2 z-50 2xl:z-0 ${
        showRightSidebar ? "right-0" : "-right-full md:-right-[60%]"
      }`}
    >
      <div className="p-6 h-full bg-white dark:bg-black rounded-l-lg 2xl:rounded-none overflow-y-auto">
        <div className="flex justify-between items-center 2xl:hidden">
          <p className="flex items-center gap-3 w-full text-heading-6 font-bold">
            <Icons.gearIcon />
            Settings
          </p>
          <button
            type="button"
            title="Close button"
            onClick={() => toggleSidebar("right")}
          >
            <Icons.crossIcon />
          </button>
        </div>

        <div className="mt-4">
          <LanguageSelect className="block md:hidden w-full" />

          {/* Font Settings Button */}
          <div className="w-full mb-2">
            <button
              type="button"
              onClick={() => setSelectedTab("font")}
              className="py-2.5 w-full flex items-center hover:bg-gray-50  dark:hover:bg-black rounded-lg transition-colors"
            >
              <div className="grow flex gap-2 items-center">
                <div className="bg-shadeColor1 dark:bg-primary/40 rounded-full p-2">
                  <Icons.fontIcon className="size-4.5" />
                </div>
                <span
                  className={`font-medium ${
                    selectedTab === "font" ? "text-primary font-bold" : ""
                  } `}
                >
                  Font Settings
                </span>
              </div>
              <Icons.arrowDownIcon
                className={`transition-all duration-300 ${
                  selectedTab === "font" ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                selectedTab === "font"
                  ? "max-h-[9999px] opacity-100  p-2"
                  : "max-h-0 opacity-0"
              }`}
            >
              {/* Arabic Font Size Control */}
              <div className="space-y-2">
                <div className="flex justify-between items-center my-3">
                  <h3 className="text-sm font-medium text-textPrimary">
                    Arabic Text Size
                  </h3>
                </div>
                <div className="flex justify-between items-center gap-2 my-3">
                  <input
                    type="range"
                    min="5"
                    max="100"
                    value={arabicFontSize}
                    placeholder="arabic font size"
                    onChange={(e) =>
                      setArabicFontSize(parseInt(e.target.value))
                    }
                    className="w-full h-2 accent-primary grow"
                  />
                  <span className="text-primary font-medium">
                    {arabicFontSize}px
                  </span>
                </div>
              </div>

              {/* Translation Font Size Control */}
              <div className="space-y-2">
                <div className="flex justify-between items-center my-3">
                  <h3 className="text-sm font-medium text-textPrimary">
                    Translation Text Size
                  </h3>
                </div>
                <div className="flex justify-between items-center gap-2 my-3">
                  <input
                    type="range"
                    min="5"
                    max="100"
                    placeholder="Translation font size"
                    value={translationFontSize}
                    onChange={(e) =>
                      setTranslationFontSize(parseInt(e.target.value))
                    }
                    className="w-full h-2 accent-primary grow"
                  />
                  <span className="text-primary font-medium">
                    {translationFontSize}px
                  </span>
                </div>
              </div>

              {/* Font Family Selector */}
              {/* <div className="space-y-2">
                <h3 className="font-medium text-gray-700">Font Family</h3>
                <select
                  name="font-select"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option>Default (Traditional Arabic)</option>
                  <option>Uthmani</option>
                  <option>IndoPak</option>
                  <option>Modern</option>
                </select>
              </div> */}
            </div>
          </div>

          {/* View Settings Button */}
          <div className="w-full mb-2">
            <button
              type="button"
              onClick={() => setSelectedTab("view")}
              className="py-2.5 w-full flex items-center hover:bg-gray-50 dark:hover:bg-black rounded-lg transition-colors"
            >
              <div className="grow flex gap-2 items-center">
                <div className="bg-shadeColor1 dark:bg-primary/40 rounded-full p-2">
                  <Icons.copySuccessIcon className="size-4.5" />
                </div>
                <span
                  className={`font-medium ${
                    selectedTab === "view" ? "text-primary font-bold" : ""
                  } `}
                >
                  View Settings
                </span>
              </div>
              <Icons.arrowDownIcon
                className={`transition-all duration-300 ${
                  selectedTab === "view" ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                selectedTab === "view"
                  ? "max-h-[9999px] opacity-100 p-2"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="space-y-5 mx-2 py-3">
                {/* Arabic Text Toggle */}
                <div className="flex items-center justify-between">
                  <span className="text-base font-medium text-textPrimary">
                    Show Arabic
                  </span>
                  <button
                    type="button"
                    title="show arabic"
                    onClick={toggleArabic}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      showArabic ? "bg-iconColor" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        showArabic ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                {/* Translation Toggle */}
                <div className="flex items-center justify-between">
                  <span className="text-base font-medium text-textPrimary">
                    Show Translation
                  </span>
                  <button
                    type="button"
                    title="show translation"
                    onClick={toggleTranslation}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      showTranslation ? "bg-iconColor" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        showTranslation ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                {/* Transliteration Toggle */}
                <div className="flex items-center justify-between">
                  <span className="text-base font-medium text-textPrimary">
                    Show Transliteration
                  </span>
                  <button
                    type="button"
                    title="show transliteration"
                    onClick={toggleTransliteration}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      showTransliteration ? "bg-iconColor" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        showTransliteration ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                {/* Reference Toggle */}
                <div className="flex items-center justify-between">
                  <span className="text-base font-medium text-textPrimary">
                    Show Reference
                  </span>
                  <button
                    type="button"
                    title="show reference"
                    onClick={toggleReference}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      showReference ? "bg-iconColor" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        showReference ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Appearance Settings Button */}
          <div className="w-full mb-2">
            <button
              type="button"
              onClick={() => setSelectedTab("appearance")}
              className="py-2.5 w-full flex items-center hover:bg-gray-50 dark:hover:bg-black rounded-lg transition-colors"
            >
              <div className="grow flex gap-2 items-center">
                <div className="bg-shadeColor1 dark:bg-primary/40 rounded-full p-2">
                  <Icons.colorSwatchIcon className="size-4.5 text-primary" />
                </div>
                <span
                  className={`font-medium ${
                    selectedTab === "appearance" ? "text-primary font-bold" : ""
                  } `}
                >
                  Appearance
                </span>
              </div>
              <Icons.arrowDownIcon
                className={`transition-all duration-300 ${
                  selectedTab === "appearance" ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all  duration-300 ease-in-out ${
                selectedTab === "appearance"
                  ? "max-h-[9999px] opacity-100 py-2 px-2"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className=" flex justify-between items-center p-2 gap-2">
                {[
                  {
                    theme: "light",
                    Icon: Icons.lightThemeIcon,
                    label: "Light",
                  },
                  { theme: "dark", Icon: Icons.darkThemeIcon, label: "Dark" },
                  {
                    theme: "system",
                    Icon: Icons.systemThemeIcon,
                    label: "System",
                  },
                ].map(({ theme, Icon, label }) => (
                  <button
                    key={theme}
                    type="button"
                    className="flex flex-col items-center justify-center p-2 rounded transition-colors"
                    onClick={() => setTheme(theme)}
                  >
                    <div
                      className={`border-1 rounded-lg overflow-hidden
                      ${
                        typeof window === "undefined"
                          ? "border-transparent"
                          : resolvedTheme === theme
                          ? "border-primary"
                          : "border-transparent"
                      }
                      
                      `}
                    >
                      <Icon className="size-9" />
                    </div>
                    <span className="text-xs mt-1">{label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default RightSidebar;
