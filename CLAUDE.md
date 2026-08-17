# stonydev.com — guía para agentes

Sitio del estudio StonyDev (React 19 + TypeScript strict + Vite 6 + Tailwind 4 + GSAP).
Producción: https://stonydev.com — **Vercel auto-despliega cada push a `main`**, así que
verificá `npm run lint && npm run build` antes de pushear a main.

## Comandos

- `npm run dev` — servidor local :3000
- `npm run lint` — tsc + ESLint (typescript-eslint, react-hooks, jsx-a11y); es lo que corre el CI
- `npm run build` — build de producción
- `npm run format` — Prettier sobre src/

## Reglas del proyecto

- **Todo CTA de comunicación deriva a WhatsApp** (+598 92 375 881). El número y los helpers
  (`waLink`, `scrollToId`, `prefersReducedMotion`) viven en `src/config.ts` — nunca hardcodear
  el número en componentes.
- **Iconos de lucide-react siempre por import nombrado** (o vía `DynamicIcon.tsx` si el nombre
  viene de datos). `import * as Icons` está prohibido: infla el bundle ~800 KB.
- **Toda animación GSAP nueva debe respetar `prefersReducedMotion()`** (early return en el
  useGSAP) y los loops infinitos se pausan fuera de viewport con ScrollTrigger.
- ScrollTrigger se registra una sola vez en `src/main.tsx`.
- Los datos de contenido (servicios, proyectos, cotizador, etiquetas) van en `src/data.ts`.
- Los proyectos del portfolio son **conceptos de ejemplo**, no clientes reales — mantener las
  etiquetas "Concepto · Demo en vivo".
- Las demos de `public/demos/` son HTML estático autocontenido con `noindex` y un banner de
  atribución que enlaza a stonydev.com; sus imágenes viven en `img/` de cada demo (no hotlinkear).

## Referencias

- `MEJORAS.md` — auditoría completa con estado de implementación y pendientes.
- SEO: `public/robots.txt`, `public/sitemap.xml`, `public/og.png` (1200×630), JSON-LD en
  `index.html` (Organization) y en `Faq.tsx` (FAQPage).
