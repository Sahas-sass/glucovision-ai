import { Cpu, Scan, FileCode, LineChart } from 'lucide-react';

const steps = [
  {
    title: "1. Data Acquisition",
    description: "Upload a standard fundus image or a digital lab report. Our system ensures high-resolution preprocessing for maximum accuracy.",
    icon: <Scan className="w-8 h-8 text-brand" />,
  },
  {
    title: "2. Neural Processing",
    description: "The RetinaEngine CNN architecture segments the image, identifying micro-lesions, while the ReportParser OCR extracts biometric markers.",
    icon: <Cpu className="w-8 h-8 text-brand" />,
  },
  {
    title: "3. Semantic Analysis",
    description: "Our proprietary algorithm correlates eye health with blood sugar history, looking for patterns that lead to retinopathy progression.",
    icon: <FileCode className="w-8 h-8 text-brand" />,
  },
  {
    title: "4. Integrated Reporting",
    description: "Receive a simplified, actionable health score and longitudinal charts to help you and your doctor manage your vision care.",
    icon: <LineChart className="w-8 h-8 text-brand" />,
  }
];

export default function Process() {
  return (
    <section id="steps" className="py-24 bg-slate-50 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-montserrat font-bold text-slate-900 mb-6">
            How <span className="text-brand">GlucoVision</span> Works
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto leading-relaxed">
            From raw medical data to life-saving insights in four automated steps.
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line (Hidden on Mobile) */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-brand/10 -translate-y-1/2 z-0" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center group">
                <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center shadow-xl shadow-slate-200 border-4 border-slate-50 group-hover:border-brand transition-all duration-500 mb-6">
                  {step.icon}
                </div>
                <h3 className="text-lg font-montserrat font-bold text-slate-900 mb-3">{step.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed px-4">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}