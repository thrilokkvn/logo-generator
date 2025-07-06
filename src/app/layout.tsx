import type { Metadata } from "next";
import { Host_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import {Analytics} from "@vercel/analytics/react"

const host_grotesk = Host_Grotesk({
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "Logolumeo",
  description: "AI Logo Generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
        <body
          className={`${host_grotesk.className}`}
        >
          <Header />
          {children}
          <Analytics />
          <Footer />
        </body>
      </ThemeProvider>
    </html>
  );
}
