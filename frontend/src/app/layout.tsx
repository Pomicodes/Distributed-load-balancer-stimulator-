

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Distributed Load Balancer Simulator",
  description: "Educational platform for distributed systems experimentation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-slate-950 text-slate-50 min-h-screen`}>
        {children}
      </body>
    </html>
  );
  console.log('RootLayout loaded'); 
}
// TODO: Add theme preference persistence