"use client";
import Link from "next/link";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import MemerIcon from "./MemerIcon";
import { User } from "lucide-react";
import { useClerk, useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { signOut } = useClerk();
  const { user } = useUser();
  const [signedIn, setSignedIn] = useState<boolean>(false);
  const { toast } = useToast();
  const router = useRouter();

  function dashboard() {
    router.push("/dashboard")
  }

  async function logout() {
    await signOut({ redirectUrl: "/" });
    setSignedIn(false);
    return toast({
      title: "Logged out successfully",
      variant: "default",
    })
  }

  useEffect(() => {
    if (user) {
      setSignedIn(true);
    }
  }, [user,setSignedIn]);

  return (
    <header className="flex h-16 w-full shrink-0 items-center px-4 md:px-6 bg-gray-950 text-gray-50">
      <Link href="/" className="flex items-center gap-2" prefetch={false}>
        <MemerIcon className="h-6 w-6" />
        <span className="text-lg font-semibold">Memer</span>
      </Link>
      <div className="ml-auto">
        {signedIn ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="h-9 w-9 cursor-pointer">
                <User className="h-full w-full text-gray-50" />
                <span className="sr-only">Toggle user menu</span>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={dashboard}>Dashboard</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link href="/sign-in" className="text-sm font-medium">
            Login
          </Link>
        )}
      </div>
    </header>
  );
}
