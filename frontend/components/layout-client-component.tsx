"use client";
import { ReactNode } from "react";
import TopNavbar from "./navbar/top-navbar";
import LogoSidebar from "./navbar/logo-sidebar";
import SearchModalComponent from "./navbar/search-modal";

const LayoutClientComponent = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-[70px_1fr]">
        <LogoSidebar />
        <SearchModalComponent />
        <div>
          <TopNavbar />
          {children}
        </div>
      </div>
    </>
  );
};

export default LayoutClientComponent;
