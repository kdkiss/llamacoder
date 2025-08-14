import type { Metadata } from "next";
import PlausibleProvider from "next-plausible";
import "./globals.css";
import MissingApiAlert from "../components/ui/missing-api-alert";
import { isApiKeyConfigured, getUserSettings } from "../lib/settings";

let title = "Llama Coder – AI Code Generator";
let description = "Generate your next app with Llama 3.1 405B";
let url = "https://llamacoder.io/";
let ogimage = "https://llamacoder.io/og-image.png";
let sitename = "llamacoder.io";

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title,
  description,
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    images: [ogimage],
    title,
    description,
    url: url,
    siteName: sitename,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [ogimage],
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <PlausibleProvider domain="llamacoder.io" />
      </head>
      <body className="flex min-h-full flex-col bg-background text-foreground antialiased">
        {children}
        <MissingApiAlert />
      </body>
    </html>
  );
}
