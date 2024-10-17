"use client";
import React, { useEffect } from "react";
import { useLoadingCtx } from "@/context/LoadingContext";
import Loader from "@/components/loader";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import MoreInfo from "./_components/more-info";
import { useDashboardCtx } from "@/context/DashboardContext";
import { DeleteCollection } from "./_components/delete-collection";
import { EditCollection } from "./_components/edit-collection";

export default function CollectionPage({ params }: { params: { id: string } }) {
  const { loading } = useLoadingCtx();
  const { collectionWithMemes, getCollectionById } = useDashboardCtx();

  useEffect(() => {
    async function getCollection() {
      await getCollectionById(params.id);
    }

    getCollection();
  }, []);

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 w-full min-h-screen">
      {loading ? (
        <div className="flex items-center justify-center flex-1">
          <Loader />
        </div>
      ) : !collectionWithMemes ? (
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
            <div className="flex items-center justify-between gap-4">
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                {collectionWithMemes.name}
              </h1>
              <EditCollection
                collectionId={collectionWithMemes.id}
                name={collectionWithMemes.name}
              />
              <DeleteCollection collectionId={collectionWithMemes.id} />
            </div>
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
            {collectionWithMemes.memes &&
            collectionWithMemes.memes.length >= 1 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {collectionWithMemes.memes.map((memeCollection) => (
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
                      collectionId={collectionWithMemes.id}
                      memeCollectionId={memeCollection.id}
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
