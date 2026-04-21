"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Import router
import { User, Mail, Lock, Heart, Play, Calendar } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();

   const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Set the "session" in the browser's memory
    localStorage.setItem("isLoggedIn", "true");
    
    // Go to dashboard
    router.push("/dashboard");
  };

  return (
    <main className="min-h-screen bg-white flex flex-col md:flex-row-reverse overflow-hidden">
      
      {/* Right Side: Registration Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-16 lg:p-24 relative">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="mb-10 flex justify-center md:justify-start">
            <Image 
                      src="/logo.png" 
                      alt="GlucoVision Logo" 
                      width={180}   
                      height={50}   
                      className="object-contain"
                      style={{ height: 'auto' }} 
                      priority      
            />
          </div>

          <h1 className="text-2xl font-montserrat font-bold text-slate-800 mb-2">Start Your Journey</h1>
          <p className="text-slate-400 text-sm mb-8 tracking-wide uppercase font-bold">Create your personal health profile</p>

          <form onSubmit={handleRegister} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Your Full Name:</label>
              <input 
                type="text" 
                required
                placeholder="Kamal Perera"
                className="w-full border-2 border-slate-100 rounded-xl py-3 px-4 focus:border-brand focus:outline-none transition-all placeholder:text-slate-300"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Diabetes Type (Optional):</label>
              <select className="w-full border-2 border-slate-100 rounded-xl py-3 px-4 focus:border-brand focus:outline-none transition-all text-slate-500 bg-white">
                <option>Type 1 Diabetes</option>
                <option>Type 2 Diabetes</option>
                <option>Gestational Diabetes</option>
                <option>I'm not sure / Pre-diabetic</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email Address:</label>
              <input 
                type="email" 
                required
                placeholder="yourname@email.com"
                className="w-full border-2 border-slate-100 rounded-xl py-3 px-4 focus:border-brand focus:outline-none transition-all placeholder:text-slate-300"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Create Password:</label>
              <input 
                type="password" 
                required
                placeholder="••••••••••••"
                className="w-full border-2 border-slate-100 rounded-xl py-3 px-4 focus:border-brand focus:outline-none transition-all placeholder:text-slate-300"
              />
            </div>

            <button 
              type="submit"
              className="w-full mt-4 bg-gradient-to-r from-brand to-[#08a3a3] text-white py-4 rounded-full font-bold text-lg shadow-xl shadow-brand/20 hover:scale-[1.02] transition-all active:scale-95"
            >
              Create My Profile
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-500 font-medium">
            Already have an account? <Link href="/login" className="text-brand font-bold hover:underline">Log in</Link>
          </p>
        </div>
      </div>

      {/* Left Side: Patient Branding */}
      <div className="hidden md:flex w-1/2 bg-brand relative overflow-hidden items-center justify-center p-16">
        <div className="absolute top-[-10%] left-[-10%] w-[80%] h-[80%] bg-white/10 rounded-full blur-3xl" />
        
        <div className="relative z-10 w-full max-w-lg aspect-square rounded-full border-[40px] border-white/10 backdrop-blur-sm p-12 flex flex-col justify-center text-white">
          <h2 className="text-5xl font-montserrat font-extrabold mb-6 tracking-tight text-center md:text-left">Your Vision, <br/> Your Future</h2>
          <p className="text-lg leading-relaxed opacity-90 mb-10 font-light text-center md:text-left">
            GlucoVision helps you understand how your lifestyle and blood sugar impact your eye health. Track your history, upload your scans, and take control of your sight.
          </p>
          
          <div className="flex items-center justify-center md:justify-start gap-6">
             <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg backdrop-blur-md border border-white/20">
                <Heart className="w-4 h-4 text-white fill-current" />
                <span className="text-xs font-bold uppercase tracking-widest">Personal Care</span>
             </div>
             <button className="w-12 h-12 rounded-full border-2 border-white/50 flex items-center justify-center hover:bg-white/10 transition-colors">
              <Play className="w-5 h-5 fill-current ml-1" />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}