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
import { useDeleteCollection } from "@/hooks/collections/useDeleteCollection";
import { useFetchCollections } from "@/hooks/collections/useFetchCollections";
import { Loader2, Trash } from "lucide-react";
import React, { useState } from "react";

interface DeleteCollectionProps {
  collectionId: string;
}

export function DeleteCollection({ collectionId }: DeleteCollectionProps) {
  const [open, setOpen] = useState<boolean>(false);
  const { loading, deleteCollection } = useDeleteCollection();
  const { refetch } = useFetchCollections();
  const { toast } = useToast();

  async function handleDeleteCollection() {
    try {
      await deleteCollection(collectionId);
      await refetch();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setOpen(false);
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
