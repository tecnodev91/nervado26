/**
 * Configuración central del sitio — editá aquí textos, contacto y productos.
 */

export const site = {
  name: 'Nervado 26',
  tagline: 'Materiales de construcción',
  description:
    'Empresa dedicada a la venta de materiales de construcción con atención cercana, calidad garantizada y asesoramiento para cada etapa de tu obra.',
};

/** Logos en /public/images/logos/ */
export const brand = {
  /** Logo blanco/naranja para navbar naranja */
  logoNavbar: '/images/logos/logo-nav-color.webp',
  /** Logo negro horizontal — fondos claros */
  logoPrincipal: '/images/logos/nervado-negro.webp',
  /** Logo apilado negro (aplicacionnervadonegro) */
  logoApiladoNegro: '/images/logos/nervado-negro.webp',
  /** Versión blanca — footer */
  logoWhite: '/images/logos/logo-footer-white.webp',
  /** Logo footer — 320px, generado con npm run optimize-images */
  logoFooterWhite: '/images/logos/logo-footer-white.webp',
  /** Logo apilado color (aplicacionnervsdocolor) — Nervado naranja + 26 lavanda */
  logoColor: '/images/logos/aplicacion-nervado-color.webp',
  /** Logo navbar — 480px, generado con npm run optimize-images */
  logoNavColor: '/images/logos/logo-nav-color.webp',
  /** Logo horizontal negro */
  logoNegro: '/images/logos/nervado-negro.webp',
};

export const contact = {
  /** Formato internacional sin + ni espacios — relevamiento: 261 551-9211 */
  whatsapp: '5492615519211',
  whatsappDisplay: '+54 9 261 551-9211',
  /** Mensaje predefinido al pedir presupuesto desde la web */
  whatsappBudgetMessage:
    '¡Hola! Vengo de la web de Nervado 26 y quisiera solicitar un presupuesto.',
  /** Prefijo para consultas de productos desde la web */
  whatsappProductPrefix: '¡Hola! Vengo de la web.',
  phone: '+542615519211',
  phoneDisplay: '261 551-9211',
  emails: [
    { label: 'Información', address: 'info@nervado26.com.ar' },
    { label: 'Ventas', address: 'ventas@nervado26.com.ar' },
    { label: 'Administración', address: 'administracion@nervado26.com.ar' },
  ],
  /** Correo principal (footer y atajos) */
  email: 'info@nervado26.com.ar',
  address: 'Independencia 650, Godoy Cruz, Mendoza',
  addressNote: 'Cerca del Puerto Seco y Mercado Cooperativo de Godoy Cruz',
  mapsUrl: 'https://maps.app.goo.gl/NoBKPTjixeZnQRHTA',
  mapsEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3348.5322284063823!2d-68.8277225245331!3d-32.93695497359726!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x967e0bccd6db40ed%3A0x3f5d5c6b3718f4d4!2sNervado%2026!5e0!3m2!1ses-419!2sar!4v1782827258327!5m2!1ses-419!2sar',
  hours: {
    title: 'Horarios de atención',
    schedules: [
      {
        label: 'Área Comercial, Técnica y Logística',
        days: 'Lunes a viernes',
        time: '08:30 a 17:00 hs.',
      },
      {
        label: 'Guardia Comercial',
        days: 'Sábados',
        time: '08:30 a 12:30 hs.',
      },
    ],
    advisory: {
      label: 'Asesoramiento profesional para proyectos',
      description: 'Coordiná una reunión con nuestro equipo técnico por',
      whatsappMessage: 'Hola, quiero coordinar una reunión de asesoramiento profesional.',
    },
    note: 'Nuestro equipo se encuentra disponible para asesorarte y acompañarte en cada etapa de tu proyecto.',
  },
  preview: {
    label: 'Contacto',
    title: 'Estamos para ayudarte',
    description:
      'Conocé nuestros canales de atención, horarios y ubicación para coordinar tu consulta.',
    cta: 'Ver contacto',
  },
  page: {
    label: 'Hablemos',
    title: 'Contacto',
    description:
      'Comunicate con Nervado 26 para consultar materiales, solicitar presupuestos o coordinar asesoramiento para tu proyecto.',
    finalCta: {
      title: '¿Necesitás presupuesto para tu obra?',
      button: 'Contáctanos',
    },
  },
  social: {
    instagram: 'https://instagram.com/nervado26',
    facebook: 'https://www.facebook.com/profile.php?id=61588884977270',
  },
};

export const navLinks = [
  { label: 'Inicio', to: '/#inicio', sectionId: 'inicio' },
  { label: 'Nosotros', to: '/nosotros', isPage: true, sectionId: 'nosotros' },
  { label: 'Productos', to: '/productos', isPage: true, sectionId: 'productos' },
  { label: 'Servicios', to: '/servicios', isPage: true, sectionId: 'servicios' },
  { label: 'Preguntas frecuentes', to: '/#faq', sectionId: 'faq' },
  { label: 'Contacto', to: '/contacto', isPage: true, sectionId: 'contacto' },
];

export const productsPage = {
  label: 'Productos / materiales',
  title: 'Materiales principales',
  description:
    'Hierros, perfiles, mallas, caños y más. Consultá medidas y pedí presupuesto por WhatsApp.',
  preview: {
    title: '¿Qué necesita tu obra?',
    lead: 'Hierros, perfiles, mallas, caños y más — con medidas listas para consultar.',
  },
  catalog: {
    title: 'Catálogo de materiales',
    lead: 'Filtra por tipo, revisa medidas y fichas técnicas. Consultá stock y precio por WhatsApp.',
  },
  /** Milisegundos entre cada material en el carrusel del home */
  carouselInterval: 5500,
  /** Slugs mostrados en el carrusel del home (catálogo completo en /productos) */
  featuredSlugs: [
    'hierros-nervados-de-construccion',
    'mallas-sima',
    'cemento',
    'canos-redondos',
    'perfiles-w',
    'perfiles-c',
    'ripio',
    'arena',
    'ladrillos',
    'placas-de-yeso',
    'montantes',
    'angulos',
  ],
  moreCta: {
    title: 'Encontrá el material que necesitás',
    description:
      'Revisá productos, medidas disponibles y consultá directamente por WhatsApp.',
    button: 'Ver catálogo completo',
  },
};

export const hero = {
  headline: {
    lead: 'Construí con',
    accent: 'solidez',
  },
  subheadline:
    'Hierro, acero, cemento y todo lo que tu obra necesita. Asesoramiento personalizado y entrega confiable.',
  cta: 'Pedí tu presupuesto',
  /** Atajos del hero — enlazan al catálogo con filtro (?grupo=...) */
  quickLinks: [
    {
      label: 'Hierro',
      to: '/productos?grupo=hierros-nervados,hierros-lisos,angulos,planchuelas,alambres,mallas,clavos',
    },
    {
      label: 'Acero',
      to: '/productos?grupo=canos,perfiles,chapas',
    },
    {
      label: 'Cemento',
      to: '/productos?grupo=cemento',
    },
  ],
  /** Imagen principal del hero (marca + hierros) */
  image: '/images/vista_principal/principal.webp',
  imageWebp: '/images/vista_principal/principal.webp',
  imageWidth: 743,
  imageHeight: 605,
  /** @deprecated Usar `image`. Se mantiene por compatibilidad. */
  images: ['/images/vista_principal/principal.webp'],
  /** Milisegundos entre cada imagen (solo si hay carrusel en hero) */
  slideInterval: 3000,
};

export const stats = {
  label: 'Trayectoria',
  title: 'NÚMEROS QUE NOS RESPALDAN',
  items: [
    { value: 7400, label: 'Toneladas comercializadas' },
    { value: 450, label: 'Clientes atendidos' },
    { value: 320, label: 'Proyectos acompañados' },
    { value: 25, label: 'Proveedores estratégicos' },
    { value: 20, label: 'Profesionales y colaboradores' },
  ],
  cta: '¿Querés conocer nuestros servicios?',
};

export const services = {
  label: 'Servicios',
  title: 'Cómo te acompañamos',
  subtitle:
    'Soluciones para obra, provisión de materiales y acompañamiento técnico en cada etapa del proyecto.',
  tabs: {
    distributor: 'Distribuidora de materiales',
    engineering: 'Ingeniería y proyectos',
  },
  comparisonTable: {
    columns: ['Área', 'Ideal para', 'Incluye'],
    rows: [
      {
        area: 'Distribuidora de materiales',
        idealFor: 'Obras, empresas y clientes que necesitan materiales',
        includes: 'Cotización, abastecimiento, logística y seguimiento',
        tab: 'distributor',
      },
      {
        area: 'Ingeniería y proyectos',
        idealFor: 'Viviendas, ampliaciones, galpones y desarrollos',
        includes: 'Diseño, factibilidad, cómputo, revisión y acompañamiento',
        tab: 'engineering',
      },
    ],
  },
  distributor: {
    label: 'Distribuidora',
    title: 'Servicios de la distribuidora',
    items: [
      {
        icon: 'logistics',
        title: 'Logística y abastecimiento eficiente',
        description:
          'Coordinamos entregas en tiempo y forma, entendiendo la importancia que tienen los plazos y la continuidad de una obra.',
      },
      {
        icon: 'quote',
        title: 'Cotizaciones y atención personalizada',
        description:
          'Brindamos respuestas ágiles y acompañamiento comercial desde la consulta inicial hasta la concreción de cada operación.',
      },
      {
        icon: 'postventa',
        title: 'Seguimiento y servicio postventa',
        description:
          'Nuestro compromiso continúa después de la entrega. Realizamos un seguimiento para conocer la experiencia del cliente y continuar aportando soluciones para las siguientes etapas del proyecto.',
      },
      {
        icon: 'integral',
        title: 'Soluciones integrales para constructoras e industrias',
        description:
          'Desarrollamos propuestas de abastecimiento adaptadas a las necesidades específicas de cada cliente y de cada obra.',
      },
    ],
  },
  engineering: {
    label: 'Ingeniería y arquitectura',
    title: 'Servicios de ingeniería y arquitectura',
    badge: 'Una sección diferencial y exclusiva',
    headline: 'Convertimos ideas en proyectos.',
    intro:
      'Gracias al respaldo de nuestra desarrolladora y constructora, ponemos a disposición de nuestros clientes un equipo de arquitectos e ingenieros civiles para acompañarlos desde las primeras etapas de una idea hasta su ejecución.',
    items: [
      {
        title: 'Diseño y planificación de proyectos',
        description:
          'Asesoramiento para viviendas, ampliaciones, edificios, desarrollos inmobiliarios, naves industriales y proyectos comerciales.',
        image: '/images/STOCK SERVICIOS/1.webp',
      },
      {
        title: 'Anteproyectos y análisis de factibilidad',
        description:
          'Evaluación técnica y económica para transformar una idea en un proyecto viable.',
        image: '/images/STOCK SERVICIOS/2.webp',
      },
      {
        title: 'Cómputo y presupuesto de materiales',
        description:
          'Determinación de cantidades y especificaciones para optimizar recursos y reducir costos.',
        image: '/images/STOCK SERVICIOS/3.webp',
      },
      {
        title: 'Revisión y optimización de proyectos existentes',
        description:
          'Análisis técnico para mejorar la eficiencia constructiva y detectar oportunidades de optimización.',
        image: '/images/STOCK SERVICIOS/4.webp',
      },
      {
        title: 'Metodologías ágiles y Lean Construction',
        description:
          'Aplicamos herramientas de gestión y mejora continua para lograr proyectos más eficientes y ordenados.',
        image: '/images/STOCK SERVICIOS/5.webp',
      },
      {
        title: 'Acompañamiento durante la ejecución',
        description:
          'Seguimiento profesional para asegurar calidad, planificación y cumplimiento de objetivos.',
        image: '/images/STOCK SERVICIOS/6.webp',
      },
      {
        title: 'Consultoría para inversores y desarrolladores',
        description:
          'Asesoramiento para emprendimientos inmobiliarios, centros comerciales, edificios y proyectos de mayor escala.',
        image: '/images/STOCK SERVICIOS/7.webp',
      },
      {
        title: 'Beneficios exclusivos',
        description:
          'Los clientes que contraten nuestros servicios profesionales accederán a condiciones preferenciales y valores diferenciales en la compra de materiales comercializados por Nervado 26.',
        image: '/images/STOCK SERVICIOS/8.webp',
        highlight: true,
      },
    ],
  },
};

export const values = {
  title: 'Valores',
  items: [
    { label: 'Compromiso', icon: 'compromiso' },
    { label: 'Innovación', icon: 'innovacion' },
    { label: 'Calidad', icon: 'calidad' },
    { label: 'Confianza', icon: 'confianza' },
    { label: 'Mejora continua', icon: 'mejora' },
    { label: 'Trabajo en equipo', icon: 'equipo' },
    { label: 'Cercanía', icon: 'cercania' },
    { label: 'Responsabilidad', icon: 'responsabilidad' },
  ],
};

/** Textos basados en docs/respondida/CARTA PRESENTACION NERVADO.docx */
export const about = {
  label: 'Quiénes somos',
  title: 'Sobre Nosotros',
  previewTitle: {
    lead: 'Sobre',
    accent: 'Nosotros',
  },
  /** Resumen en el inicio — 1 párrafo */
  preview:
    'Nervado 26 nace de la experiencia de una empresa constructora que hoy amplía su alcance hacia la distribución de materiales. Conocemos la obra porque estuvimos del otro lado: calidad, plazos y un trato cercano en cada entrega.',
  /** Imagen del bloque Sobre nosotros en la home */
  previewImage: '/images/nosotros/afuera2.webp',
  previewCta: 'Conocé nuestra historia',
  /** Pilares de identidad — distintos a los beneficios al cliente (sección Beneficios) */
  pillarsLabel: 'Nuestra identidad',
  pillars: [
    {
      title: 'Origen constructor',
      description:
        'Nacimos como empresa de obras públicas y privadas. Esa trayectoria es la base de nuestra unidad comercial.',
    },
    {
      title: 'Experiencia en obra',
      description:
        'Conocemos las necesidades reales del rubro porque estuvimos del otro lado: plazos, calidad y abastecimiento.',
    },
    {
      title: 'Mejora continua',
      description:
        'Innovación y gestión ágil como cultura organizacional para adaptarnos a un mercado dinámico.',
    },
  ],
  vision: {
    title: 'Visión',
    text: 'Ser un aliado estratégico del sector construcción, aportando valor desde el abastecimiento, la planificación y el acompañamiento de cada proyecto.',
  },
  mission: {
    title: 'Misión',
    text: 'Brindar soluciones integrales para la construcción, ofreciendo productos de calidad, asesoramiento técnico y un servicio cercano y confiable.',
  },
  history: {
    label: 'Trayectoria',
    title: 'Nuestra historia',
    image: '/images/nosotros/image.webp',
    paragraphs: [
      'Nervado 26 nace como una evolución natural de una empresa constructora con trayectoria en obras públicas y proyectos privados.',
      'La experiencia acumulada en obra, el crecimiento sostenido y la necesidad de optimizar procesos nos llevaron a ampliar nuestro alcance hacia la distribución de materiales e insumos para la construcción.',
      'Hoy desarrollamos una nueva unidad de negocio orientada a brindar soluciones integrales de abastecimiento para constructoras, contratistas, industrias, corralones y profesionales del sector.',
    ],
  },
  differential: {
    label: 'Nuestra ventaja',
    headline: 'Conocemos la obra desde adentro',
    support:
      'Nuestra experiencia como constructores nos permite entender la importancia de la calidad, los plazos y la confiabilidad en el abastecimiento.',
    closing: 'No solo comercializamos materiales: acompañamos proyectos.',
  },
  audience: {
    title: 'A quién nos dirigimos',
    items: [
      { label: 'Empresas constructoras', icon: 'building' },
      { label: 'Contratistas y profesionales del sector', icon: 'contractor' },
      { label: 'Industrias', icon: 'factory' },
      { label: 'Pequeños y medianos distribuidores (corralones)', icon: 'store' },
      { label: 'Consumidor final con conocimiento de obra', icon: 'consumer' },
    ],
  },
  offering: {
    title: 'Qué ofrecemos',
    intro: 'Nuestra oferta contempla una amplia gama de materiales, con foco en obra gruesa y siderúrgicos:',
    categories: [
      {
        name: 'Obra gruesa',
        items: ['Hierros para construcción', 'Cemento CPC40', 'Mallas electrosoldadas', 'Clavos', 'Áridos', 'Ladrillos'],
      },
      {
        name: 'Siderúrgicos',
        items: ['Caños estructurales', 'Perfiles C y W'],
      },
      {
        name: 'Herramientas',
        items: ['Herramientas industriales', 'Pequeñas herramientas'],
      },
      {
        name: 'Próximamente',
        items: ['Materiales eléctricos'],
      },
    ],
  },
  image: '/images/nosotros/image.webp',
};

/**
 * Galería del carrusel en Nosotros — depósito y materiales.
 */
export const materialsGallery = [
  {
    src: '/images/materiales/FOTOS - MATERIALES (X CATEGORÍA)/HIERROS NERVADOS/hierrosnervados.webp',
    alt: 'Hierros nervados de construcción',
    position: 'center center',
  },
  {
    src: '/images/materiales/FOTOS - MATERIALES (X CATEGORÍA)/CEMENTO/cemento1.webp',
    alt: 'Cemento para obra',
    position: 'center center',
  },
  {
    src: '/images/materiales/FOTOS - MATERIALES (X CATEGORÍA)/MALLA SIMA/mallasima1.webp',
    alt: 'Mallas sima en depósito',
    position: 'center center',
  },
  {
    src: '/images/materiales/FOTOS - MATERIALES (X CATEGORÍA)/ARENA/Arenas1.webp',
    alt: 'Áridos y arena',
    position: 'center center',
  },
  {
    src: '/images/nosotros/afuera2.webp',
    alt: 'Depósito Nervado 26',
    position: 'center center',
  },
];

export const howWeWork = {
  label: 'Cómo trabajamos',
  title: 'Acompañamos tu proyecto paso a paso',
  description:
    'En cada etapa de tu proyecto te acompañamos con asesoramiento, propuestas claras y seguimiento cercano.',
  steps: [
    {
      icon: 'message',
      title: 'Escuchamos tu necesidad',
      description: 'Nos contás qué tipo de obra o materiales necesitás.',
    },
    {
      icon: 'user',
      title: 'Te asesoramos',
      description: 'Te orientamos según medidas, cantidades y opciones disponibles.',
    },
    {
      icon: 'document',
      title: 'Armamos la mejor propuesta',
      description: 'Preparamos una solución clara y un presupuesto acorde a tu necesidad.',
    },
    {
      icon: 'truck',
      title: 'Abastecemos tu proyecto',
      description:
        'Coordinamos el pedido para retiro o entrega, según disponibilidad y ubicación.',
    },
    {
      icon: 'headset',
      title: 'Realizamos seguimiento postventa',
      description:
        'Seguimos acompañándote después de la compra ante dudas o nuevas necesidades.',
    },
  ],
  cta: {
    title: 'Hablemos de tu próximo proyecto.',
    description: 'Te ayudamos con los materiales que tu obra necesita.',
    button: 'Pedir presupuesto',
  },
};

export const whatsappFloat = {
  /** Rutas donde no se muestra el botón flotante (ya hay contacto destacado) */
  hiddenOnPaths: ['/contacto'],
};

export const footer = {
  legal: `© ${new Date().getFullYear()} Nervado 26. Todos los derechos reservados.`,
  note: 'Godoy Cruz, Mendoza',
  hoursSummary: 'Lunes a viernes de 08:30 a 17:00 hs.',
};
