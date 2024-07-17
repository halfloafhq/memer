import React from "react";
import SignInForm from "./_components/signin-form";
import Link from "next/link";

export default function SignInPage() {
  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-center">
      <section className="mb-12 text-center">
        <div>
          <h1 className="text-4xl font-bold">
            Sign in to <span className="text-purple-600">Memer</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Ready to{" "}
            <span className="underline text-purple-600">Rick Roll</span> the
            world?
          </p>
        </div>
      </section>
      <section className="w-full max-w-md">
        <SignInForm />
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up">
              <span className="text-purple-600 underline">Sign up</span>
            </Link>
          </p>
        </div>
        <div className="mt-2 text-center">
          <p className="text-primary">
            <Link href="/forgot-password">Forgot password?</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
