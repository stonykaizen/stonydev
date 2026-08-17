import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { MessageCircle, ClipboardList, PenTool, Code2, Rocket, LifeBuoy } from 'lucide-react';
import { waLink, prefersReducedMotion } from '../config';

const STEPS = [
  {
    icon: MessageCircle,
    title: 'Contacto y brief',
    duration: 'Día 1',
    description:
      'Nos escribís por WhatsApp, nos contás tu negocio y qué querés lograr. Te hacemos las preguntas justas para entender el objetivo.',
  },
  {
    icon: ClipboardList,
    title: 'Propuesta y cotización',
    duration: '24-48 h',
    description:
      'Te enviamos una propuesta clara: alcance, plazos y precio cerrado. Sin sorpresas ni costos ocultos después.',
  },
  {
    icon: PenTool,
    title: 'Diseño UX/UI',
    duration: 'Semana 1',
    description:
      'Diseñamos la interfaz pensando en tu cliente: cómo navega, qué busca y qué lo hace contactarte. Lo revisás antes de programar.',
  },
  {
    icon: Code2,
    title: 'Desarrollo y revisiones',
    duration: 'Semanas 1-4',
    description:
      'Construimos el sitio con avances visibles: te compartimos una URL de prueba y ajustamos con tu feedback en cada etapa.',
  },
  {
    icon: Rocket,
    title: 'Lanzamiento',
    duration: 'Día de entrega',
    description:
      'Publicamos en tu dominio con SEO, analítica y velocidad verificadas. El sitio, el código y los accesos quedan a tu nombre.',
  },
  {
    icon: LifeBuoy,
    title: 'Soporte y crecimiento',
    duration: 'Continuo',
    description:
      'Quedamos disponibles para mantenimiento, mejoras y nuevas funcionalidades a medida que tu negocio crece.',
  },
];

export default function Process() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      gsap.from('.process-header', {
        scrollTrigger: {
          trigger: '.process-header',
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
      });

      const cards = container.current?.querySelectorAll('.process-card');
      cards?.forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
          y: 40,
          opacity: 0,
          duration: 0.7,
          delay: (i % 3) * 0.08,
          ease: 'power2.out',
        });
      });
    },
    { scope: container }
  );

  return (
    <section
      id="proceso"
      ref={container}
      className="relative bg-[#030303] px-4 py-24 md:px-8 border-t border-white/5 overflow-hidden"
    >
      <div className="absolute -left-64 top-1/3 h-[500px] w-[500px] rounded-full bg-emerald-500/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="process-header text-center mb-16">
          <div className="mx-auto mb-3 flex max-w-fit items-center gap-2 rounded-full glass px-3 py-1">
            <div className="nav-dot animate-pulse bg-emerald-400 shadow-emerald-400" />
            <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
              CÓMO TRABAJAMOS
            </span>
          </div>
          <h2 className="mt-3 font-sans text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl text-gradient">
            De la idea al lanzamiento
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-400">
            Un proceso claro y sin vueltas: sabés en qué etapa está tu proyecto, qué sigue y cuándo
            se entrega.
          </p>
        </div>

        {/* Steps grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.title}
                className="process-card group relative flex flex-col rounded-2xl glass p-6 transition-all duration-300 hover:bg-white/[0.06] hover:border-emerald-500/30 hover:-translate-y-1"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                <div className="mb-5 flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-emerald-400 transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <span className="font-mono text-[10px] font-bold text-zinc-500">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                <h3 className="font-sans text-lg font-bold text-white">{step.title}</h3>
                <span className="mt-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                  {step.duration}
                </span>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{step.description}</p>
              </div>
            );
          })}
        </div>

        {/* CTA strip */}
        <div className="process-card mt-16 rounded-2xl glass p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 border-emerald-500/10">
          <div className="text-center md:text-left">
            <h4 className="font-sans text-lg md:text-xl font-bold text-white">
              El primer paso toma dos minutos
            </h4>
            <p className="text-sm text-slate-400 mt-1 max-w-xl">
              Contanos tu idea por WhatsApp y en menos de 48 horas tenés una propuesta con precio y
              plazos.
            </p>
          </div>
          <a
            href={waLink('¡Hola StonyDev! Quiero contarles mi idea y recibir una propuesta.')}
            target="_blank"
            rel="noopener noreferrer"
            className="group shrink-0 flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 font-sans text-xs font-bold text-white transition-all hover:bg-[#1ebe5b] hover:scale-[1.03]"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            <span>Empezar por WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}
