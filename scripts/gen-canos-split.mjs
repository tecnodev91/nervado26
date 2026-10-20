import { writeFileSync } from "fs";
import { materials } from "../src/config/materialsCatalog.js";

const canos = materials.find((m) => m.slug === "canos");
const thicknessCols = canos.columns.filter(
  (c) => !["Redondos", "Cuadrados", "Rectangulares"].includes(c)
);

function build(slug, name, col, sizeLabel) {
  const rows = canos.rows.filter((r) => r[col] && String(r[col]).trim());
  const columns = [sizeLabel, ...thicknessCols.map((t) => t + " (kg/m)")];
  const data = rows.map((r) => {
    const row = { [sizeLabel]: r[col] };
    thicknessCols.forEach((t) => {
      if (r[t]) row[t + " (kg/m)"] = r[t];
    });
    return row;
  });
  return {
    id: slug,
    slug,
    name,
    description: `${name}. Pesos por metro según espesor. Consultá disponibilidad.`,
    image: "/images/materiales/verdaderos/canos.jpg",
    columns,
    rows: data,
    itemCount: data.length,
  };
}

const split = [
  build("canos-redondos", "Caños redondos", "Redondos", "Diámetro (mm)"),
  build("canos-cuadrados", "Caños cuadrados", "Cuadrados", "Medida"),
  build("canos-rectangulares", "Caños rectangulares", "Rectangulares", "Medida"),
];

const content = `/** Caños separados desde materialsCatalog.js (slug canos) */

export const canosSplitMaterials = ${JSON.stringify(split, null, 2)};

export const canosSplitSections = canosSplitMaterials.map((m) => ({
  id: m.id,
  label: m.name,
  count: m.itemCount,
}));
`;

writeFileSync("src/config/materialsCatalogCanosSplit.js", content);
console.log(split.map((s) => `${s.slug}:${s.itemCount}`).join(", "));
