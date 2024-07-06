import React from "react";
import AdminSidebar from "./_components/admin-sidebar";
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
    <div className="flex items-start justify-between">
      <div className="min-w-[320px] min-h-screen">
      <AdminSidebar />
      </div>
      <main className="w-full h-full">{children}</main>
    </div>
  );
}

export default AdminDashboardLayout;
