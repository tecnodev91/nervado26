/** Catálogo completo — 30 productos/categorías consultables */

const images = [
  '/images/product-1.jpeg',
  '/images/product-2.jpeg',
  '/images/product-3.jpeg',
  '/images/hero-bg.jpeg',
  '/images/materiales/sirven/1.webp',
  '/images/materiales/sirven/2.webp',
  '/images/materiales/sirven/3.webp',
  '/images/materiales/sirven/4.webp',
  '/images/materiales/sirven/5.webp',
];

export const PRODUCT_CATEGORIES = [
  { id: 'all', label: 'Todos' },
  { id: 'estructura', label: 'Estructura' },
  { id: 'mamposteria', label: 'Mampostería' },
  { id: 'terminaciones', label: 'Terminaciones' },
  { id: 'instalaciones', label: 'Instalaciones' },
  { id: 'madera', label: 'Madera' },
  { id: 'herramientas', label: 'Herramientas' },
  { id: 'general', label: 'General' },
];

const catalog = [
  {
    name: 'Hierro y Acero',
    category: 'estructura',
    description:
      'Perfiles, barras y estructuras para hormigón armado y obra civil. Asesoramiento según carga y diseño.',
    showPromo: false,
  },
  {
    name: 'Cemento y Aglomerantes',
    category: 'estructura',
    description:
      'Cemento, cal, áridos y mezclas para cimentaciones, revoques y terminaciones de calidad.',
  },
  {
    name: 'Materiales Generales',
    category: 'general',
    description:
      'Ladrillos, bloques, hierros menores e insumos complementarios para llevar tu obra de punta a punta.',
    showPromo: true,
  },
  {
    name: 'Herramientas e Insumos',
    category: 'herramientas',
    description:
      'Elementos de apoyo para albañilería y estructura. Consultanos por disponibilidad y marcas.',
    showPromo: true,
  },
  {
    name: 'Ladrillos y Bloques',
    category: 'mamposteria',
    description: 'Huecos, cerámicos y bloques de hormigón según terminación y carga.',
  },
  {
    name: 'Arena y Piedra',
    category: 'mamposteria',
    description: 'Áridos clasificados para hormigón, contrapisos y nivelaciones.',
  },
  {
    name: 'Hierros de Albañilería',
    category: 'estructura',
    description: 'Mallas, púas, estribos y accesorios para mampostería.',
  },
  {
    name: 'Malla Sima y Fibras',
    category: 'estructura',
    description: 'Refuerzo para losas, vigas y soluciones antisísmicas.',
  },
  {
    name: 'Perfiles IPN y PNI',
    category: 'estructura',
    description: 'Acero estructural laminado para grandes luces y cargas.',
  },
  {
    name: 'Chapa y Tubos',
    category: 'estructura',
    description: 'Chapa negra, galvanizada y tubos para estructura y terminaciones.',
  },
  {
    name: 'Cal Hidratada',
    category: 'mamposteria',
    description: 'Para revoques, morteros y ajustes de obra en mampostería.',
  },
  {
    name: 'Yeso y Placas',
    category: 'terminaciones',
    description: 'Yeso, placas de yeso y cielorrasos para terminaciones interiores.',
  },
  {
    name: 'Aislamiento Térmico',
    category: 'terminaciones',
    description: 'Poliestireno, lana de vidrio y barreras para confort térmico.',
  },
  {
    name: 'Impermeabilizantes',
    category: 'terminaciones',
    description: 'Membranas, pinturas y selladores para cubiertas y muros.',
  },
  {
    name: 'Pinturas y Revestimientos',
    category: 'terminaciones',
    description: 'Látex, sintéticos y revestimientos para interior y exterior.',
  },
  {
    name: 'Cerámicos y Porcelanatos',
    category: 'terminaciones',
    description: 'Pisos y revestimientos para baños, cocinas y áreas sociales.',
  },
  {
    name: 'Sanitarios',
    category: 'instalaciones',
    description: 'Inodoros, lavatorios y accesorios. Consultá modelos en stock.',
  },
  {
    name: 'Grifería',
    category: 'instalaciones',
    description: 'Canillas, duchas y mezcladoras para baño y cocina.',
  },
  {
    name: 'Electricidad y Cableado',
    category: 'instalaciones',
    description: 'Cables, llaves, cajas y materiales para instalaciones eléctricas.',
  },
  {
    name: 'Plomería y PVC',
    category: 'instalaciones',
    description: 'Caños, codos, llaves y accesorios para instalaciones sanitarias.',
  },
  {
    name: 'Maderas y Machimbre',
    category: 'madera',
    description: 'Tablas, OSB y soluciones para entrepisos y estructuras livianas.',
  },
  {
    name: 'Tirantes y Encofrados',
    category: 'madera',
    description: 'Madera para encofrado, puntales y tablas de encofrar.',
  },
  {
    name: 'Clavos y Tornillos',
    category: 'herramientas',
    description: 'Fijaciones para madera, chapa y albañilería en distintas medidas.',
  },
  {
    name: 'Discos y Abrasivos',
    category: 'herramientas',
    description: 'Discos de corte, desbaste y lijas para herramientas eléctricas.',
  },
  {
    name: 'Equipos de Protección',
    category: 'herramientas',
    description: 'Elementos de seguridad para obra y uso en depósito.',
  },
  {
    name: 'Carretillas y Baldes',
    category: 'herramientas',
    description: 'Transporte de materiales y herramientas en obra.',
  },
  {
    name: 'Lijas y Masillas',
    category: 'terminaciones',
    description: 'Preparación de superficies antes de pintar o revestir.',
  },
  {
    name: 'Membranas y Geotextiles',
    category: 'terminaciones',
    description: 'Soluciones para impermeabilizar y separar capas en obra.',
  },
  {
    name: 'Adhesivos y Selladores',
    category: 'terminaciones',
    description: 'Pegamentos, siliconas y selladores para terminaciones.',
  },
  {
    name: 'Alambre y Clavos',
    category: 'estructura',
    description: 'Alambre negro, tejidos y clavos para amarres y estructuras.',
  },
];

export const products = catalog.map((item, index) => ({
  id: `producto-${index + 1}`,
  name: item.name,
  category: item.category,
  description: item.description,
  image: images[index % images.length],
  showPromo: item.showPromo ?? false,
}));

export const PRODUCTS_TOTAL = products.length;
