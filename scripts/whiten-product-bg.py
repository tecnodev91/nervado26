"""Pasa a blanco el fondo gris de packshots de estudio."""
from __future__ import annotations

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]


def whiten_background(path: Path, min_luma: float = 198) -> None:
    image = Image.open(path).convert("RGB")
    pixels = image.load()
    width, height = image.size
    changed = 0

    for y in range(height):
        for x in range(width):
            r, g, b = pixels[x, y]
            saturation = max(r, g, b) - min(r, g, b)
            luma = 0.299 * r + 0.587 * g + 0.114 * b
            if saturation < 28 and luma >= min_luma:
                pixels[x, y] = (255, 255, 255)
                changed += 1

    image.save(path, format="WEBP", quality=88, method=4)
    print(f"OK {path.relative_to(ROOT)}  pixels={changed}")


if __name__ == "__main__":
    targets = [
        ROOT
        / "public/images/materiales/FOTOS - MATERIALES (X CATEGORÍA)/CLAVOS ESPIRALADOS/clavosespiralados1.webp",
    ]
    for target in targets:
        whiten_background(target)
