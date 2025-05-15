"use client";
import { Icons } from "../icons";
import { useUIStore } from "@/lib/zustand/ui-store";
import { useSidebarStore } from "@/lib/zustand/use-sidebar-store";
import { useEffect } from "react";

const LeftSidebar = () => {
  const { showLeftSidebar, toggleSidebar } = useUIStore();
  const {
    setDuaId,
    setShowDuasList,
    setShowSubCategories,
    showDuasList,
    showSubCategories,
    categoryWithSubCategories,
    setSearchTerm,
    searchTerm,
    debouncedSearch,
  } = useSidebarStore();
  useEffect(() => {
    debouncedSearch(searchTerm);

    // Cleanup function to cancel any pending debounced calls
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchTerm, debouncedSearch]);
  return (
    <aside
      className={`text-left fixed lg:sticky lg:z-0 z-50 top-0 h-screen lg:max-h-[calc(100vh-100px)] lg:overflow-y-auto w-full md:w-3/5 lg:w-full transition-all duration-300 lg:col-span-4 2xl:col-span-2 ${
        showLeftSidebar ? "left-0" : "-left-full md:-left-[60%]"
      }`}
    >
      <div className="p-6 rounded-r-lg min-h-screen lg:rounded-none overflow-y-auto">
        {/* settings menu  */}
        <div className="flex  justify-between items-center lg:hidden">
          <p className="flex items-center gap-3 w-full text-heading-6 font-bold">
            <Icons.gearIcon />
            Settings
          </p>

          <button
            type="button"
            title="Close button"
            onClick={() => toggleSidebar("left")}
            className=""
          >
            <Icons.crossIcon />
          </button>
        </div>

        {/* search bar  */}
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Dua Categories"
            className="rounded-30 pl-10 w-full bg-shadeColor1/40 border-2 border-shadeColor1 text-sm py-3 focus:outline-none focus:ring-0 focus:border-none"
          />
          <label
            htmlFor="categorySearch"
            className="absolute left-3 top-1/2 transform -translate-y-1/2"
          >
            <Icons.categorySearchIcon className="size-4.5" />
          </label>
        </div>

        {/* showing categories  */}
        {categoryWithSubCategories.length > 0 ? (
          <>
            <div className="space-y-2 mt-2.5">
              {categoryWithSubCategories.map((mainCat, i) => {
                const CategoryIcon = Icons[mainCat.cat_icon];
                return (
                  <div className="" key={i}>
                    <button
                      type="button"
                      className="w-full hover:bg-shadeColor1/40 transition-colors duration-300 rounded-md px-2.5 py-3.5 grid grid-cols-[44px_1fr] items-center justify-start gap-2"
                      onClick={() => {
                        setShowSubCategories(mainCat.cat_id);
                        setShowDuasList(null);
                      }}
                    >
                      <div className="p-2 rounded-lg bg-shadeColor1">
                        <CategoryIcon className="size-8" />
                      </div>
                      <div className="text-left flex flex-col">
                        <span className="text-sm">{mainCat.cat_name_en}</span>
                        <span className="text-textSubtitle font-normal text-xs">
                          {mainCat.no_of_subcat} Subcat | {mainCat.no_of_dua}{" "}
                          Duas
                        </span>
                      </div>
                    </button>
                    <div>
                      <ul
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          showSubCategories === mainCat?.cat_id
                            ? "max-h-[9999px] opacity-100 py-2 border-l-1 border-dashed border-black"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        {mainCat.subcategories.map((subCat, j) => (
                          <div key={j}>
                            <button
                              type="button"
                              onClick={() =>
                                setShowDuasList(
                                  showDuasList === subCat?.subcat_id
                                    ? null
                                    : subCat?.subcat_id
                                )
                              }
                              className={`w-full text-left ps-7 text-sm text-primary px-2.5 py-1.5 relative before:absolute 
                              before:top-1/2 before:left-0 before:border-black before:border-t-1 
                              before:border-dashed before:w-4 before:h-1
                              ${
                                subCat?.subcat_id === showDuasList
                                  ? "font-bold"
                                  : ""
                              }
                              `}
                            >
                              {subCat.subcat_name_en}
                            </button>
                            {subCat.duas.length ? (
                              <>
                                {" "}
                                <ul
                                  className={`overflow-hidden transition-all duration-300 ease-in-out flex flex-col gap-3 mt-3 ${
                                    showSubCategories === mainCat?.cat_id &&
                                    showDuasList === subCat?.subcat_id
                                      ? "max-h-[9999px] opacity-100 py-2  border-black"
                                      : "max-h-0 opacity-0"
                                  }`}
                                >
                                  {subCat.duas.map((dua, k) =>
                                    dua.dua_name_bn && dua.dua_name_en ? (
                                      <button
                                        type="button"
                                        key={k}
                                        className="ps-7 flex gap-2.5 items-start text-sm text-left  text-textPrimary"
                                        onClick={() => setDuaId(dua?.dua_id)}
                                      >
                                        <Icons.duaListArrowIndicatorIcon className="size-6 " />{" "}
                                        {dua.dua_name_en}
                                      </button>
                                    ) : (
                                      <span key={k}></span>
                                    )
                                  )}
                                </ul>
                              </>
                            ) : (
                              <></>
                            )}
                          </div>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </aside>
  );
};

export default LeftSidebar;
