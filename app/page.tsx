import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Process from "@/components/Process";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <Process />
      
      <section className="py-20 text-center">
         <h2 className="text-slate-400 font-montserrat font-bold uppercase tracking-[0.2em] text-sm">
           The Future of Sri Lankan Healthcare [cite: 182]
         </h2>
      </section>
    </main>
  );
}