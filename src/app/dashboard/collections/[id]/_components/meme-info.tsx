import { FileDown, Info, MoreHorizontal, Trash2 } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { downloadMeme } from "@/utils/download";

interface MemeInfoProps {
  src: string;
  name: string;
  className?: string;
}

export default function MemeInfo({ src, name, className }: MemeInfoProps) {
  const { toast } = useToast();
  const handleDownload = async () => {
    try {
      const success = await downloadMeme(src, name);
      if (!success) {
        return toast({
          title: "Download Failed",
          description:
            "There was an error downloading the image. Please try again.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Downloaded!",
          description: `${name} has been downloaded successfully!`,
        });
      }
    } catch (error) {
      console.error("Download failed:", error);
      return toast({
        title: "Download Failed",
        description:
          "There was an error downloading the image. Please try again.",
        variant: "destructive",
      });
    }
  };
  return (
    <div className={cn("", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <MoreHorizontal className="h-5 w-5 cursor-pointer" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40">
          <DropdownMenuGroup>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={handleDownload}
            >
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
