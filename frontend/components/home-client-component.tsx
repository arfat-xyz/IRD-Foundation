"use client";
import { useSidebarStore } from "@/lib/zustand/use-sidebar-store";
import LeftSidebar from "./home/left-sidebar";
import MainComponent from "./home/main";
import RightSidebar from "./home/right-sidebar";
import { useEffect } from "react";

const HomeClientComponent = () => {
  const { initializeCategories } = useSidebarStore();

  useEffect(() => {
    initializeCategories();
  }, []);
  return (
    <div className="">
      <div className=" overflow-x-hidden mx-auto">
        <div className="relative grid grid-cols-1 lg:grid-cols-12">
          {" "}
          <LeftSidebar />
          <MainComponent />
          <RightSidebar />
        </div>
      </div>
    </div>
  );
};

export default HomeClientComponent;
