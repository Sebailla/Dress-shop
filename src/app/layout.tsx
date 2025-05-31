import type { Metadata } from "next";
import "./globals.css";
import { geistMono } from "@/config/fonts";



export const metadata: Metadata = {
  title: "Teslo-Shop",
  description: "ecommerce web app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
