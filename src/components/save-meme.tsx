"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FolderOpen } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { Collection } from "@prisma/client";
import { getCollections } from "@/app/_actions";
import { useRouter } from "next/navigation";
import { useToast } from "./ui/use-toast";

interface MemeProps {
  memeId: string;
  src: string;
  name: string;
}

export default function SaveMeme({ src, name, memeId }: MemeProps) {
  const { user, isLoaded, isSignedIn } = useUser();
  const [collections, setCollections] = useState<Collection[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCollection, setSelectedCollection] =
    useState<Collection | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { toast } = useToast();

  const filteredCollections = collections.filter((collection) =>
    collection.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleOpenChange = (open: boolean) => {
    if (open) {
      setSelectedCollection(null);
      setSearchTerm("");
    }
    setOpen(open);
  };

  async function handleSaveMeme() {
    if (selectedCollection) {
      try {
        setLoading(true);
        const req = await fetch(`/api/collection/${selectedCollection.id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            collectionId: selectedCollection.id,
            memeId: memeId,
          }),
        });
        if (!req.ok) {
          const res = await req.json();
          return toast({
            title: "Save Failed",
            description:
              res.message ||
              "There was an error saving the meme to the collection. Please try again.",
            variant: "destructive",
          });
        }
        toast({
          title: "Saved!",
          description: `${name} has been saved to ${selectedCollection.name}.`,
        });
        setOpen(false);
      } catch (error) {
        console.error("Save failed:", error);
        return toast({
          title: "Save Failed",
          description:
            "There was an error saving the meme to the collection. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    } else {
      return toast({
        title: "Please select a collection",
        description: "Please select a collection to save your meme.",
        variant: "destructive",
      });
    }
  }

  useEffect(() => {
    const loadCollections = async () => {
      if (user) {
        const fetchedCollections = await getCollections(user.id);
        setCollections(fetchedCollections);
      }
    };
    if (isLoaded && isSignedIn) {
      loadCollections();
    }
  }, [user, isLoaded, isSignedIn]);

  const renderDialogContent = () => {
    if (!isLoaded) {
      return <div>Loading...</div>;
    }

    if (!isSignedIn) {
      return (
        <div className="text-center">
          <p>Please log in to save memes to your collection.</p>
          <Button
            onClick={() => {
              router.push("/sign-in");
            }}
            className="mt-4"
          >
            Log In
          </Button>
        </div>
      );
    }

    if (collections.length === 0) {
      return (
        <div className="text-center">
          <p>You have no collections. Create a collection to save memes.</p>
          <Button
            onClick={() => {
              /* Add your create collection logic here */
            }}
            className="mt-4"
          >
            Create Collection
          </Button>
        </div>
      );
    }

    return (
      <>
        <div className="flex flex-col gap-4">
          <Label htmlFor="search" className="text-left">
            Search
          </Label>
          <Input
            id="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search collections..."
            className="col-span-3"
          />
        </div>
        <ScrollArea className="h-[200px] w-full border rounded-md p-4">
          {filteredCollections.map((collection) => (
            <div
              key={collection.id}
              className={`p-2 cursor-pointer dark:hover:bg-primary hover:bg-gray-100 rounded ${
                selectedCollection?.id === collection.id
                  ? "bg-blue-100 dark:bg-primary"
                  : ""
              }`}
              onClick={() => {
                if (selectedCollection?.id !== collection.id) {
                  setSelectedCollection(collection);
                } else {
                  setSelectedCollection(null);
                }
              }}
            >
              {collection.name}
            </div>
          ))}
        </ScrollArea>
        <DialogFooter>
          <Button onClick={handleSaveMeme} disabled={loading}>
            {loading ? "Saving..." : "Save meme"}
          </Button>
        </DialogFooter>
      </>
    );
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="secondary" className="bg-gray-700 text-white">
          <FolderOpen className="mr-2" /> Save to Collection
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Choose a collection</DialogTitle>
          <DialogDescription>
            Search and select a collection to save your meme.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">{renderDialogContent()}</div>
      </DialogContent>
    </Dialog>
  );
}
