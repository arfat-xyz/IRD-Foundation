"use client";
import React from "react";
import { Icons } from "../icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
const sidebarIcons: {
  iconName: keyof typeof Icons;
  href: string;
}[] = [
  {
    iconName: "duaCatIcon",
    href: "/",
  },
  {
    iconName: "challangeIcon",
    href: "#",
  },
  {
    iconName: "lampChargeIcon",
    href: "#",
  },
  {
    iconName: "archiveMinusIcon",
    href: "#",
  },
  {
    iconName: "hospitalIcon",
    href: "#",
  },
  {
    iconName: "bookIcon",
    href: "#",
  },
];
const LogoSidebar = () => {
  const pathName = usePathname();
  return (
    <div className="hidden p-3 h-screen lg:sticky top-0 left-0 lg:grid grid-rows-[50px_1fr]">
      <Icons.logoIcon className="size-11 text-primary" />
      <div className=" h-full flex flex-col gap-6 justify-center items-center">
        {sidebarIcons.map((info, i) => {
          const SideBarIcon = Icons[info.iconName];
          return (
            <Link href={info.href} key={i}>
              <SideBarIcon
                className={`size-11 p-2 text-[#417360] ${
                  pathName === info.href ? "bg-[#D8E7D3] rounded-10" : ""
                }`}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default LogoSidebar;
