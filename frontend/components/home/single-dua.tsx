"use client";
import { IDua } from "@/lib/interfaces/category";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { Icons } from "../icons";
import { useLanguageStore } from "@/lib/zustand/nav";
import { useSidebarStore } from "@/lib/zustand/use-sidebar-store";
import { useSettingsStore } from "@/lib/zustand/settings-store";

const SingleDuaComponent = ({ dua }: { dua: IDua }) => {
  const { selectedLanguage } = useLanguageStore();
  const { duaId } = useSidebarStore();
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
  const duaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (duaId === dua.dua_id && duaRef.current) {
      // Smooth scroll to the dua
      duaRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      // Optional: Add highlight effect
      duaRef.current.classList.add("highlight-dua");
      const timer = setTimeout(() => {
        duaRef.current?.classList.remove("highlight-dua");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [duaId, dua.dua_id]);

  return (
    <div
      ref={duaRef}
      className={`main-all-sub-section border-b-1 shadow-sm last:border-b-0 ${
        duaId === dua.dua_id ? "bg-gray-50" : ""
      }`}
      id={`dua-${dua.dua_id}`}
    >
      <div className="px-4.5 py-7.5">
        <div className="flex gap-4 text-primary font-semibold text-xl">
          <Image
            src={`/dua-icon.png`}
            width={28}
            height={28}
            className="size-7"
            alt="Dua icon"
          />
          {selectedLanguage === "en" ? dua?.dua_name_en : dua?.dua_name_bn}
        </div>

        {dua?.dua_arabic && showArabic ? (
          <div
            className={`font-normal  text-textPrimary text-right my-7.5`}
            style={{
              fontSize: `${arabicFontSize}px`,
            }}
          >
            {dua?.dua_arabic}
          </div>
        ) : (
          <></>
        )}

        {dua?.transliteration_en &&
        dua?.transliteration_bn &&
        showTransliteration ? (
          <div className="text-textSubtitle mb-6">
            <p className="italic text-base">
              {selectedLanguage === "en"
                ? dua?.transliteration_en
                : dua?.transliteration_bn}
            </p>
          </div>
        ) : (
          <></>
        )}

        {dua?.translation_bn && dua?.translation_en && showTranslation ? (
          <div className="text-textPrimary">
            <strong className="mb-2">
              {selectedLanguage === "en" ? "Translation" : "অনুবাদ"}
            </strong>
            <p
              className={``}
              style={{
                fontSize: `${translationFontSize}px`,
              }}
            >
              {selectedLanguage === "en"
                ? dua?.translation_en
                : dua?.translation_bn}
            </p>
          </div>
        ) : (
          <></>
        )}

        <div className="mt-[50px] flex items-center justify-between">
          {dua?.refference_bn && dua?.refference_en && showReference ? (
            <div className="text-sm">
              <span className="text-textSubtitle font-normal mb-2">
                {selectedLanguage === "en" ? "Reference" : "রেফারেন্স"}
              </span>
              <p className="text-textPrimary">
                {selectedLanguage === "en"
                  ? dua?.refference_en
                  : dua?.refference_bn}
              </p>
            </div>
          ) : (
            <span></span>
          )}
          <div className="flex gap-2">
            {dua?.audio ? (
              <>
                <button title="play" type="button">
                  <Icons.playIcon className="text-primary" />
                </button>
                <button type="button" title="pause">
                  <Icons.pauseIcon className="text-primary" />
                </button>
              </>
            ) : (
              <></>
            )}
            <Icons.archiveMinusIcon className="text-primary" />
            <Icons.copyIcon className="text-primary" />
            <Icons.shareIcon className="text-primary" />
            <Icons.threeDotIcon className="text-primary" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleDuaComponent;
