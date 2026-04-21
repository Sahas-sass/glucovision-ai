"use client";

import { 
  Plus, 
  History, 
  TrendingUp, 
  Calendar, 
  ChevronRight, 
  Activity,
  Eye
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      
      
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-montserrat font-bold text-slate-900">Good Evening, Kamal</h1>
            <p className="text-slate-500 mt-1">Here is an update on your eye health and glucose trends.</p>
          </div>
          
          <Link href="/diagnostics">
            <button className="bg-brand text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 shadow-lg shadow-brand/20 hover:bg-brand-dark transition-all hover:scale-105 active:scale-95">
              <Plus className="w-5 h-5" />
              New Check-up
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Stats Summary */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Status Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-8 rounded-[35px] border border-slate-100 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                  <Eye className="w-20 h-20 text-brand" />
                </div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Latest Retina Scan</p>
                <h3 className="text-2xl font-montserrat font-bold text-slate-800">Healthy / Low Risk</h3>
                <p className="text-sm text-brand mt-4 font-medium flex items-center gap-1">
                  Checked 12 days ago <ChevronRight className="w-4 h-4" />
                </p>
              </div>

              <div className="bg-white p-8 rounded-[35px] border border-slate-100 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                  <Activity className="w-20 h-20 text-brand" />
                </div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Avg. Blood Sugar</p>
                <h3 className="text-2xl font-montserrat font-bold text-slate-800">142 mg/dL</h3>
                <p className="text-sm text-orange-500 mt-4 font-medium flex items-center gap-1">
                  Slightly high today <ChevronRight className="w-4 h-4" />
                </p>
              </div>
            </div>

            {/* Recent Activity / History Preview */}
            <div className="bg-white rounded-[35px] border border-slate-100 shadow-sm p-8">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-montserrat font-bold text-slate-900">Recent Checks</h3>
                <Link href="/analytics" className="text-brand text-sm font-bold hover:underline">View All</Link>
              </div>
              
              <div className="space-y-4">
                {[
                  { date: "Apr 12, 2026", type: "Full Analysis", status: "Complete", color: "bg-green-100 text-green-600" },
                  { date: "Mar 05, 2026", type: "Retina Scan", status: "Moderate Risk", color: "bg-orange-100 text-orange-600" },
                  { date: "Feb 18, 2026", type: "Report Parse", status: "Data Extracted", color: "bg-blue-100 text-blue-600" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                    <div className="flex items-center gap-4">
                      <div className="bg-slate-100 p-3 rounded-xl">
                        <History className="w-5 h-5 text-slate-500" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 text-sm">{item.type}</p>
                        <p className="text-xs text-slate-400">{item.date}</p>
                      </div>
                    </div>
                    <span className={`px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${item.color}`}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Health Tips & Reminders */}
          <div className="space-y-8">
            <div className="bg-slate-900 rounded-[35px] p-8 text-white shadow-xl">
              <TrendingUp className="w-8 h-8 text-brand mb-6" />
              <h3 className="text-xl font-montserrat font-bold mb-4">Vision Protection</h3>
              <p className="text-sm opacity-70 leading-relaxed mb-6">
                Your next recommended eye screening is in **October 2026**. Consistent glucose monitoring can reduce vision loss risk by 50%.
              </p>
              <button className="w-full py-3 bg-brand/20 border border-brand/30 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-brand/30 transition-all">
                Schedule Reminder
              </button>
            </div>

            <div className="bg-white rounded-[35px] border border-slate-100 shadow-sm p-8">
              <h3 className="text-lg font-montserrat font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-brand" />
                Upcoming
              </h3>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Next Lab Report</p>
                <p className="text-sm font-bold text-slate-800 mt-1">Visit Lanka Hospital for HbA1c</p>
                <p className="text-xs text-brand mt-2">Monday, May 04</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}