import type { Metadata } from "next";
import "./globals.css";
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";

export const metadata: Metadata = {
  title: "Kenneth Kelechukwu Izuaba | Fullstack & Web3 Developer",
  description:
    "Portfolio of Kenneth Kelechukwu Izuaba — Fullstack & Web3 Developer specializing in Next.js, TypeScript, Solidity, Autonomous AI Agents, and scalable distributed systems.",
  keywords: [
    "Kenneth Kelechukwu Izuaba",
    "Kaycee",
    "Fullstack Developer",
    "Web3 Developer",
    "Solidity",
    "TypeScript",
    "Next.js",
    "Autonomous AI Agents",
    "LangChain",
    "KeeperHub",
    "NSKAI",
  ],
  authors: [{ name: "Kenneth Kelechukwu Izuaba", url: "https://github.com/Kaycee276" }],
  creator: "Kenneth Kelechukwu Izuaba",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Kenneth Kelechukwu Izuaba | Fullstack & Web3 Developer",
    description:
      "Full-Stack & Web3 Developer specializing in Next.js, TypeScript, Solidity, Autonomous AI Agents, and scalable systems.",
    siteName: "Kenneth Kelechukwu Izuaba Portfolio",
    images: [
      {
        url: "/image-1.jpeg",
        width: 1200,
        height: 630,
        alt: "Kenneth Kelechukwu Izuaba",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kenneth Kelechukwu Izuaba | Fullstack & Web3 Developer",
    description:
      "Full-Stack & Web3 Developer building high-performance web applications, AI agents, and smart contracts.",
    creator: "@kc_deblocksmith",
    images: ["/image-1.jpeg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" sizes="any" />
      </head>
      <body>
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
      </body>
    </html>
  );
}
