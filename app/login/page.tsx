"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Loader2, Mail, Lock, Activity } from 'lucide-react';
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      router.push("/dashboard");
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-inter">
      <div className="bg-white max-w-5xl w-full rounded-[40px] shadow-2xl flex flex-col md:flex-row overflow-hidden min-h-[650px]">
        
        {/* Left Side: Brand Section */}
        <div className="w-full md:w-1/2 bg-brand p-12 text-white flex flex-col justify-center relative">
          <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl animate-float"></div>
          <h2 className="text-5xl font-bold font-montserrat leading-tight mb-6 relative z-10">Insight <br />starts here</h2>
          <p className="text-white/80 max-w-xs text-sm leading-relaxed relative z-10">
            Welcome back to GlucoVision. Access your clinical analytics and AI-powered diagnostic reports.
          </p>
        </div>

        {/* Right Side: Form Section */}
        <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
          <div className="text-center mb-12">
             <div className="flex items-center justify-center gap-2 mb-4">
                <div className="bg-brand p-2 rounded-lg shadow-lg shadow-brand/20">
                    <Activity className="text-white w-6 h-6" />
                </div>
                <span className="text-xl font-bold font-montserrat text-slate-800 tracking-tighter">GlucoVision</span>
             </div>
             <h1 className="text-2xl font-bold text-slate-800">Patient Login</h1>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 tracking-widest">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                <input 
                  type="email" placeholder="Enter your email" required
                  value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-4 pl-11 bg-slate-50 border border-slate-100 rounded-xl focus:border-brand outline-none transition-all text-sm"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 tracking-widest">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                <input 
                  type="password" placeholder="••••••••" required
                  value={password} onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-4 pl-11 bg-slate-50 border border-slate-100 rounded-xl focus:border-brand outline-none transition-all text-sm"
                />
              </div>
            </div>

            <div className="flex items-center justify-between px-1">
              <label className="flex items-center gap-2 text-xs text-slate-500 cursor-pointer">
                <input type="checkbox" className="rounded border-slate-200 text-brand focus:ring-brand" /> Remember me
              </label>
              <button type="button" className="text-xs text-brand font-bold hover:underline">Reset Password?</button>
            </div>

            <button 
              type="submit" disabled={loading}
              className="w-full py-4 bg-brand text-white rounded-xl font-bold font-montserrat shadow-lg shadow-brand/20 hover:bg-brand-dark transition-all active:scale-[0.98]"
            >
              {loading ? <Loader2 className="animate-spin mx-auto w-5 h-5" /> : "Authorize Access"}
            </button>
          </form>

          <p className="text-center mt-12 text-xs text-slate-500">
            New to the network? <Link href="/register" className="text-brand font-bold hover:underline">Register Now</Link>
          </p>
        </div>
      </div>
    </main>
  );
}