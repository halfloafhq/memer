import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Library, Menu, Pencil } from "lucide-react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function DashboardSheet() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname().split("/")[2];
  const router = useRouter();

  const tools = [
    {
      icon: <Library className="h-5 w-5" />,
      name: "Collections",
      active: pathname === "collections",
      path: "/dashboard/collections",
    },
    {
      icon: <Pencil className="h-5 w-5" />,
      name: "Editor",
      active: pathname === "editor",
      path: "/dashboard/editor",
    },
  ];

  function reRoute(destination: string) {
    router.push(destination);
    setOpen(false);
  }

  return (
    <Sheet onOpenChange={setOpen} open={open}>
      <SheetTrigger>
        <Menu className="h-5 w-5" />
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>TOOLS</SheetTitle>
        </SheetHeader>
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
      </SheetContent>
    </Sheet>
  );
}
