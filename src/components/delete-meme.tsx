import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Loader, Trash } from "lucide-react";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDeleteMeme } from "@/hooks/memes/useDeleteMeme";

interface DeleteMemeProps {
  memeId: string;
}

export function DeleteMeme({ memeId }: DeleteMemeProps) {
  const { toast } = useToast();
  const { deleteMeme, loading } = useDeleteMeme();
  const router = useRouter();

  const [open, setOpen] = useState<boolean>(false);

  async function handleDeleteMeme() {
    try {
      setOpen(true);
      await deleteMeme(memeId);
      setOpen(false);
      router.push("/");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">
          <Trash className="h-5 w-5 mr-2" /> Delete meme
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the meme
            from the database.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteMeme}
            className="bg-red-600 dark:bg-red-600"
          >
            {loading ? (
              <span>
                <Loader className="animate-spin mr-2" />
                Deleting
              </span>
            ) : (
              "Delete"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
