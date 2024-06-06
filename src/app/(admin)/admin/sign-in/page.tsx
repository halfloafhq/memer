import React from "react";
import AdminSignInForm from "./_components/AdminSignInForm";
import Link from "next/link";

export default function AdminSignInPage() {
  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-center">
      <section className="mb-12 text-center">
        <div>
          <h1 className="text-4xl font-bold">
            Welcome back, <span className="text-purple-600">Meme Lord</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Ready to be{" "}
            <span className="underline text-purple-600">Ding chilling?</span>
          </p>
        </div>
      </section>
      <section className="w-full max-w-md">
        <AdminSignInForm />
      </section>
    </main>
  );
}
