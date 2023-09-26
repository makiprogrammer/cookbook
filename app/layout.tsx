import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";

import { Header } from "components/Header";

import "./globals.css";
import "./inputs.css";
import styles from "./index.module.css";

const openSans = Open_Sans({ subsets: ["latin"] });

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
    <html lang="en" className={openSans.className}>
      <body>
        <Header />
        <div className={styles.content}>{children}</div>
      </body>
    </html>
  );
}
