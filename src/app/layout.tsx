import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { LoadingProvider } from "@/context/LoadingContext";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Memer",
  description: "Meme your way to greatness",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <LoadingProvider>
              <main className="flex flex-col">
                <Navbar />
                {children}
              </main>
              <Toaster />
            </LoadingProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
