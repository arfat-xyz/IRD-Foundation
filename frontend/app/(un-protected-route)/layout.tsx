import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

const UnProtectedRoute = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  if (session?.user?.id) {
    redirect("/");
  }
  return <>{children}</>;
};

export default UnProtectedRoute;
