# stonydev.com

Sitio del estudio de desarrollo web **StonyDev** (Uruguay): cuatro socios que cubren
UX/UI, orquestación de datos, backend y fullstack con automatizaciones.

## Stack

- **React 19** + **TypeScript** + **Vite 6**
- **Tailwind CSS 4** (plugin de Vite)
- **GSAP** (+ ScrollTrigger) para animaciones — respetando `prefers-reduced-motion`
- Demos estáticas por nicho en `public/demos/` (HTML/CSS puro, `noindex`)

## Desarrollo

```bash
npm install
npm run dev        # servidor local en :3000
npm run lint       # typecheck (tsc --noEmit)
npm run build      # build de producción en dist/
npm run preview    # sirve el build
```

## Estructura

```
src/
  config.ts            # contacto, WhatsApp, helpers (waLink, scrollToId, reduced motion)
  data.ts              # servicios, proyectos, stack, pasos del cotizador
  components/          # una sección por componente + DynamicIcon (mapa de iconos)
public/
  demos/               # demos navegables por nicho (con banner de atribución)
  projects/            # imágenes WebP self-hosted de los proyectos
  og.png               # imagen social 1200x630
  robots.txt, sitemap.xml
```

## Convenciones

- **Todo CTA de comunicación deriva a WhatsApp** (`SITE.whatsappNumber` en `src/config.ts`);
  el número se cambia en un solo lugar.
- Los iconos de `lucide-react` se importan **por nombre** (nunca `import *`) — ver
  `DynamicIcon.tsx`; esto mantiene el bundle ~400 KB en lugar de 1.2 MB.
- La auditoría de mejoras pendientes vive en [`MEJORAS.md`](./MEJORAS.md).
