export default function Process() {
  const steps = [
    {
      number: "01",
      title: "Secure Upload",
      description: "Upload your retinal fundus images and scanned medical reports (PDF/JPG) to our encrypted portal."
    },
    {
      number: "02",
      title: "AI Processing",
      description: "Our CNN classifies DR severity while the OCR engine extracts glucose and HbA1c metrics automatically."
    },
    {
      number: "03",
      title: "Instant Report",
      description: "Receive a localized diagnostic summary with a predictive risk score and professional recommendations."
    }
  ];

  return (
    <section id="steps" className="px-6 py-20">
      <div className="bg-brand rounded-[50px] py-20 px-10 text-white relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-montserrat font-bold mb-4">How it Works</h2>
            <p className="text-white/70 max-w-xl mx-auto">
              Our seamless three-step process simplifies complex diabetic diagnostics for both patients and clinicians.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {steps.map((step, index) => (
              <div key={index} className="relative group">
                <div className="text-6xl md:text-8xl font-montserrat font-black text-white/10 absolute -top-8 -left-4 group-hover:text-white/20 transition-colors">
                  {step.number}
                </div>
                <div className="relative pt-4">
                  <h3 className="text-2xl font-montserrat font-bold mb-4">{step.title}</h3>
                  <p className="text-white/80 leading-relaxed font-light">
                    {step.description}
                  </p>
                </div>
                {/* Visual Connector for Desktop */}
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-6 w-12 h-[1px] bg-white/30" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}