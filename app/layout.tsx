import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const montserrat = Montserrat({ 
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["600", "700"] 
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GlucoVision AI",
  description: "Smart Diabetic Retinopathy Screening & Monitoring",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${montserrat.variable} bg-white antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}