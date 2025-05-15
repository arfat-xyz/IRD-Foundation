"use client";
import { Language, LanguageCode } from "@/lib/interfaces/others";
import { Icons } from "../icons";
import { useLanguageStore } from "@/lib/zustand/nav";

const languages: Record<LanguageCode, Language> = {
  en: {
    code: "en",
    name: "En",
    flag: "/en-image.png",
  },
  bn: {
    code: "bn",
    name: "Bn",
    flag: "/bn-image.svg",
  },
};

const LanguageSelect = ({ className }: { className: string }) => {
  // 4. Use Zustand store
  const { selectedLanguage, setLanguage } = useLanguageStore();

  return (
    <div className={`relative inline-block ${className}`}>
      <select
        name="language-selector"
        id="language-selector"
        value={selectedLanguage}
        onChange={(e) => setLanguage(e.target.value as LanguageCode)}
        className="block appearance-none w-full bg-shadeColor1/60 text-4.5 lg:text-5.5 rounded-30 py-3 px-3 pr-8 leading-tight focus:outline-none focus:border-gray-500 language-selector"
        style={{
          backgroundImage: `url(${languages[selectedLanguage].flag})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "left 12px center",
          backgroundSize: "25px 18px",
          paddingLeft: "3rem",
        }}
      >
        {Object.values(languages).map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
        <Icons.arrowDownIcon className="text-textSubtitle" />
      </div>
    </div>
  );
};

export default LanguageSelect;
