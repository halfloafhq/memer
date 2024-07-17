"use client";
import React, { useState } from "react";
import { useAuth, useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { EmailStep } from "./email-step";
import { PasswordStep } from "./password-step";
import { CodeStep } from "./code-step";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [steps, setSteps] = useState(1);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { isSignedIn } = useAuth();
  const { isLoaded, signIn, setActive } = useSignIn();

  if (!isLoaded) {
    return null;
  }

  const handleEmailSubmit = async (email: string) => {
    setLoading(true);
    try {
      await signIn?.create({
        strategy: "reset_password_email_code",
        identifier: email,
      });
      setEmail(email);
      setSteps(2);
    } catch (err: any) {
      toast({
        variant: "destructive",
        description: "Please log out to reset your password.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = (password: string) => {
    setPassword(password);
    setSteps(3);
  };

  const handleCodeSubmit = async (code: string) => {
    setLoading(true);
    try {
      const result = await signIn?.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password,
      });
      if (result?.status === "complete") {
        if (isSignedIn) {
          // User was already signed in
          toast({
            title: "Password updated!",
            description: "Your password has been successfully updated.",
          });
          router.push("/dashboard/collections");
        } else {
          // User wasn't signed in, so we need to set the session as active
          await setActive?.({ session: result.createdSessionId });
          toast({
            title: "Password updated and signed in!",
            description: "Your password has been updated and you've been signed in.",
          });
          router.push("/dashboard/collections");
        }
      } else {
        throw new Error("Failed to reset password");
      }
    } catch (err: any) {
      toast({
        variant: "destructive",
        description: err.message || "Failed to reset password",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {steps === 1 && (
        <EmailStep onSubmit={handleEmailSubmit} loading={loading} />
      )}
      {steps === 2 && (
        <PasswordStep onSubmit={handlePasswordSubmit} loading={loading} />
      )}
      {steps === 3 && (
        <CodeStep onSubmit={handleCodeSubmit} loading={loading} />
      )}
    </div>
  );
};

export default ForgotPasswordForm;
