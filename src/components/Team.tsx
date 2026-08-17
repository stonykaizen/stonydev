import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Palette, Workflow, Database, Rocket, type LucideIcon } from 'lucide-react';
import { prefersReducedMotion } from '../config';

interface Partner {
  name: string;
  role: string;
  description: string;
  icon: LucideIcon;
  initials: string;
  accent: string;       // tailwind color name for tints
  ring: string;         // avatar gradient
  tags: string[];
}

const PARTNERS: Partner[] = [
  {
    name: 'Stony',
    role: 'Fullstack & Automatizaciones',
    description:
      'Arquitectura de aplicaciones de punta a punta: frontend, APIs e integraciones con IA. Automatiza todo lo que se pueda automatizar.',
    icon: Rocket,
    initials: 'ST',
    accent: 'blue',
    ring: 'from-blue-500 to-cyan-400',
    tags: ['React', 'Node.js', 'IA & Agentes', 'CI/CD'],
  },
  {
    name: 'Agustín',
    role: 'UX/UI',
    description:
      'Diseña interfaces que se sienten naturales. Sistemas de diseño, prototipado y micro-interacciones que convierten visitantes en clientes.',
    icon: Palette,
    initials: 'AG',
    accent: 'purple',
    ring: 'from-purple-500 to-fuchsia-400',
    tags: ['Design Systems', 'Figma', 'Motion', 'Accesibilidad'],
  },
  {
    name: 'Oscar',
    role: 'Orquestador de Datos',
    description:
      'Coordina el flujo de información entre sistemas: pipelines, integraciones y analítica para que cada decisión se tome con datos reales.',
    icon: Workflow,
    initials: 'OS',
    accent: 'amber',
    ring: 'from-amber-500 to-orange-400',
    tags: ['ETL & Pipelines', 'Integraciones', 'Analítica', 'APIs'],
  },
  {
    name: 'Maxi',
    role: 'Backend & Bases de Datos',
    description:
      'La sala de máquinas: servicios robustos, modelos de datos sólidos y consultas optimizadas que aguantan crecimiento sin despeinarse.',
    icon: Database,
    initials: 'MX',
    accent: 'emerald',
    ring: 'from-emerald-500 to-teal-400',
    tags: ['SQL & NoSQL', 'APIs REST', 'Seguridad', 'Performance'],
  },
];

// Static class maps so Tailwind picks them up at build time
const ACCENT = {
  blue: {
    hoverBorder: 'hover:border-blue-500/30',
    hoverShadow: 'hover:shadow-blue-500/5',
    text: 'text-blue-400',
    chip: 'bg-blue-500/10 text-blue-300',
  },
  purple: {
    hoverBorder: 'hover:border-purple-500/30',
    hoverShadow: 'hover:shadow-purple-500/5',
    text: 'text-purple-400',
    chip: 'bg-purple-500/10 text-purple-300',
  },
  amber: {
    hoverBorder: 'hover:border-amber-500/30',
    hoverShadow: 'hover:shadow-amber-500/5',
    text: 'text-amber-400',
    chip: 'bg-amber-500/10 text-amber-300',
  },
  emerald: {
    hoverBorder: 'hover:border-emerald-500/30',
    hoverShadow: 'hover:shadow-emerald-500/5',
    text: 'text-emerald-400',
    chip: 'bg-emerald-500/10 text-emerald-300',
  },
} as const;

export default function Team() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (prefersReducedMotion()) return;
    gsap.from('.team-header', {
      scrollTrigger: {
        trigger: '.team-header',
        start: 'top 90%',
        toggleActions: 'play none none reverse',
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
    });

    const cards = container.current?.querySelectorAll('.team-card');
    if (cards) {
      cards.forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
          y: 50,
          opacity: 0,
          duration: 0.7,
          delay: (i % 4) * 0.08,
          ease: 'power2.out',
        });
      });
    }
  }, { scope: container });

  return (
    <section
      id="equipo"
      ref={container}
      className="relative bg-[#030303] px-4 py-24 md:px-8 border-t border-white/5 overflow-hidden"
    >
      {/* Ambient lighting */}
      <div className="absolute -right-64 top-1/3 h-[500px] w-[500px] rounded-full bg-purple-500/5 blur-3xl" />
      <div className="absolute -left-64 bottom-1/4 h-[500px] w-[500px] rounded-full bg-blue-500/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        {/* Section Title */}
        <div className="team-header text-center mb-16">
          <div className="mx-auto mb-3 flex max-w-fit items-center gap-2 rounded-full glass px-3 py-1">
            <div className="nav-dot animate-pulse bg-purple-400 shadow-purple-400" />
            <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">El Estudio</span>
          </div>
          <h2 className="mt-3 font-sans text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl text-gradient">
            Cuatro socios, un solo estándar
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-400">
            Cada proyecto pasa por las cuatro disciplinas del estudio: experiencia de usuario,
            datos, infraestructura y desarrollo. Nadie entrega hasta que los cuatro están conformes.
          </p>
        </div>

        {/* Partner Grid */}
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {PARTNERS.map((partner) => {
            const accent = ACCENT[partner.accent as keyof typeof ACCENT];
            const Icon = partner.icon;
            return (
              <div
                key={partner.name}
                className={`team-card group relative flex flex-col rounded-2xl glass p-6 transition-all duration-300 hover:bg-white/[0.06] hover:-translate-y-1 hover:shadow-xl ${accent.hoverBorder} ${accent.hoverShadow}`}
              >
                {/* Top shine */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                {/* Avatar + role icon */}
                <div className="mb-6 flex items-center justify-between">
                  <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr ${partner.ring} font-sans text-sm font-extrabold text-white shadow-lg`}>
                    {partner.initials}
                  </div>
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 transition-all duration-300 group-hover:scale-110 ${accent.text}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                </div>

                {/* Name & Role */}
                <h3 className="font-sans text-xl font-bold text-white">{partner.name}</h3>
                <span className={`mt-1 text-xs font-bold uppercase tracking-wider ${accent.text}`}>
                  {partner.role}
                </span>

                {/* Description */}
                <p className="mt-4 text-sm leading-relaxed text-slate-400 flex-1">
                  {partner.description}
                </p>

                {/* Skill tags */}
                <div className="mt-6 flex flex-wrap gap-1.5 border-t border-white/5 pt-4">
                  {partner.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${accent.chip}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Studio philosophy strip */}
        <div className="team-card mt-16 rounded-2xl glass p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 border-purple-500/10">
          <div className="text-center md:text-left">
            <h4 className="font-sans text-lg md:text-xl font-bold text-white">
              Un estudio, cuatro especialidades que trabajan como una
            </h4>
            <p className="text-sm text-slate-400 mt-1 max-w-xl">
              Diseño, datos, backend y fullstack bajo el mismo techo: sin intermediarios,
              sin traducciones perdidas entre equipos, con responsabilidad directa de cada socio.
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            {PARTNERS.map((p) => (
              <div
                key={p.name}
                title={`${p.name} — ${p.role}`}
                className={`flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-tr ${p.ring} font-sans text-[11px] font-extrabold text-white ring-2 ring-black/50 -ml-1 first:ml-0 transition-transform hover:scale-110 hover:z-10`}
              >
                {p.initials}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
