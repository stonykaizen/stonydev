import { useRef, useState, ChangeEvent, FormEvent } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Mail, Globe, MapPin, Send, CheckCircle2, ArrowUpRight, Github, Twitter, Linkedin, AlertCircle } from 'lucide-react';

export default function Contact() {
  const container = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [validationError, setValidationError] = useState('');

  // Scroll Trigger reveal for elements
  useGSAP(() => {
    gsap.from('.contact-element', {
      scrollTrigger: {
        trigger: container.current,
        start: 'top 85%',
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
    });
  }, { scope: container });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id.replace('contact-', '')]: value
    }));
    if (validationError) {
      setValidationError('');
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setValidationError('Por favor, completa todos los campos obligatorios marcados con (*).');
      return;
    }

    setIsSending(true);
    setValidationError('');

    // Simulate sending animation
    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
      // Animate success overlay pop up
      gsap.fromTo('.success-popup',
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.5)' }
      );
    }, 1800);
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', company: '', message: '' });
    setIsSent(false);
    setValidationError('');
  };

  return (
    <section
      id="contacto"
      ref={container}
      className="relative bg-[#030303] px-4 py-24 md:px-8 border-t border-white/5 overflow-hidden"
    >
      {/* Background neon effect */}
      <div className="absolute right-0 bottom-0 h-[300px] w-[300px] rounded-full bg-blue-500/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="contact-element text-center mb-16">
          <div className="mx-auto mb-3 flex max-w-fit items-center gap-2 rounded-full glass px-3 py-1">
            <div className="nav-dot animate-pulse bg-blue-400 shadow-blue-400" />
            <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">INICIEMOS TU PROYECTO</span>
          </div>
          <h2 className="mt-3 font-sans text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl text-gradient">
            Cuéntame tu idea
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-400">
            ¿Listo para llevar tu marca al siguiente nivel con diseño web de vanguardia? Completa el formulario o escríbeme directamente.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-12 items-start">
          
          {/* Column 1: Contact Details & Socials (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div className="contact-element">
              <h3 className="font-sans text-xl font-bold text-white mb-6">Información de Contacto</h3>
              
              <div className="flex flex-col gap-6">
                
                {/* Email detail */}
                <a 
                  href="mailto:stonykaizen@gmail.com" 
                  className="group flex items-start gap-4 p-4 rounded-2xl glass bg-black/40 hover:bg-black/60 transition-all hover:border-blue-500/20"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-400/10 text-blue-400 group-hover:scale-105 transition-transform">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block text-xs text-slate-400 font-bold uppercase tracking-wider">Correo Electrónico</span>
                    <span className="text-sm font-semibold text-white group-hover:text-blue-300 transition-colors">stonykaizen@gmail.com</span>
                  </div>
                </a>

                {/* Domain detail */}
                <a 
                  href="https://stonydev.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group flex items-start gap-4 p-4 rounded-2xl glass bg-black/40 hover:bg-black/60 transition-all hover:border-blue-500/20"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-400/10 text-blue-400 group-hover:scale-105 transition-transform">
                    <Globe className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block text-xs text-slate-400 font-bold uppercase tracking-wider">Dominio Oficial</span>
                    <span className="text-sm font-semibold text-white group-hover:text-blue-300 transition-colors">stonydev.com</span>
                  </div>
                </a>

                {/* Location detail */}
                <div className="flex items-start gap-4 p-4 rounded-2xl glass bg-black/40">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-zinc-400">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block text-xs text-slate-400 font-bold uppercase tracking-wider">Ubicación</span>
                    <span className="text-sm font-semibold text-white">Remoto / Cobertura Global</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Social media connections */}
            <div className="contact-element">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Encuéntrame en redes</h4>
              <div className="flex gap-3">
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/5 bg-white/[0.02] text-zinc-400 hover:text-white hover:border-white/10 hover:bg-white/[0.08] transition-all"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/5 bg-white/[0.02] text-zinc-400 hover:text-white hover:border-white/10 hover:bg-white/[0.08] transition-all"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/5 bg-white/[0.02] text-zinc-400 hover:text-white hover:border-white/10 hover:bg-white/[0.08] transition-all"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Sleek Interactive Form (7 Cols) */}
          <div className="lg:col-span-7 rounded-3xl glass p-6 md:p-8 relative min-h-[440px] border-blue-500/10">
            {isSent ? (
              /* Success visual popup */
              <div className="success-popup absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-zinc-950/40 backdrop-blur-sm rounded-3xl">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/20 text-blue-400 mb-6">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                <h3 className="font-sans text-2xl font-bold text-white">¡Mensaje Enviado con Éxito!</h3>
                <p className="mt-2 text-sm text-slate-400 max-w-sm">
                  Gracias por comunicarte. He recibido los requerimientos de tu proyecto y te responderé en menos de 24 horas.
                </p>
                <button
                  onClick={handleReset}
                  className="mt-8 rounded-full border border-white/10 bg-white px-6 py-2.5 font-sans text-xs font-semibold text-black transition-all hover:bg-blue-500 hover:text-white"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              /* Standard Form */
              <form onSubmit={handleSubmit} className="contact-element flex flex-col gap-6">
                
                {validationError && (
                  <div className="flex items-center gap-2 rounded-xl bg-red-500/10 border border-red-500/20 p-4 text-xs text-red-400">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>{validationError}</span>
                  </div>
                )}

                {/* Double inputs row */}
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-name" className="text-xs font-semibold text-slate-400">
                      Nombre Completo <span className="text-blue-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="contact-name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Tu nombre"
                      className="rounded-xl border border-white/5 bg-black/60 p-3 text-sm text-white placeholder-zinc-600 focus:border-blue-500/50 focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-email" className="text-xs font-semibold text-slate-400">
                      Correo Electrónico <span className="text-blue-400">*</span>
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="nombre@empresa.com"
                      className="rounded-xl border border-white/5 bg-black/60 p-3 text-sm text-white placeholder-zinc-600 focus:border-blue-500/50 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-company" className="text-xs font-semibold text-slate-400">
                    Empresa u Organización <span className="text-zinc-600">(Opcional)</span>
                  </label>
                  <input
                    type="text"
                    id="contact-company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Nombre de tu negocio"
                    className="rounded-xl border border-white/5 bg-black/60 p-3 text-sm text-white placeholder-zinc-600 focus:border-blue-500/50 focus:outline-none transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-message" className="text-xs font-semibold text-slate-400">
                    Detalles de tu Proyecto <span className="text-blue-400">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Explícame brevemente de qué trata tu idea, plazos u objetivos comerciales..."
                    className="rounded-xl border border-white/5 bg-black/60 p-3 text-sm text-white placeholder-zinc-600 focus:border-blue-500/50 focus:outline-none transition-colors resize-none"
                  />
                </div>

                {/* Submission button */}
                <button
                  type="submit"
                  disabled={isSending}
                  className="mt-4 flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 font-sans text-xs font-bold text-black transition-all hover:bg-blue-500 hover:text-white disabled:opacity-50"
                >
                  {isSending ? (
                    <span>Enviando mensaje...</span>
                  ) : (
                    <>
                      <span>Enviar Mensaje</span>
                      <Send className="h-3.5 w-3.5" />
                    </>
                  )}
                </button>

              </form>
            )}
          </div>

        </div>

        {/* Footer legalities */}
        <div className="contact-element mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-center">
          <span className="text-xs text-zinc-500">
            © 2026 stonydev.com. Todos los derechos reservados.
          </span>
          <div className="flex gap-4 text-xs text-zinc-500">
            <span className="hover:text-white cursor-pointer">Términos de Servicio</span>
            <span className="hover:text-white cursor-pointer">Política de Privacidad</span>
          </div>
        </div>

      </div>
    </section>
  );
}
