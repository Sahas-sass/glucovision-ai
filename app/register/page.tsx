"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { Loader2, Mail, Lock, User } from 'lucide-react';
import Link from "next/link";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Create the User (Email confirmation is now off in Supabase)
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName }
        },
      });

      if (error) throw error;

      if (data.user) {
        // 2. Create the profile row (Crucial for the Foreign Key constraint!)
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([{ id: data.user.id, full_name: fullName }]);

        if (profileError) throw profileError;

        // 3. Success! Go straight to login
        router.push("/login");
      }
    } catch (error: any) {
      alert(`Registration Failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center font-inter p-4">
      <div className="bg-white max-w-5xl w-full rounded-[40px] shadow-2xl flex flex-col md:flex-row overflow-hidden min-h-[600px]">
        
        {/* Left Side: Brand Section */}
        <div className="w-full md:w-1/2 bg-brand p-12 text-white flex flex-col justify-center relative overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl animate-float"></div>
          <div className="relative z-10">
            <h2 className="text-5xl font-bold font-montserrat leading-tight mb-6">Prevention <br />starts here</h2>
            <p className="text-white/80 max-w-xs text-sm leading-relaxed">
              Create your profile today and get instant access to our AI diagnostic tools.
            </p>
          </div>
        </div>

        {/* Right Side: Form Section */}
        <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
          <div className="text-center mb-10">
             <div className="flex items-center justify-center gap-3 mb-4">
                <div className="relative w-10 h-10">
                  <Image src="/logo.png" alt="Logo" fill className="object-contain" />
                </div>
                <span className="text-xl font-bold font-montserrat text-slate-800 tracking-tighter">GlucoVision</span>
             </div>
             <h1 className="text-2xl font-bold text-slate-800">Quick Register</h1>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 tracking-widest">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                <input 
                  type="text" placeholder="Full Name" required
                  value={fullName} onChange={(e) => setFullName(e.target.value)}
                  className="w-full p-3.5 pl-11 bg-slate-50 border border-slate-100 rounded-xl focus:border-brand outline-none transition-all text-sm"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 tracking-widest">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                <input 
                  type="email" placeholder="patient@email.com" required
                  value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3.5 pl-11 bg-slate-50 border border-slate-100 rounded-xl focus:border-brand outline-none transition-all text-sm"
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
                  className="w-full p-3.5 pl-11 bg-slate-50 border border-slate-100 rounded-xl focus:border-brand outline-none transition-all text-sm"
                />
              </div>
            </div>

            <button 
              type="submit" disabled={loading}
              className="w-full py-4 bg-brand text-white rounded-xl font-bold font-montserrat shadow-lg shadow-brand/20 hover:bg-brand-dark transition-all active:scale-[0.98] mt-4"
            >
              {loading ? <Loader2 className="animate-spin mx-auto w-5 h-5" /> : "Complete Registration"}
            </button>
          </form>

          <p className="text-center mt-8 text-xs text-slate-500">
            Already have an account? <Link href="/login" className="text-brand font-bold">Log In</Link>
          </p>
        </div>
      </div>
    </main>
  );
}