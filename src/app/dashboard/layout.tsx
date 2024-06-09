import Navbar from "@/components/Navbar";
import React from "react";
import Sidebar from "./_components/Sidebar";

function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1">{children}</main>
    </div>
  );
}

export default DashboardLayout;
