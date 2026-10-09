import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Testing Atlas — Test anything with a better map",
  description:
    "A source-aware field guide for building practical testing blueprints across web, mobile, hardware, firmware, IoT, APIs, and AI.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

