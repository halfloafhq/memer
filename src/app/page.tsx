import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getMemes, searchMemes } from "./_actions";
import Memes from "@/components/memes";
import LoadMore from "@/components/load-more";
import { NoResult } from "@/components/no-result";

export default async function Page({
  searchParams,
}: {
  searchParams: { search?: string };
}) {
  const search = searchParams.search || "";
  const memes = search ? await searchMemes(search) : await getMemes(0);

  return (
    <main className="w-full min-h-screen max-w-6xl mx-auto px-6 py-8 md:py-12">
      <div className="flex flex-col gap-8 md:gap-12 min-h-[calc(100vh-8rem)]">
        <div className="w-full">
          <form
            action=""
            className="flex items-center justify-center gap-2 md:gap-4"
          >
            <Input
              type="search"
              name="search"
              placeholder="Search for memes..."
              className="flex-1 max-w-[500px] rounded-md px-4 py-2 text-sm md:text-base"
            />
            <Button type="submit" className="px-4 py-2 text-sm md:text-base">
              Search
            </Button>
          </form>
        </div>
        <div className="flex-1 flex flex-col">
          {memes.length > 0 ? (
            <div className="flex flex-wrap justify-center sm:justify-start gap-3 md:gap-4">
              <Memes memes={memes} />
              {!search && <LoadMore />}
            </div>
          ) : (
            <NoResult />
          )}
        </div>
      </div>
    </main>
  );
}
