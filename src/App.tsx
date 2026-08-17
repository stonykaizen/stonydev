import { useRef, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Team from './components/Team';
import Process from './components/Process';
import Projects from './components/Projects';
import Faq from './components/Faq';
import TechStack from './components/TechStack';
import BudgetCalculator from './components/BudgetCalculator';
import Contact from './components/Contact';
import { ArrowUp, MessageCircle } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { waLink, WA_DEFAULT_MESSAGE } from './config';

export default function App() {
  const container = useRef<HTMLDivElement>(null);
  // Mensaje armado por el cotizador que precarga el formulario de contacto.
  const [quoteMessage, setQuoteMessage] = useState('');

  useGSAP(
    () => {
      // Show back-to-top button based on scroll position
      const toTopBtn = document.querySelector('.back-to-top');
      if (toTopBtn) {
        // autoAlpha maneja opacity + visibility: oculto de verdad (tampoco enfocable por teclado)
        gsap.set(toTopBtn, { autoAlpha: 0, scale: 0.8, pointerEvents: 'none' });

        gsap.to(toTopBtn, {
          scrollTrigger: {
            trigger: 'body',
            start: 'top -400',
            end: 'bottom bottom',
            toggleActions: 'play none none reverse',
          },
          autoAlpha: 1,
          scale: 1,
          pointerEvents: 'all',
          duration: 0.3,
        });
      }
    },
    { scope: container }
  );

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      ref={container}
      className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-emerald-500/30 selection:text-emerald-300"
    >
      {/* Floating WhatsApp CTA — canal principal de contacto */}
      <a
        href={waLink(WA_DEFAULT_MESSAGE)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escribinos por WhatsApp"
        className="fixed bottom-6 left-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl shadow-emerald-500/25 transition-transform hover:scale-110"
      >
        <MessageCircle className="h-6 w-6" aria-hidden="true" />
      </a>

      {/* Floating back to top trigger */}
      <button
        onClick={scrollToTop}
        aria-label="Volver arriba"
        title="Volver arriba"
        className="back-to-top fixed bottom-6 right-6 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-zinc-900/80 text-zinc-400 shadow-2xl backdrop-blur-md transition-colors hover:text-white hover:border-emerald-500/30"
      >
        <ArrowUp className="h-5 w-5" aria-hidden="true" />
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

        {/* 4. Proceso de trabajo */}
        <Process />

        {/* 5. Case Studies / Showcase */}
        <Projects />

        {/* 6. Tech Stack / Experiencia */}
        <TechStack />

        {/* 7. Custom Quote Calculator */}
        <BudgetCalculator onQuoteReady={setQuoteMessage} />

        {/* 8. Preguntas frecuentes */}
        <Faq />

        {/* 9. Form / Contact */}
        <Contact quoteMessage={quoteMessage} />
      </main>
    </div>
  );
}
