import React from 'react';
import { checkRole } from '@/utils/roles';
import { redirect } from 'next/navigation';
import AdminSidebar from '@/components/dashboard/admin-sidebar';

function AdminDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (!checkRole('admin')) {
    redirect('/');
  }

  return (
    <div className="flex items-start justify-between">
      <div className="hidden xl:min-w-[320px] xl:block min-h-screen">
        <AdminSidebar />
      </div>
      <main className="w-full h-full">{children}</main>
    </div>
  );
}

export default AdminDashboardLayout;
