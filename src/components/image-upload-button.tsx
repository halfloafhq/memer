import { UploadButton } from "@/utils/uploadthing";
import { useToast } from "./ui/use-toast";

interface UploadBtnProps {
  setFileUrl: (url: string | null) => void;
  setSuccess: (success: boolean) => void;
}

export default function UploadBtn({ setFileUrl, setSuccess }: UploadBtnProps) {
  const { toast } = useToast();

  return (
    <UploadButton
      className="mt-4 ut-button:bg-primary ut-button:ut-readying:bg-secondary ut-button:hover:bg-primary/50 cursor-pointer"
      endpoint="imageUploader"
      onClientUploadComplete={(res) => {
        console.log("Upload completed:", res);
        if (res && res.length > 0) {
          setFileUrl(res[0].url);
          setSuccess(true);
          toast({
            title: "Upload Completed",
            description: "Image uploaded successfully!",
          });
        }
      }}
      onUploadError={(error: Error) => {
        // Do something with the error.
        toast({
          title: "Uh oh! Something went wrong",
          description: error.message,
          variant: "destructive",
        });
      }}
      onBeforeUploadBegin={(files) => {
        // Preprocess files before uploading (e.g. rename them)
        return files.map(
          (f) => new File([f], "renamed-" + f.name, { type: f.type }),
        );
      }}
      onUploadBegin={(name) => {
        // Do something once upload begins
        console.log("Uploading: ", name);
      }}
    />
  );
};