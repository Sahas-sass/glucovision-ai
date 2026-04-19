import Image from "next/image";

export default function Hero() {
  return (
    <section className="p-4 md:p-8 lg:p-12">
      <div className="bg-brand rounded-[50px] flex flex-col lg:flex-row items-center p-10 md:p-20 relative overflow-hidden min-h-[650px] shadow-2xl shadow-brand/20">
        
        {/* Modern Background Accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[120px] -mr-32 -mt-32 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/5 rounded-full blur-[80px] -ml-20 -mb-20" />

        {/* Left Side: Content */}
        <div className="lg:w-1/2 text-white z-20 space-y-8">
          <div className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-sm font-semibold tracking-wide uppercase">
            🚀 Pioneering Sri Lankan Health-Tech
          </div>
          <h1 className="text-4xl md:text-7xl font-montserrat font-bold leading-[1.15] drop-shadow-sm">
            Detecting the <br /> <span className="text-white/80">Unseen, Early.</span>
          </h1>
          <p className="text-lg md:text-xl font-medium mb-10 opacity-90 max-w-lg leading-relaxed">
            GlucoVision AI bridges the gap between rural clinics and specialized retinal care using intelligent cloud diagnostics.
          </p>
          <div className="flex flex-col sm:flex-row gap-5">
            <button className="bg-white text-brand px-12 py-5 rounded-2xl font-bold text-lg hover:scale-105 transition-all shadow-xl active:scale-95">
              Launch Diagnostic Portal
            </button>
            <button className="bg-transparent border-2 border-white/30 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white/10 transition-all">
              Watch Demo
            </button>
          </div>
        </div>
        
        {/* Right Side: Enhanced Visual Container */}
        <div className="lg:w-1/2 mt-16 lg:mt-0 flex justify-center items-center z-20 relative">
          {/* Floating UI Card Mockup */}
          <div className="relative w-full max-w-[500px] aspect-[4/3] animate-float">
            <div className="absolute inset-0 bg-white/5 rounded-[40px] border border-white/20 backdrop-blur-xl shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden">
               <Image 
                src="/hero-mockup2.png" 
                alt="AI Analysis Mockup"
                fill
                className="object-cover p-4 rounded-[40px]"
                priority
                sizes="(max-width: 768px) 100vw, 600px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}