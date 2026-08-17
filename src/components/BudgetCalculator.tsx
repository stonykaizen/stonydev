import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { CALCULATOR_STEPS } from '../data';
import { Check, ArrowLeft, ArrowRight, MessageCircle } from 'lucide-react';
import DynamicIcon from './DynamicIcon';
import { waLink, prefersReducedMotion } from '../config';

// Restaura las selecciones del cotizador si el visitante recarga la página.
const STORAGE_KEY = 'stonydev-cotizador';

function loadSaved(): { projectType?: string; designLevel?: string; integrations?: string[] } {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? '{}');
  } catch {
    return {};
  }
}

export default function BudgetCalculator({ onQuoteReady }: { onQuoteReady?: (message: string) => void }) {
  const container = useRef<HTMLDivElement>(null);
  const priceDisplayRef = useRef<HTMLSpanElement>(null);

  // Track previous and current price for GSAP count-up animation
  const countObj = useRef({ value: 0 });

  // Selections state (restauradas de sessionStorage si el visitante recargó)
  const [saved] = useState(loadSaved);
  const [projectType, setProjectType] = useState<string>(saved.projectType ?? 'corporativo');
  const [designLevel, setDesignLevel] = useState<string>(saved.designLevel ?? 'premium');
  const [selectedIntegrations, setSelectedIntegrations] = useState<string[]>(saved.integrations ?? ['auth', 'pagos']);

  // Active calculator step tab
  const [currentStep, setCurrentStep] = useState<number>(0);

  useEffect(() => {
    sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ projectType, designLevel, integrations: selectedIntegrations })
    );
  }, [projectType, designLevel, selectedIntegrations]);

  // Calculate price dynamically
  const calculateTotal = (): { total: number; breakDown: { label: string; cost: number }[] } => {
    let total = 0;
    const breakDown: { label: string; cost: number }[] = [];

    // 1. Project Type Cost
    const typeStep = CALCULATOR_STEPS.find((s) => s.id === 'tipo');
    const selectedType = typeStep?.options.find((o) => o.id === projectType);
    if (selectedType) {
      total += selectedType.cost;
      breakDown.push({ label: selectedType.label, cost: selectedType.cost });
    }

    // 2. Design Complexity Cost
    const designStep = CALCULATOR_STEPS.find((s) => s.id === 'diseno');
    const selectedDesign = designStep?.options.find((o) => o.id === designLevel);
    if (selectedDesign) {
      total += selectedDesign.cost;
      if (selectedDesign.cost > 0) {
        breakDown.push({ label: `Diseño: ${selectedDesign.label}`, cost: selectedDesign.cost });
      }
    }

    // 3. Integrations Cost
    const integrationsStep = CALCULATOR_STEPS.find((s) => s.id === 'integraciones');
    selectedIntegrations.forEach((intId) => {
      const option = integrationsStep?.options.find((o) => o.id === intId);
      if (option) {
        total += option.cost;
        breakDown.push({ label: `Integración: ${option.label}`, cost: option.cost });
      }
    });

    return { total, breakDown };
  };

  const { total, breakDown } = calculateTotal();

  // GSAP Count-Up Animation whenever total price changes
  useEffect(() => {
    if (prefersReducedMotion()) {
      countObj.current.value = total;
      if (priceDisplayRef.current) priceDisplayRef.current.innerText = `$${total}`;
      return;
    }
    gsap.to(countObj.current, {
      value: total,
      duration: 0.8,
      ease: 'power2.out',
      onUpdate: () => {
        if (priceDisplayRef.current) {
          priceDisplayRef.current.innerText = `$${Math.round(countObj.current.value)}`;
        }
      }
    });
  }, [total]);

  // Section intro animations
  useGSAP(() => {
    if (prefersReducedMotion()) return;
    gsap.from('.calc-header', {
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

  // Toggle selection for checkboxes (integrations)
  const toggleIntegration = (id: string) => {
    if (selectedIntegrations.includes(id)) {
      setSelectedIntegrations(selectedIntegrations.filter((x) => x !== id));
    } else {
      setSelectedIntegrations([...selectedIntegrations, id]);
    }
  };

  // Arma el detalle de la cotización como texto legible.
  const buildQuoteMessage = (): string => {
    const lines = [
      '¡Hola StonyDev! Armé una cotización con la calculadora de la web:',
      ...breakDown.map((item) => `• ${item.label}: $${item.cost} USD`),
      `Total estimado: $${total} USD`,
      '',
      'Quiero avanzar con una cotización formal.',
    ];
    return lines.join('\n');
  };

  // Toda cotización sale por WhatsApp; además queda precargada en el formulario
  // de contacto por si el visitante prefiere completar sus datos.
  const handleSendBudget = () => {
    const message = buildQuoteMessage();
    onQuoteReady?.(message);
    window.open(waLink(message), '_blank', 'noopener,noreferrer');
  };

  return (
    <section
      id="calculadora"
      ref={container}
      className="relative bg-[#030303] px-4 py-24 md:px-8 border-t border-white/5 overflow-hidden"
    >
      <div className="absolute top-1/4 left-1/4 h-[500px] w-[500px] rounded-full bg-blue-500/5 blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 h-[500px] w-[500px] rounded-full bg-purple-500/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="calc-header text-center mb-16">
          <div className="mx-auto mb-3 flex max-w-fit items-center gap-2 rounded-full glass px-3 py-1">
            <div className="nav-dot animate-pulse bg-blue-400 shadow-blue-400" />
            <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">HERRAMIENTA INTERACTIVA</span>
          </div>
          <h2 className="mt-3 font-sans text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl text-gradient">
            Cotizador de Presupuestos
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-400">
            Define los requerimientos para tu plataforma, obtén un estimado al instante y envíalo
            por WhatsApp en un toque. Transparencia total, sin costes ocultos.
          </p>
        </div>

        {/* Dynamic Calculator Box Grid */}
        <div className="grid gap-8 lg:grid-cols-12">

          {/* Left / Steps Side (8 Cols) */}
          <div className="lg:col-span-8 flex flex-col justify-between rounded-3xl glass p-6 md:p-8 min-h-[480px] border-blue-500/10">

            {/* Steps Nav Indicators */}
            <div className="flex items-center justify-between border-b border-white/5 pb-6 mb-6 overflow-x-auto gap-4">
              {CALCULATOR_STEPS.map((step, index) => (
                <button
                  key={step.id}
                  onClick={() => setCurrentStep(index)}
                  className={`flex items-center gap-2 pb-1.5 border-b-2 text-xs font-bold transition-all shrink-0 ${
                    currentStep === index
                      ? 'border-blue-400 text-blue-400'
                      : 'border-transparent text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
                    currentStep === index ? 'bg-blue-400 text-black' : 'bg-white/5 text-zinc-500'
                  }`}>
                    {index + 1}
                  </span>
                  <span>{step.id === 'tipo' ? 'Tipo' : step.id === 'diseno' ? 'Diseño' : 'Integraciones'}</span>
                </button>
              ))}
            </div>

            {/* Selected Step Description */}
            <div className="mb-6">
              <h3 className="font-sans text-lg font-bold text-white">
                {CALCULATOR_STEPS[currentStep].title}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {CALCULATOR_STEPS[currentStep].description}
              </p>
            </div>

            {/* Options Selector Selection Grid */}
            <div className="grid gap-4 sm:grid-cols-2 grow">
              {CALCULATOR_STEPS[currentStep].options.map((option) => {
                const isSelected =
                  currentStep === 0
                    ? projectType === option.id
                    : currentStep === 1
                    ? designLevel === option.id
                    : selectedIntegrations.includes(option.id);

                const selectOption = () => {
                  if (currentStep === 0) setProjectType(option.id);
                  else if (currentStep === 1) setDesignLevel(option.id);
                  else toggleIntegration(option.id);
                };

                return (
                  <div
                    key={option.id}
                    role="button"
                    tabIndex={0}
                    aria-pressed={isSelected}
                    onClick={selectOption}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        selectOption();
                      }
                    }}
                    className={`group relative cursor-pointer flex flex-col justify-between rounded-2xl border p-5 transition-all duration-300 focus-visible:outline-2 focus-visible:outline-blue-400 ${
                      isSelected
                        ? 'bg-blue-500/10 border-blue-400/80 shadow-lg shadow-blue-500/10'
                        : 'bg-black/40 border-white/5 hover:border-white/15 hover:bg-white/[0.03]'
                    }`}
                  >
                    <div>
                      {/* Option Header with icon */}
                      <div className="flex items-center justify-between mb-4">
                        <div className={`flex h-9 w-9 items-center justify-center rounded-xl transition-colors ${
                          isSelected ? 'bg-blue-400 text-black' : 'bg-white/5 text-zinc-400 group-hover:text-white group-hover:bg-white/10'
                        }`}>
                          <DynamicIcon name={option.icon} className="h-4.5 w-4.5" />
                        </div>
                        {/* Selector indicator bubble */}
                        <div className={`h-4 w-4 rounded-full border flex items-center justify-center ${
                          isSelected ? 'border-blue-400 bg-blue-400 text-black' : 'border-zinc-700'
                        }`}>
                          {isSelected && <Check className="h-3 w-3 stroke-[3]" aria-hidden="true" />}
                        </div>
                      </div>

                      {/* Option title and desc */}
                      <h4 className="font-sans text-sm font-bold text-white transition-colors group-hover:text-blue-300">
                        {option.label}
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed">
                        {option.description}
                      </p>
                    </div>

                    {/* Cost indication */}
                    <div className="mt-6 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                      <span className="text-zinc-500">Valor de referencia</span>
                      <span className={`font-sans font-extrabold ${isSelected ? 'text-blue-400' : 'text-zinc-300'}`}>
                        {option.cost === 0 ? 'Sin recargo' : `+ $${option.cost} USD`}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom step nav controls */}
            <div className="flex items-center justify-between border-t border-white/5 pt-6 mt-8">
              <button
                disabled={currentStep === 0}
                onClick={() => setCurrentStep((prev) => prev - 1)}
                className="flex items-center gap-1.5 text-xs font-bold text-zinc-400 transition-colors hover:text-white disabled:opacity-30 disabled:pointer-events-none"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                <span>Anterior</span>
              </button>

              <span className="text-[10px] text-zinc-500 font-mono">
                PASO {currentStep + 1} DE {CALCULATOR_STEPS.length}
              </span>

              {currentStep < CALCULATOR_STEPS.length - 1 ? (
                <button
                  onClick={() => setCurrentStep((prev) => prev + 1)}
                  className="flex items-center gap-1.5 text-xs font-bold text-blue-400 transition-colors hover:text-blue-300"
                >
                  <span>Siguiente</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              ) : (
                <button
                  onClick={handleSendBudget}
                  className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 transition-colors hover:text-emerald-300"
                >
                  <span>Enviar por WhatsApp</span>
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                </button>
              )}
            </div>

          </div>

          {/* Right / Sticky Total summary Side (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between rounded-3xl glass bg-gradient-to-b from-black/80 to-black/40 p-6 shadow-xl relative overflow-hidden border-blue-500/10">

            {/* Subtle glow border effect */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />

            <div>
              <h3 className="font-sans text-sm font-bold uppercase tracking-wider text-slate-400 mb-6">
                Resumen de tu Cotización
              </h3>

              {/* Selected List BreakDown */}
              <div className="flex flex-col gap-4">
                {breakDown.map((item, index) => (
                  <div key={index} className="flex justify-between text-xs border-b border-white/5 pb-2">
                    <span className="text-slate-400 font-medium">{item.label}</span>
                    <span className="text-white font-mono">${item.cost} USD</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Large Price Meter */}
            <div className="mt-8 pt-6 border-t border-white/10">

              <div className="text-center p-4 bg-white/[0.02] rounded-2xl border border-white/5 relative">
                <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest">Inversión Estimada</span>

                {/* Rolling Price counter targeting with GSAP */}
                <span
                  ref={priceDisplayRef}
                  className="block text-4xl font-black text-blue-400 mt-2 font-sans tracking-tight"
                >
                  $0
                </span>

                <span className="block text-[10px] text-zinc-500 mt-1">Referencia en USD · cotización formal también en UYU · sujeto a alcances</span>
              </div>

              {/* Envío directo de la cotización por WhatsApp */}
              <button
                onClick={handleSendBudget}
                className="mt-6 w-full rounded-full bg-[#25D366] px-5 py-3.5 font-sans text-xs font-bold text-white transition-all hover:bg-[#1ebe5b] active:scale-95 flex items-center justify-center gap-2"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                <span>Enviar Cotización por WhatsApp</span>
              </button>

              <p className="mt-3 text-center text-[11px] text-zinc-500">
                Se abre WhatsApp con el desglose completo, listo para enviar.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
