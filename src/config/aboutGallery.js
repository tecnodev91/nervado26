/**
 * Galería de la página Nosotros.
 * Fotos en public/images/nosotros/ (galería desactivada; antes sobre-nos).
 *
 * Tipos de ítem:
 * - image: foto de la empresa
 * - client: foto de cliente/obra — agregar cuando tengan material
 */
const sobreNosPhotos = [
  { file: '01.jpeg', alt: 'Nervado 26 — depósito y materiales' },
  { file: '02.jpeg', alt: 'Nervado 26 — equipo y atención' },
  { file: '03.jpeg', alt: 'Nervado 26 — espacio de trabajo' },
  { file: '04.jpeg', alt: 'Nervado 26 — materiales de construcción' },
  { file: '05.jpeg', alt: 'Nervado 26 — stock y logística' },
  { file: '06.jpeg', alt: 'Nervado 26 — depósito' },
  { file: '07.jpeg', alt: 'Nervado 26 — obra y materiales' },
  { file: '08.jpeg', alt: 'Nervado 26 — atención al cliente' },
  { file: '09.jpeg', alt: 'Nervado 26 — empresa' },
];

export const aboutGallery = {
  title: 'Nuestro depósito y equipo',
  subtitle: 'Un vistazo al día a día en Nervado 26.',
  items: [
    ...sobreNosPhotos.map((photo, index) => ({
      id: `sobre-nos-${String(index + 1).padStart(2, '0')}`,
      type: 'image',
      src: `/images/nosotros/${photo.file}`,
      alt: photo.alt,
    })),

    /* ——— Clientes: descomentar cuando tengan fotos ———
    {
      id: 'client-ejemplo',
      type: 'client',
      src: '/images/clientes/nombre-cliente.jpg',
      alt: 'Obra de [Nombre del cliente]',
      client: { name: 'Nombre del cliente', project: 'Descripción breve de la obra' },
    },
    */
  ],
};
