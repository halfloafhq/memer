import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const codeSchema = z.object({
  code: z.string().min(6, "Verification code must be at least 6 characters"),
});

type CodeFormValues = z.infer<typeof codeSchema>;

interface CodeStepProps {
  onSubmit: (code: string) => void;
  loading: boolean;
}

export const CodeStep: React.FC<CodeStepProps> = ({ onSubmit, loading }) => {
  const form = useForm<CodeFormValues>({
    resolver: zodResolver(codeSchema),
    defaultValues: {
      code: "",
    },
  });

  const handleSubmit = (values: CodeFormValues) => {
    onSubmit(values.code);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Verification Code</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter verification code"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full text-white font-semibold btn btn-reverse btn-arrow"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update"}
        </Button>
      </form>
    </Form>
  );
};
