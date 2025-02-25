'use client';

import React, { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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
import { useSignUp } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import OtpForm, { otpFormSchema } from './otp-form';
import { Eye, EyeOff } from 'lucide-react';
import OauthSignIn from '../google-oauth';

const signUpFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters',
  }),
});

export default function SignUpForm() {
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [verify, setVerify] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { signUp, setActive, isLoaded } = useSignUp();
  const router = useRouter();
  const { toast } = useToast();

  const signUpForm = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof signUpFormSchema>) {
    // Simulate verification step

    if (!isLoaded) return;

    setLoading(true);

    try {
      await signUp?.create({
        emailAddress: values.email,
        password: values.password,
      });

      await signUp?.prepareEmailAddressVerification({
        strategy: 'email_code',
      });

      setEmail(values.email);
      setVerify(true);
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      toast({
        title: 'Uh oh! Something went wrong.',
        description: err.errors[0].longMessage || 'Could not fulfill request',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }

  async function onVerify(values: z.infer<typeof otpFormSchema>) {
    if (!isLoaded) return;
    setLoading(true);

    try {
      // Use the code the user provided to attempt verification
      const completeSignUp = await signUp?.attemptEmailAddressVerification({
        code: values.pin,
      });
      if (!completeSignUp) {
        console.error('Complete signup error');
        return;
      }

      // If verification was completed, set the session to active
      // and redirect the user
      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId });
        toast({
          title: 'Signed up!',
          description: 'Your account has been created',
          variant: 'default',
        });
        router.push('/');
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(completeSignUp, null, 2));
        toast({
          title: 'Uh oh! Something went wrong.',
          description: 'There was a problem with your sign up completion.',
          variant: 'destructive',
        });
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error('Error:', JSON.stringify(err, null, 2));
      toast({
        title: 'Uh oh! Something went wrong.',
        description: err.errors[0].longMessage || 'Could not fulfill request',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-4">
      {verify ? (
        <OtpForm onVerify={onVerify} loading={loading} />
      ) : (
        <Form {...signUpForm}>
          <form onSubmit={signUpForm.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={signUpForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="memer@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={signUpForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="********"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? (
                          <Eye className="h-5 w-5" />
                        ) : (
                          <EyeOff className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full text-lg bg-purple-600 hover:bg-purple-700 active:bg-purple-900 transition-colors"
              disabled={loading}
            >
              {!loading ? 'Sign Up' : 'Signing up...'}
            </Button>
          </form>
        </Form>
      )}

      <div className="mt-4 text-center">
        <OauthSignIn />
      </div>
    </div>
  );
}
