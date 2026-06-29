#!/usr/bin/env bash
# Fetch the local assets the wallpaper renderer needs (flags + Google Fonts woff2)
# via curl, which trusts the agent proxy CA. Run once before render.sh if the
# flags/ or fonts/ folders are missing.
set -euo pipefail
cd "$(dirname "$0")"
mkdir -p flags fonts

# National flags (public domain) from flagcdn. England = gb-eng.
CODES="ar br fr gb-eng es pt nl de mx us ca ma hr be co ch jp sn no au eg dz ec gh"
for c in $CODES; do curl -sS -o "flags/$c.png" "https://flagcdn.com/w640/$c.png"; done
echo "flags: $(ls flags/*.png | wc -l)"

# Fonts — pull woff2 from Google Fonts and rewrite the CSS to local paths.
cd fonts
UA="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36"
curl -sS -A "$UA" "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=Work+Sans:wght@500;600;700;800&display=swap" -o gf.css
grep -oE "https://[^)]+\.woff2" gf.css | sort -u > urls.txt
cp gf.css local-fonts.css
i=0
while read -r u; do i=$((i+1)); curl -sS -o "f$i.woff2" "$u";
  esc=$(printf '%s' "$u" | sed 's/[&/\]/\\&/g'); sed -i "s/$esc/f$i.woff2/g" local-fonts.css
done < urls.txt
echo "fonts: $(ls *.woff2 | wc -l) woff2 + local-fonts.css"
