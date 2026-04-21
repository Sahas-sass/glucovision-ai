"use client";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar"; // Your main landing page nav
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Define routes where you DO NOT want the main landing page navbar
  const hideNavbarRoutes = ["/dashboard", "/login", "/register", "/diagnostics", "/analytics"];
  const shouldHideNavbar = hideNavbarRoutes.includes(pathname);

  return (
    <html lang="en">
      <body className="font-inter">
        {!shouldHideNavbar && <Navbar />}
        {children}
      </body>
    </html>
  );
}