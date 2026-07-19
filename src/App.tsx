import { useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Team from './components/Team';
import Projects from './components/Projects';
import TechStack from './components/TechStack';
import BudgetCalculator from './components/BudgetCalculator';
import Contact from './components/Contact';
import { ArrowUp } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function App() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Show back-to-top button based on scroll position
    const toTopBtn = document.querySelector('.back-to-top');
    if (toTopBtn) {
      gsap.set(toTopBtn, { opacity: 0, scale: 0.8, pointerEvents: 'none' });
      
      gsap.to(toTopBtn, {
        scrollTrigger: {
          trigger: 'body',
          start: 'top -400',
          end: 'bottom bottom',
          toggleActions: 'play none none reverse',
        },
        opacity: 1,
        scale: 1,
        pointerEvents: 'all',
        duration: 0.3,
      });
    }
  }, { scope: container });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div 
      ref={container}
      className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-emerald-500/30 selection:text-emerald-300"
    >
      {/* Floating back to top trigger */}
      <button
        onClick={scrollToTop}
        className="back-to-top fixed bottom-6 right-6 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-zinc-900/80 text-zinc-400 shadow-2xl backdrop-blur-md transition-colors hover:text-white hover:border-emerald-500/30"
        title="Volver arriba"
      >
        <ArrowUp className="h-5 w-5" />
      </button>

      {/* Global Navbar */}
      <Navbar />

      {/* Main Page Layout */}
      <main>
        {/* 1. Hero / Intro */}
        <Hero />

        {/* 2. Services / Soluciones */}
        <Services />

        {/* 3. El Estudio / Socios */}
        <Team />

        {/* 4. Case Studies / Showcase */}
        <Projects />

        {/* 4. Tech Stack / Experiencia */}
        <TechStack />

        {/* 5. Custom Quote Calculator */}
        <BudgetCalculator />

        {/* 6. Form / Contact */}
        <Contact />
      </main>
    </div>
  );
}
