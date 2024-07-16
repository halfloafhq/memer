import {
  Cloud,
  CreditCard,
  FileDown,
  Info,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  MoreHorizontal,
  Plus,
  PlusCircle,
  Settings,
  Trash2,
  User,
  UserPlus,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface MemeInfoProps {
  className?: string;
}

export default function MemeInfo({ className }: MemeInfoProps) {
  return (
    <div className={cn("", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <MoreHorizontal className="h-5 w-5 cursor-pointer" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40">
          <DropdownMenuGroup>
            <DropdownMenuItem className="cursor-pointer">
              <FileDown className="mr-2 h-4 w-4" />
              <span>Download</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <Info className="mr-2 h-4 w-4" />
              <span>More</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <Trash2 className="mr-2 h-4 w-4 text-red-500" />
              <span className="text-red-500">Delete</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
