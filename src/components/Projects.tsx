import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { PROJECTS, CATEGORY_LABELS, GOAL_FILTERS } from '../data';
import { Project, ProjectGoal } from '../types';
import {
  ExternalLink,
  Hourglass,
  Layers,
  X,
  ArrowRight,
  Check,
  TrendingUp,
  MessageCircle,
} from 'lucide-react';
import { waLink, prefersReducedMotion } from '../config';

// Factor de escala del preview de demos en el modal: el iframe se renderiza a
// tamaño real (1/PREVIEW_SCALE del contenedor) y se reduce visualmente, así la
// demo se ve como en un navegador de escritorio en miniatura.
const PREVIEW_SCALE = 0.35;
const PREVIEW_SIZE = `${Math.round(10000 / PREVIEW_SCALE) / 100}%`;

export default function Projects() {
  const container = useRef<HTMLDivElement>(null);
  const gridContainer = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  // Elemento que tenía el foco antes de abrir el modal, para devolvérselo al cerrar.
  const lastFocusedElement = useRef<HTMLElement | null>(null);

  const [selectedGoal, setSelectedGoal] = useState<ProjectGoal | 'all'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [previewLoaded, setPreviewLoaded] = useState(false);

  // Custom modal open/close animations using GSAP
  const openModal = (proj: Project) => {
    lastFocusedElement.current = document.activeElement as HTMLElement | null;
    setPreviewLoaded(false);
    setSelectedProject(proj);
    if (prefersReducedMotion()) return;
    // Let state update then animate (using a safe timeout or immediate execution)
    setTimeout(() => {
      gsap.fromTo(
        '.modal-backdrop',
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'power1.out' }
      );
      gsap.fromTo(
        '.modal-content',
        { scale: 0.9, y: 50, opacity: 0 },
        { scale: 1, y: 0, opacity: 1, duration: 0.5, ease: 'back.out(1.2)' }
      );
    }, 10);
  };

  const closeModal = () => {
    if (prefersReducedMotion()) {
      setSelectedProject(null);
      lastFocusedElement.current?.focus();
      return;
    }
    gsap.to('.modal-content', {
      scale: 0.9,
      y: 30,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        gsap.to('.modal-backdrop', {
          opacity: 0,
          duration: 0.2,
          onComplete: () => {
            setSelectedProject(null);
            lastFocusedElement.current?.focus();
          },
        });
      },
    });
  };

  // Close on Escape, trap focus inside the dialog + lock body scroll while open
  useEffect(() => {
    if (!selectedProject) return;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
        return;
      }
      if (e.key === 'Tab' && modalRef.current) {
        const focusables = modalRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [selectedProject]);

  // Filter projects based on state
  const filteredProjects = PROJECTS.filter((proj) => {
    if (selectedGoal === 'all') return true;
    return proj.goal === selectedGoal;
  });

  // Re-run animation when the filter changes
  useEffect(() => {
    if (!gridContainer.current || prefersReducedMotion()) return;

    // Clear and do fresh stagger
    gsap.fromTo(
      gridContainer.current.querySelectorAll('.project-card'),
      { opacity: 0, scale: 0.9, y: 30 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power2.out',
        overwrite: 'auto',
      }
    );
  }, [selectedGoal]);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      // ScrollTrigger entrance for the section header
      gsap.from('.projects-header', {
        scrollTrigger: {
          trigger: container.current,
          start: 'top 85%',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });
    },
    { scope: container }
  );

  return (
    <section
      id="proyectos"
      ref={container}
      className="relative bg-[#030303] px-4 py-24 md:px-8 border-t border-white/5 overflow-hidden"
    >
      <div className="absolute top-1/4 right-0 h-[400px] w-[400px] rounded-full bg-blue-500/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="projects-header text-center mb-12">
          <div className="mx-auto mb-3 flex max-w-fit items-center gap-2 rounded-full glass px-3 py-1">
            <div className="nav-dot animate-pulse bg-blue-400 shadow-blue-400" />
            <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
              NICHOS DE ALTO RETORNO
            </span>
          </div>
          <h2 className="mt-3 font-sans text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl text-gradient">
            Proyectos que se pagan solos
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-400">
            Conceptos de ejemplo en nichos donde la web genera retorno con mínima inversión
            publicitaria: negocios de ticket alto o clientela recurrente, donde el SEO local y
            WhatsApp convierten la demanda que ya existe.
          </p>
        </div>

        {/* Filtros por objetivo de negocio */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {GOAL_FILTERS.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setSelectedGoal(filter.id)}
              className={`rounded-full px-5 py-2 text-xs font-semibold transition-all duration-300 border ${
                selectedGoal === filter.id
                  ? 'bg-white text-black border-white font-bold shadow-lg shadow-blue-500/10'
                  : 'bg-white/[0.03] text-zinc-400 border-white/5 hover:text-white hover:border-white/10 hover:bg-white/[0.08]'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div ref={gridContainer} className="grid gap-6 md:grid-cols-2">
          {filteredProjects.map((proj) => (
            <div
              key={proj.id}
              role="button"
              tabIndex={0}
              aria-label={`Ver detalles de ${proj.title}`}
              onClick={() => openModal(proj)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  openModal(proj);
                }
              }}
              className="project-card group relative cursor-pointer overflow-hidden rounded-2xl glass transition-all hover:border-blue-500/30 focus-visible:outline-2 focus-visible:outline-blue-400"
            >
              {/* Aspect ratio container for preview image */}
              <div className="relative h-64 overflow-hidden md:h-72">
                {/* Background image zoom on hover */}
                <img
                  src={proj.image}
                  alt={proj.title}
                  width={800}
                  height={533}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Visual shade overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/40 to-transparent" />

                {/* Etiqueta de honestidad: es un concepto con demo navegable, no un cliente real */}
                <div className="absolute top-4 right-4">
                  <span className="rounded-md bg-emerald-400/90 px-2.5 py-1 text-[10px] font-bold text-black">
                    Concepto · Demo en vivo
                  </span>
                </div>

                {/* Tags positioned absolute in corners */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-1.5">
                  {proj.tags.slice(0, 2).map((tag, idx) => (
                    <span
                      key={idx}
                      className="rounded-md bg-black/80 px-2.5 py-1 text-[10px] font-bold text-zinc-300 border border-white/10 backdrop-blur-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Text content */}
              <div className="p-6">
                <span className="text-[10px] font-bold tracking-wider text-blue-400 uppercase">
                  {CATEGORY_LABELS[proj.category]}
                </span>
                <h3 className="mt-1.5 font-sans text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                  {proj.title}
                </h3>
                <p className="mt-2 text-sm text-slate-400 line-clamp-2">{proj.description}</p>

                <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-blue-400">
                  <span>Ver detalles del proyecto</span>
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Project Detailed Modal */}
        {selectedProject && (
          // El click en el fondo es un atajo extra: Esc y el botón Cerrar cubren teclado.
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
          <div
            className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 md:p-6 backdrop-blur-md"
            onClick={(e) => {
              if (e.target === e.currentTarget) closeModal();
            }}
          >
            <div
              ref={modalRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-modal-title"
              className="modal-content relative w-full max-w-5xl overflow-hidden rounded-2xl glass bg-zinc-950/95 shadow-2xl"
            >
              {/* Close Button */}
              <button
                ref={closeButtonRef}
                onClick={closeModal}
                title="Cerrar (Esc)"
                aria-label="Cerrar detalle del proyecto"
                className="absolute top-3.5 right-3.5 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/80 text-zinc-400 transition-colors hover:text-white border border-white/10"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>

              <div className="grid md:grid-cols-12 max-h-[88vh] md:max-h-[85vh] overflow-y-auto md:overflow-hidden">
                {/* Left: Live demo preview (desktop) / image (mobile) */}
                <div className="md:col-span-5 relative bg-[#030303] md:max-h-[85vh] flex flex-col border-b md:border-b-0 md:border-r border-white/5">
                  {/* Browser chrome bar */}
                  <div className="hidden md:flex items-center gap-2 px-4 py-2.5 border-b border-white/5 bg-zinc-900/60">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
                    <div className="ml-2 flex-1 truncate rounded-md bg-black/40 border border-white/5 px-3 py-1 font-mono text-[10px] text-zinc-400">
                      stonydev.com{selectedProject.demoUrl ?? ''}
                    </div>
                  </div>

                  {selectedProject.demoUrl ? (
                    <>
                      {/* Scaled live iframe (desktop only) */}
                      <div className="relative hidden md:block flex-1 min-h-[380px] overflow-hidden">
                        {!previewLoaded && (
                          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-[#030303]">
                            <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500/30 border-t-blue-400" />
                            <span className="text-[10px] uppercase tracking-widest text-zinc-500">
                              Cargando demo en vivo…
                            </span>
                          </div>
                        )}
                        <iframe
                          src={selectedProject.demoUrl}
                          title={`Demo — ${selectedProject.title}`}
                          onLoad={() => setPreviewLoaded(true)}
                          className="absolute top-0 left-0 origin-top-left border-0"
                          style={{
                            width: PREVIEW_SIZE,
                            height: PREVIEW_SIZE,
                            transform: `scale(${PREVIEW_SCALE})`,
                          }}
                        />
                        {/* Click-through overlay to open the real demo */}
                        <a
                          href={selectedProject.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/preview absolute inset-0 z-10 flex items-end justify-center bg-transparent transition-colors hover:bg-black/30"
                        >
                          <span className="mb-4 flex translate-y-2 items-center gap-2 rounded-full bg-white px-4 py-2 font-sans text-xs font-bold text-black opacity-0 shadow-xl transition-all group-hover/preview:translate-y-0 group-hover/preview:opacity-100">
                            <ExternalLink className="h-3.5 w-3.5" />
                            Abrir demo completa
                          </span>
                        </a>
                        <div className="pointer-events-none absolute top-3 left-3 z-10 flex items-center gap-1.5 rounded-full bg-black/70 border border-white/10 px-3 py-1 backdrop-blur-md">
                          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                          <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-300">
                            Demo en vivo
                          </span>
                        </div>
                      </div>
                      {/* Mobile: static image linking to demo */}
                      <a
                        href={selectedProject.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative block h-44 md:hidden"
                      >
                        <img
                          src={selectedProject.image}
                          alt={selectedProject.title}
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
                        <span className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[10px] font-bold text-black">
                          <ExternalLink className="h-3 w-3" /> Ver demo
                        </span>
                      </a>
                    </>
                  ) : (
                    <div className="relative h-44 md:h-full md:flex-1">
                      <img
                        src={selectedProject.image}
                        alt={selectedProject.title}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-zinc-950 via-transparent to-transparent" />
                    </div>
                  )}
                </div>

                {/* Right: Project details */}
                <div className="md:col-span-7 p-6 md:p-8 md:max-h-[85vh] md:overflow-y-auto">
                  {/* Category + meta chips */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-blue-500/10 border border-blue-500/20 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-blue-300">
                      {CATEGORY_LABELS[selectedProject.category]}
                    </span>
                    <span className="flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                      <Hourglass className="h-3 w-3" /> Entrega en {selectedProject.duration}
                    </span>
                    <span className="flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                      <Layers className="h-3 w-3" /> {selectedProject.techStack.length} tecnologías
                    </span>
                    <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-emerald-300">
                      Concepto de ejemplo
                    </span>
                  </div>

                  <h3
                    id="project-modal-title"
                    className="mt-3 font-sans text-2xl md:text-[1.7rem] leading-tight font-black text-white"
                  >
                    {selectedProject.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-400">{selectedProject.description}</p>

                  {/* ROI callout — the sales argument */}
                  <div className="mt-5 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.06] p-4">
                    <div className="flex items-center gap-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-400">
                        <TrendingUp className="h-4 w-4" />
                      </span>
                      <h4 className="text-[11px] font-bold uppercase tracking-widest text-emerald-300">
                        Por qué este nicho rinde
                      </h4>
                    </div>
                    <p className="mt-2.5 text-[13px] leading-relaxed text-emerald-50/80">
                      {(() => {
                        const t = selectedProject.details.replace(/^Por qué este nicho:\s*/i, '');
                        return t.charAt(0).toUpperCase() + t.slice(1);
                      })()}
                    </p>
                  </div>

                  {/* Features grid */}
                  <div className="mt-6">
                    <h4 className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">
                      Qué incluye
                    </h4>
                    <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
                      {selectedProject.features.map((feat, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2.5 rounded-lg border border-white/5 bg-white/[0.03] p-3 text-xs leading-relaxed text-zinc-300"
                        >
                          <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-blue-400">
                            <Check className="h-2.5 w-2.5" strokeWidth={3.5} />
                          </span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech stack */}
                  <div className="mt-6">
                    <h4 className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">
                      Stack tecnológico
                    </h4>
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {selectedProject.techStack.map((tech, index) => (
                        <span
                          key={index}
                          className="rounded-md bg-white/5 px-2.5 py-1 font-mono text-[10px] font-medium text-zinc-300 border border-white/5"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions footer */}
                  <div className="mt-7 flex flex-col sm:flex-row gap-3 border-t border-white/5 pt-5">
                    <a
                      href={waLink(
                        `¡Hola StonyDev! Vi el proyecto "${selectedProject.title}" en su web y quiero algo así para mi negocio.`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 font-sans text-xs font-bold text-white transition-all hover:bg-[#1ebe5b]"
                    >
                      <MessageCircle className="h-4 w-4" aria-hidden="true" />
                      Quiero uno para mi negocio
                    </a>
                    <a
                      href={selectedProject.demoUrl ?? 'https://stonydev.com'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-1 items-center justify-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-5 py-3 font-sans text-xs font-bold text-blue-300 hover:bg-blue-500/20 hover:text-white transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" aria-hidden="true" />
                      Ver demo en vivo
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
