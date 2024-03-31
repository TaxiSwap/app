import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import BetaBanner from "@/app/components/BetaBanner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TaxiSwap",
  description: "Effortless Multi-Chain Bridging",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <BetaBanner />
        {children}
      </body>
    </html>
  );
}
