/**
 * Ficha híbrida: variantes compactas + tabla completa colapsable.
 */

export const MATERIAL_VARIANT_VIEWS = {
  'mallas-sima': {
    title: 'Modelos disponibles',
    cardBadge: 'Malla',
    collapsibleTableLabel: 'Ver ficha técnica completa',
    titleColumn: 'Den.',
    groups: [
      {
        id: 'estandar',
        label: 'Paneles estándar',
        rowStart: 0,
        rowEnd: 14,
      },
      {
        id: 'panel-240',
        label: 'Paneles de 2,40 × 3,00 m',
        rowStart: 15,
        rowEnd: 18,
        denSuffix: ' — 2,40 × 3,00 m',
      },
    ],
  },
  'perfiles-ipn': {
    title: 'Medidas disponibles',
    cardBadge: 'IPN',
    collapsibleTableLabel: 'Ver tabla completa de medidas',
    titleColumn: 'Perfil',
    compactLineKeys: ['Altura h', 'Ancho b', 'Peso aprox.'],
    groups: [
      {
        id: 'all',
        label: '',
        rowStart: 0,
        rowEnd: 22,
        hideLabel: true,
      },
    ],
  },
  'perfiles-c': {
    title: 'Medidas disponibles',
    cardBadge: 'Perfil C',
    collapsibleTableLabel: 'Ver tabla completa de medidas',
    titleColumn: 'Medidas',
    compactLineKeys: ['Sección (cm²)', 'Peso (kg/mt)'],
    compactLineSuffix: {
      'Sección (cm²)': ' cm²',
      'Peso (kg/mt)': ' kg/m',
    },
    displayColumns: ['Medidas', 'Sección (cm²)', 'Peso (kg/mt)'],
    hideCollapsibleTable: true,
    groups: [
      {
        id: 'all',
        label: '',
        rowStart: 0,
        rowEnd: 37,
        hideLabel: true,
      },
    ],
  },
  'perfiles-upn-grandes': {
    title: 'Medidas disponibles',
    cardBadge: 'UPN',
    collapsibleTableLabel: 'Ver tabla completa de medidas',
    titleColumn: 'UPN',
    titlePrefix: 'UPN ',
    compactLineKeys: ['h (mm)', 'b (mm)', 'Peso (kg/m)'],
    compactLineSuffix: {
      'h (mm)': ' mm',
      'b (mm)': ' mm',
      'Peso (kg/m)': ' kg/m',
    },
    displayColumns: ['UPN', 'h (mm)', 'b (mm)', 'Peso (kg/m)'],
    groups: [
      {
        id: 'all',
        label: '',
        rowStart: 0,
        rowEnd: 15,
        hideLabel: true,
      },
    ],
  },
  'canos-redondos': {
    type: 'canos-by-measure',
    title: 'Medidas disponibles',
    cardBadge: 'Caño',
    measureColumn: 'Diámetro (mm)',
    showSearch: true,
  },
  'canos-cuadrados': {
    type: 'canos-by-measure',
    title: 'Medidas disponibles',
    cardBadge: 'Caño',
    measureColumn: 'Medida',
  },
  'canos-rectangulares': {
    type: 'canos-by-measure',
    title: 'Medidas disponibles',
    cardBadge: 'Caño',
    measureColumn: 'Medida',
  },
};
