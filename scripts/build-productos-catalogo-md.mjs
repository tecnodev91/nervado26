/**
 * Genera docs/PRODUCTOS-CATALOGO.md con la info completa de cada producto del catálogo.
 * Ejecutar: node scripts/build-productos-catalogo-md.mjs
 */

import { writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { materials, MATERIAL_FILTER_GROUPS } from '../src/config/materialsIndex.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = join(__dirname, '../docs/PRODUCTOS-CATALOGO.md');

const groupByMaterialId = new Map();
for (const group of MATERIAL_FILTER_GROUPS) {
  for (const id of group.materialIds) {
    groupByMaterialId.set(id, group.label);
  }
}

function escapeCell(value) {
  return String(value ?? '')
    .replace(/\|/g, '\\|')
    .replace(/\n/g, ' ');
}

function markdownTable(columns, rows) {
  if (!rows?.length || !columns?.length) {
    return '_Sin tabla de medidas._\n';
  }

  const header = `| ${columns.map(escapeCell).join(' | ')} |`;
  const separator = `| ${columns.map(() => '---').join(' | ')} |`;
  const body = rows
    .map((row) => `| ${columns.map((col) => escapeCell(row[col])).join(' | ')} |`)
    .join('\n');

  return `${header}\n${separator}\n${body}\n`;
}

function listSection(title, items) {
  if (!items?.length) return '';
  return `#### ${title}\n\n${items.map((item) => `- ${item}`).join('\n')}\n\n`;
}

function renderMaterial(material, index) {
  const group = groupByMaterialId.get(material.id) ?? '_Sin grupo de filtro_';
  const lines = [];

  lines.push(`## ${index + 1}. ${material.name}`);
  lines.push('');
  lines.push(`| Campo | Valor |`);
  lines.push(`| --- | --- |`);
  lines.push(`| **Slug** | \`${material.slug}\` |`);
  lines.push(`| **ID** | \`${material.id}\` |`);
  lines.push(`| **URL** | \`/productos/${material.slug}\` |`);
  lines.push(`| **Grupo del catálogo** | ${group} |`);
  lines.push(`| **Imagen** | \`${material.image}\` |`);
  if (material.saleUnit) lines.push(`| **Unidad de venta** | ${material.saleUnit} |`);
  if (material.brand) lines.push(`| **Marca** | ${material.brand} |`);
  if (material.measuresBadge) lines.push(`| **Badge** | ${material.measuresBadge} |`);
  if (material.itemCount > 0) {
    lines.push(`| **Medidas en catálogo** | ${material.itemCount} |`);
  }
  lines.push('');

  lines.push('### Descripción corta (card)');
  lines.push('');
  lines.push(material.description || '_Sin descripción._');
  lines.push('');

  const paragraphs =
    material.summaryParagraphs ?? (material.summary ? [material.summary] : []);
  if (paragraphs.length) {
    lines.push('### Ficha técnica — resumen');
    lines.push('');
    paragraphs.forEach((p) => {
      lines.push(p);
      lines.push('');
    });
  }

  if (material.highlights?.length) {
    lines.push(listSection('Destacados', material.highlights));
  }

  if (material.detailSections?.length) {
    lines.push('### Ficha técnica — secciones');
    lines.push('');
    for (const section of material.detailSections) {
      lines.push(listSection(section.title, section.items));
    }
  }

  if (material.howToRead) {
    lines.push('### Cómo leer la medida');
    lines.push('');
    lines.push(`**Ejemplo:** ${material.howToRead.example}`);
    lines.push('');
    if (material.howToRead.lines?.length) {
      material.howToRead.lines.forEach((line) => lines.push(`- ${line}`));
      lines.push('');
    }
  }

  const tableTitle =
    material.rows.length === 1 && material.columns.length === 1
      ? 'Consulta de medidas'
      : 'Medidas / especificaciones';

  lines.push(`### ${tableTitle}`);
  lines.push('');
  lines.push(markdownTable(material.specColumns ?? material.columns, material.rows));

  if (material.specsTableNote) {
    lines.push(`> ${material.specsTableNote}`);
    lines.push('');
  }

  if (material.variantView) {
    lines.push('### Vista por variantes');
    lines.push('');
    lines.push(`- Tipo de vista: \`${material.variantView.id ?? 'variant'}\``);
    if (material.variantView.collapsibleTableLabel) {
      lines.push(`- Tabla colapsable: ${material.variantView.collapsibleTableLabel}`);
    }
    lines.push('');
  }

  if (material.profileWView) {
    lines.push('### Perfiles W');
    lines.push('');
    lines.push('_Ficha con vista especial de perfiles W (Tipo I / Tipo H-HP)._');
    lines.push('');
  }

  lines.push('---');
  lines.push('');

  return lines.join('\n');
}

const now = new Date().toISOString().slice(0, 10);
const parts = [];

parts.push('# Catálogo de productos — Nervado 26');
parts.push('');
parts.push(`Documento generado automáticamente desde \`src/config/materialsIndex.js\`.`);
parts.push('');
parts.push(`**Fecha:** ${now}`);
parts.push(`**Total de productos:** ${materials.length}`);
parts.push('');
parts.push('## Índice');
parts.push('');
materials.forEach((m, i) => {
  parts.push(`${i + 1}. [${m.name}](#${i + 1}-${m.slug})`);
});
parts.push('');
parts.push('## Grupos del filtro lateral');
parts.push('');
for (const group of MATERIAL_FILTER_GROUPS) {
  parts.push(`- **${group.label}** (${group.count}): ${group.materialIds.map((id) => `\`${id}\``).join(', ')}`);
}
parts.push('');
parts.push('---');
parts.push('');

materials.forEach((material, index) => {
  parts.push(renderMaterial(material, index));
});

writeFileSync(outPath, parts.join('\n'), 'utf8');
console.log(`Escrito: ${outPath} (${materials.length} productos)`);
