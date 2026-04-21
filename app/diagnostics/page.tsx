"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Upload, FileText, Activity, Eye, Search, Loader2, CheckCircle, ArrowRight } from 'lucide-react';

export default function DiagnosticsPage() {
  const router = useRouter();
  
  const [image, setImage] = useState<string | null>(null);
  const [report, setReport] = useState<string | null>(null);
  const [isImgLoading, setIsImgLoading] = useState(false);
  const [isRepLoading, setIsRepLoading] = useState(false);
  const [imgDone, setImgDone] = useState(false);
  const [repDone, setRepDone] = useState(false);

  // Retina Scan Simulation
  const simulateImg = () => {
    setIsImgLoading(true);
    setTimeout(() => {
      setIsImgLoading(false);
      setImgDone(true);
      
      // MOCK AI LOGIC: Given 9.6% HbA1c, the probability of High Risk is set higher
      const riskLevels = ["Moderate", "High", "High"]; // Adjusted for medical consistency
      const selectedRisk = riskLevels[Math.floor(Math.random() * riskLevels.length)];
      localStorage.setItem("last_eye_result", selectedRisk);
    }, 2500);
  };

  // Report Parsing Simulation (Targeting Mohotti Edilab Data)
  const simulateRep = () => {
    setIsRepLoading(true);
    setTimeout(() => {
      setIsRepLoading(false);
      setRepDone(true);

      // EXTRACTED DATA FROM MOHOTTI EDILAB REPORT
      const mohottiReportData = {
        avg: "229 mg/dL", // Estimated glucose based on 9.6% HbA1c
        hba1c: "9.6%",
        trend: "Unsatisfactory",
        hospital: "Mohotti Edilab, Matara",
        patient: "Mrs. W.G. Neela Pathmini",
        date: "Mar 28, 2026"
      };
      
      localStorage.setItem("last_report_data", JSON.stringify(mohottiReportData));
    }, 2500);
  };

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-6 font-montserrat">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
           <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Diagnostic Portal</h1>
           <p className="text-slate-500 uppercase text-xs font-bold tracking-widest">Sri Lanka Health Network Integration</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Retina Scanner Card */}
          <div className={`bg-white p-8 rounded-[40px] shadow-sm border transition-all ${imgDone ? 'border-brand' : 'border-slate-100'} flex flex-col`}>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-brand/10 p-3 rounded-xl"><Eye className="text-brand w-6 h-6"/></div>
              <h3 className="font-bold text-xl text-slate-800">RetinaEngine AI</h3>
            </div>
            
            <div 
              onClick={() => !imgDone && document.getElementById('imgIn')?.click()} 
              className={`flex-1 border-2 border-dashed rounded-3xl p-6 flex items-center justify-center cursor-pointer transition-all min-h-[240px]
                ${image ? 'border-brand bg-brand/5' : 'border-slate-100 hover:bg-slate-50'}`}
            >
              <input 
                type="file" 
                id="imgIn" 
                hidden 
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    setImage(URL.createObjectURL(e.target.files[0]));
                    setImgDone(false);
                  }
                }} 
              />
              {image ? (
                <div className="relative">
                  <img src={image} className="max-h-40 rounded-xl shadow-md border-2 border-white" alt="Retina Preview" />
                  {imgDone && <div className="absolute inset-0 bg-brand/20 flex items-center justify-center rounded-xl"><CheckCircle className="text-white w-10 h-10 drop-shadow-md"/></div>}
                </div>
              ) : (
                <div className="text-center text-slate-400">
                  <Upload className="mx-auto mb-3 w-10 h-10 opacity-30"/> 
                  <p className="font-bold text-slate-500">Drop Retinal Image</p>
                  <p className="text-[10px] uppercase tracking-wider mt-1">Fundus Photography Only</p>
                </div>
              )}
            </div>
            
            <button 
              onClick={simulateImg} 
              disabled={!image || imgDone || isImgLoading} 
              className="mt-6 w-full py-4 bg-slate-900 text-white rounded-2xl font-bold flex justify-center items-center gap-2 disabled:bg-slate-100 disabled:text-slate-300 transition-all active:scale-95"
            >
              {isImgLoading ? (
                <><Loader2 className="animate-spin w-5 h-5" /> Identifying Lesions...</>
              ) : imgDone ? (
                <><CheckCircle className="w-5 h-5 text-brand" /> Scan Analyzed</>
              ) : (
                "Run RetinaEngine AI"
              )}
            </button>
          </div>

          {/* Lab Report Parser Card */}
          <div className={`bg-white p-8 rounded-[40px] shadow-sm border transition-all ${repDone ? 'border-blue-500' : 'border-slate-100'} flex flex-col`}>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-50 p-3 rounded-xl"><FileText className="text-blue-500 w-6 h-6"/></div>
              <h3 className="font-bold text-xl text-slate-800">ReportParser AI</h3>
            </div>
            
            <div 
              onClick={() => !repDone && document.getElementById('repIn')?.click()} 
              className={`flex-1 border-2 border-dashed rounded-3xl p-6 flex items-center justify-center cursor-pointer transition-all min-h-[240px]
                ${report ? 'border-blue-500 bg-blue-50/50' : 'border-slate-100 hover:bg-slate-50'}`}
            >
              <input 
                type="file" 
                id="repIn" 
                hidden 
                accept=".pdf,.jpg,.png"
                onChange={() => {
                  setReport("MohottiEdilab_0421.pdf");
                  setRepDone(false);
                }} 
              />
              {report ? (
                <div className="text-center animate-in zoom-in-95 duration-300">
                  <div className="bg-blue-500/10 p-5 rounded-full inline-block mb-3">
                    <FileText className="w-10 h-10 text-blue-500 mx-auto" />
                  </div>
                  <p className="text-blue-600 font-bold text-sm tracking-tight">MohottiEdilab_Report.jpg</p>
                  <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mt-1">Ready for OCR Extraction</p>
                </div>
              ) : (
                <div className="text-center text-slate-400">
                  <Upload className="mx-auto mb-3 w-10 h-10 opacity-30"/> 
                  <p className="font-bold text-slate-500">Upload Lab Report</p>
                  <p className="text-[10px] uppercase tracking-wider mt-1">Official SL Hospital Formats</p>
                </div>
              )}
            </div>

            <button 
              onClick={simulateRep} 
              disabled={!report || repDone || isRepLoading} 
              className="mt-6 w-full py-4 bg-slate-900 text-white rounded-2xl font-bold flex justify-center items-center gap-2 disabled:bg-slate-100 disabled:text-slate-300 transition-all active:scale-95"
            >
              {isRepLoading ? (
                <><Loader2 className="animate-spin w-5 h-5" /> Extracting HbA1c...</>
              ) : repDone ? (
                <><CheckCircle className="w-5 h-5 text-blue-500" /> 9.6% Detected</>
              ) : (
                "Run ReportParser AI"
              )}
            </button>
          </div>
        </div>

        {/* Integration Notification */}
        {(imgDone || repDone) && (
          <div className="mt-12 bg-slate-900 p-8 rounded-[40px] text-white flex flex-col md:flex-row justify-between items-center gap-6 shadow-2xl border border-white/5 animate-in slide-in-from-bottom-6">
            <div className="flex gap-4 items-center">
              <div className="bg-brand w-14 h-14 rounded-full flex items-center justify-center shadow-lg shadow-brand/30">
                <Activity className="w-7 h-7 text-white" />
              </div>
              <div>
                <h4 className="text-xl font-bold">Analysis Synchronized</h4>
                <p className="text-slate-400 text-sm">Cross-referencing Mohotti Edilab data with RetinaEngine scans.</p>
              </div>
            </div>
            <button 
              onClick={() => router.push('/analytics')} 
              className="bg-brand text-white px-10 py-5 rounded-2xl font-bold flex items-center gap-3 hover:bg-brand/90 transition-all shadow-xl shadow-brand/20 hover:scale-[1.03] active:scale-95"
            >
              View Analysis Dashboard <ArrowRight className="w-5 h-5"/>
            </button>
          </div>
        )}
      </div>
    </main>
  );
}