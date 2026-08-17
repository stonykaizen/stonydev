import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { TECH_STACK } from '../data';
import { ShieldCheck, Info } from 'lucide-react';
import DynamicIcon from './DynamicIcon';
import { prefersReducedMotion } from '../config';

export default function TechStack() {
  const container = useRef<HTMLDivElement>(null);
  const bubbleContainer = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const bars = gsap.utils.toArray<HTMLElement>('.tech-progress-bar');

    // Con movimiento reducido: barras directamente en su valor final, sin tweens.
    if (prefersReducedMotion()) {
      bars.forEach((bar) => {
        bar.style.width = bar.getAttribute('data-level') + '%';
      });
      return;
    }

    // ScrollTrigger to animate skills progress bars filling up
    bars.forEach((bar) => {
      const targetWidth = bar.getAttribute('data-level') + '%';
      gsap.fromTo(bar, 
        { width: '0%' },
        {
          width: targetWidth,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: bar,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    });

    // Stagger slide-in of left side
    gsap.from('.tech-list-item', {
      scrollTrigger: {
        trigger: '.tech-list-trigger',
        start: 'top 85%',
      },
      x: -40,
      opacity: 0,
      duration: 0.6,
      stagger: 0.05,
      ease: 'power2.out',
    });

    // Floating animation for interactive bubbles on the right
    const bubbles = gsap.utils.toArray<HTMLElement>('.tech-bubble');
    const bubbleTweens = bubbles.map((bubble, index) =>
      gsap.to(bubble, {
        y: `+=${10 + (index % 3) * 5}`,
        x: `+=${5 - (index % 2) * 8}`,
        duration: 2.5 + (index % 3) * 0.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    );

    // Pausar los loops cuando la sección no está visible
    ScrollTrigger.create({
      trigger: container.current,
      start: 'top bottom',
      end: 'bottom top',
      onToggle: (self) => bubbleTweens.forEach((t) => (self.isActive ? t.play() : t.pause())),
    });
  }, { scope: container });

  // Magnetic hover effect for technology elements
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const bubbles = bubbleContainer.current?.querySelectorAll('.tech-bubble');
    if (!bubbles) return;

    const handleMouseMove = (e: MouseEvent, element: HTMLElement) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Move element slightly toward cursor
      gsap.to(element, {
        x: x * 0.35,
        y: y * 0.35,
        duration: 0.3,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };

    const handleMouseLeave = (element: HTMLElement) => {
      // Snap back smoothly
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1.2, 0.5)',
        overwrite: 'auto',
      });
    };

    const listeners: { element: HTMLElement; move: (e: MouseEvent) => void; leave: () => void }[] = [];

    bubbles.forEach((b) => {
      const el = b as HTMLElement;
      const moveHandler = (e: MouseEvent) => handleMouseMove(e, el);
      const leaveHandler = () => handleMouseLeave(el);
      
      el.addEventListener('mousemove', moveHandler);
      el.addEventListener('mouseleave', leaveHandler);
      listeners.push({ element: el, move: moveHandler, leave: leaveHandler });
    });

    return () => {
      listeners.forEach(({ element, move, leave }) => {
        element.removeEventListener('mousemove', move);
        element.removeEventListener('mouseleave', leave);
      });
    };
  }, []);

  return (
    <section
      id="tecnologias"
      ref={container}
      className="relative bg-[#030303] px-4 py-24 md:px-8 border-t border-white/5 overflow-hidden"
    >
      <div className="absolute top-1/2 left-0 h-[400px] w-[400px] rounded-full bg-blue-500/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="mx-auto mb-3 flex max-w-fit items-center gap-2 rounded-full glass px-3 py-1">
            <div className="nav-dot animate-pulse bg-blue-400 shadow-blue-400" />
            <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">EXPERIENCIA TÉCNICA</span>
          </div>
          <h2 className="mt-3 font-sans text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl text-gradient">
            Tecnologías & Dominio
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-400">
            Dominamos herramientas punteras que permiten crear arquitecturas robustas y escalables con una interactividad sobresaliente.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid gap-12 lg:grid-cols-12 items-center">
          
          {/* Column 1: Skill Bars */}
          <div className="lg:col-span-6 tech-list-trigger flex flex-col gap-6">
            <h3 className="font-sans text-lg font-bold text-white mb-2 flex items-center gap-2">
              <ShieldCheck className="text-blue-400 h-5 w-5" aria-hidden="true" />
              <span>Habilidades Clave & Fluidez</span>
            </h3>

            {TECH_STACK.map((tech) => (
              <div key={tech.name} className="tech-list-item flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2 text-zinc-300">
                    <span 
                      className="h-2.5 w-2.5 rounded-full" 
                      style={{ backgroundColor: tech.color }}
                    />
                    <span className="font-bold">{tech.name}</span>
                  </div>
                  <span className="font-mono text-zinc-500">{tech.level}%</span>
                </div>
                
                {/* Background bar container */}
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  {/* GSAP targets this class and reads data-level */}
                  <div
                    data-level={tech.level}
                    className="tech-progress-bar h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                    style={{ width: '0%' }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Column 2: Interactive Bubble Field */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center">
            <div className="text-center mb-6 lg:hidden">
              <span className="text-xs text-zinc-500 italic">Prueba a pasar el cursor por encima de los elementos:</span>
            </div>

            {/* Bubble Grid Box */}
            <div 
              ref={bubbleContainer}
              className="relative w-full max-w-[480px] h-[360px] rounded-3xl glass p-6 flex flex-wrap gap-4 items-center justify-center overflow-hidden border-blue-500/10"
            >
              {/* Grid lines inside bubble box */}
              <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:1.5rem_1.5rem]" />

              {TECH_STACK.map((tech, idx) => (
                <div
                  key={tech.name}
                  className="tech-bubble cursor-pointer flex items-center gap-2.5 rounded-2xl glass bg-black/60 px-4 py-3 text-white shadow-lg transition-colors hover:border-blue-500/50"
                  style={{
                    // Slightly stagger initial positions offset
                    transform: `translate(${idx % 2 === 0 ? '5px' : '-5px'}, ${idx % 3 === 0 ? '-3px' : '4px'})`
                  }}
                >
                  <div 
                    className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/5"
                    style={{ color: tech.color }}
                  >
                    <DynamicIcon name={tech.iconName} className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold leading-tight">{tech.name}</span>
                    <span className="block text-[10px] text-zinc-500 leading-none">
                      {tech.category === 'frontend' ? 'Frontend' : tech.category === 'backend' ? 'Backend' : 'Herramienta'}
                    </span>
                  </div>
                </div>
              ))}

              {/* Decorative center accent glow */}
              <div className="absolute h-32 w-32 rounded-full bg-blue-500/10 blur-3xl -z-10" />
            </div>

            <div className="mt-6 hidden lg:block text-center text-xs text-zinc-500 italic flex items-center gap-1">
              <Info className="h-3.5 w-3.5 text-zinc-600" aria-hidden="true" />
              <span>Pasa el cursor sobre las tarjetas para interactuar magnéticamente</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
