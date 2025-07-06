#!/bin/bash

# Check dependencies
for cmd in fontforge ttx woff2_compress; do
  if ! command -v $cmd &> /dev/null; then
    echo "❌ Missing command: $cmd. Please install it first."
    exit 1
  fi
done

# Check input
if [ -z "$1" ]; then
  echo "Usage: $0 /path/to/folder"
  exit 1
fi

INPUT_DIR="$1"

if [ ! -d "$INPUT_DIR" ]; then
  echo "❌ Directory not found: $INPUT_DIR"
  exit 1
fi

echo "📁 Processing all .otf files in: $INPUT_DIR"

CUSTOM_LICENSE="This San Francisco Font is licensed to you by Apple Inc."

find "$INPUT_DIR" -type f -name "*.otf" | while read -r otf_file; do
  base_name="$(basename "$otf_file" .otf)"
  dir_name="$(dirname "$otf_file")"

  echo "🔄 Processing: $base_name.otf"

  ttf_file="$dir_name/$base_name.ttf"
  ttx_file="$dir_name/$base_name.ttx"

  # Step 1: OTF → TTF
  fontforge -lang=ff -c "Open(\"$otf_file\"); Generate(\"$ttf_file\")" >/dev/null 2>&1
  if [ ! -f "$ttf_file" ]; then
    echo "⚠️ Failed to convert $base_name.otf to .ttf"
    continue
  fi

  # Step 2: TTF → TTX
  ttx "$ttf_file" >/dev/null 2>&1
  if [ ! -f "$ttx_file" ]; then
    echo "⚠️ Failed to generate TTX from $base_name.ttf"
    rm -f "$ttf_file"
    continue
  fi

  # Step 3: Replace license text in all nameID="13" entries
  # Works even across multiple lines
  perl -0777 -i -pe "s{(<namerecord[^>]*nameID=\"13\"[^>]*>).*?(</namerecord>)}{\$1$CUSTOM_LICENSE\$2}gs" "$ttx_file"

  # Step 3b: Sync version in nameID="5" to match head fontRevision

  # Extract fontRevision from <head> table (e.g. 1.00000)
  FONT_REV=$(grep -A1 "<fontRevision" "$ttx_file" | grep -oE "[0-9]+\.[0-9]+" | head -n1)

  # Safety check
  if [ -z "$FONT_REV" ]; then
    echo "❌ Failed to extract fontRevision from $ttx_file"
    continue
  fi

  # Format version string strictly: "Version 1.00000"
  VERSION_STRING="Version ${FONT_REV}00"

  # Replace all nameID="5" entries with proper version string
  perl -0777 -i -pe "s{(<namerecord[^>]*nameID=\"5\"[^>]*>).*?(</namerecord>)}{\$1$VERSION_STRING\$2}gs" "$ttx_file"

  # Step 4: TTX → TTF (rebuild)
  ttx -f "$ttx_file" >/dev/null 2>&1
  if [ ! -f "$ttf_file" ]; then
    echo "⚠️ Failed to rebuild TTF from edited TTX"
    rm -f "$ttx_file"
    continue
  fi

  # Step 5: TTF → WOFF2
  woff2_compress "$ttf_file" >/dev/null 2>&1
  if [ -f "$dir_name/$base_name.woff2" ]; then
    echo "✅ Success: $base_name.woff2 created"
  else
    echo "⚠️ Failed to generate WOFF2 for $base_name"
  fi

  # Step 6: Cleanup
  rm -f "$ttf_file" "$ttx_file" "$dir_name/$base_name.#*.ttx"

done

echo "🏁 All fonts processed."

