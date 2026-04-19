import Navbar from "@/components/Navbar";
import AnalyticsDashboard from "@/components/AnalyticsDashboard";
import { ArrowLeft, Download, Share2 } from "lucide-react";
import Link from "next/link";

export default function AnalyticsPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <Link href="/diagnostics" className="flex items-center gap-2 text-slate-500 hover:text-brand transition mb-2 group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium">New Analysis</span>
            </Link>
            <h1 className="text-3xl font-montserrat font-bold text-slate-900">Patient Diagnostic Report</h1>
          </div>
          
          <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-white border border-slate-200 px-5 py-2.5 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition shadow-sm">
              <Share2 className="w-4 h-4" /> Share
            </button>
            <button className="flex items-center gap-2 bg-brand text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-brand-dark transition shadow-lg shadow-brand/20">
              <Download className="w-4 h-4" /> Download PDF
            </button>
          </div>
        </div>

        {/* The Dashboard Component */}
        <AnalyticsDashboard />

        <div className="mt-8 p-6 bg-orange-50 border border-orange-100 rounded-3xl">
          <p className="text-sm text-orange-800 leading-relaxed">
            <strong>Clinical Note:</strong> The detected correlation between the HbA1c spike in April and the Moderate NPDR grading suggests rapid microvascular changes. Immediate ophthalmological referral is recommended for laser photocoagulation assessment.
          </p>
        </div>
      </div>
    </main>
  );
}