"use client";
import Navbar from "@/components/Navbar";
import RetinaRiskMeter from "@/components/RetinaRiskMeter";
import GlucoseTrendChart from "@/components/GlucoseTrendChart";
// Added TrendingUp and Activity to the imports below
import { Download, Share2, Info, TrendingUp, Activity } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
          <div>
            <h1 className="text-3xl font-montserrat font-bold text-slate-900">Your Health Analysis</h1>
            <p className="text-slate-500 mt-2">Generated on April 21, 2026</p>
          </div>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 text-slate-600 bg-white border border-slate-200 px-6 py-3 rounded-2xl font-bold hover:bg-slate-50 transition-all">
              <Share2 className="w-4 h-4" /> Share
            </button>
            <button className="flex items-center gap-2 bg-brand text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-brand/20 hover:scale-105 transition-all">
              <Download className="w-4 h-4" /> Save PDF
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Eye Scan Card */}
          <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100">
            <h3 className="text-xl font-montserrat font-bold mb-8 text-slate-800">RetinaEngine Analysis</h3>
            <RetinaRiskMeter />
            <div className="mt-6 p-6 bg-slate-50 rounded-3xl border border-slate-100">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                <Info className="w-3 h-3" /> AI Observation
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                Small clusters of microaneurysms detected in the peripheral region. Immediate clinical concern is low, but annual screening is mandatory.
              </p>
            </div>
          </div>

          {/* Blood Report Card */}
          <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100">
            <h3 className="text-xl font-montserrat font-bold mb-8 text-slate-800">Blood Glucose Trends</h3>
            <GlucoseTrendChart />
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Average HbA1c</p>
                <p className="text-xl font-bold text-blue-700">7.2%</p>
              </div>
              <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100">
                <p className="text-[10px] font-bold text-orange-400 uppercase tracking-widest">Variability</p>
                <p className="text-xl font-bold text-orange-700">High</p>
              </div>
            </div>
          </div>
        </div>

        {/* The Integrated AI Bridge */}
        <div className="mt-12 p-8 bg-slate-900 rounded-[40px] text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-10 opacity-10">
            <TrendingUp className="w-32 h-32" />
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-brand p-2 rounded-lg">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <h4 className="text-xl font-montserrat font-bold">Integrated AI Insight</h4>
            </div>
            
            <p className="text-slate-300 leading-relaxed max-w-3xl">
              Our cross-analysis indicates that your <span className="text-white font-bold underline decoration-brand underline-offset-4">glucose spike on Friday (190 mg/dL)</span> directly correlates with the <span className="text-white font-bold underline decoration-brand underline-offset-4">new microaneurysms</span> detected in your right eye. 
              Stabilizing your sugar levels over the next 3 weeks is critical to preventing progression to Level 3 Retinopathy.
            </p>
            
            <div className="mt-8 flex gap-4">
              <div className="bg-white/10 px-6 py-3 rounded-2xl border border-white/10 text-[10px] font-bold uppercase tracking-widest">
                Next Checkup: 30 Days
              </div>
              <div className="bg-white/10 px-6 py-3 rounded-2xl border border-white/10 text-[10px] font-bold uppercase tracking-widest text-brand">
                High Priority Recommendation
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}