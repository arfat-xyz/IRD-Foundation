"use client";
import { useSidebarStore } from "@/lib/zustand/use-sidebar-store";
import { Icons } from "../icons";
import SingleDuaComponent from "./single-dua";

const MainComponent = () => {
  const { currentCategory } = useSidebarStore();
  console.log({ currentCategory });
  return (
    <main className="overflow-y-auto scrollbar lg:col-span-8 2xl:col-span-8 h-[calc(100vh-100px)]">
      {/* breadcrumb */}
      <div className="main-all-sub-section bg-primary/10 dark:bg-[#2c352c66] text-iconColor flex flex-row gap-2 items-center shadow-sm">
        <Icons.homeIcon className="size-4.5" />

        <span>Home</span>
        <span>
          <Icons.arrowRightIcon className="size-3.5 text-primary" />
        </span>

        <span>{currentCategory?.cat_name_en}</span>
      </div>
      {currentCategory?.subcategories.map((subCat) => (
        <div key={subCat?.subcat_id} className="">
          <div className="main-all-sub-section text-iconColor py-6 bg-shadeColor2 dark:bg-[#2c352c52]">
            <strong>Section:</strong>
            {currentCategory?.subcategories[0].subcat_name_en}
          </div>
          <div className="">
            {subCat?.duas.map((dua, i) => (
              <SingleDuaComponent dua={dua} key={i} />
            ))}
          </div>
        </div>
      ))}
    </main>
  );
};

export default MainComponent;
