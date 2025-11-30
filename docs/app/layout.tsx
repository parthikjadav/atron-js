import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import ClientLayout from "@/components/ClientLayout";

export const metadata: Metadata = {
  title: "Atron.js - Focused Utility Toolkit for JavaScript & TypeScript",
  description: "A comprehensive utility toolkit for JavaScript and TypeScript with well-tested helpers for strings, arrays, fetch operations, error handling, and more. TypeScript-first, zero dependencies.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <ClientLayout>{children}</ClientLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
