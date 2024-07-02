import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function AdminDashboardUploadPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center">
        <h1 className="font-semibold text-lg md:text-2xl">Upload Meme</h1>
      </div>
      <div className="border shadow-sm rounded-lg p-6">
        <form className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="meme-image">Meme Image</Label>
            <Input id="meme-image" type="file" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="meme-name">Meme Name</Label>
            <Input id="meme-name" type="text" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="meme-tags">Meme Tags</Label>
            <div />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="meme-description">Meme Description</Label>
            <Textarea id="meme-description" className="min-h-[100px]" />
          </div>
          <Button type="submit" className="mt-4">
            Upload Meme
          </Button>
        </form>
      </div>
    </main>
  );
}
