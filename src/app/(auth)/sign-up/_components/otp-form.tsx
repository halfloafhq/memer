import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';

export const otpFormSchema = z.object({
  pin: z.string().min(6, {
    message: 'Your one-time password must be 6 characters.',
  }),
});

type OtpFormProps = {
  onVerify: (values: { pin: string }) => void;
  loading: boolean;
};

export default function OtpForm({ onVerify, loading }: OtpFormProps) {
  const otpForm = useForm<z.infer<typeof otpFormSchema>>({
    resolver: zodResolver(otpFormSchema),
    defaultValues: {
      pin: '',
    },
  });

  return (
    <div className="p-4">
      <Form {...otpForm}>
        <form onSubmit={otpForm.handleSubmit(onVerify)} className="w-2/3 space-y-6">
          <FormField
            control={otpForm.control}
            name="pin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>One-Time Password</FormLabel>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormDescription>
                  Please enter the one-time password sent to your phone.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full text-lg bg-purple-600 hover:bg-purple-700 active:bg-purple-900 transition-colors"
            disabled={loading}
          >
            {!loading ? 'Verify OTP' : 'Verifying...'}
          </Button>
        </form>
      </Form>
    </div>
  );
}
