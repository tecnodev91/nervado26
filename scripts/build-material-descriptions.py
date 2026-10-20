"""Extrae descripciones desde docs/DESCRIPCION Y FICHA TECNICA ARTICULOS.docx"""

import json
import re
import unicodedata
import zipfile
import xml.etree.ElementTree as ET
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DOCX = ROOT / "docs" / "DESCRIPCION Y FICHA TECNICA ARTICULOS.docx"
OUT = ROOT / "src" / "config" / "materialDescriptions.js"

SHEETS = [
    ("hierros-nervados-de-construccion", "HIERROS NERVADOS DE CONSTRUCCION"),
    ("alambres-recocidos-o-negros", "ALAMBRES RECOCIDOS O NEGROS"),
    ("alambres-galvanizados", "ALAMBRES GALVANIZADOS"),
    ("clavos-punta-paris", "CLAVOS PUNTA PARIS"),
    ("clavos-espiralados", "CLAVOS ESPIRALADOS"),
    ("clavos-negros", "CLAVOS NEGROS"),
    ("mallas-sima", "MALLAS SIMA"),
    ("canos", "CANOS"),
    ("angulos", "ANGULOS"),
    ("planchuelas-lisas", "PLANCHUELAS LISAS"),
    ("hierros-lisos-redondos", "HIERROS LISOS REDONDOS"),
    ("perfiles-c", "PERFILES C"),
    ("perfiles-upn-grandes", "PERFILES UPN GRANDES"),
    ("perfiles-upn-chicos", "PERFILES UPN CHICOS"),
]

SKIP_TITLES = {
    "USOS PRINCIPALES",
    "USOS PRINCIPALES EN LA CONSTRUCCION",
    "CONSTRUCCION Y OBRA CIVIL",
    "PRINCIPALES USOS",
    "PRINCIPALES USOS Y APLICACIONES",
    "PRINCIPALES AREAS DE APLICACION",
    "CARACTERISTICAS CLAVE",
    "VENTAJAS CLAVE",
    "CARACTERISTICAS Y BENEFICIOS PRINCIPALES",
    "APLICACIONES MAS COMUNES",
    "USOS PRINCIPALES DEL ALAMBRE GALVANIZADO",
    "USOS PRINCIPALES EN LA CONSTRUCCION E INDUSTRIA",
    "MATERIALES SIDERURGICOS",
    "ALAMBRES",
    "CLAVOS",
    "MALLAS",
}

SALE_OVERRIDES = {
    "hierros-nervados-de-construccion": "BARRAS POR 12 METROS",
    "alambres-recocidos-o-negros": "ROLLO X KILO",
    "alambres-galvanizados": "ROLLO X KILO",
    "clavos-punta-paris": "POR KILO",
    "clavos-espiralados": "POR KILO",
    "clavos-negros": "POR KILO",
    "mallas-sima": "POR UNIDAD",
    "canos": "POR UNIDAD DE 6 METROS",
    "planchuelas-lisas": "BARRAS POR 6 METROS",
    "hierros-lisos-redondos": "BARRAS POR 6 Y 12 METROS",
    "perfiles-upn-chicos": "BARRAS POR 6 METROS",
}


def norm(text: str) -> str:
    text = unicodedata.normalize("NFKD", text).encode("ascii", "ignore").decode("ascii")
    text = text.upper()
    return re.sub(r"\s+", " ", text).strip()


def read_paragraphs() -> list[str]:
    with zipfile.ZipFile(DOCX) as archive:
        root = ET.fromstring(archive.read("word/document.xml"))

    namespace = "{http://schemas.openxmlformats.org/wordprocessingml/2006/main}"
    paragraphs: list[str] = []

    for paragraph in root.iter(f"{namespace}p"):
        parts: list[str] = []
        for node in paragraph.iter(f"{namespace}t"):
            if node.text:
                parts.append(node.text)
            if node.tail:
                parts.append(node.tail)
        line = "".join(parts).strip()
        if line:
            paragraphs.append(line)

    return paragraphs


def split_sections(paragraphs: list[str]) -> dict[str, list[str]]:
    sections = {slug: [] for slug, _ in SHEETS}
    current = None
    pending_unit = ""

    for line in paragraphs:
        normalized = norm(line)

        if normalized.startswith("UNIDAD DE VENTA") and current is None:
            pending_unit = line.split(":", 1)[1].strip()
            continue

        header = None
        for slug, key in SHEETS:
            if normalized == key:
                header = slug
                break

        if header:
            current = header
            if pending_unit:
                sections[current].insert(0, f"UNIDAD DE VENTA: {pending_unit}")
                pending_unit = ""
            continue

        if current:
            sections[current].append(line)

    return sections


def parse_section(slug: str, lines: list[str]) -> dict:
    sale_unit = SALE_OVERRIDES.get(slug, "")
    summary = ""
    highlights: list[str] = []

    for line in lines:
        normalized = norm(line)

        if normalized.startswith("UNIDAD DE VENTA"):
            if not sale_unit:
                sale_unit = line.split(":", 1)[1].strip()
            continue

        if normalized in SKIP_TITLES:
            continue

        if not summary and len(line) > 90:
            summary = line
            continue

        if len(line) < 55 and line.isupper():
            continue

        highlights.append(line)

    return {
        "saleUnit": sale_unit,
        "summary": summary,
        "highlights": highlights[:10],
    }


def main() -> None:
    paragraphs = read_paragraphs()
    sections = split_sections(paragraphs)
    descriptions = {slug: parse_section(slug, sections[slug]) for slug, _ in SHEETS}

    OUT.write_text(
        "/** Descripciones desde docs/DESCRIPCION Y FICHA TECNICA ARTICULOS.docx */\n\n"
        f"export const materialDescriptions = {json.dumps(descriptions, ensure_ascii=False, indent=2)};\n",
        encoding="utf-8",
    )

    print(f"Wrote {OUT}")


if __name__ == "__main__":
    main()
