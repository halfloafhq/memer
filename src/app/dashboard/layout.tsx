import React from "react";
import Sidebar from "./_components/sidebar";
import { DashboardProvider } from "@/context/DashboardContext";

function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DashboardProvider>
      <div className="flex items-start justify-between">
        <div className="min-w-[320px] min-h-screen">
          <Sidebar />
        </div>
        <main className="w-full h-full">{children}</main>
      </div>
    </DashboardProvider>
  );
}

export default DashboardLayout;
