"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  BarChart,
  Bar,
  Cell
} from "recharts";
import { 
  ChevronLeft, 
  TrendingUp, 
  AlertCircle, 
  Eye,
  Loader2,
  Scan,
  ExternalLink,
  Activity
} from "lucide-react";

export default function AnalyticsPage() {
  const router = useRouter();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Reference Value Logic based on your image
  const getHbA1cStatus = (val: number) => {
    if (val < 6) return { label: "Excellent control", desc: "Normal range as a non diabetic", color: "#10b981", bg: "bg-emerald-50", text: "text-emerald-600" };
    if (val >= 6 && val < 7) return { label: "Good control", desc: "As a Diabetic", color: "#3b82f6", bg: "bg-blue-50", text: "text-blue-600" };
    if (val >= 7 && val < 8) return { label: "Fair control", desc: "Should attempt to lower the value", color: "#eab308", bg: "bg-yellow-50", text: "text-yellow-600" };
    if (val >= 8 && val < 10) return { label: "Unsatisfactory control", desc: "Needs attention to lower the value", color: "#f97316", bg: "bg-orange-50", text: "text-orange-600" };
    return { label: "Very poor control", desc: "Immediate vigorous action needed", color: "#ef4444", bg: "bg-red-50", text: "text-red-600" };
  };

  useEffect(() => {
    const fetchAnalytics = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }

      const { data: records, error } = await supabase
        .from("health_records")
        .select("*")
        .eq("patient_id", user.id)
        .order("created_at", { ascending: true });

      if (records) {
        const formattedData = records.map(r => {
          const confidenceMatch = r.ai_conclusion?.match(/\d+/);
          const confidenceValue = confidenceMatch ? parseInt(confidenceMatch[0]) : 0;

          return {
            ...r,
            date: new Date(r.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            hba1c: r.hba1c_value || 0,
            confidence: confidenceValue,
            isEyeScan: !!r.eye_scan_url
          };
        });
        setData(formattedData);
      }
      setLoading(false);
    };

    fetchAnalytics();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-brand" />
      </div>
    );
  }

  const eyeData = data.filter(d => d.isEyeScan);
  const latestRecord = data[data.length - 1];
  const hba1cStatus = latestRecord?.hba1c > 0 ? getHbA1cStatus(latestRecord.hba1c) : null;

  return (
    <main className="min-h-screen bg-slate-50 font-inter">
      {/* Header - Logo part remains unchanged */}
      <header className="px-8 py-6 flex justify-between items-center bg-white border-b border-slate-100 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="relative w-50 h-10">
            <Image src="/logo.png" alt="Logo" fill className="object-contain" priority />
          </div>
        </div>
        <button 
          onClick={() => router.push('/dashboard')} 
          className="flex items-center gap-2 text-slate-400 hover:text-brand transition-all font-bold text-[10px] uppercase tracking-widest group"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
        </button>
      </header>

      <div className="max-w-7xl mx-auto py-12 px-6">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-slate-900 font-montserrat tracking-tight mb-2">Health Analytics</h1>
          <p className="text-slate-500 font-medium italic">Clinical trends based on HPLC reference values.</p>
        </div>

        {data.length > 0 ? (
          <div className="grid lg:grid-cols-2 gap-8">
            
            {/* Chart 1: HbA1c Progress */}
            <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="bg-brand/10 p-3 rounded-2xl">
                    <TrendingUp className="text-brand w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-xl text-slate-800 font-montserrat">Glycemic Index (HbA1c)</h3>
                </div>
              </div>
              
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data.filter(d => d.hba1c > 0)}>
                    <defs>
                      <linearGradient id="colorHb" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0bcfcf" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#0bcfcf" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                    <YAxis domain={[4, 14]} axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                    <Tooltip contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                    <Area type="monotone" dataKey="hba1c" stroke="#0bcfcf" strokeWidth={3} fillOpacity={1} fill="url(#colorHb)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 2: AI Scan Confidence */}
            <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-brand p-3 rounded-2xl shadow-lg shadow-brand/20">
                  <Scan className="text-white w-5 h-5" />
                </div>
                <h3 className="font-bold text-xl text-slate-800 font-montserrat">AI Scan Confidence (%)</h3>
              </div>
              
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={eyeData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                    <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                    <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '20px', border: 'none' }} />
                    <Bar dataKey="confidence" radius={[10, 10, 0, 0]} barSize={40}>
                      {eyeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.risk_level === 'High' ? '#f87171' : '#0bcfcf'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Retinal Scan Repository */}
            <div className="lg:col-span-2 bg-white p-10 rounded-[48px] border border-slate-100">
               <h3 className="font-bold text-xl text-slate-800 font-montserrat mb-8 flex items-center gap-3">
                 <Eye className="text-brand w-6 h-6" /> Retinal Scan Repository
               </h3>
               <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                  {eyeData.map((scan, idx) => (
                    <div key={idx} className="group relative aspect-square rounded-3xl overflow-hidden bg-slate-100 border border-slate-200">
                       <img src={scan.eye_scan_url} alt="Scan" className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                       <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 text-center">
                          <p className="text-white text-[10px] font-bold uppercase mb-1">{scan.date}</p>
                          <p className={`text-[10px] font-black px-2 py-0.5 rounded-full ${scan.risk_level === 'High' ? 'bg-red-500' : 'bg-brand'}`}>
                            {scan.risk_level}
                          </p>
                          <a href={scan.eye_scan_url} target="_blank" className="mt-3 text-white/70 hover:text-white transition-colors">
                            <ExternalLink className="w-4 h-4" />
                          </a>
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            {/* Risk Summary Card Updated with Reference Values */}
            <div className="lg:col-span-2 bg-[#0f172a] p-10 rounded-[48px] text-white flex flex-col md:flex-row items-center justify-between gap-8">
               <div className="flex items-center gap-6">
                  <div className={`w-20 h-20 rounded-3xl flex items-center justify-center border ${hba1cStatus ? hba1cStatus.bg.replace('bg-', 'bg-opacity-20 bg-') : 'bg-brand/20 border-brand/30'}`}>
                    {hba1cStatus ? <Activity className={`w-10 h-10 ${hba1cStatus.text}`} /> : <AlertCircle className="w-10 h-10 text-brand" />}
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold font-montserrat mb-1 tracking-tight">
                      {hba1cStatus ? hba1cStatus.label : "AI Diagnostic Summary"}
                    </h4>
                    <p className="text-slate-400 max-w-md font-light">
                      {hba1cStatus 
                        ? hba1cStatus.desc 
                        : `Current retinal analysis suggests a ${latestRecord?.risk_level || 'Pending'} risk level.`}
                    </p>
                  </div>
               </div>
               <div className="bg-white/5 p-6 rounded-[32px] border border-white/10 text-center min-w-[240px]">
                  <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1">Current HbA1c</p>
                  <p className={`text-3xl font-bold font-montserrat ${hba1cStatus ? hba1cStatus.text : 'text-white'}`}>
                    {latestRecord?.hba1c > 0 ? `${latestRecord.hba1c}%` : "--"}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold">Latest Entry: {latestRecord?.date}</p>
               </div>
            </div>

          </div>
        ) : (
          <div className="bg-white rounded-[40px] p-20 text-center border border-slate-100">
            <Scan className="w-16 h-16 text-slate-100 mx-auto mb-4" />
            <p className="text-slate-400 font-medium font-montserrat">No diagnostic history available.</p>
            <button onClick={() => router.push('/diagnostics')} className="mt-6 text-brand font-bold uppercase text-xs tracking-widest border-b-2 border-brand/20 hover:border-brand transition-all">Upload First Scan</button>
          </div>
        )}
      </div>
    </main>
  );
}