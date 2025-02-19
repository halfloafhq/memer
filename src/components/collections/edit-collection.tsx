import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Edit, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useUpdateCollection } from '@/hooks/collections/useUpdateCollection';

interface EditCollectionProps {
  collectionId: string;
  name: string;
  onSuccess: (id: string) => Promise<void>;
}

const collectionFormSchema = z.object({
  name: z.string().min(3, {
    message: 'Name must be at least 3 characters',
  }),
});

export function EditCollection({ name, collectionId, onSuccess }: EditCollectionProps) {
  const { toast } = useToast();
  const { updateCollection, loading } = useUpdateCollection();
  const [open, setOpen] = useState<boolean>(false);
  const collectionForm = useForm<z.infer<typeof collectionFormSchema>>({
    resolver: zodResolver(collectionFormSchema),
    defaultValues: {
      name,
    },
  });

  async function onSubmit(values: z.infer<typeof collectionFormSchema>) {
    try {
      await updateCollection(collectionId, { collectionName: values.name });
      setOpen(false);
      await onSuccess(collectionId);
    } catch (err: any) {
      console.error(err);
      return toast({
        title: "Uh oh! Couldn't create collection",
        description: err.message,
        variant: 'destructive',
      });
    } finally {
      collectionForm.reset();
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <Edit className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit collection</DialogTitle>
          <DialogDescription>Edit this collection&apos;s name</DialogDescription>
        </DialogHeader>
        <Form {...collectionForm}>
          <form onSubmit={collectionForm.handleSubmit(onSubmit)}>
            <FormField
              control={collectionForm.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full flex flex-col items-center justify-center">
                  <FormControl>
                    <Input className="col-span-3" placeholder="Twitter" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="mt-6">
              <Button type="submit" disabled={loading}>
                {!loading ? (
                  'Edit'
                ) : (
                  <span className="flex items-center">
                    <Loader2 className="mr-2 animate-spin" /> Editing
                  </span>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
