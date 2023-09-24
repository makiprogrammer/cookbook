import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "M Cookbook",
  description: "A nice cookbook",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
