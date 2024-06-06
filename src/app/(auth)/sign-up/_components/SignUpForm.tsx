"use client";

import React, { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

const signUpFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4, {
    message: "Password must be at least 4 characters",
  }),
});

const otpSchema = z.object({
  pin: z.string().length(6, {
    message: "OTP sent is a 6-digit code",
  }),
});

export default function SignUpForm() {
  const [verify, setVerify] = useState<boolean>(false);
  const { signUp, setActive, isLoaded } = useSignUp();
  const router = useRouter();
  const { toast } = useToast();

  const signUpForm = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const otpForm = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      pin: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signUpFormSchema>) {
    // Simulate verification step

    if (!isLoaded) return;

    try {
      await signUp?.create({
        emailAddress: values.email,
        password: values.password,
      });

      await signUp?.prepareEmailAddressVerification({
        strategy: "email_code",
      });
      setVerify(true);
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  }

  async function onVerify(values: z.infer<typeof otpSchema>) {
    console.log(values);

    if (!isLoaded) return;

    try {
      // Use the code the user provided to attempt verification
      const completeSignUp = await signUp?.attemptEmailAddressVerification({
        code: values.pin,
      });
      if (!completeSignUp) {
        console.error("Complete signup error");
        return;
      }

      // If verification was completed, set the session to active
      // and redirect the user
      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        toast({
          title: "Signed up!",
          description: "Your account has been created",
          variant: "default",
        });
        router.push("/");
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(completeSignUp, null, 2));
        toast({
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your sign up completion.",
          variant: "destructive",
        });
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error("Error:", JSON.stringify(err, null, 2));
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        variant: "destructive",
      });
    }
  }

  return (
    <>
      {verify ? (
        <Form {...otpForm}>
          <form onSubmit={otpForm.handleSubmit(onVerify)} className="space-y-8">
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
                        <InputOTPSeparator />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormDescription>
                    Please enter the one-time password sent to your email.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="text-lg bg-purple-600 hover:bg-purple-700 active:bg-purple-900 transition-colors"
            >
              Verify OTP
            </Button>
          </form>
        </Form>
      ) : (
        <Form {...signUpForm}>
          <form
            onSubmit={signUpForm.handleSubmit(onSubmit)}
            className="space-y-8"
          >
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
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="text-lg bg-purple-600 hover:bg-purple-700 active:bg-purple-900 transition-colors"
            >
              Sign Up
            </Button>
          </form>
        </Form>
      )}
    </>
  );
}
