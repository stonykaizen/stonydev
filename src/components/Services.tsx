import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { SERVICES } from '../data';
import { Check, ArrowUpRight } from 'lucide-react';
import DynamicIcon from './DynamicIcon';
import { prefersReducedMotion, scrollToId } from '../config';

export default function Services() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      // Animate the section header
      gsap.from('.services-header', {
        scrollTrigger: {
          trigger: '.services-header',
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
      });

      // Animate each service card and CTA box individually when they scroll into view
      const cards = container.current?.querySelectorAll('.service-card');
      if (cards) {
        cards.forEach((card) => {
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
            y: 40,
            opacity: 0,
            duration: 0.7,
            ease: 'power2.out',
          });
        });
      }
    },
    { scope: container }
  );

  return (
    <section
      id="servicios"
      ref={container}
      className="relative bg-[#030303] px-4 py-24 md:px-8 border-t border-white/5 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute -left-64 top-1/4 h-[500px] w-[500px] rounded-full bg-blue-500/5 blur-3xl" />
      <div className="absolute -right-64 bottom-1/4 h-[500px] w-[500px] rounded-full bg-purple-500/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        {/* Section Title */}
        <div className="services-header text-center mb-16">
          <div className="mx-auto mb-3 flex max-w-fit items-center gap-2 rounded-full glass px-3 py-1">
            <div className="nav-dot animate-pulse bg-blue-400 shadow-blue-400" />
            <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
              SOLUCIONES A MEDIDA
            </span>
          </div>
          <h2 className="mt-3 font-sans text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl text-gradient">
            Servicios de Desarrollo Web
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-400">
            Diseñamos código impecable con un enfoque implacable en el rendimiento y la experiencia
            del usuario. No usamos plantillas, cada línea está esculpida a mano.
          </p>
        </div>

        {/* Bento Grid layout for Services */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="service-card group relative flex flex-col justify-between rounded-2xl glass p-6 transition-all duration-300 hover:bg-white/[0.06] hover:border-blue-500/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/5"
            >
              {/* Outer top border absolute shine */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent transition-opacity group-hover:via-blue-500/50" />

              <div>
                {/* Icon wrapper with glow on hover */}
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-zinc-300 transition-all duration-300 group-hover:bg-blue-500/20 group-hover:text-blue-400 group-hover:scale-110">
                  <DynamicIcon name={service.icon} className="h-6 w-6" />
                </div>

                {/* Service Title */}
                <h3 className="font-sans text-xl font-bold text-white transition-colors group-hover:text-blue-300">
                  {service.title}
                </h3>

                {/* Service Description */}
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{service.description}</p>

                {/* Service Bullet Points */}
                <ul className="mt-6 flex flex-col gap-2.5">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-400">
                      <Check
                        className="h-3.5 w-3.5 mt-0.5 shrink-0 text-blue-400"
                        aria-hidden="true"
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Base Price Badge */}
              <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-xs text-slate-500 uppercase font-bold tracking-wider">
                  Inversión Base
                </span>
                <span className="font-sans text-sm font-extrabold text-white">
                  desde <span className="text-blue-400 text-lg">${service.basePrice}</span> USD
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic quote trigger box */}
        <div className="service-card mt-16 rounded-2xl glass p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 border-blue-500/10">
          <div className="text-center md:text-left">
            <h4 className="font-sans text-lg md:text-xl font-bold text-white">
              ¿Tienes requerimientos específicos para tu proyecto?
            </h4>
            <p className="text-sm text-slate-400 mt-1 max-w-xl">
              Usa nuestro cotizador de presupuestos interactivo para armar un paquete personalizado
              que encaje a la perfección con tu idea.
            </p>
          </div>
          <button
            onClick={() => scrollToId('calculadora')}
            className="group shrink-0 flex items-center gap-2 rounded-full bg-white px-5 py-3 font-sans text-xs font-bold text-black transition-all hover:bg-blue-500 hover:text-white hover:scale-[1.03]"
          >
            <span>Probar Cotizador en Vivo</span>
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </section>
  );
}
