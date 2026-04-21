"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { 
  Plus, 
  History, 
  TrendingUp, 
  ChevronRight, 
  Activity,
  Eye,
  FileText
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const [userName, setUserName] = useState("Patient");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user_profile") || "{}");
    if (storedUser.name) setUserName(storedUser.name);
  }, []);

  // Mock history data including the real Matara report
  const historyData = [
    { 
      date: "Mar 28, 2026", 
      type: "Mohotti Edilab Report", 
      result: "9.6% HbA1c", 
      status: "Critical", 
      color: "text-red-600 bg-red-50" 
    },
    { 
      date: "Jan 15, 2026", 
      type: "Retina Scan", 
      result: "Healthy", 
      status: "Normal", 
      color: "text-green-600 bg-green-50" 
    },
    { 
      date: "Dec 10, 2025", 
      type: "Lab Report", 
      result: "8.2% HbA1c", 
      status: "High", 
      color: "text-orange-600 bg-orange-50" 
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 font-montserrat">
      
      
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              Welcome back, {userName.split(' ')[0]}
            </h1>
            <p className="text-slate-500 mt-1">Your health journey at a glance.</p>
          </div>
          
          <Link href="/diagnostics">
            <button className="bg-brand text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 shadow-lg shadow-brand/20 hover:scale-105 transition-all">
              <Plus className="w-5 h-5" /> New Analysis
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content: History Timeline */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-[40px] p-8 shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-slate-800">Recent Medical History</h3>
                <History className="w-5 h-5 text-slate-400" />
              </div>

              <div className="space-y-4">
                {historyData.map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-5 rounded-3xl border border-slate-50 hover:border-brand/20 hover:bg-slate-50/50 transition-all group">
                    <div className="flex items-center gap-4">
                      <div className="bg-slate-100 p-3 rounded-2xl group-hover:bg-white transition-colors">
                        {item.type.includes("Scan") ? <Eye className="w-5 h-5 text-brand"/> : <FileText className="w-5 h-5 text-blue-500"/>}
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 text-sm">{item.type}</p>
                        <p className="text-xs text-slate-400">{item.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right hidden sm:block">
                        <p className="text-sm font-bold text-slate-700">{item.result}</p>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter ${item.color}`}>
                          {item.status}
                        </span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-brand transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Side Content: Quick Insight */}
          <div className="space-y-6">
            <div className="bg-slate-900 rounded-[40px] p-8 text-white relative overflow-hidden shadow-xl">
              <div className="relative z-10">
                <TrendingUp className="w-10 h-10 text-brand mb-6" />
                <h3 className="text-xl font-bold mb-3">AI Trend Alert</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Your HbA1c has increased from **8.2%** to **9.6%** since December. We recommend running a new Retina Scan today to check for vascular changes.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm text-center">
              <Activity className="w-10 h-10 text-brand mx-auto mb-4 opacity-20" />
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Health Score</p>
              <p className="text-4xl font-bold text-slate-800 mt-2">68/100</p>
              <p className="text-[10px] text-orange-500 font-bold mt-2">Requires Attention</p>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}