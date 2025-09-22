import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import {Inter,League_Gothic} from "next/font/google"
import "./globals.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });
const inter = Inter({
  weight:"700",
  subsets: ["latin"],
})

const gothic = League_Gothic({
  weight:"400",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Syndic-ui",
  description: "We ball mofos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter} ${gothic} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
