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

interface MemeProps {
  src: string;
  name: string;
}

export default function SaveMeme({ src, name }: MemeProps) {
  const { user, isLoaded, isSignedIn } = useUser();
  const [collections, setCollections] = useState<Collection[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCollection, setSelectedCollection] = useState<string | null>(
    null,
  );
  const router = useRouter();

  const filteredCollections = collections.filter((collection) =>
    collection.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  function handleSaveMeme() {
    if (selectedCollection) {
      console.log(`Save meme "${name}" to collection "${selectedCollection}"`);
    } else {
      console.log("Please select a collection");
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
                selectedCollection === collection.id
                  ? "bg-blue-100 dark:bg-primary"
                  : ""
              }`}
              onClick={() => {
                if (selectedCollection !== collection.id) {
                  setSelectedCollection(collection.id);
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
          <Button onClick={handleSaveMeme}>Save meme</Button>
        </DialogFooter>
      </>
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">
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
