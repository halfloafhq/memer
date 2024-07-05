"use client";
import { useLoadingCtx } from "@/context/LoadingContext";
import CollectionDialog from "../_components/collection-dialog";
import { useDashboardCtx } from "@/context/DashboardContext";
import Loader from "@/components/loader";
import { useRouter } from "next/navigation";

export default function CollectionsPage() {
  const { collections } = useDashboardCtx();
  const { loading } = useLoadingCtx();
  const router = useRouter();

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 w-full min-h-screen">
      {loading ? (
        <div className="flex items-center justify-center flex-1">
          <Loader />
        </div>
      ) : collections.length === 0 ? (
        <>
          <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl">Collections</h1>
          </div>
          <div
            className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
            x-chunk="dashboard-02-chunk-1"
          >
            <div className="flex flex-col items-center gap-5 text-center p-10">
              <h3 className="text-3xl font-bold tracking-tight">
                You have no collections
              </h3>
              <p className="text-sm text-muted-foreground">
                You can start saving memes to a collection
              </p>
              <CollectionDialog />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Collections</h2>
            <CollectionDialog />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {collections.map((collection) => (
              <div
                key={collection.id}
                className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-300 ease-in-out cursor-pointer dark:bg-primary"
                onClick={() =>
                  router.push(`/dashboard/collections/${collection.id}`)
                }
              >
                <p className="text-2xl font-semibold text-gray-800 text-center dark:text-white">
                  {collection.name}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </main>
  );
}
