import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const emailSchema = z.object({
  email: z.string().email('Invalid email address'),
});

type EmailFormValues = z.infer<typeof emailSchema>;

interface EmailStepProps {
  onSubmit: (email: string) => void;
  loading: boolean;
}

export const EmailStep: React.FC<EmailStepProps> = ({ onSubmit, loading }) => {
  const form = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: '',
    },
  });

  const handleSubmit = (values: EmailFormValues) => {
    onSubmit(values.email);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
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
          {loading ? 'Loading...' : 'Continue'}
        </Button>
      </form>
    </Form>
  );
};
