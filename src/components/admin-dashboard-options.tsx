import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Library, Menu, Pencil } from "lucide-react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export function AdminDashboardOptions() {
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
    <DropdownMenu>
      <DropdownMenuTrigger><Menu className="h-5 w-5" /></DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
