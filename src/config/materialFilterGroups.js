/**
 * Grupos de filtrado del catálogo (familias de productos).
 * Cada material debe aparecer en un solo grupo.
 * `section` agrupa visualmente el sidebar (encabezados, no filtros).
 */

export const MATERIAL_FILTER_GROUP_DEFS = [
  // — Materiales siderúrgicos —
  {
    id: 'hierros-nervados',
    label: 'Hierros nervados',
    section: 'Materiales siderúrgicos',
    materialIds: ['hierros-nervados-de-construccion'],
  },
  {
    id: 'alambres',
    label: 'Alambres',
    section: 'Materiales siderúrgicos',
    materialIds: ['alambres-recocidos-o-negros', 'alambres-galvanizados'],
  },
  {
    id: 'clavos',
    label: 'Clavos',
    section: 'Materiales siderúrgicos',
    materialIds: ['clavos-punta-paris', 'clavos-espiralados', 'clavos-negros'],
  },
  {
    id: 'mallas',
    label: 'Mallas',
    section: 'Materiales siderúrgicos',
    materialIds: ['mallas-sima'],
  },
  {
    id: 'canos',
    label: 'Caños',
    section: 'Materiales siderúrgicos',
    materialIds: [
      'canos-redondos',
      'canos-cuadrados',
      'canos-rectangulares',
      'canos-negros-uso-mecanico',
    ],
  },
  {
    id: 'angulos',
    label: 'Ángulos',
    section: 'Materiales siderúrgicos',
    materialIds: ['angulos'],
  },
  {
    id: 'planchuelas',
    label: 'Planchuelas',
    section: 'Materiales siderúrgicos',
    materialIds: ['planchuelas-lisas', 'planchuelas-perforadas'],
  },
  {
    id: 'hierros-lisos',
    label: 'Hierros lisos',
    section: 'Materiales siderúrgicos',
    materialIds: ['hierros-lisos-redondos', 'hierros-lisos-cuadrados'],
  },
  {
    id: 'perfiles',
    label: 'Perfiles y vigas',
    section: 'Materiales siderúrgicos',
    materialIds: [
      'perfiles-c',
      'perfiles-upn-grandes',
      'perfiles-upn-chicos',
      'hierro-perfil-te',
      'perfiles-ipn',
      'perfiles-w',
    ],
  },
  {
    id: 'chapas',
    label: 'Chapas',
    section: 'Materiales siderúrgicos',
    materialIds: [
      'chapas-negras-lisas',
      'chapas-galvanizadas-lisas',
      'chapas-rayadas-semilla-melon',
      'chapa-sinusoidal',
      'chapa-trapezoidal-t101',
    ],
  },
  {
    id: 'metal-desplegado',
    label: 'Metal desplegado',
    section: 'Materiales siderúrgicos',
    materialIds: ['metal-desplegado'],
  },

  // — Áridos y cemento —
  {
    id: 'cemento',
    label: 'Cemento',
    section: 'Áridos y cemento',
    materialIds: ['cemento'],
  },
  {
    id: 'arena',
    label: 'Arena',
    section: 'Áridos y cemento',
    materialIds: ['arena'],
  },
  {
    id: 'ripio',
    label: 'Ripio',
    section: 'Áridos y cemento',
    materialIds: ['ripio'],
  },
  {
    id: 'piedra-bola',
    label: 'Piedra bola',
    section: 'Áridos y cemento',
    materialIds: ['piedra-bola'],
  },
  {
    id: 'estabilizado',
    label: 'Estabilizado',
    section: 'Áridos y cemento',
    materialIds: ['estabilizado'],
  },

  // — Construcción en seco —
  {
    id: 'placas-yeso',
    label: 'Placas de yeso',
    section: 'Construcción en seco',
    materialIds: ['placas-de-yeso'],
  },
  {
    id: 'placas-cementicias',
    label: 'Placas cementicias',
    section: 'Construcción en seco',
    materialIds: ['placas-cementicias'],
  },
  {
    id: 'montantes',
    label: 'Montantes',
    section: 'Construcción en seco',
    materialIds: ['montantes'],
  },
  {
    id: 'soleras',
    label: 'Soleras',
    section: 'Construcción en seco',
    materialIds: ['soleras'],
  },
  {
    id: 'cantoneras',
    label: 'Cantoneras',
    section: 'Construcción en seco',
    materialIds: ['cantoneras'],
  },
  {
    id: 'angulo-de-ajuste',
    label: 'Ángulo de ajuste',
    section: 'Construcción en seco',
    materialIds: ['angulo-de-ajuste'],
  },
  {
    id: 'perfil-omega',
    label: 'Perfil Omega',
    section: 'Construcción en seco',
    materialIds: ['perfil-omega'],
  },
  {
    id: 'tornilleria',
    label: 'Tornillería',
    section: 'Construcción en seco',
    materialIds: [
      'tornillo-t2-punta-aguja',
      'tornillo-t1-punta-aguja',
      'tornillo-t1-punta-mecha',
      'tornillo-fix-dorado-con-tarugo',
    ],
  },

  // — Aislantes e impermeabilización —
  {
    id: 'aislantes-impermeabilizacion',
    label: 'Aislantes e impermeabilización',
    materialIds: ['membranas'],
  },

  // — Cierres perimetrales y seguridad —
  {
    id: 'cierres-perimetrales-seguridad',
    label: 'Cierres perimetrales y seguridad',
    materialIds: ['telas-romboidales', 'concertinas', 'rafias'],
  },

  // — Máquinas y herramientas —
  {
    id: 'maquinas-herramientas',
    label: 'Máquinas y herramientas',
    materialIds: ['maquinas-herramientas-gamma'],
  },

  // — Materiales eléctricos —
  {
    id: 'materiales-electricos',
    label: 'Materiales eléctricos',
    materialIds: ['materiales-electricos'],
  },

  // — Sin sección (final del listado) —
  {
    id: 'cintas',
    label: 'Cintas',
    materialIds: [
      'cinta-estanqueidad-banda-acustica',
      'cinta-butilica-autoadhesiva',
      'cinta-papel-microperforada',
      'cinta-tramada-fibra-vidrio',
    ],
  },
  {
    id: 'masillas',
    label: 'Masillas',
    materialIds: ['masillas-construccion-seco'],
  },
  {
    id: 'ladrillos',
    label: 'Ladrillos',
    materialIds: ['ladrillos'],
  },
];

/** IDs antiguos → grupos actuales (enlaces ?grupo=... del hero y destacados). */
export const MATERIAL_FILTER_GROUP_ALIASES = {
  agregados: ['arena', 'ripio', 'piedra-bola', 'estabilizado'],
  'montantes-soleras': ['montantes', 'soleras', 'cantoneras', 'angulo-de-ajuste', 'perfil-omega'],
};

export function expandFilterGroupIds(ids) {
  const expanded = new Set();

  for (const id of ids) {
    const alias = MATERIAL_FILTER_GROUP_ALIASES[id];
    if (alias) {
      alias.forEach((item) => expanded.add(item));
    } else {
      expanded.add(id);
    }
  }

  return [...expanded];
}
