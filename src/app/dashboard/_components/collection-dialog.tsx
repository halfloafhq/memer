import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FolderPlusIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { useDashboardCtx } from "@/context/DashboardContext";

const collectionFormSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters",
  }),
});

export default function CollectionDialog() {
  const { toast } = useToast();
  const { refreshCollections } = useDashboardCtx();
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const collectionForm = useForm<z.infer<typeof collectionFormSchema>>({
    resolver: zodResolver(collectionFormSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof collectionFormSchema>) {
    setLoading(true);
    try {
      const req = await fetch("/api/collection", {
        method: "POST",
        body: JSON.stringify({
          collectionName: values.name,
        }),
      });
      if (req.status === 201) {
        refreshCollections();
        return toast({
          title: "Created collection!",
          description: `${values.name} was created successfully.`,
        });
      }
    } catch (err: any) {
      console.error(err);
      return toast({
        title: "Uh oh! Couldn't create collection",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setOpen(false);
      setLoading(false);
      collectionForm.reset();
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">
          <FolderPlusIcon className="h-5 w-5 mr-2" />
          Add collection
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a collection</DialogTitle>
          <DialogDescription>
            Create a new collection to bookmark your favorite memes.
          </DialogDescription>
        </DialogHeader>
        <Form {...collectionForm}>
          <form onSubmit={collectionForm.handleSubmit(onSubmit)}>
            <FormField
              control={collectionForm.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full flex flex-col items-center justify-center">
                  <FormControl>
                    <Input
                      className="col-span-3"
                      placeholder="Twitter"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="mt-6">
              <Button type="submit" disabled={loading}>
                {!loading ? "Create" : "Creating..."}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
