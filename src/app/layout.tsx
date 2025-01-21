import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import { Inter } from "next/font/google";
import { ClerkProvider, GoogleOneTap } from "@clerk/nextjs";
import "./globals.css";
import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import NextTopLoader from "nextjs-toploader";
import { GoogleTagManager } from "@next/third-parties/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Memer",
  description: "Your one-stop meme workshop: Search, collect, create.",
  metadataBase: new URL("https://memer.shobhitnagpal.com"),
  openGraph: {
    title: "Memer by Shobhit",
    description: "Your one-stop meme workshop: Search, collect, create.",
    url: "https://memer.shobhitnagpal.com",
    locale: "en_US",
    type: "website",
    images: "/opengraph-image.png",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "google",
    yandex: "yandex",
    yahoo: "yahoo",
    other: {
      me: ["shobhitsnagpal@gmail.com", "https://www.shobhitnagpal.com"],
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GoogleTagManager gtmId="GTM-TWF5XZ8V" />
      <body className={inter.className}>
        <ClerkProvider>
          <GoogleOneTap />
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
            <Navbar />
            <NextTopLoader />
            <main className="flex-1 pt-16">{children}</main>
            <Toaster />
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
