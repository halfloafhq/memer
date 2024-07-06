"use client";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { FileUp, User } from "lucide-react";

export default function AdminSidebar() {
  const pathname = usePathname().split("/")[3];
  const router = useRouter();
  const panel = [
    {
      icon: <FileUp />,
      name: "Upload",
      active: pathname === "upload",
      path: "/admin/dashboard/upload",
    },
    {
      icon: <User />,
      name: "Users",
      active: pathname === "users",
      path: "/admin/dashboard/users",
    },
  ];

  function reRoute(destination: string) {
    router.push(destination);
  }

  return (
    <div className="hidden w-1/5 h-auto py-6 xl:px-6 xl:flex flex-col items-start justify-start border-solid border-r border-gray-200 gap-y-10">
      <div className="w-full">
        <h3 className="text-[#91908F] font-bold text-lg p-4">ADMIN PANEL</h3>
        <div className="mt-6 flex flex-col items-start justify-center gap-y-3">
          {panel.map((tool, idx) => (
            <div
              key={idx}
              className={cn(
                "p-4 w-full flex items-center justify-start gap-x-4 rounded-lg transition duration-200 ease-in-out cursor-pointer",
                tool.active
                  ? "bg-[#F5F5F5] text-[#363430]"
                  : "text-[#91908F] hover:text-[#363430] dark:hover:text-white",
              )}
              onClick={() => reRoute(tool.path)}
            >
              {tool.icon}
              <h3 className="text-xl font-medium">{tool.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
