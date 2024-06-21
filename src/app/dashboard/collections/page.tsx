"use client";
import { useEffect, useState } from "react";
import CollectionDialog from "../_components/CollectionDialog";
import { Collection } from "@prisma/client";
import { useToast } from "@/components/ui/use-toast";

export default function Dashboard() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    async function getCollections() {
      try {
        const req = await fetch("/api/collection/all");
        const res = await req.json();
        setCollections(res.data);
      } catch (err: any) {
        console.error(err);
        toast({
          title: "Uh oh! Couldn't get collections",
          description: err.message,
          variant: "destructive",
        });
        return;
      }
    }

    getCollections();
  }, []);

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 w-full">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Collections</h1>
      </div>
      {collections.length === 0 ? (
        <div
          className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
          x-chunk="dashboard-02-chunk-1"
        >
          <div className="flex flex-col items-center gap-5 text-center p-10">
            <h3 className="text-2xl font-bold tracking-tight">
              You have no collections
            </h3>
            <p className="text-sm text-muted-foreground">
              You can start saving memes to a collection
            </p>
            <CollectionDialog />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {collections.map((collection) => (
            <div
              key={collection.id}
              className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-300 ease-in-out cursor-pointer"
            >
              <p className="text-2xl font-semibold text-gray-800 text-center">
                {collection.name}
              </p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
