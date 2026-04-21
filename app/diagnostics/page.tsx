"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { 
  Upload, 
  FileText, 
  Activity, 
  Eye, 
  Loader2, 
  CheckCircle, 
  ArrowRight,
  ChevronLeft 
} from 'lucide-react';

export default function DiagnosticsPage() {
  const router = useRouter();
  
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [reportPreview, setReportPreview] = useState<string | null>(null);
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [reportFile, setReportFile] = useState<File | null>(null);

  const [isImgLoading, setIsImgLoading] = useState(false);
  const [isRepLoading, setIsRepLoading] = useState(false);
  const [imgDone, setImgDone] = useState(false);
  const [repDone, setRepDone] = useState(false);

  const uploadToCloud = async (file: File) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const { data, error } = await supabase.storage.from('medical-uploads').upload(fileName, file);
    if (error) throw error;
    const { data: { publicUrl } } = supabase.storage.from('medical-uploads').getPublicUrl(fileName);
    return publicUrl;
  };

  // 1. Retina Analysis
  const handleRetinaAnalysis = async () => {
    if (!imageFile) return;
    setIsImgLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Session expired. Please log in again.");

      const cloudUrl = await uploadToCloud(imageFile);
      
      const formData = new FormData();
      formData.append('file', imageFile);

      const aiResponse = await fetch('http://127.0.0.1:8000/analyze-retina', {
        method: 'POST',
        mode: 'cors',
        body: formData,
      });

      if (!aiResponse.ok) throw new Error("AI Core is unreachable.");
      const aiResult = await aiResponse.json();

      const { error: dbError } = await supabase.from('health_records').insert([{
        patient_id: user.id,
        eye_scan_url: cloudUrl,
        risk_level: aiResult.risk_level,
        ai_conclusion: `${aiResult.conclusion} (Confidence: ${Math.round(aiResult.confidence * 100)}%)`,
        hospital_name: "GlucoVision AI Core"
      }]);

      if (dbError) throw dbError;
      setImgDone(true);
    } catch (error: any) {
      alert(`Process Failed: ${error.message}`);
    } finally {
      setIsImgLoading(false);
    }
  };

  // 2. Lab Report Analysis - UPDATED TO USE AI CORE
  const handleReportParsing = async () => {
    if (!reportFile) return;
    setIsRepLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Please log in.");

      const cloudUrl = await uploadToCloud(reportFile);
      
      const formData = new FormData();
      formData.append('file', reportFile);

      // Fetching from your new analyze-report endpoint
      const aiResponse = await fetch('http://127.0.0.1:8000/analyze-report', {
        method: 'POST',
        mode: 'cors',
        body: formData,
      });

      if (!aiResponse.ok) throw new Error("Report AI Core unreachable.");
      const aiResult = await aiResponse.json();

      const { error } = await supabase.from('health_records').insert([{
        patient_id: user.id,
        hba1c_value: aiResult.hba1c, // Dynamic value from Python!
        hospital_name: aiResult.hospital,
        risk_level: aiResult.risk_level,
        ai_conclusion: aiResult.conclusion,
        report_image_url: cloudUrl, // Storing for the dashboard thumbnail
        is_integrated: true
      }]);

      if (error) throw error;
      setRepDone(true);
    } catch (error: any) {
      alert(`Report Sync Failed: ${error.message}`);
    } finally {
      setIsRepLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 font-inter">
      <header className="px-8 py-6 flex justify-between items-center bg-white border-b border-slate-100 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="relative w-40 h-10">
            <Image src="/logo.png" alt="GlucoVision Logo" fill className="object-contain" priority />
          </div>
        </div>
        <button onClick={() => router.push('/dashboard')} className="flex items-center gap-2 text-slate-400 hover:text-brand transition-colors font-bold text-[10px] uppercase tracking-widest">
          <ChevronLeft className="w-4 h-4" /> Back to Dashboard
        </button>
      </header>

      <div className="max-w-6xl mx-auto py-12 px-6">
        <div className="text-center mb-16">
           <h1 className="text-4xl font-bold text-slate-900 mb-3 font-montserrat tracking-tight">Diagnostic Portal</h1>
           <p className="text-brand font-bold uppercase text-[10px] tracking-[0.3em]">Neural Bridge Active • Port 8000</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-10">
          {/* Retina Engine Section */}
          <div className={`bg-white p-10 rounded-[48px] shadow-sm border transition-all ${imgDone ? 'border-brand' : 'border-slate-100'} flex flex-col`}>
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-brand/10 p-4 rounded-2xl"><Eye className="text-brand w-7 h-7"/></div>
              <div>
                <h3 className="font-bold text-2xl text-slate-800 font-montserrat tracking-tight">RetinaEngine AI</h3>
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Vascular Deep Learning</p>
              </div>
            </div>
            
            <div onClick={() => !imgDone && document.getElementById('imgIn')?.click()} 
              className={`flex-1 border-2 border-dashed rounded-[32px] p-8 flex items-center justify-center cursor-pointer transition-all min-h-[300px]
                ${imagePreview ? 'border-brand bg-brand/5' : 'border-slate-100 hover:bg-slate-50'}`}>
              <input type="file" id="imgIn" hidden accept="image/*" onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setImageFile(file);
                    setImagePreview(URL.createObjectURL(file));
                    setImgDone(false);
                  }
                }} 
              />
              {imagePreview ? (
                <div className="relative animate-in fade-in zoom-in duration-500 text-center">
                  <img src={imagePreview} className="max-h-48 rounded-2xl shadow-xl border-4 border-white mb-4 mx-auto" alt="Retina Preview" />
                  {imgDone && <div className="absolute inset-0 bg-brand/20 flex items-center justify-center rounded-2xl backdrop-blur-[2px]"><CheckCircle className="text-white w-12 h-12 drop-shadow-2xl"/></div>}
                </div>
              ) : (
                <div className="text-center text-slate-300 group">
                  <Upload className="mx-auto mb-4 w-12 h-12 opacity-20 group-hover:opacity-40 transition-opacity animate-float"/> 
                  <p className="font-bold text-slate-400 text-sm">Drop Retinal Scan</p>
                </div>
              )}
            </div>
            
            <button onClick={handleRetinaAnalysis} disabled={!imagePreview || imgDone || isImgLoading} className="mt-8 w-full py-5 bg-slate-900 text-white rounded-[20px] font-bold font-montserrat flex justify-center items-center gap-3 disabled:bg-slate-100 disabled:text-slate-300 transition-all active:scale-[0.98] shadow-lg shadow-slate-200 uppercase text-xs tracking-widest">
              {isImgLoading ? <><Loader2 className="animate-spin w-4 h-4" /> Analyzing Retina...</> : imgDone ? "Scan Saved" : "Run Eye Analysis"}
            </button>
          </div>

          {/* Report Parser Section - UPDATED UI FOR IMAGE PREVIEW */}
          <div className={`bg-white p-10 rounded-[48px] shadow-sm border transition-all ${repDone ? 'border-brand' : 'border-slate-100'} flex flex-col`}>
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-brand/10 p-4 rounded-2xl"><FileText className="text-brand w-7 h-7"/></div>
              <div>
                <h3 className="font-bold text-2xl text-slate-800 font-montserrat tracking-tight">ReportParser AI</h3>
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Clinical Metric OCR</p>
              </div>
            </div>
            
            <div onClick={() => !repDone && document.getElementById('repIn')?.click()} className={`flex-1 border-2 border-dashed rounded-[32px] p-8 flex items-center justify-center cursor-pointer transition-all min-h-[300px]
                ${reportPreview ? 'border-brand bg-brand/5' : 'border-slate-100 hover:bg-slate-50'}`}>
              <input type="file" id="repIn" hidden accept="image/*,application/pdf" onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setReportFile(file);
                    setReportPreview(file.type.startsWith('image/') ? URL.createObjectURL(file) : file.name);
                    setRepDone(false);
                  }
                }} 
              />
              {reportPreview ? (
                <div className="text-center animate-in fade-in zoom-in duration-500">
                  {reportFile?.type.startsWith('image/') ? (
                    <img src={reportPreview} className="max-h-48 rounded-2xl shadow-xl border-4 border-white mb-4 mx-auto" alt="Report Preview" />
                  ) : (
                    <>
                      <div className="bg-brand/10 p-6 rounded-full inline-block mb-4"><FileText className="w-10 h-10 text-brand" /></div>
                      <p className="text-brand font-bold text-xs truncate max-w-[200px]">{reportPreview}</p>
                    </>
                  )}
                  {repDone && <div className="absolute inset-0 bg-brand/20 flex items-center justify-center rounded-2xl backdrop-blur-[2px]"><CheckCircle className="text-white w-12 h-12 drop-shadow-2xl"/></div>}
                </div>
              ) : (
                <div className="text-center text-slate-300 group">
                  <Upload className="mx-auto mb-4 w-12 h-12 opacity-20 group-hover:opacity-40 transition-opacity animate-float"/> 
                  <p className="font-bold text-slate-400 text-sm">Upload Blood Report</p>
                </div>
              )}
            </div>

            <button onClick={handleReportParsing} disabled={!reportPreview || repDone || isRepLoading} className="mt-8 w-full py-5 bg-slate-900 text-white rounded-[20px] font-bold font-montserrat flex justify-center items-center gap-3 disabled:bg-slate-100 disabled:text-slate-300 transition-all active:scale-[0.98] shadow-lg shadow-slate-200 uppercase text-xs tracking-widest">
              {isRepLoading ? <><Loader2 className="animate-spin w-4 h-4" /> Extracting Data...</> : repDone ? "Data Verified" : "Analyze Lab Metrics"}
            </button>
          </div>
        </div>

        {/* Global Success Footer */}
        {(imgDone || repDone) && (
          <div className="mt-16 bg-[#0f172a] p-10 rounded-[48px] text-white flex flex-col md:flex-row justify-between items-center gap-8 shadow-2xl animate-in slide-in-from-bottom-10 border border-white/5">
            <div className="flex gap-6 items-center">
              <div className="bg-brand w-20 h-20 rounded-[28px] rotate-12 flex items-center justify-center shadow-xl shadow-brand/40 border border-white/20">
                <Activity className="w-10 h-10 text-white -rotate-12" />
              </div>
              <div>
                <h4 className="text-2xl font-bold font-montserrat tracking-tight leading-tight">Identity & Health <br />Synced Securely</h4>
                <p className="text-slate-400 text-sm max-w-sm font-light mt-2">AI Core results have been attributed to your patient ID and saved in the medical cloud.</p>
              </div>
            </div>
            <button onClick={() => router.push('/analytics')} className="bg-brand text-white px-12 py-6 rounded-[24px] font-bold font-montserrat flex items-center gap-3 hover:bg-brand-dark hover:translate-x-1 transition-all shadow-lg shadow-brand/20 whitespace-nowrap uppercase text-xs tracking-widest">
              Go to Analytics <ArrowRight className="w-4 h-4"/>
            </button>
          </div>
        )}
      </div>
    </main>
  );
}