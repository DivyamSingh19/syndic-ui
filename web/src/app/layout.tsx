import type { Metadata } from "next";
import {Inter,League_Gothic} from "next/font/google"
import "./globals.css";

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
