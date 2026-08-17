# Auditoría completa de stonydev.com — Lista exhaustiva de mejoras

> Revisión profunda del código (v2.4) realizada el 2026-08-17.
> Prioridades: 🔴 Crítica (pierde clientes o está roto) · 🟠 Alta · 🟡 Media · 🟢 Baja.

## ✅ Estado de implementación (2026-08-17)

**Implementado** — Top 10 completo más un segundo lote:
1.1–1.8 (contacto por WhatsApp, cotizador arreglado, links muertos fuera, voz plural, métricas,
ScrollTrigger centralizado, back-to-top accesible) · 2.1, 2.2, 2.3 (sección Proceso), 2.4 (FAQ
con schema), 2.6, 2.7 (banner en demos) · 3.1–3.4 (bundle −67%, deps limpias, fuentes, imágenes
WebP locales) · 4.1–4.3, 4.5 · 5.1–5.3, 5.6, 5.7 · 6.1, 6.4, 6.5 · 7.2 (CI), 7.4, 7.7 · 8.1, 8.2
(vercel.json) · 9.1, 9.2, 9.4. Toda comunicación deriva a WhatsApp +598 92 375 881
(`src/config.ts`).

**Pendiente**: 2.5 parcial (precios UYU aclarados en FAQ, falta en cotizador), 2.8 (multi-idioma),
2.9 (analytics), 3.5 (code-splitting), 3.6 (pausar animaciones fuera de viewport), 3.7 (favicon
png/apple-touch), 4.4 (rutas por servicio), 4.6 (blog), 5.4/5.5 (tipografías mínimas y contraste),
6.2 (filtros por nicho), 6.3 (barras %), 7.1 (ESLint/Prettier), 7.3 parcial, 7.5 parcial, 7.6 ✅,
7.8 (ErrorBoundary), 7.9 ✅, 8.3 (redirecciones dominio), 8.4 (monitoreo), 9.3, 9.5.

---

## 1. Bugs funcionales (lo que está roto hoy)

### 🔴 1.1 El formulario de contacto no envía nada
`src/components/Contact.tsx:44-64` — `handleSubmit` solo hace un `setTimeout` de 1.8s y muestra
"¡Mensaje Enviado con Éxito!". **Ningún mensaje llega a ningún lado**: todo lead que la web
capta se pierde, y encima se le dice al cliente que le responderán en 24 h.
- Solución mínima hoy mismo: convertir el submit en un link `mailto:` o abrir WhatsApp con el mensaje armado.
- Solución correcta: endpoint serverless (Vercel Function + Resend, o Formspree/EmailJS) con
  anti-spam (honeypot + rate limit).

### 🔴 1.2 El pase de la cotización al formulario está roto
`src/components/BudgetCalculator.tsx:119-126` — "Enviar esta Cotización" setea
`textarea.value` directamente y dispara un `Event('input')`. El textarea es un componente
**controlado** por React (`value={formData.message}`), y el value-tracker interno de React
descarta el evento sintético: `formData.message` queda vacío, el texto se pisa en el siguiente
render y al enviar salta "completa todos los campos obligatorios". El flujo estrella
(cotizador → contacto) no funciona de punta a punta.
- Solución: levantar el estado (contexto compartido o callback/prop) y prefijar el mensaje vía
  `setFormData`, nunca tocando el DOM.

### 🔴 1.3 Redes sociales apuntan a páginas genéricas
`src/components/Contact.tsx:154-176` — los íconos de GitHub/LinkedIn/Twitter enlazan a
`https://github.com`, `https://linkedin.com`, `https://twitter.com` (las home de esas redes,
no perfiles). Transmite sitio "de plantilla". Poner los perfiles reales o eliminar los íconos.

### 🔴 1.4 "Términos de Servicio" y "Política de Privacidad" no existen
`src/components/Contact.tsx:300-303` — son `<span>` con `cursor-pointer` que no llevan a
ninguna parte. O se crean las páginas (recomendado si se van a captar datos por formulario) o
se quitan los links muertos.

### 🟠 1.5 Voz inconsistente: ¿estudio de 4 socios o freelancer?
El hero y Team venden "estudio de cuatro socios", pero:
- `Contact.tsx:89` "Cuéntame tu idea", `:92` "escríbeme directamente", `:151` "Encuéntrame en redes", `:191` "He recibido… te responderé".
- `TechStack.tsx:140` "**Domino** herramientas punteras…".
- `BudgetCalculator` (data.ts:190) "¿Qué tipo de proyecto **necesitas**?" (tuteo tú vs. voseo del resto de demos).
Unificar todo a primera persona plural ("Contanos tu idea", "Dominamos…") y decidir tú/vos.

### 🟠 1.6 Métricas del hero poco creíbles
`Hero.tsx:176-189` — "50+ Proyectos" cuando los 6 proyectos mostrados son conceptos de ejemplo,
y "100% Calidad" no significa nada. También "0.3s Total LCP" (`Hero.tsx:252`) mientras el
bundle real pesa 1.24 MB. Reemplazar por métricas defendibles (años de experiencia combinada,
tiempo de respuesta, "4 especialidades", uptime, etc.).

### 🟡 1.7 ScrollTrigger sin registrar en App.tsx
`App.tsx:24` usa `scrollTrigger` pero nunca importa/registra el plugin; funciona de casualidad
porque `Services.tsx` lo registra como efecto colateral del import. Si se reordenan imports se
rompe el botón "volver arriba". Registrar una sola vez en `main.tsx` y quitar los 3
`gsap.registerPlugin(ScrollTrigger)` duplicados (Services, Team, TechStack).

### 🟡 1.8 Botón "volver arriba" accesible cuando es invisible
`App.tsx:21` — se oculta con `opacity: 0` + `pointerEvents: none`, pero sigue siendo enfocable
por teclado (Tab llega a un botón invisible). Añadir `visibility: hidden` / `inert` o togglear
`tabIndex`.

---

## 2. Conversión y negocio (lo que más plata deja sobre la mesa)

### 🔴 2.1 No hay botón de WhatsApp en la web del estudio
Toda la propuesta de venta de los 6 proyectos gira alrededor de "convertir con WhatsApp"… pero
stonydev.com **no tiene** un CTA de WhatsApp propio. Es la mejora de conversión nº 1: botón
flotante (o en Contact y en el modal de proyectos) con mensaje precargado, y el resultado del
cotizador debería poder enviarse por WhatsApp además de por el formulario.

### 🟠 2.2 Falta prueba social real
No hay testimonios, logos de clientes ni casos con resultados medibles. Aunque los proyectos
sean conceptos, se puede: (a) etiquetarlos claramente como "concepto/demo" (hoy un visitante
puede creer que "Clínica Dental Sonrisa" es un cliente real — riesgo de credibilidad), y
(b) sumar una sección de testimonios en cuanto existan clientes reales.

### 🟠 2.3 Falta sección "Proceso de trabajo"
Para vender ticket alto a PyMEs conviene mostrar el camino: brief → propuesta → diseño →
desarrollo → lanzamiento → soporte, con plazos. Reduce fricción y objeciones.

### 🟠 2.4 Falta FAQ
Preguntas que todo cliente PyME hace: ¿cuánto demora?, ¿qué necesito tener?, ¿el sitio es mío?,
¿hay costos mensuales?, ¿hacen mantenimiento?, ¿formas de pago (¿se puede en UYU/cuotas?)?.
Además una FAQ con `FAQPage` schema ayuda al SEO.

### 🟡 2.5 Precios solo en USD
Mercado objetivo Uruguay/región: aclarar si son USD, si hay precio en UYU, y qué incluye
(hosting, dominio, mantenimiento). El cotizador dice "Sin costes ocultos" pero no menciona
costos recurrentes.

### 🟡 2.6 El botón "Verificar Presupuesto" no hace lo que promete
`BudgetCalculator.tsx:277-288` — en el último paso, "Verificar Presupuesto" solo scrollea a
contacto sin prefijar nada (a diferencia de "Enviar esta Cotización"). Unificar ambos flujos.

### 🟡 2.7 Demos sin camino de vuelta
Las demos en `/demos/*` se abren en pestaña nueva y no tienen ningún link/banner de vuelta a
stonydev.com. Añadir una barra discreta "Demo desarrollada por StonyDev — volver" convierte
cada demo compartida en un canal de captación.

### 🟢 2.8 Multi-idioma
Se vende "Multi-idioma Automatizado" como servicio (data.ts:215) pero la propia web es solo
español. Versión EN/PT opcional para credibilidad y captación regional.

### 🟢 2.9 Analytics
Se promete "Integración con sistemas analíticos" (data.ts:14) pero la web no mide nada.
Instalar Plausible/GA4/Vercel Analytics + eventos (clicks en CTA, pasos del cotizador,
aperturas de demos) para saber qué convierte.

---

## 3. Rendimiento

### 🔴 3.1 Bundle de 1.24 MB (285 KB gzip) por importar toda lucide-react
`Services.tsx:6`, `TechStack.tsx:6`, `BudgetCalculator.tsx:5` hacen
`import * as Icons from 'lucide-react'` y resuelven íconos por nombre en runtime → **las ~1500
iconos** entran al bundle y anulan el tree-shaking. Cambiar a imports nombrados con un mapa
explícito (`{ Globe, ShoppingBag, Cpu, Zap, … }`). Es el 70-80% del peso del JS; para una web
que vende "Score 95+ en PageSpeed" es la mejora más rentable.

### 🟠 3.2 Dependencias sin uso en package.json
`@google/genai`, `express`, `dotenv`, `motion` no se usan en ningún archivo de `src/`;
`autoprefixer` es innecesario con Tailwind 4, y `tsx`/`esbuild` tampoco se usan. Además el
paquete se llama `react-example` v0.0.0 (resto de la plantilla de AI Studio). Limpiar.

### 🟠 3.3 Fuentes bloqueando el render
`src/index.css:1` — `@import url(fonts.googleapis.com…)` dentro del CSS es render-blocking y
sin preconnect. Además se cargan 3 familias × muchos pesos (Inter 300-900, Space Grotesk 400-700,
JetBrains Mono 400-700) y: (a) los `h1-h4` definidos con Space Grotesk son pisados por la clase
`font-sans` que llevan casi todos los títulos (la utility gana), o sea **se descarga una fuente
display que casi no se ve**; (b) JetBrains Mono se usa en textos de 9-10px. Racionalizar a 1-2
familias con 3-4 pesos, mover a `<link rel="preconnect">` + `<link rel="stylesheet">` en el
HTML, o self-hostear con `@fontsource`.

### 🟠 3.4 Imágenes de Unsplash hotlinkeadas y sin optimizar
`data.ts` + tarjetas de `Projects.tsx:168` — sin `width/height` (provoca CLS), sin
`loading="lazy"`, sin `srcset`, dependiendo de un tercero. Self-hostear en `public/` (o
Cloudinary) en AVIF/WebP con dimensiones fijas.

### 🟡 3.5 Sin code-splitting
Todo en un chunk. Tras arreglar 3.1, separar `manualChunks` (react, gsap) y valorar
`React.lazy` para secciones bajo el fold (Projects/Calculator/Contact) — aunque con el bundle
arreglado quizá no haga falta.

### 🟡 3.6 Animaciones permanentes en background
Hero y TechStack corren tweens infinitos (`repeat: -1`) aunque la sección no esté visible.
Pausarlos con ScrollTrigger (`onLeave/onEnterBack`) ahorra CPU/batería en mobile.

### 🟢 3.7 Favicon y assets
Añadir `apple-touch-icon` y un favicon .png/.ico de respaldo (el SVG data-URI no funciona en
Safari viejo ni al guardar en home screen).

---

## 4. SEO

### 🟠 4.1 Faltan robots.txt y sitemap.xml
No existen en `public/`. Crear ambos (sitemap con la home; decidir si las demos se indexan —
ver 4.5).

### 🟠 4.2 Faltan og:image, twitter cards y canonical
`index.html` tiene OG básico pero sin `og:image` (el share en WhatsApp/redes — el canal que
más usa el público objetivo — sale sin imagen). Crear imagen social 1200×630, añadir
`twitter:card`, `twitter:title/description/image` y `<link rel="canonical">`.

### 🟡 4.3 JSON-LD mejorable
`index.html:16` — `"email":"mailto:stonykaizen@gmail.com"` (el prefijo `mailto:` no va en el
campo email). Añadir `logo`, `sameAs` (redes reales), y valorar `ProfessionalService`/
`LocalBusiness` con `areaServed` para SEO local UY, más `WebSite` schema.

### 🟡 4.4 SPA de una sola URL
Todo el sitio es una URL. Para posicionar "desarrollo web uruguay", "tienda online uruguay",
etc., conviene a mediano plazo tener páginas/rutas por servicio (aunque sea con prerender o
migrando a Astro/Next para contenido estático). Mientras tanto: los `<button>` del navbar
podrían ser `<a href="#servicios">` (semántica + funcionan sin JS).

### 🟡 4.5 Demos indexables con marcas ficticias
`/demos/*` tienen title, meta description y JSON-LD de negocios que no existen (con teléfonos
falsos). Google puede indexarlas y mostrar "Clínica Dental Sonrisa" como negocio real. Añadir
`<meta name="robots" content="noindex">` a las demos.

### 🟢 4.6 Contenido/Blog
Para el posicionamiento orgánico que se les vende a los clientes: artículos por nicho
("cuánto cuesta una web para clínica dental en Uruguay") — el mismo playbook que venden,
aplicado a sí mismos.

---

## 5. Accesibilidad

### 🟠 5.1 Tarjetas de proyecto no operables por teclado
`Projects.tsx:159-207` — `<div onClick>` sin `role="button"`, sin `tabIndex`, sin manejar
Enter/Espacio. Un usuario de teclado no puede abrir ningún proyecto. Convertir en `<button>` o
añadir semántica completa.

### 🟠 5.2 Modal sin semántica ni focus-trap
`Projects.tsx:212+` — falta `role="dialog"`, `aria-modal="true"`, `aria-labelledby`; el foco no
se mueve al modal al abrir ni se devuelve al cerrar, y Tab se escapa al fondo. (Esc y click
afuera sí funcionan ✓).

### 🟠 5.3 Sin `prefers-reduced-motion`
Ninguna animación GSAP (parallax, floating, reveals) respeta la preferencia de movimiento
reducido. Envolver con `gsap.matchMedia()` y `(prefers-reduced-motion: no-preference)`;
igualmente los `scrollIntoView({behavior:'smooth'})`.

### 🟡 5.4 Tipografías de 8-10px
Abundan `text-[8px]`, `text-[9px]`, `text-[10px]` (badges, labels, chips). Por debajo de ~12px
es ilegible para mucha gente. Subir los mínimos.

### 🟡 5.5 Contraste bajo
`text-zinc-500`/`text-slate-500` sobre `#030303` ronda 4:1 o menos en textos pequeños; los
placeholders `placeholder-zinc-600` quedan casi invisibles. Verificar WCAG AA (se vende
"Mejora de accesibilidad (WCAG)" como servicio — data.ts:54 — hay que predicar con el ejemplo).

### 🟡 5.6 Menú móvil sin estados ARIA
`Navbar.tsx:103-108` — el botón hamburguesa no tiene `aria-label`, `aria-expanded` ni
`aria-controls`; el panel no se cierra con Esc ni al tocar fuera.

### 🟢 5.7 Íconos decorativos sin ocultar
Los `lucide-react` decorativos deberían llevar `aria-hidden="true"`; los links de redes
necesitan `aria-label` ("GitHub de StonyDev", etc.).

---

## 6. UX / UI

### 🟡 6.1 El hero en móvil gasta 440px en decoración
`Hero.tsx:196` — el "playground" de tarjetas flotantes ocupa media pantalla móvil y el efecto
parallax (mouse) no existe en touch. Ocultarlo o compactarlo en `< lg` para que el CTA quede
above the fold.

### 🟡 6.2 Filtros de proyectos confusos
Las categorías internas (`frontend`, `design`…) se mapean a etiquetas de marketing ("Websites
& PWA", "Interactivo & UI") que no coinciden con los tipos de negocio mostrados (dental,
barbería…). Para el público PyME sería más útil filtrar por nicho/objetivo (reservas, catálogo,
leads) o directamente quitar filtros con solo 6 items.

### 🟡 6.3 Barras de "% de habilidad" (TechStack)
Los medidores de 82-96% son autoevaluaciones sin significado para un cliente. Reemplazar por
algo tangible (años usándola, nº de proyectos) o por un grid simple de logos/tecnologías.

### 🟢 6.4 Estado del cotizador se pierde
Si el usuario scrollea y vuelve, bien (state en memoria), pero al recargar se pierde todo.
Persistir en `sessionStorage` es barato y mejora conversión.

### 🟢 6.5 Año del footer hardcodeado
`Contact.tsx:298` "© 2026" — usar `new Date().getFullYear()`.

### 🟢 6.6 Textos en inglés en las tarjetas del hero
"Interactive Preview", "Active Skill", "Carga Optimizada" mezclado con "engine_v2.js" — decidir
idioma consistente para el detalle decorativo.

---

## 7. Calidad de código y arquitectura

### 🟠 7.1 Sin ESLint ni Prettier
Hay comentarios `eslint-disable` (`BudgetCalculator.tsx:102`, `Services.tsx:49`…) pero ESLint
no está instalado ni configurado; `npm run lint` solo corre `tsc`. Añadir ESLint (flat config +
react-hooks + jsx-a11y) y Prettier, y un script `lint` real.

### 🟠 7.2 Sin CI
No hay GitHub Actions: nada corre build/typecheck en cada push. Un workflow mínimo
(install → tsc → build) previene romper `main`.

### 🟡 7.3 Datos hardcodeados dispersos
`PARTNERS` vive dentro de `Team.tsx` mientras el resto de datos está en `data.ts`; los mapeos
de categoría→etiqueta están duplicados en `Projects.tsx:193` y `:298`. Centralizar en
`data.ts`/`types.ts`.

### 🟡 7.4 Email de contacto repetido en 3 lugares
`index.html` (JSON-LD), `Contact.tsx` (2 veces). Extraer constantes de sitio
(email, dominio, redes, WhatsApp) a un `config.ts` único.

### 🟡 7.5 Manipulación directa del DOM desde React
Además del bug 1.2: `document.querySelector('.back-to-top')` (`App.tsx:19`), scroll por
`document.getElementById` en 6 componentes. Funciona, pero un helper `scrollToId()` compartido
+ refs reduciría duplicación (el mismo snippet copiado 8 veces).

### 🟡 7.6 `renderIcon` con `as any` duplicado en 3 componentes
Mismo helper copiado en Services/TechStack/BudgetCalculator. Extraer a un componente
`<DynamicIcon>` tipado con el mapa de íconos de 3.1 (resuelve bundle y duplicación a la vez).

### 🟢 7.7 README de plantilla de AI Studio
`README.md` habla de "Run and deploy your AI Studio app" con banner de Gemini; `metadata.json`
declara `MAJOR_CAPABILITY_SERVER_SIDE_GEMINI_API` que no se usa. Reescribir README con el
proyecto real (setup, scripts, deploy) y limpiar metadata.

### 🟢 7.8 Sin ErrorBoundary
Un error de runtime en cualquier componente deja la página en negro. Añadir un ErrorBoundary
raíz con fallback con el email/WhatsApp de contacto.

### 🟢 7.9 Comentarios de numeración desfasada
`App.tsx:70-73` — dos secciones comentadas como "4.". Trivial.

---

## 8. Infraestructura y despliegue

### 🟠 8.1 Cabeceras de seguridad
Configurar en el hosting (p. ej. `vercel.json`): `Content-Security-Policy`,
`X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy`,
`Strict-Transport-Security`. Hoy no hay ninguna configuración de headers en el repo.

### 🟡 8.2 Caché de assets
Asegurar `Cache-Control: immutable` para `/assets/*` con hash y no-cache para `index.html`
(config del hosting).

### 🟡 8.3 Dominio y redirecciones
Verificar www → apex (o viceversa), y que las demos respondan también sin trailing slash
(`/demos/dental` → `/demos/dental/`).

### 🟢 8.4 Monitoreo
Uptime monitor (UptimeRobot/BetterStack) + Search Console + Web Vitals reales (CrUX) — otra
vez: es lo que se les vende a los clientes.

---

## 9. Demos (`public/demos/*`)

- 🟡 **9.1** Añadir `noindex` (ver 4.5) y una nota visible "Demo conceptual de StonyDev" — hoy
  parecen negocios reales con teléfonos `+59899000001` inventados.
- 🟡 **9.2** Banner/backlink hacia stonydev.com (ver 2.7).
- 🟢 **9.3** Cada demo carga Google Fonts propio; podrían compartir/self-hostear.
- 🟢 **9.4** Los CTA de WhatsApp de las demos apuntan a números ficticios — está bien para la
  simulación, pero valorar que apunten al WhatsApp de StonyDev con mensaje "vi la demo de X".
- 🟢 **9.5** El iframe del modal escala con el hack `width:285% / scale(0.351)` — funciona,
  pero fijar el tamaño con `aspect-ratio` y variables evita descuadres si cambia el layout.

---

## Top 10 — orden de ataque recomendado

| # | Mejora | Impacto | Esfuerzo |
|---|--------|---------|----------|
| 1 | Formulario que envíe de verdad (1.1) | Leads dejan de perderse | Medio |
| 2 | Botón/CTA de WhatsApp del estudio (2.1) | Conversión directa | Bajo |
| 3 | Arreglar cotizador → contacto (1.2) | Flujo principal roto | Bajo |
| 4 | Imports nombrados de lucide-react (3.1) | −70% de bundle | Bajo |
| 5 | Links de redes reales + quitar links muertos (1.3, 1.4) | Credibilidad | Bajo |
| 6 | og:image + twitter cards + canonical (4.2) | Shares con imagen | Bajo |
| 7 | robots.txt + sitemap + noindex demos (4.1, 4.5) | SEO básico | Bajo |
| 8 | Unificar voz plural del estudio (1.5) | Coherencia de marca | Bajo |
| 9 | Accesibilidad de proyectos/modal/teclado (5.1, 5.2) | UX + WCAG que se predica | Medio |
| 10 | Fuentes optimizadas + imágenes self-hosted (3.3, 3.4) | PageSpeed real 95+ | Medio |
