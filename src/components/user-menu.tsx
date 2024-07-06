import { useClerk, useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { useToast } from "./ui/use-toast";
import { usePathname, useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar } from "@/components/ui/avatar";
import {
  LayoutDashboardIcon,
  LogOutIcon,
  ShieldCheck,
  User,
} from "lucide-react";
import Link from "next/link";

export default function UserMenu() {
  const { signOut } = useClerk();
  const { user } = useUser();
  const [signedIn, setSignedIn] = useState<boolean>(false);
  const { toast } = useToast();
  const router = useRouter();

  function adminDashboard() {
    if (user?.publicMetadata.role === "admin") {
      router.push("/admin/dashboard/upload");
    } else {
      router.push("/dashboard/collections");
    }
  }

  function dashboard() {
    router.push("/dashboard/collections");
  }

  async function logout() {
    await signOut({ redirectUrl: "/" });
    setSignedIn(false);
    return toast({
      title: "Logged out successfully",
      variant: "default",
    });
  }

  useEffect(() => {
    if (user) {
      setSignedIn(true);
    }
  }, [user, setSignedIn]);

  if (!signedIn) {
    return (
      <Link href="/sign-in" className="text-sm text-white">
        Login
      </Link>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-9 w-9 cursor-pointer">
          <User className="h-full w-full text-gray-50" />
          <span className="sr-only">Toggle user menu</span>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {user?.publicMetadata.role === "admin" ? (
          <>
            <DropdownMenuItem
              onClick={adminDashboard}
              className="cursor-pointer text-md"
            >
              <ShieldCheck className="h-5 w-5 mx-2 text-foreground" />
              Admin Dashboard
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        ) : null}
        <DropdownMenuItem
          onClick={dashboard}
          className="cursor-pointer text-md"
        >
          <LayoutDashboardIcon className="h-5 w-5 mx-2 text-primary" />
          Dashboard
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout} className="cursor-pointer text-md">
          <LogOutIcon className="h-5 w-5 mx-2 text-red-500" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
