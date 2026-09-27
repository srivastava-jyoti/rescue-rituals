import type { Metadata } from "next";
import { Suspense } from "react";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const dmSans = DM_Sans({ variable: "--font-dm-sans", subsets: ["latin"] });
const dmSerif = DM_Serif_Display({
  variable: "--font-dm-serif",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rescue Rituals — Events",
  description: "Find and RSVP to local animal rescue events.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${dmSans.variable} ${dmSerif.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Suspense fallback={<div className="h-16 border-b border-border" />}>
          <Navbar />
        </Suspense>
        <main className="flex-1">{children}</main>
        <Footer/>
      </body>
    </html>
  );
}