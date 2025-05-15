"use client";
import { useUIStore } from "@/lib/zustand/ui-store";
import React, { useEffect, useRef } from "react";
import { Icons } from "../icons";
import { useSidebarStore } from "@/lib/zustand/use-sidebar-store";

const SearchModalComponent = () => {
  const { setShowSearchModal, showSearchModal } = useUIStore();
  const modalRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const {
    setShowDuasList,
    setShowSubCategories,
    categoryWithSubCategories,
    setModalSearchTerm,
    modalSearchTerm,
    debouncedSearchForModal,
  } = useSidebarStore();
  useEffect(() => {
    debouncedSearchForModal(modalSearchTerm);

    // Cleanup function to cancel any pending debounced calls
    return () => {
      debouncedSearchForModal.cancel();
    };
  }, [modalSearchTerm, debouncedSearchForModal]);
  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        backdropRef.current &&
        backdropRef.current.contains(event.target as Node)
      ) {
        setShowSearchModal(false);
      }
    };

    if (showSearchModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSearchModal, setShowSearchModal]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (showSearchModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showSearchModal]);

  return (
    <>
      {showSearchModal && (
        <div
          ref={backdropRef}
          className="fixed top-0 left-0 w-screen h-screen bg-black/30 flex justify-center items-center z-[1000]"
        >
          <div
            ref={modalRef}
            className="max-w-xl min-h-96 w-full bg-white rounded-xl shadow-lg p-6 space-y-4"
          >
            {/* Header Search Input */}
            <div className="relative flex items-center">
              <Icons.searchNormalIcon
                className="absolute left-3 text-gray-500"
                size={20}
              />
              <input
                type="text"
                value={modalSearchTerm}
                onChange={(e) => setModalSearchTerm(e.target.value)}
                placeholder="Search Dua Categories"
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {categoryWithSubCategories.length > 0 ? (
              <>
                <div className="space-y-2 mt-2.5 max-h-96 overflow-auto">
                  {categoryWithSubCategories.map((mainCat, i) => {
                    const CategoryIcon = Icons[mainCat.cat_icon];
                    return (
                      <div className="" key={i}>
                        <button
                          type="button"
                          className="w-full hover:bg-shadeColor1/40 transition-colors duration-300 rounded-md px-2.5 py-3.5 grid grid-cols-[44px_1fr] items-center justify-start gap-2"
                          onClick={() => {
                            setShowSearchModal(false);
                            setModalSearchTerm("");
                            setShowSubCategories(mainCat.cat_id);
                            setShowDuasList(null);
                          }}
                        >
                          <div className="p-2 rounded-lg bg-shadeColor1">
                            <CategoryIcon className="size-8" />
                          </div>
                          <div className="text-left flex flex-col">
                            <span className="text-sm">
                              {mainCat.cat_name_en}
                            </span>
                            <span className="text-textSubtitle font-normal text-xs">
                              {mainCat.no_of_subcat} Subcat |{" "}
                              {mainCat.no_of_dua} Duas
                            </span>
                          </div>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <></>
            )}
            {/* Category Buttons */}
            {/* <div>
              <p className="text-gray-600 mb-2">Try to navigate</p>
              <div className="flex flex-wrap gap-2">
                {[
                  "Tawbah and Istighfar",
                  "Dua’s Importance",
                  "Adhaan and Iqamah",
                  "Ramadan Duas",
                ].map((cat) => (
                  <button
                    key={cat}
                    className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md text-gray-800"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div> */}

            {/* Search History */}
            {/* <div>
              <p className="text-gray-600 mb-2">Search history</p>
              <ul className="space-y-2">
                {[
                  "Number of people from my Ummah who will enter Paradise",
                  "Story of three people taking shelter in a cave",
                  "Story of ninety-nine murders and Allah’s forgiveness",
                  "Most beloved deeds",
                ].map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center text-sm text-blue-600 hover:underline cursor-pointer"
                  >
                    <span className="mr-2">→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div> */}
          </div>
        </div>
      )}
    </>
  );
};

export default SearchModalComponent;
