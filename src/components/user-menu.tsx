import { useClerk, useSession, useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  LayoutDashboardIcon,
  LogOutIcon,
  ShieldCheck,
  User,
} from "lucide-react";
import Link from "next/link";
import {
  DropdownMenuGroup,
  DropdownMenuLabel,
} from "@radix-ui/react-dropdown-menu";
import { Spinner } from "./spinner";

export default function UserMenu() {
  const { signOut } = useClerk();
  const { user, isLoaded } = useUser();
  const [signedIn, setSignedIn] = useState<boolean>(false);
  const { session } = useSession();
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
    if (session) {
      setSignedIn(true);
    } else {
      setSignedIn(false);
    }
  }, [session, setSignedIn]);

  if (!isLoaded) {
    return (
      <div className="flex items-center gap-2">
        <Spinner />
      </div>
    );
  }

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
        <User className="h-9 w-9 cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mr-4">
        <DropdownMenuLabel className="font-bold p-2">
          My Account
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {user?.publicMetadata.role === "admin" ? (
            <>
              <DropdownMenuItem
                onClick={adminDashboard}
                className="cursor-pointer text-md"
              >
                <ShieldCheck className="h-5 w-5 mr-2 text-foreground" />
                <span>Admin Dashboard</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          ) : null}
          <DropdownMenuItem
            onClick={dashboard}
            className="cursor-pointer text-md"
          >
            <LayoutDashboardIcon className="h-5 w-5 mr-2 text-primary" />
            <span>Dashboard</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={logout} className="cursor-pointer text-md">
            <LogOutIcon className="h-5 w-5 mr-2 text-red-500" />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
