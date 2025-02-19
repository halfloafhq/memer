'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Folder, FolderOpen, Loader2 } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import { Collection } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useToast } from './ui/use-toast';
import CollectionDialog from './collection-dialog';
import { useFetchCollections } from '@/hooks/collections/useFetchCollections';
import { usePostMemeToCollection } from '@/hooks/memes/usePostMemeToCollection';

interface MemeProps {
  memeId: string;
  src: string;
  name: string;
}

export default function SaveMeme({ src, name, memeId }: MemeProps) {
  const { isLoaded, isSignedIn } = useUser();
  const { collections, refetch, loading: fetchCollectionsLoading } = useFetchCollections();
  const { postMemeToCollection, loading: postMemeLoading } = usePostMemeToCollection();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCollection, setSelectedCollection] = useState<Collection | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const { toast } = useToast();

  const filteredCollections = collections.filter((collection) =>
    collection.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenChange = (open: boolean) => {
    if (open) {
      setSelectedCollection(null);
      setSearchTerm('');
    }
    setOpen(open);
  };

  async function handleSaveMeme() {
    if (selectedCollection) {
      await postMemeToCollection(memeId, selectedCollection.id, name, selectedCollection.name);
      setOpen(false);
    } else {
      return toast({
        title: 'Please select a collection',
        description: 'Please select a collection to save your meme.',
        variant: 'destructive',
      });
    }
  }

  const renderDialogContent = () => {
    if (!isLoaded || fetchCollectionsLoading) {
      return <div>Loading...</div>;
    }

    if (!isSignedIn) {
      return (
        <div className="text-center">
          <p>Please log in to save memes to your collection.</p>
          <Button
            onClick={() => {
              router.push('/sign-in');
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
          <p className="mb-4">You have no collections. Create a collection to save memes.</p>
          <CollectionDialog onSuccess={refetch} />
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
                  ? 'bg-primary text-white hover:bg-primary/80 hover:text-white'
                  : ''
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
          <CollectionDialog onSuccess={refetch} text="Add" />
          <Button onClick={handleSaveMeme} disabled={postMemeLoading}>
            {postMemeLoading ? (
              <span className="flex items-center justify-center">
                <Loader2 className="mr-2 animate-spin" />
                Saving
              </span>
            ) : (
              <span className="flex items-center justify-center">
                <Folder className="mr-2 h-5 w-5" />
                Save meme
              </span>
            )}
          </Button>
        </DialogFooter>
      </>
    );
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          className="bg-gray-600 hover:bg-gray-800 text-white focus:bg-gray-900"
        >
          <FolderOpen className="mr-2" /> Save to Collection
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Choose a collection</DialogTitle>
          <DialogDescription>Search and select a collection to save your meme.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">{renderDialogContent()}</div>
      </DialogContent>
    </Dialog>
  );
}
