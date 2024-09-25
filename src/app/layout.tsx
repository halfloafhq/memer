import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import { Inter } from "next/font/google";
import { ClerkProvider, GoogleOneTap } from "@clerk/nextjs";
import "./globals.css";
import Navbar from "@/components/navbar";
import { LoadingProvider } from "@/context/LoadingContext";
import { ThemeProvider } from "@/components/theme-provider";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import NextTopLoader from 'nextjs-toploader';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Memer",
  description: "Your one-stop meme workshop: Search, collect, create.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClerkProvider>
          <GoogleOneTap />
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <LoadingProvider>
              <NextSSRPlugin
                routerConfig={extractRouterConfig(ourFileRouter)}
              />
              <Navbar />
              <NextTopLoader />
              <main className="flex-1 pt-16">{children}</main>
              <Toaster />
            </LoadingProvider>
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
