"""Genera docs/LISTADO-MATERIALES-IMAGENES.md para prompts de imágenes con IA."""

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CATALOG = ROOT / "src" / "config" / "materialsCatalog.js"
DESCRIPTIONS = ROOT / "src" / "config" / "materialDescriptions.js"
OUTPUT = ROOT / "docs" / "LISTADO-MATERIALES-IMAGENES.md"

SALE_UNIT_OVERRIDES = {
    "hierros-nervados-de-construccion": "Barras por 12 metros",
    "alambres-recocidos-o-negros": "Rollo x kilo",
    "alambres-galvanizados": "Rollo x kilo",
}

IMAGE_PROMPTS = {
    "hierros-nervados-de-construccion": (
        "Barras de acero corrugado (hierro nervado) apiladas en depósito de materiales, "
        "superficie con estrías, color gris acero, fondo industrial."
    ),
    "alambres-recocidos-o-negros": (
        "Rollos de alambre negro recocido para construcción, alambre flexible en bobinas, "
        "depósito de materiales, fondo neutro."
    ),
    "alambres-galvanizados": (
        "Rollos de alambre galvanizado brillante plateado, bobinas de alambre de acero "
        "recubierto de zinc, depósito industrial."
    ),
    "clavos-punta-paris": (
        "Clavos punta París de acero en caja o granel, clavos comunes de construcción "
        "con cabeza plana, primer plano sobre fondo de madera."
    ),
    "clavos-espiralados": (
        "Clavos espiralados helicoidales para madera, detalle del vástago en espiral, "
        "montón de clavos sobre tabla de madera."
    ),
    "clavos-negros": (
        "Clavos negros barnizados para cajones de fruta, clavos con recubrimiento oscuro, "
        "cerca de cajones de madera en depósito."
    ),
    "mallas-sima": (
        "Panel de malla electrosoldada SIMA en cuadrícula, malla de refuerzo para hormigón, "
        "apilada en galpón de materiales de construcción."
    ),
    "canos": (
        "Caños de acero estructurales cuadrados y rectangulares apilados, perfiles huecos "
        "negros, depósito de hierros, estilo industrial."
    ),
    "angulos": (
        "Perfiles de acero en L (ángulos de hierro) apilados, viguetas angulares laminadas, "
        "depósito de siderúrgica, fondo de obra."
    ),
    "planchuelas-lisas": (
        "Planchuelas o soleras de acero lisas apiladas, barras planas rectangulares de hierro, "
        "depósito de materiales de construcción."
    ),
    "hierros-lisos-redondos": (
        "Barras de hierro redondo liso, varillas cilíndricas de acero sin nervaduras, "
        "apiladas en depósito industrial."
    ),
    "perfiles-c": (
        "Perfiles C de acero galvanizado o negro apilados, vigas en forma de C para "
        "estructura liviana, galpón de materiales."
    ),
    "perfiles-upn-grandes": (
        "Vigas UPN grandes de acero laminado, perfiles en U pesados apilados en depósito "
        "de construcción, escala industrial."
    ),
    "perfiles-upn-chicos": (
        "Perfiles UPN chicos y canales U livianos de acero, viguetas metálicas menores "
        "en estantería de depósito."
    ),
}


def load_descriptions() -> dict:
    text = DESCRIPTIONS.read_text(encoding="utf-8")
    payload = text.split("=", 1)[1].strip().rstrip(";")
    return json.loads(payload)


def load_materials() -> list[dict]:
    text = CATALOG.read_text(encoding="utf-8")
    materials_match = re.search(r"export const materials = (\[.*\]);", text, re.DOTALL)
    if not materials_match:
        raise ValueError("No se encontró materials en materialsCatalog.js")
    return json.loads(materials_match.group(1))


def build_markdown(materials: list[dict], descriptions: dict) -> str:
    lines = [
        "# Materiales Nervado 26 — Listado para generación de imágenes",
        "",
        "Documento para pedir imágenes con ChatGPT u otra IA. Cada ítem incluye nombre, "
        "descripción, usos y un prompt sugerido.",
        "",
        "**Indicaciones generales para todas las imágenes:**",
        "",
        "- Estilo: fotografía realista, depósito o entorno de obra",
        "- Sin texto, logos ni marcas de agua",
        "- Buena iluminación, fondo limpio o industrial",
        "- Formato horizontal 4:3 recomendado",
        "",
        "---",
        "",
    ]

    for index, material in enumerate(materials, start=1):
        slug = material["slug"]
        name = material["name"]
        info = descriptions.get(slug, {})
        summary = info.get("summary") or material.get("description", "")
        sale_unit = SALE_UNIT_OVERRIDES.get(slug) or info.get("saleUnit", "")
        highlights = info.get("highlights", [])
        item_count = material.get("itemCount", len(material.get("rows", [])))
        image_prompt = IMAGE_PROMPTS.get(
            slug,
            f"Fotografía profesional de {name.lower()} en depósito de materiales de construcción.",
        )

        lines.append(f"## {index}. {name}")
        lines.append("")
        lines.append(f"- **ID / slug:** `{slug}`")
        lines.append(f"- **Cantidad de medidas en catálogo:** {item_count}")
        if sale_unit:
            lines.append(f"- **Unidad de venta:** {sale_unit}")
        lines.append("")
        lines.append("### Descripción")
        lines.append("")
        lines.append(summary)
        lines.append("")

        if highlights:
            lines.append("### Usos principales")
            lines.append("")
            for item in highlights:
                lines.append(f"- {item}")
            lines.append("")

        lines.append("### Prompt sugerido para imagen")
        lines.append("")
        lines.append("```")
        lines.append(
            f"{image_prompt} Fotografía realista, alta calidad, sin texto ni marcas, "
            "formato horizontal 4:3."
        )
        lines.append("```")
        lines.append("")
        lines.append("---")
        lines.append("")

    lines.append("## Resumen rápido (solo nombres)")
    lines.append("")
    for index, material in enumerate(materials, start=1):
        lines.append(f"{index}. {material['name']}")
    lines.append("")

    return "\n".join(lines)


def main() -> None:
    materials = load_materials()
    descriptions = load_descriptions()
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(build_markdown(materials, descriptions), encoding="utf-8")
    print(f"Generado: {OUTPUT} ({len(materials)} materiales)")


if __name__ == "__main__":
    main()
