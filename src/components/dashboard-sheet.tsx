import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { FileUp, Library, Menu, Pencil, User } from "lucide-react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function DashboardSheet() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const currentPath = pathname.split("/")[2];
  const currentPathAdmin = pathname.split("/")[3];
  const adminPath = pathname.split("/")[1] === "admin";

  const tools = [
    {
      icon: <Library className="h-5 w-5" />,
      name: "Collections",
      active: currentPath === "collections",
      path: "/dashboard/collections",
    },
    {
      icon: <Pencil className="h-5 w-5" />,
      name: "Editor",
      active: currentPath === "editor",
      path: "/dashboard/editor",
    },
  ];

  const panel = [
    {
      icon: <FileUp />,
      name: "Upload",
      active: currentPathAdmin === "upload",
      path: "/admin/dashboard/upload",
    },
    {
      icon: <User />,
      name: "Users",
      active: currentPathAdmin === "users",
      path: "/admin/dashboard/users",
    },
  ];

  function reRoute(destination: string) {
    router.push(destination);
    setOpen(false);
  }

  if (pathname.split("/").length < 3) {
    return null;
  }

  return (
      <Sheet onOpenChange={setOpen} open={open}>
        <SheetTrigger>
          <Menu className="h-9 w-9 cursor-pointer block xl:hidden" />
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>{adminPath ? "ADMIN PANEL" : "TOOLS"}</SheetTitle>
          </SheetHeader>
          <div className="mt-6 flex flex-col items-start justify-center gap-y-3">
            {adminPath
              ? panel.map((tool, idx) => (
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
                ))
              : tools.map((tool, idx: number) => (
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
        </SheetContent>
      </Sheet>
  );
}
