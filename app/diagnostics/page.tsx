"use client"; 

import { useState } from "react";
import { useRouter } from "next/navigation"; // Added for redirection
import Navbar from "@/components/Navbar";
import { 
  Upload, 
  FileText, 
  Activity, 
  CheckCircle, 
  Eye, 
  Search, 
  Loader2 
} from 'lucide-react';

export default function DiagnosticsPage() {
  const router = useRouter();
  
  // Loading States
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [isReportLoading, setIsReportLoading] = useState(false);

  // Completion States
  const [imageAnalyzed, setImageAnalyzed] = useState(false);
  const [reportParsed, setReportParsed] = useState(false);

  // Simulation Logic
  const handleImageAnalysis = () => {
    setIsImageLoading(true);
    setTimeout(() => {
      setIsImageLoading(false);
      setImageAnalyzed(true);
    }, 2500); // Simulated CNN processing time
  };

  const handleReportParsing = () => {
    setIsReportLoading(true);
    setTimeout(() => {
      setIsReportLoading(false);
      setReportParsed(true);
    }, 2000); // Simulated OCR processing time
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-montserrat font-bold text-slate-900">Personal Check-up</h1>
          <p className="text-slate-500 mt-2">Analyze eye health and medical reports separately or together.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Feature 1: Retinal Image Analysis */}
          <div className="bg-white rounded-[35px] p-8 shadow-sm border border-slate-100 flex flex-col">
            <div className="flex justify-between items-start mb-6">
              <div className="bg-brand/10 p-4 rounded-2xl">
                <Eye className="text-brand w-8 h-8" />
              </div>
              <span className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${imageAnalyzed ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-400'}`}>
                {imageAnalyzed ? "Complete" : isImageLoading ? "Analyzing..." : "Ready to Scan"}
              </span>
            </div>
            <h3 className="text-xl font-montserrat font-bold mb-2">RetinaEngine AI</h3>
            <p className="text-slate-500 text-sm mb-6 leading-relaxed">
              Scan fundus images to detect microvascular complications like Microaneurysms and Exudates.
            </p>
            
            <div className="border-2 border-dashed border-slate-100 rounded-3xl p-10 text-center hover:bg-slate-50 transition-colors cursor-pointer mb-6 group">
              {imageAnalyzed ? (
                <CheckCircle className="w-10 h-10 mx-auto text-green-500 animate-in zoom-in" />
              ) : (
                <Upload className="w-8 h-8 mx-auto text-slate-300 mb-2 group-hover:text-brand" />
              )}
              <p className="text-xs font-bold text-slate-400 mt-2">
                {imageAnalyzed ? "Retina Scanned" : "Select Eye Image"}
              </p>
            </div>

            <button 
              onClick={handleImageAnalysis}
              disabled={isImageLoading || imageAnalyzed}
              className="mt-auto w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-brand disabled:bg-slate-200 disabled:text-slate-400 transition-all flex items-center justify-center gap-2"
            >
              {isImageLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : imageAnalyzed ? "Analysis Finished" : <><Search className="w-4 h-4" /> Run Image Analysis</>}
            </button>
          </div>

          {/* Feature 2: Medical Report Parsing */}
          <div className="bg-white rounded-[35px] p-8 shadow-sm border border-slate-100 flex flex-col">
            <div className="flex justify-between items-start mb-6">
              <div className="bg-blue-50 p-4 rounded-2xl">
                <FileText className="text-blue-500 w-8 h-8" />
              </div>
              <span className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${reportParsed ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-400'}`}>
                {reportParsed ? "Complete" : isReportLoading ? "Parsing..." : "Ready to Parse"}
              </span>
            </div>
            <h3 className="text-xl font-montserrat font-bold mb-2">ReportParser AI</h3>
            <p className="text-slate-500 text-sm mb-6 leading-relaxed">
              Extract glucose trends and HbA1c levels automatically from clinical blood reports.
            </p>
            
            <div className="border-2 border-dashed border-slate-100 rounded-3xl p-10 text-center hover:bg-slate-50 transition-colors cursor-pointer mb-6 group">
              {reportParsed ? (
                <CheckCircle className="w-10 h-10 mx-auto text-green-500 animate-in zoom-in" />
              ) : (
                <FileText className="w-8 h-8 mx-auto text-slate-300 mb-2 group-hover:text-blue-500" />
              )}
              <p className="text-xs font-bold text-slate-400 mt-2">
                {reportParsed ? "Data Extracted" : "Select PDF Report"}
              </p>
            </div>

            <button 
              onClick={handleReportParsing}
              disabled={isReportLoading || reportParsed}
              className="mt-auto w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-blue-500 disabled:bg-slate-200 disabled:text-slate-400 transition-all flex items-center justify-center gap-2"
            >
              {isReportLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : reportParsed ? "Report Ready" : <><Activity className="w-4 h-4" /> Parse Medical Data</>}
            </button>
          </div>

        </div>

        {/* The Integration Bridge */}
        {(imageAnalyzed || reportParsed) && !isImageLoading && !isReportLoading && (
          <div className="mt-12 p-10 bg-brand rounded-[40px] text-white flex flex-col md:flex-row items-center justify-between shadow-2xl shadow-brand/30 animate-in fade-in slide-in-from-bottom-10 duration-700">
            <div className="max-w-lg">
              <h4 className="text-2xl font-montserrat font-bold mb-2">Analysis Complete!</h4>
              <p className="opacity-90 text-sm leading-relaxed">
                We've processed your {imageAnalyzed ? "retinal findings" : ""} {imageAnalyzed && reportParsed ? "and" : ""} {reportParsed ? "blood chemistry data" : ""}. Click below for the integrated diagnostic report.
              </p>
            </div>
            <button 
              onClick={() => router.push('/analytics')}
              className="mt-8 md:mt-0 px-12 py-5 bg-white text-brand rounded-2xl font-bold text-lg hover:scale-105 transition-transform shadow-xl"
            >
              View Full Analytics
            </button>
          </div>
        )}
      </div>
    </main>
  );
}