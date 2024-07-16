"use client";
import React, { useEffect, useState } from "react";
import { useLoadingCtx } from "@/context/LoadingContext";
import Loader from "@/components/loader";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { ChevronLeft } from "lucide-react";
import { CollectionWithMemes } from "@/types/collection";
import Image from "next/image";
import MoreInfo from "./_components/more-info";

export default function CollectionPage({ params }: { params: { id: string } }) {
  const { loading, setLoading } = useLoadingCtx();
  const [collection, setCollection] = useState<CollectionWithMemes | undefined>(
    undefined,
  );
  const { toast } = useToast();

  useEffect(() => {
    async function getCollectionById(id: string) {
      setLoading(true);
      try {
        const req = await fetch(`/api/collection/${id}`);
        const res = await req.json();
        console.log(res);
        if (req.status === 200) {
          setCollection(res.data);
        }
      } catch (err: any) {
        console.error(err);
        toast({
          title: "Uh oh! Couldn't get collection",
          description: err.message,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }
    getCollectionById(params.id);
  }, [params.id, toast, setCollection, setLoading]);

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 w-full min-h-screen">
      {loading ? (
        <div className="flex items-center justify-center flex-1">
          <Loader />
        </div>
      ) : !collection ? (
        <div className="flex flex-col items-center justify-center flex-1">
          <h1 className="text-2xl font-bold mb-4 dark:text-white">
            Collection not found
          </h1>
          <Link
            href="/dashboard/collections"
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-200 dark:text-white"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            <span className="hidden sm:block text-xl">Back to Collections</span>
            <span className="block sm:hidden text-lg">Back</span>
          </Link>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              {collection.name}
            </h1>
            <Link
              href="/dashboard/collections"
              className="flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-200 dark:text-white"
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              <span className="hidden sm:block text-xl">
                Back to Collections
              </span>
              <span className="block sm:hidden text-lg">Back</span>
            </Link>
          </div>
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4 dark:text-white">
              Memes in this Collection
            </h2>
            {collection.memes && collection.memes.length >= 1 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {collection.memes.map((memeCollection) => (
                  <div
                    key={memeCollection.id}
                    className="border rounded-lg p-4 shadow-sm dark:bg-secondary dark:border-gray-700 relative"
                  >
                    <div className="relative aspect-square mb-2">
                      <Image
                        src={memeCollection.meme.url}
                        alt={memeCollection.meme.name || "Meme"}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-md"
                      />
                    </div>
                    <p className="text-center dark:text-white">
                      {memeCollection.meme.name || "Meme"}
                    </p>
                    <MoreInfo
                      src={memeCollection.meme.url}
                      name={memeCollection.meme.name}
                      description={memeCollection.meme.description}
                      className="absolute top-2 right-2 p-1 rounded-full bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200 border border-black/15"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">
                No memes in this collection yet.
              </p>
            )}
          </div>
        </>
      )}
    </main>
  );
}
