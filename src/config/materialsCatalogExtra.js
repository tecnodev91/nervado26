/**
 * Materiales del doc DESCRIPCION Y FICHA TECNICA ARTICULOS.docx
 * Pendiente de tablas de medidas (consulta por WhatsApp).
 */

function consultMaterial({ id, slug, name, description, image, consultText }) {
  return {
    id,
    slug,
    name,
    description,
    image,
    columns: ['Consulta'],
    rows: [
      {
        Consulta:
          consultText ?? 'Medidas y stock según disponibilidad en depósito.',
      },
    ],
    itemCount: 0,
  };
}

const ROOF_SHEET_ROWS = [
  {
    Terminación: 'Galvanizada',
    Ancho: '1,10 m',
    Largos: '1,00 a 10,00 m cada 0,50 m + 13,00 m',
    Calibre: '27 = 0,41 mm',
  },
  {
    Terminación: 'Cincalum',
    Ancho: '1,10 m',
    Largos: '1,00 a 10,00 m cada 0,50 m + 13,00 m',
    Calibre: '25 = 0,50 mm',
  },
];

const ROOF_SHEET_COLUMNS = ['Terminación', 'Ancho', 'Largos', 'Calibre'];

const FOTOS = '/images/materiales/FOTOS - MATERIALES (X CATEGORÍA)';

function roofSheetMaterial({ id, slug, name, description, image }) {
  return {
    id,
    slug,
    name,
    description,
    image,
    columns: ROOF_SHEET_COLUMNS,
    rows: ROOF_SHEET_ROWS,
    itemCount: ROOF_SHEET_ROWS.length,
  };
}

const IPN_PROFILE_COLUMNS = [
  'Perfil',
  'Altura h',
  'Ancho b',
  'Espesor alma e',
  'Espesor ala e1',
  'Peso aprox.',
];

const IPN_PROFILE_ROWS = [
  { Perfil: 'IPN 80', 'Altura h': '80 mm', 'Ancho b': '42 mm', 'Espesor alma e': '3,9 mm', 'Espesor ala e1': '5,9 mm', 'Peso aprox.': '5,90 kg/m' },
  { Perfil: 'IPN 100', 'Altura h': '100 mm', 'Ancho b': '50 mm', 'Espesor alma e': '4,5 mm', 'Espesor ala e1': '6,8 mm', 'Peso aprox.': '8,30 kg/m' },
  { Perfil: 'IPN 120', 'Altura h': '120 mm', 'Ancho b': '58 mm', 'Espesor alma e': '5,1 mm', 'Espesor ala e1': '7,7 mm', 'Peso aprox.': '11,10 kg/m' },
  { Perfil: 'IPN 140', 'Altura h': '140 mm', 'Ancho b': '66 mm', 'Espesor alma e': '5,7 mm', 'Espesor ala e1': '8,6 mm', 'Peso aprox.': '14,30 kg/m' },
  { Perfil: 'IPN 160', 'Altura h': '160 mm', 'Ancho b': '74 mm', 'Espesor alma e': '6,3 mm', 'Espesor ala e1': '9,5 mm', 'Peso aprox.': '17,90 kg/m' },
  { Perfil: 'IPN 180', 'Altura h': '180 mm', 'Ancho b': '82 mm', 'Espesor alma e': '6,9 mm', 'Espesor ala e1': '10,4 mm', 'Peso aprox.': '21,90 kg/m' },
  { Perfil: 'IPN 200', 'Altura h': '200 mm', 'Ancho b': '90 mm', 'Espesor alma e': '7,5 mm', 'Espesor ala e1': '11,3 mm', 'Peso aprox.': '26,20 kg/m' },
  { Perfil: 'IPN 220', 'Altura h': '220 mm', 'Ancho b': '98 mm', 'Espesor alma e': '8,1 mm', 'Espesor ala e1': '12,2 mm', 'Peso aprox.': '30,90 kg/m' },
  { Perfil: 'IPN 240', 'Altura h': '240 mm', 'Ancho b': '106 mm', 'Espesor alma e': '8,7 mm', 'Espesor ala e1': '13,1 mm', 'Peso aprox.': '36,10 kg/m' },
  { Perfil: 'IPN 260', 'Altura h': '260 mm', 'Ancho b': '113 mm', 'Espesor alma e': '9,4 mm', 'Espesor ala e1': '14,1 mm', 'Peso aprox.': '41,80 kg/m' },
  { Perfil: 'IPN 280', 'Altura h': '280 mm', 'Ancho b': '119 mm', 'Espesor alma e': '10,1 mm', 'Espesor ala e1': '15,2 mm', 'Peso aprox.': '47,80 kg/m' },
  { Perfil: 'IPN 300', 'Altura h': '300 mm', 'Ancho b': '125 mm', 'Espesor alma e': '10,8 mm', 'Espesor ala e1': '16,2 mm', 'Peso aprox.': '54,10 kg/m' },
  { Perfil: 'IPN 320', 'Altura h': '320 mm', 'Ancho b': '131 mm', 'Espesor alma e': '11,5 mm', 'Espesor ala e1': '17,3 mm', 'Peso aprox.': '60,90 kg/m' },
  { Perfil: 'IPN 340', 'Altura h': '340 mm', 'Ancho b': '137 mm', 'Espesor alma e': '12,2 mm', 'Espesor ala e1': '18,3 mm', 'Peso aprox.': '67,90 kg/m' },
  { Perfil: 'IPN 360', 'Altura h': '360 mm', 'Ancho b': '143 mm', 'Espesor alma e': '13,0 mm', 'Espesor ala e1': '19,5 mm', 'Peso aprox.': '76,00 kg/m' },
  { Perfil: 'IPN 380', 'Altura h': '380 mm', 'Ancho b': '149 mm', 'Espesor alma e': '13,7 mm', 'Espesor ala e1': '20,5 mm', 'Peso aprox.': '83,80 kg/m' },
  { Perfil: 'IPN 400', 'Altura h': '400 mm', 'Ancho b': '155 mm', 'Espesor alma e': '14,4 mm', 'Espesor ala e1': '21,6 mm', 'Peso aprox.': '92,40 kg/m' },
  { Perfil: 'IPN 425', 'Altura h': '425 mm', 'Ancho b': '163 mm', 'Espesor alma e': '15,3 mm', 'Espesor ala e1': '23,0 mm', 'Peso aprox.': '103,40 kg/m' },
  { Perfil: 'IPN 450', 'Altura h': '450 mm', 'Ancho b': '170 mm', 'Espesor alma e': '16,2 mm', 'Espesor ala e1': '24,3 mm', 'Peso aprox.': '115,20 kg/m' },
  { Perfil: 'IPN 475', 'Altura h': '475 mm', 'Ancho b': '178 mm', 'Espesor alma e': '17,1 mm', 'Espesor ala e1': '25,6 mm', 'Peso aprox.': '127,70 kg/m' },
  { Perfil: 'IPN 500', 'Altura h': '500 mm', 'Ancho b': '185 mm', 'Espesor alma e': '18,0 mm', 'Espesor ala e1': '27,0 mm', 'Peso aprox.': '140,20 kg/m' },
  { Perfil: 'IPN 550', 'Altura h': '550 mm', 'Ancho b': '200 mm', 'Espesor alma e': '19,0 mm', 'Espesor ala e1': '30,0 mm', 'Peso aprox.': '166,10 kg/m' },
  { Perfil: 'IPN 600', 'Altura h': '600 mm', 'Ancho b': '215 mm', 'Espesor alma e': '21,6 mm', 'Espesor ala e1': '32,4 mm', 'Peso aprox.': '199,00 kg/m' },
];

function section(id, label, count = 1) {
  return { id, label, count };
}

const IMG = '/images/materiales/verdaderos';

export const extraMaterials = [
  consultMaterial({
    id: 'cemento',
    slug: 'cemento',
    name: 'Cemento',
    description: 'Cemento para hormigón, morteros y revoques.',
    image: '/images/materiales/FOTOS - MATERIALES (X CATEGORÍA)/CEMENTO/cemento1.webp',
  }),
  consultMaterial({
    id: 'canos-negros-uso-mecanico',
    slug: 'canos-negros-uso-mecanico',
    name: 'Caños negros de uso mecánico',
    description: 'Tubos de acero laminado para estructuras e herrería pesada.',
    image:
      '/images/materiales/FOTOS - MATERIALES (X CATEGORÍA)/CAÑOS NEGROS DE USO MECANICO/Caños negros de uso mecánico.avif',
  }),
  {
    id: 'planchuelas-perforadas',
    slug: 'planchuelas-perforadas',
    name: 'Planchuelas perforadas',
    description:
      'Planchuelas de acero con perforaciones uniformes para armado de rejas, portones, cercos, cerramientos y trabajos de herrería.',
    image: `${FOTOS}/PLANCHUELAS PERFORADAS/planchuelasperforadas2.png`,
    columns: ['Consulta'],
    rows: [
      {
        Consulta: 'Medidas, tipo de perforación y stock según disponibilidad en depósito.',
      },
    ],
    itemCount: 0,
  },
  consultMaterial({
    id: 'hierros-lisos-cuadrados',
    slug: 'hierros-lisos-cuadrados',
    name: 'Hierros lisos cuadrados',
    description: 'Barra cuadrada maciza para herrería y estructuras metálicas.',
    image: `${FOTOS}/HIERROS LISOS/hierroslisoscuadrados.jpg`,
  }),
  {
    id: 'hierro-perfil-te',
    slug: 'hierro-perfil-te',
    name: 'Hierro perfil TE',
    description:
      'Perfil de acero en forma de "T" para herrería, marcos, guías, cerramientos y estructuras metálicas livianas. Disponible en barras de 6 metros.',
    image: `${FOTOS}/HIERROS PERFIL TE/hierroperfilte.png`,
    columns: ['Medida', 'Peso aproximado'],
    rows: [
      { Medida: '3/4" x 1/8"', 'Peso aproximado': '0,89 kg/m' },
      { Medida: '1" x 1/8"', 'Peso aproximado': '1,19 kg/m' },
      { Medida: '1 1/4" x 1/8"', 'Peso aproximado': '1,54 kg/m' },
      { Medida: '1 1/2" x 1/8"', 'Peso aproximado': '1,84 kg/m' },
      { Medida: '2" x 3/16"', 'Peso aproximado': '3,69 kg/m' },
    ],
    itemCount: 5,
  },
  {
    id: 'perfiles-ipn',
    slug: 'perfiles-ipn',
    name: 'Perfiles IPN',
    description:
      'Perfil estructural de acero tipo doble T para vigas, columnas, dinteles, entrepisos, refuerzos y estructuras metálicas. Disponible en barras de 6 y 12 metros.',
    image: `${FOTOS}/PERFIL IPN/perfilipn.png`,
    columns: IPN_PROFILE_COLUMNS,
    rows: IPN_PROFILE_ROWS,
    itemCount: IPN_PROFILE_ROWS.length,
  },
  consultMaterial({
    id: 'perfiles-w',
    slug: 'perfiles-w',
    name: 'Perfiles W',
    description:
      'Perfil estructural de acero de ala ancha para vigas, columnas, galpones, naves industriales, puentes y estructuras de gran porte. Disponible en barras de 12 metros.',
    image: `${FOTOS}/PERFILES W/perfilesw.png`,
    columns: ['Consulta'],
    rows: [{ Consulta: 'Medidas y stock según disponibilidad en depósito.' }],
    itemCount: 0,
  }),
  consultMaterial({
    id: 'chapas-negras-lisas',
    slug: 'chapas-negras-lisas',
    name: 'Chapas negras lisas',
    description: 'Chapa de acero sin galvanizar para herrería y cerramientos interiores.',
    image: '/images/materiales/FOTOS - MATERIALES (X CATEGORÍA)/CHAPA NEGRA LISA/chapanegralisa.webp',
  }),
  consultMaterial({
    id: 'chapas-galvanizadas-lisas',
    slug: 'chapas-galvanizadas-lisas',
    name: 'Chapas galvanizadas lisas',
    description: 'Chapa con zinc para zinguería, conductos y carrocerías.',
    image: '/images/materiales/FOTOS - MATERIALES (X CATEGORÍA)/CHAPA GALVANIZADA LISA/chapagalvanizadalisa.webp',
  }),
  consultMaterial({
    id: 'chapas-rayadas-semilla-melon',
    slug: 'chapas-rayadas-semilla-melon',
    name: 'Chapas semilla de melón',
    description: 'Chapa antideslizante para rampas, pisos industriales y cubiertas.',
    image: '/images/materiales/FOTOS - MATERIALES (X CATEGORÍA)/CHAPA SEMILLA DE MELON/ChapaMelon.webp',
  }),
  roofSheetMaterial({
    id: 'chapa-sinusoidal',
    slug: 'chapa-sinusoidal',
    name: 'Chapa sinusoidal',
    description:
      'Chapa acanalada tradicional para cubiertas livianas, viviendas, cocheras, tinglados y cerramientos.',
    image: `${FOTOS}/CHAPAS PARA TECHO/CHAPA SINUSOIDAL/chapasinusoidal1.png`,
  }),
  roofSheetMaterial({
    id: 'chapa-trapezoidal-t101',
    slug: 'chapa-trapezoidal-t101',
    name: 'Chapa trapezoidal T101',
    description:
      'Chapa trapezoidal de mayor rigidez para techos, galpones, naves industriales y cubiertas de mayor exigencia.',
    image: `${FOTOS}/CHAPAS PARA TECHO/CHAPA TRAPEZOIDAL/chapatrapezoidal.png`,
  }),
  consultMaterial({
    id: 'arena',
    slug: 'arena',
    name: 'Arena',
    description: 'Árido fino para hormigón, morteros y revoques.',
    image: '/images/materiales/FOTOS - MATERIALES (X CATEGORÍA)/ARENA/Arenas1.webp',
  }),
  {
    id: 'ripio',
    slug: 'ripio',
    name: 'Ripio',
    description:
      'Árido grueso para hormigón, rellenos, bases, drenajes, caminos internos y nivelación de terrenos en obras de construcción.',
    image: `${FOTOS}/RIPIO/ripio1.png`,
    columns: ['Consulta'],
    rows: [
      {
        Consulta: 'Disponibilidad, tipo de ripio y cantidad según necesidad de obra.',
      },
    ],
    itemCount: 0,
  },
  consultMaterial({
    id: 'piedra-bola',
    slug: 'piedra-bola',
    name: 'Piedra bola',
    description:
      'Canto rodado de alta resistencia para cimentaciones, drenajes, estabilización de terrenos y paisajismo.',
    image: `${FOTOS}/PIEDRA BOLA/piedrabola.jpg`,
  }),
  consultMaterial({
    id: 'estabilizado',
    slug: 'estabilizado',
    name: 'Estabilizado',
    description: 'Base compactada para calles, playones y preparación de suelos.',
    image: `${FOTOS}/ESTABILIZADO/estabilizado.jpg`,
  }),
  {
    id: 'placas-de-yeso',
    slug: 'placas-de-yeso',
    name: 'Placas de yeso',
    description:
      'Placas para construcción en seco, ideales para tabiques, cielorrasos, revestimientos interiores y terminaciones rápidas, limpias y prolijas.',
    image: `${FOTOS}/PLACAS DE YESO/placasdeyeso.jpg`,
    columns: ['Consulta'],
    rows: [
      {
        Consulta: 'Tipos, medidas, espesores y stock según disponibilidad en depósito.',
      },
    ],
    itemCount: 0,
  },
  {
    id: 'placas-cementicias',
    slug: 'placas-cementicias',
    name: 'Placas cementicias',
    description:
      'Placas resistentes a la humedad e intemperie, ideales para fachadas, zonas húmedas, revestimientos, semicubiertos y sistemas de construcción en seco.',
    image: `${FOTOS}/PLACAS CEMENTICIAS/placasceminticias.jpg`,
    columns: ['Consulta'],
    rows: [
      {
        Consulta: 'Medidas, espesores, tipos y stock según disponibilidad en depósito.',
      },
    ],
    itemCount: 0,
  },
  {
    id: 'montantes',
    slug: 'montantes',
    name: 'Montantes',
    description:
      'Perfil galvanizado vertical para armar tabiques, revestimientos y cielorrasos en sistemas de construcción en seco. Compatible con soleras y placas de yeso o cementicias.',
    image: `${FOTOS}/MONTANTE/montante.png`,
    columns: ['Medida nominal', 'Uso habitual'],
    rows: [
      {
        'Medida nominal': '34 / 35 mm',
        'Uso habitual': 'Revestimientos y cielorrasos con poco espacio',
      },
      {
        'Medida nominal': '69 / 70 mm',
        'Uso habitual': 'Tabiques interiores estándar',
      },
      {
        'Medida nominal': '99 / 100 mm',
        'Uso habitual': 'Tabiques de mayor espesor o mayor exigencia',
      },
    ],
    itemCount: 0,
  },
  {
    id: 'soleras',
    slug: 'soleras',
    name: 'Soleras',
    description:
      'Perfil galvanizado en forma de "U" para guiar y fijar montantes en tabiques, cielorrasos y estructuras de construcción en seco.',
    image: `${FOTOS}/SOLERA/solera1.webp`,
    columns: ['Medida nominal', 'Uso habitual'],
    rows: [
      {
        'Medida nominal': '35 mm',
        'Uso habitual': 'Revestimientos y estructuras livianas',
      },
      {
        'Medida nominal': '70 mm',
        'Uso habitual': 'Tabiques interiores estándar',
      },
      {
        'Medida nominal': '100 mm',
        'Uso habitual': 'Tabiques de mayor espesor o mayor exigencia',
      },
    ],
    itemCount: 0,
  },
  consultMaterial({
    id: 'cantoneras',
    slug: 'cantoneras',
    name: 'Cantoneras',
    description:
      'Perfiles para proteger esquinas y bordes en placas de yeso, logrando terminaciones resistentes, rectas y prolijas en construcción en seco.',
    image: `${FOTOS}/CANTONERA/cantonera.jpg`,
    consultText: 'Tipos, medidas y stock según disponibilidad en depósito.',
  }),
  consultMaterial({
    id: 'angulo-de-ajuste',
    slug: 'angulo-de-ajuste',
    name: 'Ángulo de ajuste',
    description:
      'Perfil galvanizado en "L" para soporte, nivelación y cierre perimetral en cielorrasos, tabiques y estructuras de construcción en seco.',
    image: `${FOTOS}/ANGULO DE AJUSTE/angulodeajuste1.jpg`,
    consultText: 'Medidas, espesores y stock según disponibilidad en depósito.',
  }),
  consultMaterial({
    id: 'cinta-estanqueidad-banda-acustica',
    slug: 'cinta-estanqueidad-banda-acustica',
    name: 'Cinta de estanqueidad / banda acústica',
    description:
      'Banda autoadhesiva para reducir vibraciones y mejorar la aislación acústica en perfiles de construcción en seco.',
    image: `${FOTOS}/CINTAS/CINTA AUTOADHESIVA AISLANTE/banda-acoustic-100mm.jpg`,
  }),
  consultMaterial({
    id: 'cinta-butilica-autoadhesiva',
    slug: 'cinta-butilica-autoadhesiva',
    name: 'Cinta butílica autoadhesiva',
    description:
      'Cinta impermeable para sellado de juntas, zinguería, cubiertas y reparaciones contra filtraciones.',
    image: `${FOTOS}/CINTAS/CINTA AUTOADHESIVA BUTILICA/media.webp`,
  }),
  consultMaterial({
    id: 'cinta-papel-microperforada',
    slug: 'cinta-papel-microperforada',
    name: 'Cinta de papel microperforada',
    description:
      'Cinta para tomado de juntas en placas de yeso, tabiques, cielorrasos y terminaciones interiores.',
    image: `${FOTOS}/CINTAS/CINTA DE PAPEL MICROPERFORADA/42003.webp`,
  }),
  consultMaterial({
    id: 'cinta-tramada-fibra-vidrio',
    slug: 'cinta-tramada-fibra-vidrio',
    name: 'Cinta tramada de fibra de vidrio',
    description:
      'Cinta autoadhesiva para refuerzo de juntas, reparaciones y prevención de fisuras.',
    image: `${FOTOS}/CINTAS/CINTA TRAMADA/Cinta-Tramada-20-COD-A23-scaled.jpg`,
  }),
  {
    id: 'ladrillos',
    slug: 'ladrillos',
    name: 'Ladrillos',
    description:
      'Ladrillos para muros, tabiques, cerramientos y obras en general. Material resistente y duradero para construcción tradicional.',
    image: `${FOTOS}/LADRILLO/ladrillo1.png`,
    columns: ['Consulta'],
    rows: [
      {
        Consulta: 'Tipos, medidas y stock según disponibilidad en depósito.',
      },
    ],
    itemCount: 0,
  },
  {
    id: 'masillas-construccion-seco',
    slug: 'masillas-construccion-seco',
    name: 'Masillas para construcción en seco',
    description:
      'Masillas para tomado de juntas, tapado de tornillos y terminación de placas de yeso en tabiques, cielorrasos y revestimientos interiores.',
    image: `${FOTOS}/MASILLA/masiilla1.jpg`,
    columns: ['Consulta'],
    rows: [
      {
        Consulta: 'Presentaciones, tipos y stock según disponibilidad en depósito.',
      },
    ],
    itemCount: 0,
  },
  {
    id: 'metal-desplegado',
    slug: 'metal-desplegado',
    name: 'Metal desplegado',
    description:
      'Plancha metálica resistente y liviana para herrería, rejas, portones, cerramientos, pasarelas, protecciones industriales y mobiliario.',
    image: `${FOTOS}/METAL DESPLEGADO/metaldesplegado.jpg`,
    columns: ['Consulta'],
    rows: [
      {
        Consulta: 'Medidas, espesores y stock según disponibilidad en depósito.',
      },
    ],
    itemCount: 0,
  },
  {
    id: 'perfil-omega',
    slug: 'perfil-omega',
    name: 'Perfil Omega',
    description:
      'Perfil galvanizado para revestir muros, nivelar superficies y sostener placas de yeso o cementicias en sistemas de construcción en seco.',
    image: `${FOTOS}/OMEGA/omega1.png`,
    columns: ['Consulta'],
    rows: [
      {
        Consulta: 'Medidas y stock según disponibilidad en depósito.',
      },
    ],
    itemCount: 0,
  },
  {
    id: 'tornillo-t2-punta-aguja',
    slug: 'tornillo-t2-punta-aguja',
    name: 'Tornillo T2 punta aguja',
    description:
      'Tornillo para fijar placas de yeso a perfiles metálicos livianos en sistemas de construcción en seco.',
    image: `${FOTOS}/t2 punta aguja/t2punta aguja.webp`,
    imageFit: 'contain',
    columns: ['Medida', 'Diámetro', 'Largo'],
    rows: [
      {
        Medida: '6 x 1"',
        Diámetro: '3,5 mm',
        Largo: '25,4 mm',
      },
    ],
    itemCount: 1,
  },
  {
    id: 'tornillo-t1-punta-aguja',
    slug: 'tornillo-t1-punta-aguja',
    name: 'Tornillo T1 punta aguja',
    description:
      'Tornillo para unir perfiles metálicos livianos entre sí, como montantes, soleras y omegas.',
    image: `${FOTOS}/t1 punta aguja/t1puntaaguja.webp`,
    imageFit: 'contain',
    columns: ['Medida', 'Diámetro', 'Largo'],
    rows: [
      {
        Medida: '8 x 1/2"',
        Diámetro: '4,2 mm',
        Largo: '13 mm',
      },
    ],
    itemCount: 1,
  },
  {
    id: 'tornillo-t1-punta-mecha',
    slug: 'tornillo-t1-punta-mecha',
    name: 'Tornillo T1 punta mecha',
    description:
      'Tornillo autoperforante para unir perfiles metálicos de mayor espesor en drywall, steel framing y estructuras livianas.',
    image: `${FOTOS}/tornillo t1puntamecha/t1puntamecha.webp`,
    imageFit: 'contain',
    columns: ['Medida', 'Diámetro', 'Largo'],
    rows: [
      {
        Medida: '8 x 1/2"',
        Diámetro: '4,2 mm',
        Largo: '13 mm',
      },
    ],
    itemCount: 1,
  },
  {
    id: 'tornillo-fix-dorado-con-tarugo',
    slug: 'tornillo-fix-dorado-con-tarugo',
    name: 'Tornillo Fix dorado con tarugo',
    description:
      'Tornillo con tarugo para fijaciones medianas en mampostería, ladrillo, concreto y paredes firmes.',
    image: `${FOTOS}/tornillofixdorado/tornillofixdoradocontarugo.webp`,
    imageFit: 'contain',
    columns: ['Medida tornillo', 'Tarugo', 'Mecha', 'Profundidad perforación'],
    rows: [
      {
        'Medida tornillo': '5 x 45 mm',
        Tarugo: '8 mm',
        Mecha: '8 mm',
        'Profundidad perforación': '50 mm',
      },
    ],
    itemCount: 1,
  },
  {
    id: 'membranas',
    slug: 'membranas',
    name: 'Membranas',
    description:
      'Material impermeabilizante flexible utilizado para proteger techos, terrazas, cubiertas y superficies expuestas a la humedad y la intemperie.',
    image: `${FOTOS}/Membrana/menbrana.webp`,
    imageFit: 'contain',
    columns: ['Consulta'],
    rows: [
      {
        Consulta:
          'Tipos, medidas, espesores y disponibilidad según stock en depósito.',
      },
    ],
    itemCount: 0,
  },
  {
    id: 'telas-romboidales',
    slug: 'telas-romboidales',
    name: 'Telas romboidales',
    description:
      'Tejido de alambre resistente y flexible para cerramientos perimetrales, seguridad, obras, predios deportivos, viviendas, campos e industrias.',
    image: `${FOTOS}/telasromboidales/telasromboidales.webp`,
    imageFit: 'contain',
    columns: ['Consulta'],
    rows: [
      {
        Consulta:
          'Consultá por alturas disponibles, tipo de alambre, terminación galvanizada o revestida en PVC, calibre y cantidad de metros por rollo.',
      },
    ],
    itemCount: 0,
  },
  {
    id: 'concertinas',
    slug: 'concertinas',
    name: 'Concertinas',
    description:
      'Sistema de seguridad perimetral en espiral, fabricado en acero galvanizado o inoxidable, utilizado para reforzar muros, cercos y cerramientos.',
    image: `${FOTOS}/concertinas/concertinas.webp`,
    imageFit: 'contain',
    columns: ['Consulta'],
    rows: [
      {
        Consulta:
          'Consultá disponibilidad, medidas, tipo de concertina, diámetros, metros por rollo y modelos según stock en depósito.',
      },
    ],
    itemCount: 0,
  },
  {
    id: 'rafias',
    slug: 'rafias',
    name: 'Rafias',
    description:
      'Tejido sintético de polipropileno utilizado para cubrir alambrados, brindar privacidad, delimitar obras y reducir polvo, viento o visibilidad.',
    image: `${FOTOS}/rafias/rafias.webp`,
    imageFit: 'contain',
    columns: ['Consulta'],
    rows: [
      {
        Consulta:
          'Colores, medidas, porcentaje de cobertura y stock según disponibilidad en depósito.',
      },
    ],
    itemCount: 0,
  },
  {
    id: 'maquinas-herramientas-gamma',
    slug: 'maquinas-herramientas-gamma',
    name: 'Máquinas y herramientas Gamma',
    description:
      'Herramientas y equipos Gamma para construcción, mantenimiento, taller, jardín y uso profesional.',
    image: `${FOTOS}/materialesyherramientas/materialesyherramientas.webp`,
    imageFit: 'cover',
    columns: ['Consulta'],
    rows: [
      {
        Consulta:
          'Modelos disponibles, stock, garantía, accesorios y repuestos según disponibilidad.',
      },
    ],
    itemCount: 0,
  },
  {
    id: 'materiales-electricos',
    slug: 'materiales-electricos',
    name: 'Materiales eléctricos',
    description:
      'Componentes para instalaciones eléctricas en obra, como cables, cañerías, cajas, tableros, protecciones, interruptores y tomacorrientes.',
    image: `${FOTOS}/MATERIALESELECTRICOSSSS/MATERIALESELECTRICOSSSS.webp`,
    imageFit: 'cover',
    columns: ['Consulta'],
    rows: [
      {
        Consulta:
          'Modelos, marcas, medidas, secciones, certificaciones y stock según disponibilidad en depósito.',
      },
    ],
    itemCount: 0,
  },
];

export const extraSections = extraMaterials.map((m) => section(m.id, m.name, m.itemCount));
