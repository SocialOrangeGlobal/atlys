import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://global-getaway-new.vercel.app"),
  title: {
    default: "Global Getaway | Visas Made Simple — Guaranteed On-Time",
    template: "%s | Global Getaway",
  },
  description: "Experience the fastest, most reliable way to get your visa. Smart, streamlined applications with 99.8% approval and guaranteed on-time delivery.",
  keywords: [
    "Global Getaway",
    "visa",
    "e-visa",
    "tourist visa",
    "apply visa online",
    "fast visa processing",
    "Dubai visa",
    "Thailand visa",
    "Schengen visa"
  ],
  authors: [{ name: "Global Getaway" }],
  creator: "Global Getaway",
  publisher: "Global Getaway",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/icon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://global-getaway-new.vercel.app",
    siteName: "Global Getaway",
    title: "Global Getaway | Visas Made Simple — Guaranteed On-Time",
    description: "Experience the fastest, most reliable way to get your visa online. Smart, streamlined applications with guaranteed on-time delivery.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Global Getaway | Visas Made Simple",
    description: "Experience the fastest, most reliable way to get your visa online with guaranteed on-time delivery.",
  },
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
      suppressHydrationWarning
    >
      <body className="antialiased text-neutral-900 bg-[#FAFAFA] overflow-x-hidden" suppressHydrationWarning>{children}</body>
    </html>
  );
}
