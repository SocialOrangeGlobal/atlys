import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Global Getaway | Visas made simple",
  description: "Get your visa on time, guaranteed with Global Getaway.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} antialiased`}
    >
      <body className="antialiased text-neutral-900 bg-[#FAFAFA] overflow-x-hidden">{children}</body>
    </html>
  );
}
