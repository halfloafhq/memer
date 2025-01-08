import { FileDown, Info, MoreHorizontal, Trash2 } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { downloadMeme } from "@/utils/download";
import { removeMemeFromCollectionAction } from "../_actions";

interface MoreInfoProps {
  src: string;
  name: string;
  description: string;
  collectionId: string;
  memeCollectionId: string;
  className?: string;
  onDeleteSuccess: (id: string) => Promise<void>;
}

export default function MoreInfo({
  src,
  name,
  description,
  collectionId,
  memeCollectionId,
  className = "",
  onDeleteSuccess,
}: MoreInfoProps) {
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

  const handleRemove = async () => {
    try {
      const status = await removeMemeFromCollectionAction({
        memeId: memeCollectionId,
        collectionId,
        memeCollectionId,
      });
      if (!status.success) {
        return toast({
          title: "Remove Failed",
          description: status.message,
          variant: "destructive",
        });
      } else {
        onDeleteSuccess(collectionId);
        return toast({
          title: "Removed!",
          description: `${name} has been removed successfully!`,
        });
      }
    } catch (error) {
      console.error("Remove failed:", error);
      return toast({
        title: "Remove Failed",
        description: "There was an error removing the image. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className={className}>
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
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="cursor-pointer">
                <Info className="mr-2 h-4 w-4" />
                <span>More</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className="w-60">
                  <DropdownMenuLabel className="text-black dark:text-white">
                    Description
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <p className="text-gray-600 dark:text-white">
                      {description}
                    </p>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" onClick={handleRemove}>
              <Trash2 className="mr-2 h-4 w-4 text-red-500" />
              <span className="text-red-500">Remove</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
