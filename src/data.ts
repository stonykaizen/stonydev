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
    title: 'Clínica Dental Sonrisa — Turnos que se llenan solos',
    description: 'Sitio para clínica odontológica orientado a tratamientos de ticket alto (implantes, ortodoncia) captados por SEO local, sin pauta.',
    category: 'frontend',
    tags: ['SEO Local', 'WhatsApp', 'React', 'Ticket Alto'],
    image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=800',
    details: 'Por qué este nicho: un solo implante o tratamiento de ortodoncia captado por Google paga el sitio completo. La demanda ya existe ("dentista cerca de mí") — no hay que crearla con publicidad, solo capturarla con SEO local y convertirla con reserva inmediata por WhatsApp.',
    features: [
      'Landing por tratamiento (implantes, ortodoncia, blanqueamiento) para posicionar cada búsqueda',
      'Botón de turno directo por WhatsApp con mensaje precargado',
      'Integración con Google Business Profile y reseñas',
      'Schema.org de negocio médico local para destacar en Maps'
    ],
    techStack: ['React', 'Vite', 'Tailwind CSS', 'GSAP', 'Schema.org', 'WhatsApp API'],
    duration: '2 semanas'
  },
  {
    id: '2',
    title: 'Cabañas del Río — Reservas directas sin comisiones',
    description: 'Motor de reservas propio para complejo turístico: cada reserva directa ahorra el 15-25% que se llevan Booking y Airbnb.',
    category: 'fullstack',
    tags: ['Booking Engine', 'Node.js', 'MercadoPago', 'Cero Comisión'],
    image: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&q=80&w=800',
    details: 'Por qué este nicho: los complejos ya pagan hasta un cuarto de su facturación en comisiones de portales. Un motor de reservas propio se amortiza en pocas reservas y el huésped que ya conoce el lugar reserva directo — retorno inmediato sin gastar un peso en publicidad.',
    features: [
      'Calendario de disponibilidad en tiempo real con señas por MercadoPago',
      'Recordatorios y confirmaciones automáticas por WhatsApp/email',
      'Galería inmersiva con tour visual de cada cabaña',
      'Panel de gestión de tarifas por temporada'
    ],
    techStack: ['React', 'Node.js', 'PostgreSQL', 'MercadoPago API', 'GSAP', 'Resend'],
    duration: '4 semanas'
  },
  {
    id: '3',
    title: 'Barbería Norte — Agenda online con clientes recurrentes',
    description: 'Agenda self-service con recordatorios automáticos: menos huecos, menos ausencias y clientes que vuelven todos los meses.',
    category: 'design',
    tags: ['Agenda Online', 'PWA', 'Recurrencia', 'Recordatorios'],
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=800',
    details: 'Por qué este nicho: el cliente de barbería vuelve cada 3-4 semanas — el valor está en la recurrencia, no en captar tráfico nuevo. Con agenda online y recordatorios automáticos se reducen las ausencias y se llenan los huecos, todo con la clientela que ya existe: inversión publicitaria cero.',
    features: [
      'Reserva de turno en 3 toques desde el celular (PWA instalable)',
      'Recordatorio automático 24h antes que reduce ausencias',
      'Perfil por barbero con horarios y servicios propios',
      'Historial de cortes y re-reserva en un toque'
    ],
    techStack: ['React', 'PWA', 'Tailwind CSS', 'GSAP', 'Node.js', 'Twilio/WhatsApp'],
    duration: '3 semanas'
  },
  {
    id: '4',
    title: 'Corralón Central — Catálogo B2B con pedidos por WhatsApp',
    description: 'Catálogo online para clientes de obra que repiten pedido todas las semanas: ticket alto y recurrente, sin un peso de pauta.',
    category: 'ecommerce',
    tags: ['B2B', 'Catálogo', 'WhatsApp', 'Pedidos Recurrentes'],
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80&w=800',
    details: 'Por qué este nicho: el corralón ya tiene la clientela — constructores que piden todas las semanas por teléfono. Digitalizar el pedido (catálogo + carrito que se envía por WhatsApp) baja la fricción, aumenta el ticket promedio y fideliza al cliente de obra sin necesidad de captar tráfico pago.',
    features: [
      'Catálogo con precios por volumen y stock visible',
      'Carrito que genera el pedido armado directo al WhatsApp del vendedor',
      'Lista de "pedido habitual" para repetir compras en un toque',
      'Panel simple para actualizar precios y stock sin conocimientos técnicos'
    ],
    techStack: ['React', 'Vite', 'Tailwind CSS', 'Node.js', 'WhatsApp API', 'SQLite'],
    duration: '3 semanas'
  },
  {
    id: '5',
    title: 'Estudio Jurídico Ferreira — Leads de altísimo valor',
    description: 'Sitio institucional para estudio jurídico: una sola consulta captada por Google puede pagar el sitio varias veces.',
    category: 'frontend',
    tags: ['SEO Local', 'Leads', 'Autoridad', 'Ticket Alto'],
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800',
    details: 'Por qué este nicho: los servicios jurídicos tienen el lead más caro del mercado publicitario — pero quien busca "abogado laboral" en Google ya necesita uno ahora. Un sitio con autoridad, casos de éxito y consulta directa captura esa demanda orgánica sin competir en subastas de anuncios.',
    features: [
      'Página por área de práctica (laboral, civil, familia) para SEO específico',
      'Formulario de consulta breve + WhatsApp directo con abogado',
      'Sección de casos y artículos que construyen autoridad orgánica',
      'Schema.org LegalService para resultados enriquecidos en Google'
    ],
    techStack: ['React', 'Vite', 'Tailwind CSS', 'GSAP', 'Schema.org', 'Resend'],
    duration: '2 semanas'
  },
  {
    id: '6',
    title: 'Veterinaria del Este — Recordatorios que generan visitas',
    description: 'Plataforma con historial de mascotas y recordatorios de vacunas: cada aviso automático es una consulta que vuelve sola.',
    category: 'fullstack',
    tags: ['Recordatorios', 'CRM', 'Recurrencia', 'WhatsApp'],
    image: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&q=80&w=800',
    details: 'Por qué este nicho: cada mascota necesita vacunas y controles todos los años, pero la mayoría de los dueños simplemente se olvida. Un recordatorio automático por WhatsApp en la fecha justa trae la visita sin ningún costo de captación — ingresos recurrentes activados por software, no por publicidad.',
    features: [
      'Ficha e historial clínico digital por mascota',
      'Recordatorios automáticos de vacunas y antiparasitarios por WhatsApp',
      'Agenda de turnos online con urgencias destacadas',
      'Reportes de visitas recurrentes generadas por recordatorio'
    ],
    techStack: ['React', 'Node.js', 'PostgreSQL', 'WhatsApp API', 'Tailwind CSS', 'GSAP'],
    duration: '4 semanas'
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
