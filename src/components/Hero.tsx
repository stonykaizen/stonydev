import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ArrowRight, Play, CheckCircle } from 'lucide-react';
import { prefersReducedMotion, scrollToId } from '../config';

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const interactiveArea = useRef<HTMLDivElement>(null);
  const floatingCards = useRef<HTMLDivElement[]>([]);

  useGSAP(() => {
    if (prefersReducedMotion()) return;

    // 1. Text reveals
    const tl = gsap.timeline();
    tl.from('.hero-badge', {
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: 'back.out(1.7)',
    })
    .from('.hero-title-line', {
      y: 80,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power4.out',
    }, '-=0.4')
    .from('.hero-desc', {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: 'power3.out',
    }, '-=0.3')
    .from('.hero-btn', {
      scale: 0.9,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: 'back.out(1.5)',
    }, '-=0.3')
    .from('.hero-interactive-card', {
      scale: 0.8,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
    }, '-=0.4');

    // 2. Infinite ambient floating animation
    floatingCards.current.forEach((card, index) => {
      if (!card) return;
      gsap.to(card, {
        y: `+=${15 + index * 5}`,
        x: `+=${10 - index * 6}`,
        rotation: `+=${2 - index * 3}`,
        duration: 3 + index,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    });
  }, { scope: container });

  // 3. Mouse parallax effect on floating elements
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const handleMouseMove = (e: MouseEvent) => {
      if (!interactiveArea.current) return;
      const rect = interactiveArea.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Parallax effect on cards
      floatingCards.current.forEach((card, i) => {
        if (!card) return;
        const factor = (i + 1) * 0.08;
        gsap.to(card, {
          x: x * factor,
          y: y * factor,
          rotationY: x * 0.03,
          rotationX: -y * 0.03,
          duration: 0.6,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      });
    };

    const handleMouseLeave = () => {
      // Return cards to original positions
      floatingCards.current.forEach((card, i) => {
        if (!card) return;
        gsap.to(card, {
          x: 0,
          y: 0,
          rotationY: 0,
          rotationX: 0,
          duration: 1,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      });
    };

    const element = interactiveArea.current;
    if (element) {
      element.addEventListener('mousemove', handleMouseMove);
      element.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (element) {
        element.removeEventListener('mousemove', handleMouseMove);
        element.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <section
      id="hero"
      ref={container}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#030303] px-4 pt-28 md:px-8 md:pt-16"
    >
      {/* Background glow meshes from the Immersive UI design */}
      <div className="glow mesh-1 absolute -top-20 -left-20 opacity-70" />
      <div className="glow mesh-2 absolute -bottom-40 -right-20 opacity-60" />
      
      {/* Absolute grid lines for aesthetic background tech-feel */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-12 lg:flex-row lg:gap-8">
        
        {/* Left Side: Copy and CTAs */}
        <div className="flex flex-col text-center lg:text-left lg:w-1/2 z-10">
          
          <div className="hero-badge mx-auto lg:mx-0 mb-6 flex max-w-fit items-center gap-2.5 rounded-full glass px-4 py-1.5 text-xs font-semibold backdrop-blur-md">
            <div className="nav-dot animate-pulse" />
            <span className="text-[10px] uppercase tracking-widest font-semibold text-blue-400">Estudio de Desarrollo Web · Uruguay</span>
          </div>

          <h1 className="mb-6 overflow-hidden text-5xl font-extrabold tracking-tighter text-white sm:text-6xl md:text-7xl leading-[0.9]">
            <span className="hero-title-line block text-gradient">Desarrollo Web</span>
            <span className="hero-title-line block text-gradient">
              con Impacto Visual.
            </span>
          </h1>

          <p className="hero-desc mb-8 max-w-xl text-base text-slate-400 sm:text-lg leading-relaxed">
            Somos <span className="font-bold text-white">stonydev.com</span>, un estudio de cuatro socios que cubre todo el ciclo: <span className="font-bold text-purple-400">UX/UI</span>, <span className="font-bold text-amber-400">datos</span>, <span className="font-bold text-emerald-400">backend</span> y <span className="font-bold text-blue-400">fullstack con automatizaciones</span>.
          </p>

          <div className="flex flex-col flex-wrap justify-center gap-4 sm:flex-row lg:justify-start">
            <button
              onClick={() => scrollToId('calculadora')}
              className="hero-btn group flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 font-sans text-sm font-bold text-black shadow-lg shadow-blue-500/10 transition-all hover:bg-blue-50 hover:scale-[1.02]"
            >
              <span>Cotizar Proyecto</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => scrollToId('proyectos')}
              className="hero-btn flex items-center justify-center gap-2 rounded-full glass px-6 py-3.5 font-sans text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10"
            >
              <Play className="h-4 w-4 fill-white text-white" />
              <span>Ver Proyectos</span>
            </button>
          </div>

          {/* Social Proof metrics configured with theme's metrics layout */}
          <div className="hero-desc mt-12 grid grid-cols-3 gap-6 border-t border-white/5 pt-8 text-left max-w-md mx-auto lg:mx-0">
            <div className="p-4 glass flex flex-col gap-1">
              <span className="text-2xl font-bold text-white">04</span>
              <span className="text-[10px] uppercase text-slate-500 font-bold tracking-wider">Socios</span>
            </div>
            <div className="p-4 glass flex flex-col gap-1">
              <span className="text-2xl font-bold text-white">06</span>
              <span className="text-[10px] uppercase text-slate-500 font-bold tracking-wider">Demos en vivo</span>
            </div>
            <div className="p-4 glass flex flex-col gap-1">
              <span className="text-2xl font-bold text-white">&lt;24h</span>
              <span className="text-[10px] uppercase text-slate-500 font-bold tracking-wider">Respuesta</span>
            </div>
          </div>

        </div>

        {/* Right Side: Interactive GSAP Canvas / Parallax Playground */}
        <div 
          ref={interactiveArea}
          className="relative hidden lg:flex h-[500px] w-full items-center justify-center lg:w-1/2 perspective-[1000px] select-none z-10"
        >
          {/* Central glow */}
          <div className="absolute h-64 w-64 rounded-full bg-gradient-to-tr from-blue-500/10 to-purple-500/10 blur-3xl" />

          {/* Code editor preview panel from Immersive UI template */}
          <div
            ref={(el) => { if (el) floatingCards.current[0] = el; }}
            className="hero-interactive-card absolute top-[5%] left-[2%] w-[280px] md:w-[320px] rounded-2xl glass p-5 shadow-2xl border-blue-500/20 transform-style-3d flex flex-col gap-3"
          >
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-mono text-blue-400">engine_v2.js</span>
              <div className="flex gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-700"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-slate-700"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-slate-700"></div>
              </div>
            </div>
            <div className="font-mono text-[10px] text-slate-400 leading-relaxed bg-black/30 p-3 rounded-lg border border-white/5">
              <span className="text-purple-400">gsap</span>.to(<span className="text-blue-300">".hero-title"</span>, &#123;<br/>
              &nbsp;&nbsp;opacity: <span className="text-orange-300">1</span>,<br/>
              &nbsp;&nbsp;y: <span className="text-orange-300">0</span>,<br/>
              &nbsp;&nbsp;duration: <span className="text-orange-300">1.5</span>,<br/>
              &nbsp;&nbsp;ease: <span className="text-blue-300">"expo.out"</span>,<br/>
              &nbsp;&nbsp;stagger: <span className="text-orange-300">0.2</span><br/>
              &#125;);
            </div>
            <div className="flex items-center justify-between border-t border-white/5 pt-3">
              <div className="flex flex-col gap-1">
                <span className="text-[8px] text-slate-500 font-medium uppercase tracking-widest">Interactive Preview</span>
                <div className="flex gap-0.5 items-end">
                  <div className="h-5 w-1 bg-blue-500 rounded-full"></div>
                  <div className="h-7 w-1 bg-blue-400 rounded-full"></div>
                  <div className="h-4 w-1 bg-blue-600 rounded-full"></div>
                  <div className="h-6 w-1 bg-white/20 rounded-full animate-pulse"></div>
                  <div className="h-3 w-1 bg-white/20 rounded-full"></div>
                </div>
              </div>
              <div className="text-right">
                <span className="block text-[8px] text-slate-500 uppercase">Active Skill</span>
                <span className="block text-[10px] font-bold">GSAP Motion</span>
              </div>
            </div>
          </div>

          {/* Card 2: Interactive metrics & success */}
          <div
            ref={(el) => { if (el) floatingCards.current[1] = el; }}
            className="hero-interactive-card absolute bottom-[8%] right-[2%] w-[200px] md:w-[240px] rounded-2xl glass p-4 shadow-2xl border-purple-500/10 transform-style-3d"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-400/20 text-blue-400">
                <CheckCircle className="h-4 w-4" />
              </div>
              <div>
                <span className="block text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Carga Optimizada</span>
                <span className="font-sans text-sm font-extrabold text-white">PageSpeed 95+</span>
              </div>
            </div>
          </div>

          {/* Card 3: Floating Technology Orbiter tags */}
          <div
            ref={(el) => { if (el) floatingCards.current[2] = el; }}
            className="hero-interactive-card absolute top-[45%] right-[8%] w-[160px] rounded-2xl glass p-3 shadow-2xl text-center transform-style-3d"
          >
            <span className="font-mono text-[10px] font-bold text-indigo-300">WebGL & Canvas</span>
            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-zinc-800">
              <div className="h-full w-4/5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse" />
            </div>
          </div>

          {/* Decorative small particles */}
          <div className="absolute top-[20%] right-[30%] h-3 w-3 rounded-full bg-purple-500 blur-xs animate-ping" />
          <div className="absolute bottom-[25%] left-[25%] h-2 w-2 rounded-full bg-blue-400 blur-xs animate-pulse" />
        </div>

      </div>
    </section>
  );
}
