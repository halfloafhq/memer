import React from "react";
import SignUpForm from "./_components/signup-form";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-center">
      <section className="mb-12 text-center">
        <div>
          <h1 className="text-4xl font-bold">
            Sign up on <span className="text-purple-600">Memer</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            <span className="underline text-purple-600">Rick Roll</span> the
            world in a few clicks!
          </p>
        </div>
      </section>
      <section className="w-full max-w-md">
        <SignUpForm />
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link href="/sign-in">
              <span className="text-purple-600 underline">Sign in</span>
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
