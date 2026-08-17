import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ChevronDown, MessageCircle } from 'lucide-react';
import { waLink, SITE, prefersReducedMotion } from '../config';

const FAQS = [
  {
    q: '¿Cuánto demora un proyecto?',
    a: 'Depende del alcance: una landing page toma 1-2 semanas, un sitio corporativo 2-3 semanas y un e-commerce o aplicación a medida entre 3 y 6 semanas. En la propuesta te damos una fecha de entrega concreta y la respetamos.',
  },
  {
    q: '¿Los precios son en dólares? ¿Hay costos mensuales?',
    a: 'Los valores de referencia del sitio están en dólares (USD); la cotización formal puede expresarse en pesos uruguayos si lo preferís. El desarrollo es un pago único. Los únicos costos recurrentes son el dominio y el hosting (desde unos pocos dólares al mes), y te los detallamos por separado en la propuesta — sin sorpresas.',
  },
  {
    q: '¿El sitio queda a mi nombre?',
    a: 'Sí, completamente. El dominio, el hosting, el código y los contenidos quedan a tu nombre con todos los accesos. No dependés de nosotros para nada, aunque vamos a estar cuando nos necesites.',
  },
  {
    q: '¿Qué necesito tener para empezar?',
    a: 'Solo la idea de tu negocio. Si tenés logo, fotos o textos, mejor; si no, te ayudamos a resolverlos durante el proyecto. El primer paso es una conversación por WhatsApp donde te hacemos las preguntas correctas.',
  },
  {
    q: '¿Hacen mantenimiento después de la entrega?',
    a: 'Sí. Todo proyecto incluye un período de garantía por ajustes, y después ofrecemos planes de mantenimiento opcionales para actualizaciones, mejoras y soporte continuo.',
  },
  {
    q: '¿Cómo empiezo?',
    a: `Escribinos por WhatsApp al ${SITE.whatsappDisplay} o usá el cotizador de esta página para armar tu presupuesto y enviárnoslo en un toque. Respondemos en el día.`,
  },
];

// JSON-LD FAQPage para resultados enriquecidos en Google.
const FAQ_SCHEMA = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
});

export default function Faq() {
  const container = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from('.faq-element', {
        scrollTrigger: {
          trigger: container.current,
          start: 'top 85%',
        },
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.06,
        ease: 'power3.out',
      });
    },
    { scope: container }
  );

  return (
    <section
      id="faq"
      ref={container}
      className="relative bg-[#030303] px-4 py-24 md:px-8 border-t border-white/5 overflow-hidden"
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: FAQ_SCHEMA }} />

      <div className="absolute -right-64 top-1/4 h-[400px] w-[400px] rounded-full bg-blue-500/5 blur-3xl" />

      <div className="relative mx-auto max-w-3xl">
        {/* Header */}
        <div className="faq-element text-center mb-14">
          <div className="mx-auto mb-3 flex max-w-fit items-center gap-2 rounded-full glass px-3 py-1">
            <div className="nav-dot animate-pulse bg-blue-400 shadow-blue-400" />
            <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
              PREGUNTAS FRECUENTES
            </span>
          </div>
          <h2 className="mt-3 font-sans text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl text-gradient">
            Lo que todos preguntan
          </h2>
        </div>

        {/* Accordion */}
        <div className="flex flex-col gap-3">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="faq-element rounded-2xl glass overflow-hidden">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${index}`}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left transition-colors hover:bg-white/[0.03]"
                >
                  <span className="font-sans text-sm md:text-base font-bold text-white">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-blue-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                  />
                </button>
                <div
                  id={`faq-panel-${index}`}
                  hidden={!isOpen}
                  className="px-5 pb-5 text-sm leading-relaxed text-slate-400"
                >
                  {faq.a}
                </div>
              </div>
            );
          })}
        </div>

        {/* Closing CTA */}
        <div className="faq-element mt-10 text-center">
          <p className="text-sm text-slate-400">¿Tenés otra pregunta?</p>
          <a
            href={waLink('¡Hola StonyDev! Tengo una consulta sobre sus servicios.')}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-sans text-xs font-bold text-white transition-all hover:bg-[#1ebe5b] hover:scale-[1.02]"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            <span>Preguntanos por WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}
