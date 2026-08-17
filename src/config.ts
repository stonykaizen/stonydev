// Datos de contacto y constantes del sitio — único lugar donde se editan.
export const SITE = {
  domain: 'stonydev.com',
  url: 'https://stonydev.com',
  email: 'stonykaizen@gmail.com',
  whatsappNumber: '59892375881',
  whatsappDisplay: '+598 92 375 881',
} as const;

// Genera un link de WhatsApp con mensaje precargado.
export function waLink(message: string): string {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const WA_DEFAULT_MESSAGE =
  '¡Hola StonyDev! Vi su web y quiero hacerles una consulta sobre un proyecto.';

// El visitante pidió reducir el movimiento a nivel de sistema operativo.
export function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Scroll a una sección respetando la preferencia de movimiento.
export function scrollToId(id: string): void {
  document.getElementById(id)?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
}
