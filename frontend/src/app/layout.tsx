import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ variable:"--font-geist-sans", subsets:["latin"] });

export const metadata: Metadata = {
  title:"Luvimos — Understand. Connect. Protect.",
  description:"A privacy-first emotional intelligence platform with AI, VAD insights and longitudinal self-reflection.",
};

export default function RootLayout({children}: LayoutProps<"/">){return <html lang="en" className={`${geist.variable} antialiased`}><body>{children}</body></html>}
