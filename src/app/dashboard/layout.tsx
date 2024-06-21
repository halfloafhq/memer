import React from "react";
import Sidebar from "./_components/Sidebar";
import { DashboardProvider } from "@/context/DashboardContext";

function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DashboardProvider>
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1">{children}</main>
    </div>
    </DashboardProvider>
  );
}

export default DashboardLayout;
