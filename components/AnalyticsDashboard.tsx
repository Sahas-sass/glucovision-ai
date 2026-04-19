"use client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { AlertTriangle, Activity, Eye, TrendingUp, Download } from 'lucide-react';

const glucoseData = [
  { month: 'Jan', level: 135, risk: 20 },
  { month: 'Feb', level: 158, risk: 35 },
  { month: 'Mar', level: 142, risk: 30 },
  { month: 'Apr', level: 185, risk: 55 }, // The "Spike" that explains the DR progression
];

export default function AnalyticsDashboard() {
  return (
    <div className="space-y-8 animate-in fade-in zoom-in duration-700">
      {/* Top Row: AI Status Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-[35px] border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 text-orange-500 mb-4">
            <Eye className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-widest">RetinaEngine Result</span>
          </div>
          <div className="text-3xl font-montserrat font-bold text-slate-900">Moderate NPDR</div>
          <p className="text-sm text-slate-500 mt-2 italic">Severity Level 3 Detected</p>
        </div>

        <div className="bg-white p-8 rounded-[35px] border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 text-brand mb-4">
            <Activity className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-widest">ReportParser Result</span>
          </div>
          <div className="text-3xl font-montserrat font-bold text-slate-900">7.8% HbA1c</div>
          <p className="text-sm text-slate-500 mt-2 italic">High Glycemic Variability</p>
        </div>

        <div className="bg-slate-900 p-8 rounded-[35px] text-white shadow-xl shadow-slate-200">
          <div className="flex items-center gap-3 text-brand mb-4">
            <TrendingUp className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-widest opacity-70">Predictive Risk</span>
          </div>
          <div className="text-3xl font-montserrat font-bold">High Risk</div>
          <p className="text-sm opacity-60 mt-2 italic">Progression likely in 6 months</p>
        </div>
      </div>

      {/* Middle Row: The Longitudinal Trend Chart */}
      <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h3 className="text-xl font-montserrat font-bold text-slate-900">Integrated Health Tracking</h3>
            <p className="text-sm text-slate-500">Correlation between Glucose Levels and DR Risk Score</p>
          </div>
          <button className="flex items-center gap-2 text-brand font-bold text-sm border border-brand/20 px-4 py-2 rounded-xl hover:bg-brand/5 transition-colors">
            <Download className="w-4 h-4" /> Export Report
          </button>
        </div>

        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={glucoseData}>
              <defs>
                <linearGradient id="colorLevel" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0bcfcf" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#0bcfcf" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dx={-10} />
              <Tooltip 
                contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'}} 
              />
              <Area type="monotone" dataKey="level" stroke="#0bcfcf" strokeWidth={4} fillOpacity={1} fill="url(#colorLevel)" />
              <Line type="monotone" dataKey="risk" stroke="#f97316" strokeWidth={2} dot={false} strokeDasharray="5 5" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}