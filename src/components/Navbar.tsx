import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Menu, X, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { waLink, WA_DEFAULT_MESSAGE, prefersReducedMotion, scrollToId } from '../config';

export default function Navbar() {
  const container = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      // Elegant entry animation for the navbar
      gsap.from('.nav-item', {
        y: -20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: 'power3.out',
      });
    },
    { scope: container }
  );

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    scrollToId(id);
  };

  return (
    <nav id="navbar" ref={container} className="fixed top-0 left-0 right-0 z-50 px-4 py-3 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between rounded-full border border-white/10 bg-zinc-950/75 px-6 py-3 backdrop-blur-md shadow-lg shadow-black/20">
          {/* Logo & Brand */}
          <button
            onClick={() => scrollToSection('hero')}
            aria-label="Ir al inicio"
            className="nav-item flex cursor-pointer items-center gap-2 text-white transition-colors hover:text-blue-400"
          >
            <div className="w-8 h-8 glass flex items-center justify-center font-bold text-blue-500 rounded-lg text-sm">
              S
            </div>
            <span className="font-sans text-lg font-bold tracking-tight">
              stonydev<span className="text-blue-500 text-opacity-80">.com</span>
            </span>
          </button>

          {/* Nav Items (Desktop) */}
          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => scrollToSection('servicios')}
              className="nav-item cursor-pointer font-sans text-sm text-zinc-400 transition-colors hover:text-white"
            >
              Servicios
            </button>
            <button
              onClick={() => scrollToSection('equipo')}
              className="nav-item cursor-pointer font-sans text-sm text-zinc-400 transition-colors hover:text-white"
            >
              Equipo
            </button>
            <button
              onClick={() => scrollToSection('proceso')}
              className="nav-item cursor-pointer font-sans text-sm text-zinc-400 transition-colors hover:text-white"
            >
              Proceso
            </button>
            <button
              onClick={() => scrollToSection('proyectos')}
              className="nav-item cursor-pointer font-sans text-sm text-zinc-400 transition-colors hover:text-white"
            >
              Proyectos
            </button>
            <button
              onClick={() => scrollToSection('tecnologias')}
              className="nav-item cursor-pointer font-sans text-sm text-zinc-400 transition-colors hover:text-white"
            >
              Tecnologías
            </button>
            <button
              onClick={() => scrollToSection('calculadora')}
              className="nav-item cursor-pointer font-sans text-sm text-blue-400 font-semibold transition-colors hover:text-blue-300"
            >
              Cotizador
            </button>
            <button
              onClick={() => scrollToSection('contacto')}
              className="nav-item cursor-pointer font-sans text-sm text-zinc-400 transition-colors hover:text-white"
            >
              Contacto
            </button>
          </div>

          {/* WhatsApp Button */}
          <div className="hidden md:block">
            <a
              href={waLink(WA_DEFAULT_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-item group flex items-center gap-1.5 rounded-full bg-[#25D366] px-4 py-2 font-sans text-xs font-semibold text-white transition-all hover:bg-[#1ebe5b]"
            >
              <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Trabajemos juntos</span>
            </a>
          </div>

          {/* Menu button (Mobile) */}
          <div className="flex md:hidden items-center gap-4">
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              className="text-zinc-400 hover:text-white focus:outline-none"
            >
              {isOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu expanded */}
        {isOpen && (
          <div
            id="mobile-menu"
            className="mt-2 rounded-2xl border border-white/10 bg-zinc-950 p-6 shadow-2xl backdrop-blur-md md:hidden"
          >
            <div className="flex flex-col gap-4">
              <button
                onClick={() => scrollToSection('servicios')}
                className="text-left font-sans text-base font-medium text-zinc-300 hover:text-blue-400"
              >
                Servicios
              </button>
              <button
                onClick={() => scrollToSection('equipo')}
                className="text-left font-sans text-base font-medium text-zinc-300 hover:text-blue-400"
              >
                Equipo
              </button>
              <button
                onClick={() => scrollToSection('proceso')}
                className="text-left font-sans text-base font-medium text-zinc-300 hover:text-blue-400"
              >
                Proceso
              </button>
              <button
                onClick={() => scrollToSection('proyectos')}
                className="text-left font-sans text-base font-medium text-zinc-300 hover:text-blue-400"
              >
                Proyectos
              </button>
              <button
                onClick={() => scrollToSection('tecnologias')}
                className="text-left font-sans text-base font-medium text-zinc-300 hover:text-blue-400"
              >
                Tecnologías
              </button>
              <button
                onClick={() => scrollToSection('calculadora')}
                className="text-left font-sans text-base font-medium text-blue-400 hover:text-blue-300"
              >
                Cotizador Presupuesto
              </button>
              <button
                onClick={() => scrollToSection('contacto')}
                className="text-left font-sans text-base font-medium text-zinc-300 hover:text-blue-400"
              >
                Contacto
              </button>
              <a
                href={waLink(WA_DEFAULT_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="mt-2 flex items-center justify-center gap-2 rounded-full bg-[#25D366] py-3 font-sans text-sm font-semibold text-white hover:bg-[#1ebe5b] transition-all"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                <span>WhatsApp Directo</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
