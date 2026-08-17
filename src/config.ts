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
