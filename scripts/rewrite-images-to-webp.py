"""Reescribe rutas de imagen en src/ a .webp cuando el archivo existe."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
SRC = ROOT / "src"

# Incluye paréntesis en nombres de carpeta, p.ej. (X CATEGORÍA)
PATTERN = re.compile(r'/images/[^"\']+\.(?:png|jpe?g)', re.IGNORECASE)


def to_webp_url(url: str) -> str:
    rel = url.lstrip("/")
    webp = (PUBLIC / rel).with_suffix(".webp")
    if webp.exists():
        return str(Path(url).with_suffix(".webp")).replace("\\", "/")
    return url


def main() -> None:
    changed = 0
    for path in SRC.rglob("*"):
        if path.suffix.lower() not in {".js", ".jsx"}:
            continue
        text = path.read_text(encoding="utf-8")
        new_text = PATTERN.sub(lambda m: to_webp_url(m.group(0)), text)
        if new_text != text:
            path.write_text(new_text, encoding="utf-8", newline="\n")
            changed += 1
            print(f"updated {path.relative_to(ROOT)}")
    print(f"files updated: {changed}")


if __name__ == "__main__":
    main()
