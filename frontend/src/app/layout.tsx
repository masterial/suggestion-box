import "./globals.css";
import { ReactNode } from "react";
import { Metadata } from "next";
import ClientProviders from "./providers";

export const metadata: Metadata = {
  title: "Suggestion Box",
  description: "",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-white flex h-screen">
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}