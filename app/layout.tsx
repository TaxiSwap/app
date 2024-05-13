import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import BetaBanner from "@/app/components/BetaBanner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TaxiSwap",
  description: "Effortless Multi-Chain Bridging",
  keywords: [
    "Ethereum",
    "Bridge",
    "L2",
    "Swap",
    "USDC",
    "Token",
    "Arbitrum",
    "Optimism",
    "Base",
    "Polygon",
    "Avalanche",
  ],
  metadataBase: new URL('https://app.taxiswap.xyz'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
    },
  },
  openGraph: {
    title: "TaxiSwap",
    description: "Effortless Multi-Chain Bridging",
    url: "https://app.taxiswap.xyz",
    siteName: "TaxiSwap",
    images: [
      {
        url: "https:/app.taxiswap.xyz/taxiswap-1200x627.png",
        width: 1200,
        height: 627,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TaxiSwap",
    description: "Effortless Multi-Chain Bridging",
    images: ["https:/app.taxiswap.xyz/taxiswap-1200x600.png"],
  },
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
