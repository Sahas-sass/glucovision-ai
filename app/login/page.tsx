"use client";
import Image from "next/image";
import Link from "next/link";
// Swapped Chrome/Facebook for Lucide-compatible icons
import { Mail, Lock, Globe, User, Play, ArrowRight } from "lucide-react";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-white flex flex-col md:flex-row overflow-hidden">
      
      {/* Left Side: Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-16 lg:p-24 relative">
        <div className="w-full max-w-md">
          <div className="mb-12 flex justify-center md:justify-start">
            <Image src="/logo.png" alt="GlucoVision Logo" width={180} height={50} className="object-contain" />
          </div>

          <h1 className="text-2xl font-montserrat font-bold text-slate-800 mb-2">Log in</h1>
          <p className="text-slate-400 text-sm mb-10 tracking-wide uppercase font-bold">Access the Diagnostic Hub</p>

          <form className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email Address:</label>
              <input 
                type="email" 
                placeholder="abc@xyz.com"
                className="w-full border-2 border-slate-100 rounded-xl py-3 px-4 focus:border-brand focus:outline-none transition-all placeholder:text-slate-300"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Password:</label>
              <input 
                type="password" 
                placeholder="••••••••••••"
                className="w-full border-2 border-slate-100 rounded-xl py-3 px-4 focus:border-brand focus:outline-none transition-all placeholder:text-slate-300"
              />
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-slate-400">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="accent-brand w-4 h-4" /> Remember me
              </label>
              <Link href="#" className="hover:text-brand transition">Forgot password?</Link>
            </div>

            <button className="w-full bg-gradient-to-r from-brand to-[#08a3a3] text-white py-4 rounded-full font-bold text-lg shadow-xl shadow-brand/20 hover:scale-[1.02] transition-all active:scale-95">
              Log in
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">or connect with</p>
            <div className="flex justify-center gap-4">
              {/* Updated Icons here */}
              <button className="p-3 border-2 border-slate-100 rounded-full hover:border-brand/30 transition-colors">
                <User className="w-5 h-5 text-slate-400" />
              </button>
              <button className="p-3 border-2 border-slate-100 rounded-full hover:border-brand/30 transition-colors">
                <Globe className="w-5 h-5 text-slate-400" />
              </button>
            </div>
          </div>

          <p className="mt-12 text-center text-sm text-slate-500 font-medium">
            Don&apos;t have an account? <Link href="/register" className="text-brand font-bold hover:underline">Sign up</Link>
          </p>
        </div>
      </div>

      {/* Right Side: Project Branding Section (Remains the same) */}
      <div className="hidden md:flex w-1/2 bg-brand relative overflow-hidden items-center justify-center p-16">
        <div className="absolute top-[-10%] right-[-10%] w-[80%] h-[80%] bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-[-20%] left-[-20%] w-[100%] h-[100%] bg-black/5 rounded-full blur-3xl" />
        
        <div className="relative z-10 w-full max-w-lg aspect-square rounded-full border-[40px] border-white/10 backdrop-blur-sm p-12 flex flex-col justify-center text-white">
          <h2 className="text-5xl lg:text-6xl font-montserrat font-extrabold mb-6 tracking-tight">GlucoVision</h2>
          <p className="text-lg leading-relaxed opacity-90 mb-10 font-light">
            Empowering Sri Lankan clinics with decentralized AI diagnostics. By bridging the gap between retinal analysis and medical records, we are preventing avoidable blindness.
          </p>
          
          <div className="flex items-center gap-6">
            <button className="bg-white text-brand px-8 py-3 rounded-full font-bold text-sm hover:shadow-2xl transition-all shadow-lg shadow-black/10">
              Learn More
            </button>
            <button className="w-12 h-12 rounded-full border-2 border-white/50 flex items-center justify-center hover:bg-white/10 transition-colors">
              <Play className="w-5 h-5 fill-current ml-1" />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}