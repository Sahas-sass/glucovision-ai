import { Eye, FileSearch, TrendingUp, ShieldCheck } from 'lucide-react';

const featureList = [
  {
    title: "RetinaEngine AI",
    description: "Specialized CNN models designed to independently analyze fundus images for microaneurysms and hemorrhages with high precision.",
    icon: <Eye className="w-10 h-10 text-brand" />,
  },
  {
    title: "ReportParser AI",
    description: "A standalone OCR engine that extracts HbA1c and glucose levels from medical PDFs, transforming static data into visual trends.",
    icon: <FileSearch className="w-10 h-10 text-brand" />,
  },
  {
    title: "Integrated Risk Score",
    description: "Our core innovation: synchronizing retinal grading with blood history to predict the trajectory of diabetic retinopathy.",
    icon: <TrendingUp className="w-10 h-10 text-brand" />,
  },
  {
    title: "Clinical Accuracy",
    description: "Built for the Sri Lankan context, providing localized diagnostic support and professional medical reporting in seconds.",
    icon: <ShieldCheck className="w-10 h-10 text-brand" />,
  }
];

export default function Features() {
  return (
    <section id="features" className="py-24 px-10 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-montserrat font-bold text-slate-900 mb-6">
            Dual-Stream <span className="text-brand">Medical Intelligence</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
            GlucoVision provides flexible diagnostic paths. Run a retinal scan, parse a medical report, or combine both for a 360° health view.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featureList.map((item, index) => (
            <div 
              key={index} 
              className="group p-10 rounded-[35px] bg-slate-50 border border-slate-100 hover:border-brand/30 hover:bg-white hover:shadow-2xl hover:shadow-brand/5 transition-all duration-300"
            >
              <div className="bg-white w-20 h-20 rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <h3 className="text-xl font-montserrat font-bold text-slate-900 mb-4">
                {item.title}
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}