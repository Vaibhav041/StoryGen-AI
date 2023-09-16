import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { MessagesHistoryProvider } from "@/context/MessagesHistoryContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "StoryGen-AI",
  description: "Input your heroes locations quest and let AI take charge",
  icons: {
    icon: {
      url: "/storygen-favicon.webp",
      type: "image/webp",
    },
    shortcut: { url: "/storygen-favicon.webp", type: "image/webp" },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#17181C] text-white">
        <MessagesHistoryProvider>{children}</MessagesHistoryProvider>
      </body>
    </html>
  );
}
