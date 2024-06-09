import { Button } from "@/components/ui/button";

export default function Dashboard() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 w-full">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Collections</h1>
      </div>
      <div
        className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
        x-chunk="dashboard-02-chunk-1"
      >
        <div className="flex flex-col items-center gap-1 text-center p-10">
          <h3 className="text-2xl font-bold tracking-tight">
            You have no collections
          </h3>
          <p className="text-sm text-muted-foreground">
            You can start saving memes to a collection
          </p>
          <Button className="mt-4">Add Collection</Button>
        </div>
      </div>
    </main>
  );
}
