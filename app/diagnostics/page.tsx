"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Upload, FileText, Activity, Eye, Loader2, CheckCircle, ArrowRight } from 'lucide-react';

export default function DiagnosticsPage() {
  const router = useRouter();
  
  // UI Preview States
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [reportPreview, setReportPreview] = useState<string | null>(null);
  
  // Real File States for Supabase
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [reportFile, setReportFile] = useState<File | null>(null);

  const [isImgLoading, setIsImgLoading] = useState(false);
  const [isRepLoading, setIsRepLoading] = useState(false);
  const [imgDone, setImgDone] = useState(false);
  const [repDone, setRepDone] = useState(false);

  // Helper: Secure Cloud Upload
  const uploadToCloud = async (file: File) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from('medical-uploads')
      .upload(fileName, file);

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from('medical-uploads')
      .getPublicUrl(fileName);

    return publicUrl;
  };

  // 1. Process Eye Scan
  const handleRetinaAnalysis = async () => {
    if (!imageFile) return;
    setIsImgLoading(true);

    try {
      // Step A: Upload to Storage
      const cloudUrl = await uploadToCloud(imageFile);
      
      // Step B: Identify User
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User session not found. Please log in.");

      // Step C: Simulated AI result (Ready for Python API connection)
      const riskLevels = ["Moderate", "High", "High"];
      const selectedRisk = riskLevels[Math.floor(Math.random() * riskLevels.length)];

      // Step D: Insert into 'health_records' Table
      const { error } = await supabase.from('health_records').insert([{
        patient_id: user.id,
        eye_scan_url: cloudUrl,
        risk_level: selectedRisk,
        hospital_name: "Mohotti Edilab"
      }]);

      if (error) throw error;

      localStorage.setItem("last_eye_result", selectedRisk);
      setImgDone(true);
    } catch (error: any) {
      alert("Retina Analysis Failed: " + error.message);
    } finally {
      setIsImgLoading(false);
    }
  };

  // 2. Process Lab Report (Mohotti Edilab Data)
  const handleReportParsing = async () => {
    if (!reportFile) return;
    setIsRepLoading(true);

    try {
      // Step A: Upload Report File
      await uploadToCloud(reportFile);

      // Step B: Extracted Data (Hardcoded for current step)
      const mohottiReportData = {
        avg: "229 mg/dL",
        hba1c: "9.6%",
        trend: "Unsatisfactory",
        hospital: "Mohotti Edilab, Matara",
        date: "Mar 28, 2026"
      };

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User session not found.");

      // Step C: Save clinical metrics to Database
      const { error } = await supabase.from('health_records').insert([{
        patient_id: user.id,
        hba1c_value: 9.6,
        avg_glucose: 229,
        hospital_name: "Mohotti Edilab",
        is_integrated: true
      }]);

      if (error) throw error;

      localStorage.setItem("last_report_data", JSON.stringify(mohottiReportData));
      setRepDone(true);
    } catch (error: any) {
      alert("Report Parsing Failed: " + error.message);
    } finally {
      setIsRepLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-6 font-montserrat">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
           <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2 tracking-tight">Diagnostic Portal</h1>
           <p className="text-slate-500 uppercase text-[10px] font-bold tracking-[0.2em]">Secure Medical Cloud Sync Active</p>
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
                ${imagePreview ? 'border-brand bg-brand/5' : 'border-slate-100 hover:bg-slate-50'}`}
            >
              <input 
                type="file" id="imgIn" hidden accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setImageFile(file);
                    setImagePreview(URL.createObjectURL(file));
                    setImgDone(false);
                  }
                }} 
              />
              {imagePreview ? (
                <div className="relative animate-in fade-in zoom-in duration-300">
                  <img src={imagePreview} className="max-h-40 rounded-xl shadow-md border-2 border-white" alt="Retina Preview" />
                  {imgDone && <div className="absolute inset-0 bg-brand/20 flex items-center justify-center rounded-xl backdrop-blur-[2px]"><CheckCircle className="text-white w-10 h-10 drop-shadow-lg"/></div>}
                </div>
              ) : (
                <div className="text-center text-slate-400 group">
                  <Upload className="mx-auto mb-3 w-10 h-10 opacity-30 group-hover:opacity-50 transition-opacity"/> 
                  <p className="font-bold text-slate-500">Drop Retinal Image</p>
                </div>
              )}
            </div>
            
            <button 
              onClick={handleRetinaAnalysis} 
              disabled={!imagePreview || imgDone || isImgLoading} 
              className="mt-6 w-full py-4 bg-slate-900 text-white rounded-2xl font-bold flex justify-center items-center gap-2 disabled:bg-slate-100 disabled:text-slate-400 transition-all active:scale-[0.98]"
            >
              {isImgLoading ? <><Loader2 className="animate-spin w-5 h-5" /> Cloud Syncing...</> : imgDone ? "Analysis Saved" : "Analyze Eye Scan"}
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
                ${reportPreview ? 'border-blue-500 bg-blue-50/10' : 'border-slate-100 hover:bg-slate-50'}`}
            >
              <input 
                type="file" id="repIn" hidden accept=".pdf,.jpg,.png"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setReportFile(file);
                    setReportPreview("file-selected");
                    setRepDone(false);
                  }
                }} 
              />
              {reportPreview ? (
                <div className="text-center animate-in fade-in zoom-in duration-300">
                  <div className="bg-blue-500/20 p-4 rounded-full inline-block mb-2">
                    <FileText className="w-10 h-10 text-blue-500" />
                  </div>
                  <p className="text-blue-600 font-bold text-sm">Mohotti_Lab_Report.jpg</p>
                </div>
              ) : (
                <div className="text-center text-slate-400 group">
                  <Upload className="mx-auto mb-3 w-10 h-10 opacity-30 group-hover:opacity-50 transition-opacity"/> 
                  <p className="font-bold text-slate-500">Upload Blood Report</p>
                </div>
              )}
            </div>

            <button 
              onClick={handleReportParsing} 
              disabled={!reportPreview || repDone || isRepLoading} 
              className="mt-6 w-full py-4 bg-slate-900 text-white rounded-2xl font-bold flex justify-center items-center gap-2 disabled:bg-slate-100 disabled:text-slate-400 transition-all active:scale-[0.98]"
            >
              {isRepLoading ? <><Loader2 className="animate-spin w-5 h-5" /> Processing PDF...</> : repDone ? "Metrics Recorded" : "Analyze Lab Report"}
            </button>
          </div>
        </div>

        {/* Cloud Notification */}
        {(imgDone || repDone) && (
          <div className="mt-12 bg-slate-900 p-8 rounded-[40px] text-white flex flex-col md:flex-row justify-between items-center gap-6 shadow-2xl animate-in slide-in-from-bottom-10">
            <div className="flex gap-5 items-center">
              <div className="bg-brand w-16 h-16 rounded-3xl rotate-12 flex items-center justify-center shadow-xl shadow-brand/40">
                <Activity className="w-8 h-8 text-white -rotate-12" />
              </div>
              <div>
                <h4 className="text-xl font-bold tracking-tight">Database Synchronized</h4>
                <p className="text-slate-400 text-sm">Real-time health markers have been securely stored.</p>
              </div>
            </div>
            <button 
              onClick={() => router.push('/analytics')} 
              className="bg-brand text-white px-10 py-5 rounded-[20px] font-bold flex items-center gap-3 hover:bg-brand/90 hover:translate-x-1 transition-all shadow-lg shadow-brand/20"
            >
              Go to Analytics <ArrowRight className="w-5 h-5"/>
            </button>
          </div>
        )}
      </div>
    </main>
  );
}