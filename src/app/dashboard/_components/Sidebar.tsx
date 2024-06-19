"use client";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Library, Pencil } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname().split("/")[2];
  const router = useRouter();
  const tools = [
    {
      icon: <Library />,
      name: "Collections",
      active: pathname === "collections",
      path: "/dashboard/collections",
    },
    {
      icon: <Pencil />,
      name: "Editor",
      active: pathname === "editor",
      path: "/dashboard/editor",
    },
  ];

  function reRoute(destination: string) {
    router.push(destination);
  }

  return (
    <div className="w-1/5 h-screen p-8 flex flex-col items-start justify-start border-solid border-2 border-[#F5F5F5] gap-y-10">
      <div className="w-full">
        <h3 className="text-[#91908F] font-bold text-lg p-4">TOOLS</h3>
        <div className="mt-6 flex flex-col items-start justify-center gap-y-3">
          {tools.map((tool, idx) => (
            <div
              key={idx}
              className={cn(
                "p-4 w-full flex items-center justify-start gap-x-4 rounded-lg transition duration-200 ease-in-out cursor-pointer",
                tool.active
                  ? "bg-[#F5F5F5] text-[#363430]"
                  : "text-[#91908F] hover:text-[#363430]",
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
