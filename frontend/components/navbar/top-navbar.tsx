"use client";
import { useUIStore } from "@/lib/zustand/ui-store";
import { Icons } from "../icons";
import LanguageSelect from "./language-select";

const TopNavbar = () => {
  const { toggleSidebar, setShowSearchModal } = useUIStore();

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="flex justify-between items-center px-4 py-3 sm:px-6">
        {/* Left Section - Logo & Mobile Menu */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            aria-label="Toggle left sidebar"
            type="button"
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors lg:hidden"
            onClick={() => toggleSidebar("left")}
          >
            <Icons.hamburgerIcon className="text-primary w-6 h-6" />
          </button>

          <div className="flex flex-col leading-tight">
            <h1 className="text-lg font-bold sm:text-xl flex gap-1">
              <span>Dua</span>
              <span className="text-primary font-normal">&</span>
              <span>Ruqyah</span>
            </h1>
            <p className="hidden sm:block text-xs font-medium sm:text-sm text-gray-600">
              Hisnul Muslim
            </p>
          </div>
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          <button
            aria-label="Search"
            type="button"
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors "
            onClick={() => setShowSearchModal(true)}
          >
            <Icons.searchNormalIcon className="text-primary w-5 h-5" />
          </button>

          {/* Color Theme Toggle */}
          <button
            aria-label="Change theme"
            type="button"
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <Icons.colorSwatchIcon className="text-gray-600 w-5 h-5" />
          </button>

          {/* Language Selector */}
          <LanguageSelect className="hidden md:block" />

          {/* Support Button */}
          <button
            type="button"
            className=" items-center gap-2 rounded-full bg-primary p-2 md:px-3 md:py-2 text-sm font-medium text-white hover:bg-primary/90 transition-colors sm:flex"
          >
            <span className="hidden md:block">Support Us</span>
            <Icons.directRightIcon className="w-4 h-4" />
          </button>

          {/* Settings (visible on mobile and smaller desktop) */}
          <button
            aria-label="Toggle right sidebar"
            type="button"
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors 2xl:hidden"
            onClick={() => toggleSidebar("right")}
          >
            <Icons.gearIcon className="text-gray-600 w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;
