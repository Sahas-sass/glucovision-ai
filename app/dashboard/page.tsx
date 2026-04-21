"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { 
  Eye, 
  LineChart, 
  ArrowRight, 
  LogOut, 
  Loader2, 
  Clock, 
  ChevronRight,
  FileText,
  AlertCircle,
  Activity
} from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const [userName, setUserName] = useState("Patient");
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // HPLC Reference Value Logic from your medical document
  const getControlStatus = (hba1c: number) => {
    if (hba1c < 6) return { label: "Excellent Control", color: "text-emerald-600 bg-emerald-50" };
    if (hba1c >= 6 && hba1c < 7) return { label: "Good Control", color: "text-blue-600 bg-blue-50" };
    if (hba1c >= 7 && hba1c < 8) return { label: "Fair Control", color: "text-yellow-600 bg-yellow-50" };
    if (hba1c >= 8 && hba1c < 10) return { label: "Unsatisfactory", color: "text-orange-600 bg-orange-50" };
    return { label: "Poor Control", color: "text-red-600 bg-red-50" };
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        setUserName(user.user_metadata?.full_name || "Sahas");

        const { data, error } = await supabase
          .from('health_records')
          .select('*')
          .eq('patient_id', user.id)
          .order('created_at', { ascending: false })
          .limit(5);

        if (data) setHistory(data);
      }
      setLoading(false);
    };

    fetchDashboardData();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-brand mb-4" />
        <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em]">Securing Connection...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50/50 font-inter flex flex-col">
      
      {/* HEADER - LOGO PART UNCHANGED */}
      <header className="px-8 py-6 flex justify-between items-center bg-white border-b border-slate-100 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="relative w-50 h-10">
            <Image src="/logo.png" alt="Logo" fill className="object-contain" priority />
          </div>
        </div>
        
        <button onClick={handleLogout} className="group flex items-center gap-2 text-slate-400 hover:text-red-500 transition-all font-bold text-[10px] uppercase tracking-widest">
          Logout <LogOut className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </header>

      <div className="flex-1 max-w-7xl mx-auto w-full px-8 py-12">
        
        {/* WELCOME */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-slate-900 font-montserrat mb-3 tracking-tight">
            Welcome, {userName.split(' ')[0]}
          </h1>
          <p className="text-slate-500 font-medium text-lg font-inter">Manage your diagnostics and track vascular trends.</p>
        </div>

        {/* ACTION CARDS */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div onClick={() => router.push('/diagnostics')} className="group bg-white rounded-[40px] p-10 cursor-pointer border border-slate-100 hover:border-brand/20 transition-all hover:shadow-2xl hover:shadow-brand/5 flex flex-col justify-between min-h-[350px]">
            <div>
              <div className="bg-brand/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-8 shadow-sm"><Eye className="text-brand w-7 h-7" /></div>
              <h2 className="text-3xl font-bold font-montserrat text-slate-800 mb-4 tracking-tight">Run Diagnostics</h2>
              <p className="text-slate-500 leading-relaxed max-w-xs text-sm font-medium">Analyze retinal scans or clinical laboratory reports using AI Core.</p>
            </div>
            <div className="flex items-center gap-3 text-brand font-bold text-[10px] tracking-widest uppercase">Start Scan <ArrowRight className="w-4 h-4"/></div>
          </div>

          <div onClick={() => router.push('/analytics')} className="group bg-[#0f172a] rounded-[40px] p-10 cursor-pointer transition-all hover:shadow-2xl hover:shadow-brand/20 flex flex-col justify-between min-h-[350px]">
            <div>
              <div className="bg-brand w-14 h-14 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-brand/40"><LineChart className="text-white w-7 h-7" /></div>
              <h2 className="text-3xl font-bold font-montserrat text-white mb-4 tracking-tight">Health Analytics</h2>
              <p className="text-slate-400 leading-relaxed max-w-xs font-light text-sm">Visualize clinical trends and assess vascular risk markers.</p>
            </div>
            <div className="flex items-center gap-3 text-brand font-bold text-[10px] tracking-widest uppercase">View Trends <ArrowRight className="w-4 h-4"/></div>
          </div>
        </div>

        {/* RECENT ACTIVITY SECTION */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-4">
            <h3 className="text-xl font-bold text-slate-800 font-montserrat flex items-center gap-2">
              <Clock className="text-brand w-5 h-5" /> Recent Activity
            </h3>
            <button onClick={() => router.push('/analytics')} className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-brand transition-colors">
              Full History
            </button>
          </div>

          <div className="bg-white border border-slate-100 rounded-[40px] shadow-sm overflow-hidden">
            {history.length > 0 ? (
              <div className="divide-y divide-slate-50">
                {history.map((record) => {
                  const status = record.hba1c_value ? getControlStatus(record.hba1c_value) : null;
                  
                  // Unified thumbnail logic for both scan and report images
                  const displayUrl = record.eye_scan_url || record.report_image_url; 

                  return (
                    <div key={record.id} onClick={() => router.push('/analytics')} className="p-6 flex items-center justify-between hover:bg-slate-50/50 transition-all group cursor-pointer">
                      <div className="flex items-center gap-5">
                        <div className="relative w-14 h-14 rounded-2xl bg-slate-50 overflow-hidden flex items-center justify-center border border-slate-100 shadow-inner">
                          {displayUrl ? (
                            <img 
                              src={displayUrl} 
                              alt="Scan" 
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                                (e.target as HTMLImageElement).parentElement!.innerHTML = '<div class="text-brand opacity-40"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg></div>';
                              }}
                            />
                          ) : (
                            <FileText className="text-blue-500 w-5 h-5 opacity-40" />
                          )}
                        </div>
                        
                        <div>
                          <p className="font-bold text-slate-800 tracking-tight text-sm font-inter">
                            {record.hospital_name || (record.eye_scan_url ? "Retinal AI Scan" : "Laboratory Report")}
                          </p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5 font-inter">
                            {new Date(record.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })} • {record.risk_level || 'Analyzed'}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="text-right hidden sm:block">
                          <p className="font-bold text-slate-700 text-xs font-inter">
                            {record.hba1c_value ? `${record.hba1c_value}% HbA1c` : (record.ai_conclusion?.split(':')[1] || 'Processed')}
                          </p>
                          <div className={`mt-1.5 inline-block px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter
                            ${status ? status.color : (record.risk_level === 'High' ? 'text-red-500 bg-red-50' : 'text-brand bg-brand/10')}`}>
                            {status ? status.label : (record.risk_level || 'Completed')}
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-slate-200 group-hover:text-brand group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-24 text-center flex flex-col items-center">
                <div className="bg-slate-50 p-6 rounded-full mb-6">
                  <AlertCircle className="w-10 h-10 text-slate-200" />
                </div>
                <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Diagnostic History Empty</p>
                <button onClick={() => router.push('/diagnostics')} className="mt-6 bg-slate-900 text-white px-8 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-brand transition-colors">Start First Scan</button>
              </div>
            )}
          </div>
        </div>
      </div>

      <footer className="p-12 text-center">
        <p className="text-[9px] text-slate-300 font-bold uppercase tracking-[0.6em]">
          University of Moratuwa • Nexio Team
        </p>
      </footer>
    </main>
  );
}