/**
 * Preguntas frecuentes — editá categorías, preguntas y respuestas aquí.
 * `answer` acepta bloques: p (párrafo), ul (lista), link, schedule (bloques con título).
 */
export const faqPage = {
  label: 'Ayuda',
  title: 'Preguntas frecuentes',
  description:
    'Resolvé tus dudas sobre compras, entregas, financiación y servicios profesionales.',
};

const faqItems = {
  'quienes-pueden-comprar': {
    id: 'quienes-pueden-comprar',
    question: '¿Quiénes pueden comprar en Nervado 26?',
    answer: [
      {
        type: 'p',
        text: 'Trabajamos con constructoras, industrias, desarrolladores, estudios de arquitectura, contratistas, profesionales independientes y clientes particulares. Nuestra propuesta está orientada a acompañar proyectos de distintas escalas, desde obras residenciales hasta desarrollos de mayor envergadura.',
      },
    ],
  },
  financiacion: {
    id: 'financiacion',
    question: '¿Ofrecen algún tipo de financiación?',
    answer: [
      {
        type: 'p',
        text: 'Sí. Entendemos que la financiación es una herramienta clave para el desarrollo de una obra. Por eso, ofrecemos diferentes alternativas adaptadas a las necesidades de cada cliente, entre ellas:',
      },
      {
        type: 'ul',
        items: [
          'Pagos diferidos.',
          'Planes de cuotas con tarjeta de crédito.',
          'Descuentos especiales por pago anticipado.',
          'Cuentas corrientes para empresas y profesionales habilitados.',
        ],
      },
      {
        type: 'p',
        text: 'Nuestro equipo comercial te asesorará para encontrar la opción que mejor se adapte a tu proyecto.',
      },
    ],
  },
  'metodos-pago': {
    id: 'metodos-pago',
    question: '¿Qué métodos de pago aceptan?',
    answer: [
      {
        type: 'p',
        text: 'Para mayor comodidad, contamos con múltiples medios de pago:',
      },
      {
        type: 'ul',
        items: [
          'Efectivo.',
          'Tarjetas de débito.',
          'Tarjetas de crédito (consultar promociones y planes vigentes).',
          'Transferencias bancarias.',
          'Cuentas corrientes para empresas, constructoras y profesionales, sujetos a evaluación crediticia.',
          'Cheques diferidos, sujetos a evaluación crediticia.',
        ],
      },
    ],
  },
  'calificacion-crediticia': {
    id: 'calificacion-crediticia',
    question: '¿Cómo es la calificación crediticia de un cliente?',
    answer: [
      {
        type: 'p',
        text: 'La evaluación se realiza mediante la verificación de antecedentes comerciales y financieros a través de Nosis y de la Central de Deudores del Banco Central de la República Argentina. Se aceptarán únicamente cheques cuyos emisores presenten una calificación crediticia compatible con nuestras políticas comerciales. Situación 1 durante los últimos 6 meses.',
      },
      {
        type: 'p',
        text: 'Para consultar el estado de un CUIT en la Central de Deudores del BCRA podés ingresar a:',
      },
      {
        type: 'link',
        href: 'https://www.bcra.gob.ar/BCRAyVos/Situacion_Crediticia.asp',
        text: 'https://www.bcra.gob.ar/BCRAyVos/Situacion_Crediticia.asp',
      },
    ],
  },
  'envios-domicilio': {
    id: 'envios-domicilio',
    question: '¿Realizan envíos a domicilio?',
    answer: [
      {
        type: 'p',
        text: 'Sí. Contamos con una flota propia y una red logística preparada para realizar entregas directamente en obra, garantizando seguridad, eficiencia y cumplimiento en los plazos.',
      },
    ],
  },
  cobertura: {
    id: 'cobertura',
    question: '¿Cuál es el área de cobertura?',
    answer: [
      {
        type: 'p',
        text: 'Realizamos entregas en toda la provincia de Mendoza y en el resto del país. Nuestro equipo coordina cada envío según las características del pedido y la ubicación de la obra.',
      },
      {
        type: 'p',
        text: 'Consultanos por tu localidad para brindarte información sobre tiempos de entrega y costos de envío.',
      },
    ],
  },
  'materiales-pesados': {
    id: 'materiales-pesados',
    question: '¿Cómo se entregan materiales pesados como arena, piedra o ladrillos?',
    answer: [
      {
        type: 'p',
        text: 'Para brindar mayor comodidad y seguridad, los áridos se entregan en semi o chasis por 3 o 6 mts cúbicos.',
      },
      {
        type: 'p',
        text: 'Y los ladrillos en paletizado.',
      },
      {
        type: 'p',
        text: 'Este sistema permite ubicar los materiales en el sector más conveniente de la obra, optimizando tiempos, reduciendo desperdicios y manteniendo una mejor organización y limpieza del espacio de trabajo.',
      },
    ],
  },
  'servicio-acopio': {
    id: 'servicio-acopio',
    question: '¿En qué consiste el servicio de acopio de materiales?',
    answer: [
      {
        type: 'p',
        text: 'El servicio de acopio permite comprar materiales hoy y congelar su precio, brindando previsibilidad frente a las variaciones del mercado.',
      },
      {
        type: 'p',
        text: 'Mediante la firma de un acuerdo, los materiales permanecen almacenados en nuestras instalaciones y pueden ser retirados o enviados a obra en función del avance del proyecto.',
      },
      {
        type: 'p',
        text: 'El servicio incluye almacenamiento sin costo durante un período de hasta 4 meses.',
      },
    ],
  },
  'entregas-parciales': {
    id: 'entregas-parciales',
    question: '¿Puedo reservar materiales para entregas parciales?',
    answer: [
      {
        type: 'p',
        text: 'Sí. Podemos coordinar entregas programadas de acuerdo con el avance de la obra, permitiendo optimizar espacios de almacenamiento y asegurar la disponibilidad de los materiales en cada etapa del proyecto.',
      },
    ],
  },
  devoluciones: {
    id: 'devoluciones',
    question: 'Compré materiales de más, ¿puedo devolverlos?',
    answer: [
      {
        type: 'p',
        text: 'Sí. Aceptamos la devolución de materiales sobrantes siempre que se encuentren en su envase original cerrado y en perfectas condiciones.',
      },
      {
        type: 'p',
        text: 'Algunos productos específicos o pedidos especiales pueden no admitir devoluciones. Por eso, recomendamos conservar la factura y consultar las condiciones particulares al momento de la compra.',
      },
    ],
  },
  asesoramiento: {
    id: 'asesoramiento',
    question: '¿Brindan asesoramiento técnico y servicios profesionales?',
    answer: [
      {
        type: 'p',
        text: 'Sí. Gracias a nuestra experiencia en construcción y al respaldo de un equipo de arquitectos e ingenieros civiles, acompañamos a nuestros clientes en todas las etapas de sus proyectos. Brindamos asesoramiento técnico y comercial, diseño y planificación, cómputos y presupuestos de materiales, revisión y optimización de proyectos, dirección y seguimiento de obra, así como la aplicación de metodologías ágiles y Lean Construction para lograr soluciones más eficientes.',
      },
    ],
  },
  'tipo-proyectos': {
    id: 'tipo-proyectos',
    question: '¿Qué tipo de proyectos pueden desarrollar o asesorar?',
    answer: [
      {
        type: 'p',
        text: 'Acompañamos proyectos de distintas escalas, desde ampliaciones y viviendas unifamiliares hasta edificios, desarrollos inmobiliarios, locales comerciales, naves industriales y otras inversiones vinculadas al sector de la construcción. Incluso si todavía no tenés definido tu proyecto, nuestro equipo puede ayudarte a transformar una idea en una propuesta viable y acompañarte desde la planificación hasta su ejecución.',
      },
    ],
  },
  'coordinar-reunion': {
    id: 'coordinar-reunion',
    question: '¿Cómo puedo coordinar una reunión con los profesionales de Nervado 26?',
    answer: [
      {
        type: 'p',
        text: 'Podés comunicarte con nuestro equipo a través de WhatsApp, teléfono, correo electrónico o mediante el formulario de contacto disponible en nuestra página web. Agendaremos una cita para conocer tus necesidades y acompañarte en el desarrollo de tu proyecto.',
      },
    ],
  },
  'beneficios-servicios': {
    id: 'beneficios-servicios',
    question: '¿Qué beneficios obtengo al contratar los servicios profesionales de Nervado 26?',
    answer: [
      {
        type: 'p',
        text: 'Los clientes que contraten nuestros servicios de arquitectura e ingeniería podrán acceder a condiciones preferenciales y beneficios exclusivos en la compra de materiales comercializados por la empresa.',
      },
    ],
  },
  'es-corralon': {
    id: 'es-corralon',
    question: '¿Nervado 26 es un corralón?',
    answer: [
      {
        type: 'p',
        text: 'No. Nervado 26 es una empresa especializada en soluciones integrales para la construcción. Además de comercializar materiales y productos siderúrgicos, contamos con el respaldo y la experiencia de una desarrolladora y constructora, lo que nos permite acompañar a nuestros clientes con asesoramiento técnico, servicios profesionales y un enfoque orientado a generar valor en cada etapa del proyecto.',
      },
    ],
  },
  diferencial: {
    id: 'diferencial',
    question: '¿Cuál es el diferencial de Nervado 26?',
    answer: [
      {
        type: 'p',
        text: 'Nervado 26 nace de la experiencia de una desarrolladora y constructora con trayectoria en obras públicas y privadas.',
      },
      {
        type: 'p',
        text: 'Conocemos las necesidades reales de una obra porque hemos estado del otro lado. Por eso, no solo comercializamos materiales: brindamos soluciones integrales, acompañamiento técnico y un servicio orientado a construir relaciones de largo plazo con nuestros clientes.',
      },
    ],
  },
  'horario-atencion': {
    id: 'horario-atencion',
    question: '¿Cuál es el horario de atención?',
    answer: [
      {
        type: 'schedule',
        entries: [
          {
            label: 'Área Comercial, Técnica Logística',
            text: 'Lunes a viernes de 8:30 a 17:00 hs.',
          },
          {
            label: 'Guardia Comercial',
            text: 'Sábados de 8:30 a 12:30 hs.',
          },
          {
            label: 'Servicio de Asesoramiento Profesional para Proyectos',
            text: 'Coordinar una reunión solicitándola por Whatsapp.',
          },
        ],
      },
      {
        type: 'p',
        text: 'Nuestro equipo se encuentra disponible para asesorarte y acompañarte en cada etapa de tu proyecto.',
      },
    ],
  },
};

function pickItems(...ids) {
  return ids.map((id) => faqItems[id]);
}

export const faqCategories = [
  {
    id: 'compras',
    title: 'Compras y clientes',
    items: pickItems('quienes-pueden-comprar'),
  },
  {
    id: 'pagos',
    title: 'Pagos y financiación',
    items: pickItems('financiacion', 'metodos-pago', 'calificacion-crediticia'),
  },
  {
    id: 'envios',
    title: 'Envíos y cobertura',
    items: pickItems('envios-domicilio', 'cobertura', 'materiales-pesados'),
  },
  {
    id: 'acopio',
    title: 'Acopio, reservas y devoluciones',
    items: pickItems('servicio-acopio', 'entregas-parciales', 'devoluciones'),
  },
  {
    id: 'servicios',
    title: 'Servicios profesionales',
    items: pickItems('asesoramiento', 'tipo-proyectos', 'coordinar-reunion', 'beneficios-servicios'),
  },
  {
    id: 'sobre',
    title: 'Sobre Nervado 26',
    items: pickItems('es-corralon', 'diferencial'),
  },
  {
    id: 'horarios',
    title: 'Horarios y contacto',
    items: pickItems('horario-atencion'),
  },
];
