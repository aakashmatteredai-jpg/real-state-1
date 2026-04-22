import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rialta | Luxury Homes Across India",
  description: "Explore curated homes across Mumbai, Bengaluru, Gurugram, Hyderabad, and Goa with Rialta's expert property advisory.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN" className={`${outfit.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-outfit">
        {children}
      </body>
    </html>
  );
}
