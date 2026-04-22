// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Chatbot } from "@/components/chatbot";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Luxury Auto | Find Your Dream Car",
  description: "Premium automotive showroom experience with the finest selection of luxury vehicles.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider>
          <Providers>
            <Navigation />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <Chatbot />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}