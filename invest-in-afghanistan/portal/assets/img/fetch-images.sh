#!/usr/bin/env bash
# Localise the opportunity images for a fully offline build.
#
# The prototype references generated opportunity artwork from a CDN so the
# cards render without any setup. Run this script to download those images
# into this folder, then edit assets/app.js and change:
#     var CDNB='https://.../user_3EySZIHS96lw8w2EzUMJbOz80lR/';
# to:
#     var CDNB='assets/img/';
# and rebuild (python3 build.py). The portal is then fully self-contained.
#
# Usage:  cd portal/assets/img && bash fetch-images.sh

set -e
BASE="https://d8j0ntlcm91z4.cloudfront.net/user_3EySZIHS96lw8w2EzUMJbOz80lR"

FILES=(
  "hf_20260730_220313_bdc0e64c-a591-413e-94ad-da0c16b0ee33_min.webp"  # Herat Cold Chain Network
  "hf_20260730_220315_b4bde463-938e-4cb2-bd08-d5cfa8aab5e6_min.webp"  # Kajaki Solar Extension
  "hf_20260730_220318_9a8fab6b-70ee-4f1a-9b18-6780fb270b62_min.webp"  # Aynak Downstream Processing
  "hf_20260730_220326_d70274ac-cec1-423e-af8e-d7b33d472822_min.webp"  # Mazar Textile Cluster
  "hf_20260730_220328_f3a5de94-39e3-411e-88db-d060cdbc951a_min.webp"  # Kabul Cargo Terminal
  "hf_20260730_220331_56cf774e-eda0-4695-96e2-9a1bfd788007_min.webp"  # Bamyan Potato Storage
)

for f in "${FILES[@]}"; do
  echo "Downloading $f"
  curl -fSs -o "$f" "$BASE/$f"
done

echo "Done. ${#FILES[@]} images saved to $(pwd)."
echo "Now set  var CDNB='assets/img/';  in assets/app.js and rebuild."
