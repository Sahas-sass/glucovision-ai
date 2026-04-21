"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Upload, FileText, Activity, Eye, Search, Loader2, CheckCircle, ArrowRight } from 'lucide-react';

export default function DiagnosticsPage() {
  const router = useRouter();
  
  // Separate states for Image vs Report
  const [image, setImage] = useState<string | null>(null);
  const [report, setReport] = useState<string | null>(null);
  const [isImgLoading, setIsImgLoading] = useState(false);
  const [isRepLoading, setIsRepLoading] = useState(false);
  const [imgDone, setImgDone] = useState(false);
  const [repDone, setRepDone] = useState(false);

  const simulateImg = () => { setIsImgLoading(true); setTimeout(() => { setIsImgLoading(false); setImgDone(true); }, 2000); };
  const simulateRep = () => { setIsRepLoading(true); setTimeout(() => { setIsRepLoading(false); setRepDone(true); }, 2000); };

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-montserrat font-bold text-center mb-10">Select Analysis Type</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Retina Scanner */}
          <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100 flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-brand/10 p-3 rounded-xl"><Eye className="text-brand w-6 h-6"/></div>
              <h3 className="font-bold text-xl">Retina Scan</h3>
            </div>
            <div onClick={() => !imgDone && document.getElementById('imgIn')?.click()} className="flex-1 border-2 border-dashed border-slate-100 rounded-3xl p-6 flex items-center justify-center cursor-pointer hover:bg-slate-50 transition-all">
              <input type="file" id="imgIn" hidden onChange={(e) => setImage(URL.createObjectURL(e.target.files![0]))} />
              {image ? <img src={image} className="max-h-40 rounded-xl" /> : <div className="text-center text-slate-400 text-sm"><Upload className="mx-auto mb-2"/> Upload Eye Image</div>}
            </div>
            <button onClick={simulateImg} disabled={!image || imgDone} className="mt-6 w-full py-4 bg-slate-900 text-white rounded-2xl font-bold flex justify-center gap-2 disabled:bg-slate-100">
              {isImgLoading ? <Loader2 className="animate-spin" /> : imgDone ? "Scan Complete" : "Analyze Eye Scan"}
            </button>
          </div>

          {/* Report Parser */}
          <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100 flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-50 p-3 rounded-xl"><FileText className="text-blue-500 w-6 h-6"/></div>
              <h3 className="font-bold text-xl">Lab Report</h3>
            </div>
            <div onClick={() => !repDone && document.getElementById('repIn')?.click()} className="flex-1 border-2 border-dashed border-slate-100 rounded-3xl p-6 flex items-center justify-center cursor-pointer hover:bg-slate-50 transition-all">
              <input type="file" id="repIn" hidden onChange={(e) => setReport("pdf-selected")} />
              {report ? <div className="text-blue-500 font-bold">PDF Ready</div> : <div className="text-center text-slate-400 text-sm"><Upload className="mx-auto mb-2"/> Upload Blood Report</div>}
            </div>
            <button onClick={simulateRep} disabled={!report || repDone} className="mt-6 w-full py-4 bg-slate-900 text-white rounded-2xl font-bold flex justify-center gap-2 disabled:bg-slate-100">
              {isRepLoading ? <Loader2 className="animate-spin" /> : repDone ? "Data Parsed" : "Analyze Lab Report"}
            </button>
          </div>
        </div>

        {/* Dynamic Result Button */}
        {(imgDone || repDone) && (
          <div className="mt-12 bg-brand p-8 rounded-[40px] text-white flex justify-between items-center animate-in slide-in-from-bottom-5">
            <div>
              <h4 className="text-xl font-bold">Results are ready!</h4>
              <p className="opacity-80">We found {imgDone && repDone ? "integrated insights" : imgDone ? "retinal details" : "glucose trends"} for you.</p>
            </div>
            <button onClick={() => router.push('/analytics')} className="bg-white text-brand px-10 py-4 rounded-2xl font-bold flex items-center gap-2">
              View Detailed Analytics <ArrowRight className="w-4 h-4"/>
            </button>
          </div>
        )}
      </div>
    </main>
  );
}