import React from "react";
import ForgotPasswordForm from "./_components/forgot-password-form";
import Link from "next/link";

export default function page() {
  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-center">
      <section className="mb-12 text-center">
        <div>
          <h1 className="text-4xl font-bold">
            Forgot <span className="text-purple-600">password?</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            The
            <span className="text-purple-600"> meme world </span> awaits your
            return!
          </p>
        </div>
      </section>
      <div className="w-full max-w-md">
        <ForgotPasswordForm />
      </div>
      <div className="mt-8 text-center">
        Back to{" "}
        <Link href="/sign-in" className="text-primary underline">
          Sign in
        </Link>
      </div>
    </main>
  );
}
