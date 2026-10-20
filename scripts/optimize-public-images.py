"""Optimiza imágenes en public/images/ para despliegue web.

- Regenera WebP (forzado) con tamaño y calidad acotados
- Convierte fotos PNG (sin transparencia útil) a JPEG liviano
- Actualiza referencias .png → .jpg en src/
- Borra PNG pesados ya convertidos (no toca logos)
"""
from __future__ import annotations

import shutil
import time
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public" / "images"
SRC = ROOT / "src"
LOGOS = PUBLIC / "logos"

# Carpetas/archivos que deben conservar PNG (transparencia / marca)
KEEP_PNG_DIRS = {LOGOS}
KEEP_PNG_NAMES = {
    "logo-aplicacion-blanco.png",
    "logo-aplicacion-color.png",
    "logo-aplicacion-negro.png",
    "logo-blanco-aplicacion.png",
    "logo-color.png",
    "logo-mark-white.png",
    "logo-navbar.png",
    "logo-white.png",
    "logo.png",
    "aplicacion-nervado-color.png",
    "nervado-negro.png",
    "logo-nav-color.png",
    "logo-footer-white.png",
}


def has_useful_alpha(img: Image.Image) -> bool:
    if img.mode in ("RGBA", "LA") or ("A" in img.getbands()):
        alpha = img.getchannel("A")
        extrema = alpha.getextrema()
        return extrema[0] < 250
    if img.mode == "P" and "transparency" in img.info:
        return True
    return False


def load_rgb(path: Path) -> Image.Image:
    img = Image.open(path)
    if img.mode in ("RGBA", "LA") or ("A" in img.getbands()):
        background = Image.new("RGB", img.size, (255, 255, 255))
        rgba = img.convert("RGBA")
        background.paste(rgba, mask=rgba.split()[-1])
        return background
    if img.mode != "RGB":
        return img.convert("RGB")
    return img


def resize_max(img: Image.Image, max_width: int) -> Image.Image:
    w, h = img.size
    if w <= max_width:
        return img
    return img.resize((max_width, int(h * max_width / w)), Image.Resampling.LANCZOS)


def save_webp(img: Image.Image, out: Path, quality: int) -> int:
    img.save(out, "WEBP", quality=quality, method=6)
    return out.stat().st_size


def save_jpeg(img: Image.Image, out: Path, quality: int) -> int:
    img.save(out, "JPEG", quality=quality, optimize=True, progressive=True)
    return out.stat().st_size


def should_keep_png(path: Path) -> bool:
    if path.name.lower() in KEEP_PNG_NAMES:
        return True
    for keep_dir in KEEP_PNG_DIRS:
        try:
            path.relative_to(keep_dir)
            return True
        except ValueError:
            pass
    return False


def export_brand_nav_logo(src: Path, dest_stem: Path, max_width: int = 480, quality: int = 90) -> None:
    if not src.exists():
        return

    before = src.stat().st_size
    img = Image.open(src)
    if img.mode not in ("RGB", "RGBA"):
        img = img.convert("RGBA" if "A" in img.getbands() else "RGB")
    img = resize_max(img, max_width)

    png_out = dest_stem.with_suffix(".png")
    webp_out = dest_stem.with_suffix(".webp")
    img.save(png_out, "PNG", optimize=True)
    save_webp(img.convert("RGBA") if img.mode == "P" else img, webp_out, quality)
    print(
        f"nav-logo {src.name} -> {png_out.name}/{webp_out.name}: "
        f"{before / 1024:.0f} KB -> {png_out.stat().st_size / 1024:.0f} KB / "
        f"{webp_out.stat().st_size / 1024:.0f} KB"
    )


def rewrite_src_references(replacements: dict[str, str]) -> int:
    """replacements: url path without leading domain, e.g. /images/foo.png -> /images/foo.jpg"""
    if not replacements:
        return 0

    changed_files = 0
    for path in SRC.rglob("*"):
        if path.suffix.lower() not in {".js", ".jsx", ".ts", ".tsx", ".css", ".md", ".json"}:
            continue
        text = path.read_text(encoding="utf-8")
        original = text
        for old, new in replacements.items():
            text = text.replace(old, new)
            # Also rewrite encodeURI-friendly already-encoded variants are rare in source
        if text != original:
            path.write_text(text, encoding="utf-8", newline="\n")
            changed_files += 1
            print(f"refs  {path.relative_to(ROOT)}")
    return changed_files


def safe_unlink(path: Path) -> bool:
    for attempt in range(5):
        try:
            path.unlink(missing_ok=True)
            return not path.exists()
        except PermissionError:
            time.sleep(0.35 * (attempt + 1))
    return False


def process_raster(
    path: Path,
    *,
    max_width: int,
    quality: int,
    replacements: dict[str, str],
) -> None:
    ext = path.suffix.lower()
    if ext not in {".png", ".jpg", ".jpeg"}:
        return

    before = path.stat().st_size
    with Image.open(path) as opened:
        img = opened.copy()

    # Logos / UI con transparencia: solo WebP + PNG optimizado liviano
    if ext == ".png" and (should_keep_png(path) or has_useful_alpha(img)):
        work = img
        if work.mode not in ("RGB", "RGBA"):
            work = work.convert("RGBA" if "A" in work.getbands() else "RGB")
        work = resize_max(work, max_width)
        webp_out = path.with_suffix(".webp")
        after_webp = save_webp(work, webp_out, quality)
        # Recomprimir PNG si quedó muy grande
        if before > 350_000:
            work.save(path, "PNG", optimize=True)
        after_png = path.stat().st_size
        print(
            f"keep-png {path.relative_to(PUBLIC)}: "
            f"{before / 1024:.0f} KB -> png {after_png / 1024:.0f} KB / webp {after_webp / 1024:.0f} KB"
        )
        return

    if img.mode in ("RGBA", "LA") or ("A" in img.getbands()):
        background = Image.new("RGB", img.size, (255, 255, 255))
        rgba = img.convert("RGBA")
        background.paste(rgba, mask=rgba.split()[-1])
        rgb = background
    elif img.mode != "RGB":
        rgb = img.convert("RGB")
    else:
        rgb = img

    rgb = resize_max(rgb, max_width)

    webp_out = path.with_suffix(".webp")
    after_webp = save_webp(rgb, webp_out, quality)

    if ext == ".png":
        jpg_out = path.with_suffix(".jpg")
        after_jpg = save_jpeg(rgb, jpg_out, quality)
        old_url = "/" + path.relative_to(PUBLIC.parent).as_posix()
        new_url = "/" + jpg_out.relative_to(PUBLIC.parent).as_posix()
        replacements[old_url] = new_url
        deleted = safe_unlink(path)
        note = "" if deleted else " (png bloqueado, queda huérfano)"
        print(
            f"png->jpg {path.relative_to(PUBLIC)}: "
            f"{before / 1024:.0f} KB -> jpg {after_jpg / 1024:.0f} KB / webp {after_webp / 1024:.0f} KB{note}"
        )
        return

    # JPEG: sobrescribir si bajamos peso
    tmp = path.with_suffix(path.suffix + ".tmp")
    after_jpg = save_jpeg(rgb, tmp, quality)
    if after_jpg < before * 0.98:
        tmp.replace(path)
        print(
            f"jpeg {path.relative_to(PUBLIC)}: "
            f"{before / 1024:.0f} KB -> {after_jpg / 1024:.0f} KB / webp {after_webp / 1024:.0f} KB"
        )
    else:
        safe_unlink(tmp)
        print(
            f"jpeg-keep {path.relative_to(PUBLIC)}: "
            f"{before / 1024:.0f} KB (webp {after_webp / 1024:.0f} KB)"
        )


def iter_targets() -> list[tuple[Path, int, int]]:
    jobs: list[tuple[Path, int, int]] = []

    def add_tree(root: Path, max_width: int, quality: int) -> None:
        if not root.exists():
            return
        for path in sorted(root.rglob("*")):
            if path.is_file() and path.suffix.lower() in {".png", ".jpg", ".jpeg"}:
                jobs.append((path, max_width, quality))

    add_tree(PUBLIC / "vista_principal", 1400, 80)
    add_tree(PUBLIC / "materiales", 1000, 80)
    add_tree(PUBLIC / "STOCK SERVICIOS", 1000, 80)
    add_tree(PUBLIC / "nosotros", 1200, 80)
    add_tree(PUBLIC / "sobre-nos", 1200, 80)
    add_tree(PUBLIC / "materiales_importantes", 1000, 80)
    add_tree(PUBLIC / "clientes", 1000, 80)

    # Logos: solo derivados livianos + webp de marca
    for path in sorted(LOGOS.glob("*")) if LOGOS.exists() else []:
        if path.suffix.lower() in {".png", ".jpg", ".jpeg"}:
            jobs.append((path, 640, 90))

    return jobs


def remove_deploy_bloat() -> None:
    """Carpetas locales pesadas que no deben ir al build (ya en .gitignore)."""
    for rel in ("sobre-nos", "materiales_importantes"):
        folder = PUBLIC / rel
        if folder.exists():
            shutil.rmtree(folder, ignore_errors=True)
            print(f"removed {folder.relative_to(ROOT)}")


def main() -> None:
    replacements: dict[str, str] = {}

    export_brand_nav_logo(
        LOGOS / "aplicacion-nervado-color.png",
        LOGOS / "logo-nav-color",
        max_width=480,
        quality=90,
    )
    blanco_src = LOGOS / "logo-aplicacion-blanco.png"
    if not blanco_src.exists():
        blanco_src = PUBLIC / "logo-aplicacion-blanco.png"
    if blanco_src.exists():
        export_brand_nav_logo(
            blanco_src,
            LOGOS / "logo-footer-white",
            max_width=320,
            quality=90,
        )

    # Generar webp de logos de marca usados en BrandLogo
    for name in ("aplicacion-nervado-color.png", "nervado-negro.png"):
        logo = LOGOS / name
        if logo.exists():
            process_raster(logo, max_width=640, quality=90, replacements=replacements)

    for path, max_w, q in iter_targets():
        # Evitar reprocesar derivados de logo ya exportados dos veces con keep rules
        process_raster(path, max_width=max_w, quality=q, replacements=replacements)

    rewritten = rewrite_src_references(replacements)
    print(f"\nReferencias actualizadas en {rewritten} archivos ({len(replacements)} rutas).")

    remove_deploy_bloat()

    # En runtime servimos WebP: borrar JPEG redundantes (excepto logos)
    removed_jpg = 0
    removed_bytes = 0
    for jpg in list(PUBLIC.rglob("*")):
        if jpg.suffix.lower() not in {".jpg", ".jpeg"}:
            continue
        if "logos" in jpg.parts:
            continue
        webp = jpg.with_suffix(".webp")
        if webp.exists():
            removed_bytes += jpg.stat().st_size
            safe_unlink(jpg)
            removed_jpg += 1
    if removed_jpg:
        print(f"removed {removed_jpg} jpeg fallbacks ({removed_bytes / (1024 * 1024):.1f} MB)")

    # Resumen
    files = [p for p in PUBLIC.rglob("*") if p.is_file()]
    total = sum(p.stat().st_size for p in files)
    print(f"public/images total: {len(files)} archivos, {total / (1024 * 1024):.1f} MB")
    print("Tip: corré también scripts/rewrite-images-to-webp.py (npm run optimize-images lo hace).")


if __name__ == "__main__":
    main()
