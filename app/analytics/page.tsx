"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { supabase } from "@/lib/supabase";
import { 
  Plus, 
  History, 
  TrendingUp, 
  ChevronRight, 
  Activity,
  Eye,
  FileText,
  Loader2
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const [userName, setUserName] = useState("Patient");
  const [historyData, setHistoryData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ latestHbA1c: "N/A", trend: "Stable" });

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      
      // 1. Get Logged in User
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserName(user.user_metadata?.full_name || "Patient");

        // 2. Fetch History from Supabase
        const { data: records, error } = await supabase
          .from('health_records')
          .select('*')
          .eq('patient_id', user.id)
          .order('created_at', { ascending: false });

        if (records) {
          setHistoryData(records);
          
          // 3. Simple logic for the AI Trend Sidebar
          if (records.length > 0) {
            const latest = records.find(r => r.hba1c_value);
            setStats({
              latestHbA1c: latest ? `${latest.hba1c_value}%` : "N/A",
              trend: latest?.hba1c_value > 8 ? "Requires Attention" : "Stable"
            });
          }
        }
      }
      setLoading(false);
    };

    fetchDashboardData();
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 font-montserrat">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              Welcome back, {userName.split(' ')[0]}
            </h1>
            <p className="text-slate-500 mt-1 font-medium">Your medical records are synchronized.</p>
          </div>
          
          <Link href="/diagnostics">
            <button className="bg-brand text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 shadow-lg shadow-brand/20 hover:scale-105 transition-all">
              <Plus className="w-5 h-5" /> New Analysis
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content: Real-time History Timeline */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-[40px] p-8 shadow-sm border border-slate-100 min-h-[400px]">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-slate-800">Medical Timeline</h3>
                <History className="w-5 h-5 text-slate-400" />
              </div>

              {loading ? (
                <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                  <Loader2 className="w-10 h-10 animate-spin mb-4" />
                  <p className="text-sm font-bold">Fetching cloud records...</p>
                </div>
              ) : historyData.length === 0 ? (
                <div className="text-center py-20 border-2 border-dashed border-slate-100 rounded-3xl">
                   <p className="text-slate-400 font-medium">No records found. Start your first analysis.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {historyData.map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-5 rounded-3xl border border-slate-50 hover:border-brand/20 hover:bg-slate-50/50 transition-all group">
                      <div className="flex items-center gap-4">
                        <div className="bg-slate-100 p-3 rounded-2xl group-hover:bg-white transition-colors">
                          {item.eye_scan_url ? <Eye className="w-5 h-5 text-brand"/> : <FileText className="w-5 h-5 text-blue-500"/>}
                        </div>
                        <div>
                          <p className="font-bold text-slate-800 text-sm">
                            {item.hospital_name || "Diagnostic Result"}
                          </p>
                          <p className="text-xs text-slate-400">
                            {new Date(item.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right hidden sm:block">
                          <p className="text-sm font-bold text-slate-700">
                            {item.hba1c_value ? `${item.hba1c_value}% HbA1c` : item.risk_level}
                          </p>
                          <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter 
                            ${item.hba1c_value > 8 || item.risk_level === 'High' ? 'text-red-600 bg-red-50' : 'text-green-600 bg-green-50'}`}>
                            {item.hba1c_value > 8 || item.risk_level === 'High' ? 'Critical' : 'Normal'}
                          </span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-brand transition-colors" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Side Content: AI-Driven Metrics */}
          <div className="space-y-6">
            <div className="bg-slate-900 rounded-[40px] p-8 text-white relative overflow-hidden shadow-xl">
              <div className="absolute -top-10 -right-10 bg-brand/10 w-32 h-32 rounded-full blur-3xl"></div>
              <div className="relative z-10">
                <TrendingUp className="w-10 h-10 text-brand mb-6" />
                <h3 className="text-xl font-bold mb-3 tracking-tight">AI Trend Alert</h3>
                <p className="text-sm text-slate-300 leading-relaxed font-light">
                  {stats.latestHbA1c !== "N/A" 
                    ? `Your latest HbA1c is ${stats.latestHbA1c}. Based on the Mohotti Edilab datasets, this indicates a high correlation with potential vision changes.`
                    : "No data points available yet. Complete your first scan to generate AI trends."}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm text-center">
              <Activity className="w-10 h-10 text-brand mx-auto mb-4 opacity-20" />
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Health Index</p>
              <p className="text-4xl font-bold text-slate-800 mt-2">
                {parseFloat(stats.latestHbA1c) > 9 ? "54" : "78"}/100
              </p>
              <p className={`text-[10px] font-bold mt-2 uppercase ${stats.trend.includes("Attention") ? "text-red-500" : "text-brand"}`}>
                {stats.trend}
              </p>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}