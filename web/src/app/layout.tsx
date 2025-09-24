import type { Metadata } from "next";
import {Inter,League_Gothic,Anton,Roboto_Flex} from "next/font/google"
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
 
const inter = Inter({
  weight:"700",
  subsets: ["latin"],
})

const gothic = League_Gothic({
  weight: "400",
  subsets: ["latin"],
});

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
});

const roboto = Roboto_Flex({
  subsets: ["latin"],
});
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
      <body className={`${inter} ${anton} antialiased`}>
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}