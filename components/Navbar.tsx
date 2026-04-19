"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();

  // Don't show the navbar on Login or Register pages for a cleaner UI
  if (pathname === "/login" || pathname === "/register") return null;

  return (
    <nav className="flex justify-between items-center px-6 md:px-10 py-4 bg-white border-b sticky top-0 z-50">
      <Link href="/" className="flex items-center gap-2">
        <Image src="/logo.png" alt="Logo" width={160} height={45} className="object-contain" />
      </Link>
      
      <div className="hidden md:flex items-center space-x-8 font-montserrat font-semibold text-slate-600">
        <Link href="/" className="hover:text-brand transition text-xs uppercase tracking-widest">Home</Link>
        
        {isLoggedIn ? (
          <>
            <Link href="/diagnostics" className="hover:text-brand transition text-xs uppercase tracking-widest">Portal</Link>
            <Link href="/analytics" className="hover:text-brand transition text-xs uppercase tracking-widest">Analytics</Link>
          </>
        ) : (
          <>
            <Link href="/#features" className="hover:text-brand transition text-xs uppercase tracking-widest">Features</Link>
            <Link href="/#steps" className="hover:text-brand transition text-xs uppercase tracking-widest">Steps</Link>
          </>
        )}
      </div>

      <div className="flex items-center gap-4">
        {isLoggedIn ? (
          <button onClick={() => setIsLoggedIn(false)} className="text-slate-500 font-bold text-sm">Logout</button>
        ) : (
          <>
            <Link href="/login" className="text-slate-600 font-bold text-sm hover:text-brand transition">Login</Link>
            <Link href="/register">
              <button className="bg-brand text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-brand-dark transition shadow-lg shadow-brand/20">
                Register
              </button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}