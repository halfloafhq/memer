import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import MemeCard from "@/components/meme-card";
import { getMemes } from "./_actions";

export default async function Page() {
  const memes = await getMemes();
  return (
    <main className="w-full max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12">
      <div className="flex flex-col gap-8 md:gap-12">
        <div className="w-full">
          <form className="flex items-center justify-center gap-2 md:gap-4">
            <Input
              type="search"
              placeholder="Search for memes..."
              className="flex-1 md:max-w-[500px] rounded-md px-4 py-2 text-sm md:text-base"
            />
            <Button type="submit" className="px-4 py-2 text-sm md:text-base">
              Search
            </Button>
          </form>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {memes.map((meme, idx) => (
            <MemeCard
              key={idx}
              src={meme.url}
              name={meme.name}
              description={meme.description}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
