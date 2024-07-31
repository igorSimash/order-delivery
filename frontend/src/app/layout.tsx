import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/components/redux/StoreProvider";
import { Header } from "@/components/ui/header/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Order-Delivery App",
  description: "Manipulate with your requests",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <StoreProvider>
        <body className={inter.className}>
          <Header />
          {children}
        </body>
      </StoreProvider>
    </html>
  );
}
