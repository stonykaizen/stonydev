import { useRef, useState, ChangeEvent, FormEvent } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Mail, MapPin, CheckCircle2, AlertCircle, MessageCircle } from 'lucide-react';
import { SITE, waLink, prefersReducedMotion } from '../config';

export default function Contact({ quoteMessage = '' }: { quoteMessage?: string }) {
  const container = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [isSent, setIsSent] = useState(false);
  const [validationError, setValidationError] = useState('');

  // Precarga el detalle armado en el cotizador (estado compartido vía App).
  // Patrón "ajustar estado durante el render": evita el re-render en cascada
  // de un setState dentro de useEffect.
  const [lastQuote, setLastQuote] = useState(quoteMessage);
  if (quoteMessage !== lastQuote) {
    setLastQuote(quoteMessage);
    if (quoteMessage) {
      setFormData((prev) => ({ ...prev, message: quoteMessage }));
    }
  }

  // Scroll Trigger reveal for elements
  useGSAP(() => {
    if (prefersReducedMotion()) return;
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

  // El "envío" abre WhatsApp con el mensaje completo: llega directo al equipo,
  // sin backend de por medio y sin leads perdidos.
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setValidationError('Por favor, completa todos los campos obligatorios marcados con (*).');
      return;
    }

    const lines = [
      `¡Hola StonyDev! Soy ${formData.name}.`,
      formData.company ? `Empresa: ${formData.company}` : '',
      `Email: ${formData.email}`,
      '',
      formData.message,
    ].filter(Boolean);

    window.open(waLink(lines.join('\n')), '_blank', 'noopener,noreferrer');

    setValidationError('');
    setIsSent(true);
    if (!prefersReducedMotion()) {
      gsap.fromTo('.success-popup',
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.5)' }
      );
    }
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
            Cuéntanos tu idea
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-400">
            ¿Listo para llevar tu marca al siguiente nivel? Completa el formulario y te escribimos
            por WhatsApp, o mandanos un mensaje directo ahora mismo.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-12 items-start">

          {/* Column 1: Contact Details (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div className="contact-element">
              <h3 className="font-sans text-xl font-bold text-white mb-6">Información de Contacto</h3>

              <div className="flex flex-col gap-6">

                {/* WhatsApp — canal principal */}
                <a
                  href={waLink('¡Hola StonyDev! Quiero hacerles una consulta sobre un proyecto.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-4 p-4 rounded-2xl glass bg-black/40 hover:bg-black/60 transition-all hover:border-emerald-500/30"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#25D366]/15 text-[#25D366] group-hover:scale-105 transition-transform">
                    <MessageCircle className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="block text-xs text-slate-400 font-bold uppercase tracking-wider">WhatsApp — Respuesta Rápida</span>
                    <span className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors">{SITE.whatsappDisplay}</span>
                  </div>
                </a>

                {/* Email detail */}
                <a
                  href={`mailto:${SITE.email}`}
                  className="group flex items-start gap-4 p-4 rounded-2xl glass bg-black/40 hover:bg-black/60 transition-all hover:border-blue-500/20"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-400/10 text-blue-400 group-hover:scale-105 transition-transform">
                    <Mail className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="block text-xs text-slate-400 font-bold uppercase tracking-wider">Correo Electrónico</span>
                    <span className="text-sm font-semibold text-white group-hover:text-blue-300 transition-colors">{SITE.email}</span>
                  </div>
                </a>

                {/* Location detail */}
                <div className="flex items-start gap-4 p-4 rounded-2xl glass bg-black/40">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-zinc-400">
                    <MapPin className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="block text-xs text-slate-400 font-bold uppercase tracking-wider">Ubicación</span>
                    <span className="text-sm font-semibold text-white">Uruguay · Remoto / Cobertura Global</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Direct WhatsApp CTA */}
            <div className="contact-element rounded-2xl glass p-6 border-emerald-500/10">
              <h4 className="font-sans text-base font-bold text-white">¿Preferís ir al grano?</h4>
              <p className="mt-1 text-sm text-slate-400">
                Escribinos por WhatsApp y un socio del estudio te responde en el día.
              </p>
              <a
                href={waLink('¡Hola StonyDev! Quiero cotizar un proyecto web.')}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-sans text-xs font-bold text-white transition-all hover:bg-[#1ebe5b] hover:scale-[1.02]"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                <span>Chatear por WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Column 2: Sleek Interactive Form (7 Cols) */}
          <div className="lg:col-span-7 rounded-3xl glass p-6 md:p-8 relative min-h-[440px] border-blue-500/10">
            {isSent ? (
              /* Success visual popup */
              <div className="success-popup absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-zinc-950/40 backdrop-blur-sm rounded-3xl">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 mb-6">
                  <CheckCircle2 className="h-10 w-10" aria-hidden="true" />
                </div>
                <h3 className="font-sans text-2xl font-bold text-white">¡Abrimos WhatsApp con tu mensaje!</h3>
                <p className="mt-2 text-sm text-slate-400 max-w-sm">
                  Solo falta que toques &ldquo;Enviar&rdquo; en WhatsApp y lo recibimos al instante.
                  Si no se abrió, escribinos directo al {SITE.whatsappDisplay}.
                </p>
                <button
                  onClick={handleReset}
                  className="mt-8 rounded-full border border-white/10 bg-white px-6 py-2.5 font-sans text-xs font-semibold text-black transition-all hover:bg-blue-500 hover:text-white"
                >
                  Escribir otro mensaje
                </button>
              </div>
            ) : (
              /* Standard Form */
              <form onSubmit={handleSubmit} className="contact-element flex flex-col gap-6">

                {validationError && (
                  <div className="flex items-center gap-2 rounded-xl bg-red-500/10 border border-red-500/20 p-4 text-xs text-red-400">
                    <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
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
                      className="rounded-xl border border-white/5 bg-black/60 p-3 text-sm text-white placeholder-zinc-500 focus:border-blue-500/50 focus:outline-none transition-colors"
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
                      className="rounded-xl border border-white/5 bg-black/60 p-3 text-sm text-white placeholder-zinc-500 focus:border-blue-500/50 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-company" className="text-xs font-semibold text-slate-400">
                    Empresa u Organización <span className="text-zinc-500">(Opcional)</span>
                  </label>
                  <input
                    type="text"
                    id="contact-company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Nombre de tu negocio"
                    className="rounded-xl border border-white/5 bg-black/60 p-3 text-sm text-white placeholder-zinc-500 focus:border-blue-500/50 focus:outline-none transition-colors"
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
                    placeholder="Cuéntanos brevemente de qué trata tu idea, plazos u objetivos comerciales..."
                    className="rounded-xl border border-white/5 bg-black/60 p-3 text-sm text-white placeholder-zinc-500 focus:border-blue-500/50 focus:outline-none transition-colors resize-none"
                  />
                </div>

                {/* Submission button — abre WhatsApp con todo el detalle */}
                <button
                  type="submit"
                  className="mt-4 flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 font-sans text-xs font-bold text-white transition-all hover:bg-[#1ebe5b] hover:scale-[1.01]"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  <span>Enviar por WhatsApp</span>
                </button>
                <p className="text-center text-[11px] text-zinc-500 -mt-2">
                  Se abre WhatsApp con tu mensaje listo — sin formularios que caen en spam.
                </p>

              </form>
            )}
          </div>

        </div>

        {/* Footer */}
        <div className="contact-element mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-center">
          <span className="text-xs text-zinc-500">
            © {new Date().getFullYear()} {SITE.domain}. Todos los derechos reservados.
          </span>
          <a
            href={waLink('¡Hola StonyDev!')}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-zinc-500 hover:text-emerald-300 transition-colors"
          >
            WhatsApp {SITE.whatsappDisplay}
          </a>
        </div>

      </div>
    </section>
  );
}
