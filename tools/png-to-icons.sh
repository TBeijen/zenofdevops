#!/usr/bin/env bash
#
# Generate favicon variants from a source PNG.
# Usage: ./tools/png-to-icons.sh <source.png>
#
# Outputs all files to static/ (overwriting existing):
#   favicon.ico            (multi-size: 48, 32, 16)
#   favicon-16x16.png
#   favicon-32x32.png
#   apple-touch-icon.png   (180x180)
#   android-chrome-192x192.png
#   android-chrome-512x512.png
#

set -euo pipefail

STATIC_DIR="static"

# --- Validate prerequisites ---

if ! command -v magick &>/dev/null; then
    echo "Error: ImageMagick 7 (magick) is required but not found."
    echo "Install via: brew install imagemagick"
    exit 1
fi

if [[ $# -ne 1 ]]; then
    echo "Usage: $0 <source.png>"
    exit 1
fi

SOURCE="$1"

if [[ ! -f "$SOURCE" ]]; then
    echo "Error: File not found: $SOURCE"
    exit 1
fi

if ! file "$SOURCE" | grep -qi png; then
    echo "Error: $SOURCE does not appear to be a PNG file."
    exit 1
fi

# --- Check source dimensions ---

DIMS=$(magick identify -format "%wx%h" "$SOURCE")
echo "Source: $SOURCE ($DIMS)"

WIDTH=$(echo "$DIMS" | cut -dx -f1)
if [[ "$WIDTH" -lt 512 ]]; then
    echo "Warning: Source is smaller than 512px. Results may be blurry."
fi

# --- Generate variants ---

echo ""
echo "Generating favicons into $STATIC_DIR/..."

magick "$SOURCE" -resize 16x16   "$STATIC_DIR/favicon-16x16.png"
echo "  favicon-16x16.png"

magick "$SOURCE" -resize 32x32   "$STATIC_DIR/favicon-32x32.png"
echo "  favicon-32x32.png"

magick "$SOURCE" -resize 180x180 "$STATIC_DIR/apple-touch-icon.png"
echo "  apple-touch-icon.png"

magick "$SOURCE" -resize 192x192 "$STATIC_DIR/android-chrome-192x192.png"
echo "  android-chrome-192x192.png"

magick "$SOURCE" -resize 512x512 "$STATIC_DIR/android-chrome-512x512.png"
echo "  android-chrome-512x512.png"

magick "$SOURCE" -resize 48x48 -define icon:auto-resize=48,32,16 "$STATIC_DIR/favicon.ico"
echo "  favicon.ico (48, 32, 16)"

echo ""
echo "Done."
