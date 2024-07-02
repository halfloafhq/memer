import React from "react";
import AdminSidebar from "./_components/AdminSidebar";
import { checkRole } from "@/utils/roles";
import { redirect } from "next/navigation";

function AdminDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  if (!checkRole("admin")) {
    redirect("/");
  }

  return (
    <div className="flex flex-1">
      <AdminSidebar />
      <main className="flex-1">{children}</main>
    </div>
  );
}

export default AdminDashboardLayout;
