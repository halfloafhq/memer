import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useDashboardCtx } from "@/context/DashboardContext";
import { Loader2, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface DeleteCollectionProps {
  collectionId: string;
}

export function DeleteCollection({ collectionId }: DeleteCollectionProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const { refreshCollections } = useDashboardCtx();
  const router = useRouter();

  async function handleDeleteCollection() {
    try {
      setLoading(true);
      const res = await fetch("/api/collection", {
        method: "DELETE",
        body: JSON.stringify({
          collectionId,
        }),
      });
      if (res.ok) {
        toast({
          title: "Collection deleted!",
          description: "Collection was successfully deleted",
        });
        await refreshCollections();
        router.push("/dashboard/collections");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setOpen(false);
      setLoading(false);
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Trash className="text-red-500 cursor-pointer hover:text-red-700" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            variant="destructive"
            disabled={loading}
            className="bg-red-500 hover:bg-red-700 focus:bg-red-900 transition-colors"
            onClick={handleDeleteCollection}
          >
            {loading ? (
              <span className="flex items-center">
                <Loader2 className="animate-spin mr-2" />
                Deleting
              </span>
            ) : (
              "Delete"
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
