import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { PROJECTS } from '../data';
import { Project } from '../types';
import { ExternalLink, Calendar, Hourglass, Layers, X, ArrowRight } from 'lucide-react';

export default function Projects() {
  const container = useRef<HTMLDivElement>(null);
  const gridContainer = useRef<HTMLDivElement>(null);
  
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'fullstack' | 'ecommerce' | 'frontend' | 'design'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Filter projects based on state
  const filteredProjects = PROJECTS.filter((proj) => {
    if (selectedCategory === 'all') return true;
    return proj.category === selectedCategory;
  });

  // Re-run animation when the category changes
  useEffect(() => {
    if (!gridContainer.current) return;
    
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
  }, [selectedCategory]);

  useGSAP(() => {
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
  }, { scope: container });

  // Custom modal open/close animations using GSAP
  const openModal = (proj: Project) => {
    setSelectedProject(proj);
    // Let state update then animate (using a safe timeout or immediate execution)
    setTimeout(() => {
      gsap.fromTo('.modal-backdrop', 
        { opacity: 0 }, 
        { opacity: 1, duration: 0.3, ease: 'power1.out' }
      );
      gsap.fromTo('.modal-content', 
        { scale: 0.9, y: 50, opacity: 0 }, 
        { scale: 1, y: 0, opacity: 1, duration: 0.5, ease: 'back.out(1.2)' }
      );
    }, 10);
  };

  const closeModal = () => {
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
          }
        });
      }
    });
  };

  const categories: { id: typeof selectedCategory; label: string }[] = [
    { id: 'all', label: 'Todos' },
    { id: 'frontend', label: 'Websites & PWA' },
    { id: 'ecommerce', label: 'E-Commerce' },
    { id: 'fullstack', label: 'Full-stack / SaaS' },
    { id: 'design', label: 'Interactivo & UI' },
  ];

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
            <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">NICHOS DE ALTO RETORNO</span>
          </div>
          <h2 className="mt-3 font-sans text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl text-gradient">
            Proyectos que se pagan solos
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-400">
            Conceptos de ejemplo en nichos donde la web genera retorno con mínima inversión publicitaria:
            negocios de ticket alto o clientela recurrente, donde el SEO local y WhatsApp convierten la demanda que ya existe.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`rounded-full px-5 py-2 text-xs font-semibold transition-all duration-300 border ${
                selectedCategory === cat.id
                  ? 'bg-white text-black border-white font-bold shadow-lg shadow-blue-500/10'
                  : 'bg-white/[0.03] text-zinc-400 border-white/5 hover:text-white hover:border-white/10 hover:bg-white/[0.08]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div 
          ref={gridContainer}
          className="grid gap-6 md:grid-cols-2"
        >
          {filteredProjects.map((proj) => (
            <div
              key={proj.id}
              onClick={() => openModal(proj)}
              className="project-card group relative cursor-pointer overflow-hidden rounded-2xl glass transition-all hover:border-blue-500/30"
            >
              {/* Aspect ratio container for preview image */}
              <div className="relative h-64 overflow-hidden md:h-72">
                {/* Background image zoom on hover */}
                <img
                  src={proj.image}
                  alt={proj.title}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Visual shade overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/40 to-transparent" />

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
                  {proj.category === 'ecommerce' ? 'Comercio Electrónico' : proj.category === 'fullstack' ? 'Software SaaS' : proj.category === 'frontend' ? 'Desarrollo Frontend' : 'Interactivo / UI'}
                </span>
                <h3 className="mt-1.5 font-sans text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                  {proj.title}
                </h3>
                <p className="mt-2 text-sm text-slate-400 line-clamp-2">
                  {proj.description}
                </p>

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
          <div className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
            <div className="modal-content relative w-full max-w-3xl overflow-hidden rounded-2xl glass bg-zinc-950/90 shadow-2xl">
              
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/80 text-zinc-400 transition-colors hover:text-white border border-white/5"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="grid md:grid-cols-12 h-full max-h-[85vh] overflow-y-auto">
                {/* Modal Left / Top: Banner Image */}
                <div className="md:col-span-5 relative h-48 md:h-full bg-[#030303]">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-zinc-950 via-transparent to-transparent" />
                </div>

                {/* Modal Right / Bottom: Project Details */}
                <div className="md:col-span-7 p-6 md:p-8 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold tracking-wider text-blue-400 uppercase">
                      Estudio de caso interactivo
                    </span>
                    <h3 className="mt-1 font-sans text-2xl font-black text-white">
                      {selectedProject.title}
                    </h3>
                    
                    {/* Key stats row */}
                    <div className="mt-4 flex flex-wrap gap-4 border-y border-white/5 py-3">
                      <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                        <Hourglass className="h-3.5 w-3.5 text-zinc-500" />
                        <span>Duración: <strong className="text-white">{selectedProject.duration}</strong></span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                        <Layers className="h-3.5 w-3.5 text-zinc-500" />
                        <span>Arquitectura: <strong className="text-white">Escalable</strong></span>
                      </div>
                    </div>

                    <p className="mt-4 text-sm leading-relaxed text-zinc-300">
                      {selectedProject.details}
                    </p>

                    {/* Features list */}
                    <div className="mt-6">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Funcionalidades Clave</h4>
                      <ul className="mt-2.5 grid gap-2">
                        {selectedProject.features.map((feat, index) => (
                          <li key={index} className="flex items-start gap-2 text-xs text-zinc-300">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech tag list */}
                    <div className="mt-6">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Stack Tecnológico</h4>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {selectedProject.techStack.map((tech, index) => (
                          <span
                            key={index}
                            className="rounded-md bg-white/5 px-2.5 py-1 text-[10px] font-medium text-zinc-300 border border-white/5"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions footer */}
                  <div className="mt-8 pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-4">
                    <button
                      onClick={() => {
                        closeModal();
                        document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="rounded-full bg-white px-5 py-2.5 font-sans text-xs font-bold text-zinc-950 transition-all hover:bg-blue-500 hover:text-white"
                    >
                      Solicitar proyecto similar
                    </button>
                    <a
                      href="https://stonydev.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 font-sans text-xs font-bold text-zinc-400 hover:text-white transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span>Ver demo en vivo</span>
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
