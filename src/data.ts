import { Project, Service, TechItem, CalculatorStep } from './types';

export const SERVICES: Service[] = [
  {
    id: 'corporativo',
    icon: 'Globe',
    title: 'Sitios Web de Alto Impacto',
    description: 'Diseño y desarrollo web corporativo ultra veloz, optimizado para posicionamiento en Google (SEO) y diseñado para convertir visitas en clientes reales.',
    features: [
      'Diseño UX/UI totalmente personalizado',
      'Animaciones fluidas con GSAP y transiciones interactivas',
      'Optimización de velocidad (Score 95+ en PageSpeed)',
      'Diseño adaptativo (Responsive) de primer nivel',
      'Integración con sistemas analíticos'
    ],
    basePrice: 1200
  },
  {
    id: 'ecommerce',
    icon: 'ShoppingBag',
    title: 'E-Commerce de Nueva Generación',
    description: 'Tiendas online robustas y seguras con experiencias de compra intuitivas, pasarelas de pago integradas y paneles de administración autogestionables.',
    features: [
      'Checkout optimizado en un solo paso',
      'Sincronización de inventario en tiempo real',
      'Integración de pagos (Stripe, PayPal, MercadoPago)',
      'Panel de administración amigable',
      'Notificaciones automatizadas por email/WhatsApp'
    ],
    basePrice: 2200
  },
  {
    id: 'saas',
    icon: 'Cpu',
    title: 'Aplicaciones Web & SaaS',
    description: 'Soluciones de software personalizadas en la nube para automatizar procesos de negocio, gestionar datos complejos o lanzar tu propio producto digital.',
    features: [
      'Arquitectura robusta con React y Node.js',
      'Autenticación de usuarios segura y roles',
      'Bases de datos en tiempo real y almacenamiento en la nube',
      'Dashboards interactivos con gráficos (Recharts)',
      'APIs escalables e integraciones de terceros'
    ],
    basePrice: 3500
  },
  {
    id: 'opt',
    icon: 'Zap',
    title: 'Optimización & Rediseño',
    description: 'Transformo sitios web lentos y desactualizados en plataformas modernas de alto rendimiento, aplicando las mejores prácticas de desarrollo.',
    features: [
      'Migración a tecnologías web modernas',
      'Reducción drástica del tiempo de carga',
      'Mejora de accesibilidad (WCAG) y SEO técnico',
      'Auditoría y corrección de brechas de seguridad',
      'Refactorización de código limpio'
    ],
    basePrice: 800
  }
];

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Nova - eCommerce de Moda Premium',
    description: 'Tienda de alta gama con carga instantánea, transiciones GSAP líquidas y personalizador de prendas en tiempo real.',
    category: 'ecommerce',
    tags: ['Next.js', 'GSAP', 'Tailwind CSS', 'Stripe'],
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800',
    details: 'Nova es un concepto de tienda en línea de lujo donde cada animación acompaña el viaje del comprador. Diseñada para priorizar la fluidez visual, reduciendo las fricciones de carga tradicionales.',
    features: [
      'Transiciones de página fluidas sin recarga de pantalla',
      'Visualizador interactivo de tallas y colores',
      'Pasarela de pago Stripe integrada en entorno seguro',
      'Dashboard del cliente para rastreo de compras'
    ],
    techStack: ['Next.js', 'React', 'GSAP', 'Tailwind CSS', 'Framer Motion', 'Stripe API'],
    duration: '6 semanas'
  },
  {
    id: '2',
    title: 'Krypton - Dashboard Analytics Web3',
    description: 'Dashboard financiero de alta fidelidad que visualiza flujos de liquidez, analíticas de portafolio e interacciones blockchain.',
    category: 'fullstack',
    tags: ['React', 'D3.js', 'TypeScript', 'Tailwind'],
    image: 'https://images.unsplash.com/photo-1642104704074-907c0698cbd9?auto=format&fit=crop&q=80&w=800',
    details: 'Un centro financiero interactivo que procesa grandes volúmenes de datos. Las animaciones GSAP se sincronizan con las actualizaciones en vivo para ofrecer una experiencia intuitiva al usuario.',
    features: [
      'Gráficos dinámicos con renderizado interactivo',
      'Actualización en tiempo real de cotizaciones',
      'Exportación de informes analíticos en PDF y CSV',
      'Tematización personalizada de contraste alto'
    ],
    techStack: ['React', 'TypeScript', 'D3.js', 'Tailwind CSS', 'GSAP', 'Node.js'],
    duration: '8 semanas'
  },
  {
    id: '3',
    title: 'Aura - CMS para Creadores de Contenido',
    description: 'Plataforma headless autogestionable con editor visual interactivo en tiempo real y optimización de SEO automatizada.',
    category: 'frontend',
    tags: ['React', 'GSAP', 'Tailwind CSS', 'Vite'],
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800',
    details: 'Una herramienta ágil para redactores y diseñadores que simplifica la creación de blogs y landings de manera visual, con soporte completo para metaetiquetas dinámicas.',
    features: [
      'Editor drag-and-drop con previsualización fidedigna',
      'Exportación instantánea a estáticos HTML/Markdown',
      'Sugerencias inteligentes de palabras clave',
      'Gestor de assets multimedia integrado'
    ],
    techStack: ['React', 'Vite', 'GSAP', 'Tailwind CSS', 'LocalForage'],
    duration: '4 semanas'
  },
  {
    id: '4',
    title: 'Zenith - App de Bienestar Colectivo',
    description: 'Aplicación web progresiva (PWA) de mindfulness con temporizadores inmersivos y audio sintetizado espacialmente.',
    category: 'design',
    tags: ['PWA', 'React', 'Web Audio API', 'GSAP'],
    image: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&q=80&w=800',
    details: 'Zenith combina ritmos respiratorios guiados visualmente mediante círculos interactivos en GSAP con paisajes sonoros personalizados en base al estado de ánimo del usuario.',
    features: [
      'Ciclos de respiración sincronizados con transiciones de color',
      'Motor de sonido interactivo mediante Web Audio API',
      'Soporte completo sin conexión (Service Worker)',
      'Registro histórico y racha de hábitos'
    ],
    techStack: ['React', 'GSAP', 'Tailwind CSS', 'Web Audio API', 'Workbox PWA'],
    duration: '5 semanas'
  }
];

export const TECH_STACK: TechItem[] = [
  { name: 'React', category: 'frontend', iconName: 'ReactIcon', level: 95, color: '#61DAFB' },
  { name: 'TypeScript', category: 'frontend', iconName: 'Code', level: 90, color: '#3178C6' },
  { name: 'Next.js', category: 'frontend', iconName: 'Layers', level: 88, color: '#FFFFFF' },
  { name: 'GSAP Animation', category: 'frontend', iconName: 'Sparkles', level: 92, color: '#88CE02' },
  { name: 'Tailwind CSS', category: 'frontend', iconName: 'Palette', level: 96, color: '#38BDF8' },
  { name: 'Node.js', category: 'backend', iconName: 'Server', level: 85, color: '#339933' },
  { name: 'Express / Fastify', category: 'backend', iconName: 'Cpu', level: 87, color: '#000000' },
  { name: 'PostgreSQL', category: 'backend', iconName: 'Database', level: 82, color: '#4169E1' },
  { name: 'Git & GitHub', category: 'tools', iconName: 'GitBranch', level: 90, color: '#F05032' },
  { name: 'Figma (Design)', category: 'tools', iconName: 'Figma', level: 80, color: '#F24E1E' }
];

export const CALCULATOR_STEPS: CalculatorStep[] = [
  {
    id: 'tipo',
    title: '¿Qué tipo de proyecto necesitas?',
    description: 'Selecciona la categoría que mejor define tu idea de negocio.',
    options: [
      { id: 'landing', label: 'Landing Page / One-Page', description: 'Ideal para promocionar un producto, evento o servicio específico de forma directa.', cost: 600, icon: 'Layout' },
      { id: 'corporativo', label: 'Sitio Web Corporativo', description: 'Web institucional multi-página para dar a conocer tu empresa y captar leads.', cost: 1200, icon: 'Globe' },
      { id: 'ecommerce', label: 'Tienda en Línea (E-Commerce)', description: 'Plataforma para vender productos físicos o digitales con carrito de compras.', cost: 2200, icon: 'ShoppingBag' },
      { id: 'saas', label: 'Aplicación Web / SaaS', description: 'Desarrollo de software a medida, bases de datos e integraciones complejas.', cost: 3500, icon: 'Cpu' }
    ]
  },
  {
    id: 'diseno',
    title: 'Nivel de personalización visual',
    description: 'El diseño influye directamente en la retención del usuario.',
    options: [
      { id: 'clean', label: 'Limpio y Funcional', description: 'Basado en layouts probados de conversión, tipografía cuidada y pocos elementos visuales complejos.', cost: 0, icon: 'FileText' },
      { id: 'premium', label: 'Premium e Interactivo', description: 'Identidad visual personalizada, animaciones interactivas GSAP, y diseño de componentes únicos.', cost: 400, icon: 'Sparkles' },
      { id: 'immersive', label: 'Experiencia Inmersiva de Lujo', description: 'Micro-interacciones avanzadas, efectos 3D sutiles, transiciones líquidas y narrativa interactiva completa.', cost: 1000, icon: 'Flame' }
    ]
  },
  {
    id: 'integraciones',
    title: '¿Qué integraciones especiales requieres?',
    description: 'Añade funcionalidades clave para enriquecer la experiencia de tus usuarios.',
    options: [
      { id: 'auth', label: 'Autenticación de Usuarios', description: 'Registro con Google, email, perfiles y panel de cliente privado.', cost: 300, icon: 'Users' },
      { id: 'pagos', label: 'Pasarela de Pagos Avanzada', description: 'Suscripciones mensuales, pagos recurrentes e internacionalización monetaria.', cost: 450, icon: 'CreditCard' },
      { id: 'multi', label: 'Multi-idioma Automatizado', description: 'Soporte completo para traducción de contenidos dinámicos (Español/Inglés/Portugués).', cost: 250, icon: 'Languages' },
      { id: 'ai', label: 'Asistente de IA (Gemini)', description: 'Chatbots inteligentes, autogeneración de informes o resúmenes automatizados.', cost: 500, icon: 'Bot' }
    ]
  }
];
