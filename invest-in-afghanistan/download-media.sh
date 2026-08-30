#!/usr/bin/env bash
# Downloads every image and video the site uses into ./media
# Run once, then the whole folder works offline and can be zipped as-is.
#   bash download-media.sh
set -u
cd "$(dirname "$0")"
mkdir -p media
ok=0; fail=0
get(){ # get <outfile> <url>
  if [ -s "media/$1" ]; then echo "  = $1 (already there)"; ok=$((ok+1)); return; fi
  if curl -fsSL --retry 2 -o "media/$1" "$2"; then echo "  + $1"; ok=$((ok+1));
  else echo "  ! $1 FAILED"; rm -f "media/$1"; fail=$((fail+1)); fi
}
echo "Downloading images…"
get "hero.jpg" "https://d8j0ntlcm91z4.cloudfront.net/user_3EySZIHS96lw8w2EzUMJbOz80lR/hf_20260728_202247_2968e3da-4603-473a-9512-9691f8d36339.png"
get "lakes.jpg" "https://d8j0ntlcm91z4.cloudfront.net/user_3EySZIHS96lw8w2EzUMJbOz80lR/hf_20260728_202237_e4894d9a-2eeb-4bf9-a29e-840acb3353e7.png"
get "valley.jpg" "https://d8j0ntlcm91z4.cloudfront.net/user_3EySZIHS96lw8w2EzUMJbOz80lR/hf_20260728_202257_de6ae476-d822-4a6a-bf8f-4302272438cd.png"
get "park.jpg" "https://d8j0ntlcm91z4.cloudfront.net/user_3EySZIHS96lw8w2EzUMJbOz80lR/hf_20260728_200909_bd0e43f8-1a5d-45d6-bc82-28cc08a91a58.png"
get "corridor.jpg" "https://d8j0ntlcm91z4.cloudfront.net/user_3EySZIHS96lw8w2EzUMJbOz80lR/hf_20260728_200900_dd2094b5-a426-4eb1-a335-3175e4e32d8e.png"
get "mining.jpg" "https://images.unsplash.com/photo-1523848309072-c199db53f137?auto=format&fit=crop&w=1600&q=75"
get "agri.jpg" "https://images.unsplash.com/photo-1615885108069-7d5bef9a7e22?auto=format&fit=crop&w=1600&q=75"
get "energy.jpg" "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1600&q=75"
get "biz.jpg" "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=75"
get "factory.jpg" "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1600&q=75"
get "saffron.jpg" "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1600&q=75"
echo "Downloading sector & project images…"
get "coldchain.jpg" "https://d8j0ntlcm91z4.cloudfront.net/user_3EySZIHS96lw8w2EzUMJbOz80lR/hf_20260729_002933_43e6b48d-b74e-498c-a51c-0063e27c319b.png"
get "solarfarm.jpg" "https://d8j0ntlcm91z4.cloudfront.net/user_3EySZIHS96lw8w2EzUMJbOz80lR/hf_20260729_002936_d77999d3-8acf-43f8-8570-2fed332d8463.png"
get "copper.jpg" "https://d8j0ntlcm91z4.cloudfront.net/user_3EySZIHS96lw8w2EzUMJbOz80lR/hf_20260729_002944_64a19a08-5667-41be-b5c3-41abec22e74a.png"
get "textile.jpg" "https://d8j0ntlcm91z4.cloudfront.net/user_3EySZIHS96lw8w2EzUMJbOz80lR/hf_20260729_002946_98f4071b-f91f-4901-8424-c6b597b81a8a.png"
get "cargo.jpg" "https://d8j0ntlcm91z4.cloudfront.net/user_3EySZIHS96lw8w2EzUMJbOz80lR/hf_20260729_002954_6a0940cb-8e22-460b-ade8-9cc11a1fad0e.png"
get "storage.jpg" "https://d8j0ntlcm91z4.cloudfront.net/user_3EySZIHS96lw8w2EzUMJbOz80lR/hf_20260729_002957_e4f2fe5f-f0f1-4a37-a209-c3501d702e83.png"
get "marble.jpg" "https://d8j0ntlcm91z4.cloudfront.net/user_3EySZIHS96lw8w2EzUMJbOz80lR/hf_20260729_003008_fc4dd240-3a5a-48c2-b95d-e4b2e0aa92cb.png"
get "foodproc.jpg" "https://d8j0ntlcm91z4.cloudfront.net/user_3EySZIHS96lw8w2EzUMJbOz80lR/hf_20260729_003011_ae828196-05a3-44f0-95ff-01f5d0c99a2c.png"
get "bonded.jpg" "https://d8j0ntlcm91z4.cloudfront.net/user_3EySZIHS96lw8w2EzUMJbOz80lR/hf_20260729_003019_b7cdc25a-ccb2-4f3d-a28e-d2dc08c51713.png"
get "packaging.jpg" "https://d8j0ntlcm91z4.cloudfront.net/user_3EySZIHS96lw8w2EzUMJbOz80lR/hf_20260729_003024_60c5bdf4-f7a0-48b8-96f2-c06d1e627ea7.png"
get "hydro.jpg" "https://d8j0ntlcm91z4.cloudfront.net/user_3EySZIHS96lw8w2EzUMJbOz80lR/hf_20260729_003032_0c7dc6dd-f771-45c9-8e70-e9049b947c9e.png"
get "infra.jpg" "https://d8j0ntlcm91z4.cloudfront.net/user_3EySZIHS96lw8w2EzUMJbOz80lR/hf_20260729_003035_65ed84fa-bac1-4b8d-b22e-c7f057b0d175.png"
get "solarpark.jpg" "https://d8j0ntlcm91z4.cloudfront.net/user_3EySZIHS96lw8w2EzUMJbOz80lR/hf_20260729_003042_8da5ba38-59a1-4e38-a7bb-7a8af6499942.png"
get "briefing.jpg" "https://d8j0ntlcm91z4.cloudfront.net/user_3EySZIHS96lw8w2EzUMJbOz80lR/hf_20260729_020041_ede9285e-7221-4f93-bed5-719bc703d02a.png"
get "operating.jpg" "https://d8j0ntlcm91z4.cloudfront.net/user_3EySZIHS96lw8w2EzUMJbOz80lR/hf_20260729_020059_0731da54-360a-4046-a4a5-b57c9b58ac67.png"
echo "Downloading hero videos (these are larger)…"
get "hero-1-hindu-kush.mp4" "https://d8j0ntlcm91z4.cloudfront.net/user_3EySZIHS96lw8w2EzUMJbOz80lR/hf_20260728_202641_ecf0bdfe-8ad5-41de-9120-2450d6fbad0b.mp4"
get "hero-2-band-e-amir.mp4" "https://d8j0ntlcm91z4.cloudfront.net/user_3EySZIHS96lw8w2EzUMJbOz80lR/hf_20260728_202623_4dac449c-6a93-469a-96b4-44d45ace3990.mp4"
get "hero-3-green-valley.mp4" "https://d8j0ntlcm91z4.cloudfront.net/user_3EySZIHS96lw8w2EzUMJbOz80lR/hf_20260728_202700_494e22ab-bff8-48bf-9c4e-2be5d81e3bcb.mp4"
get "hero-4-trade-corridor.mp4" "https://d8j0ntlcm91z4.cloudfront.net/user_3EySZIHS96lw8w2EzUMJbOz80lR/hf_20260728_201041_4f14dea7-d1cc-403e-87ed-6bb561c8491c.mp4"
echo ""
echo "Done — $ok file(s) present, $fail failed."
if [ "$fail" -gt 0 ]; then echo "Pages still work: anything missing falls back to the hosted copy."; fi
echo "You can now zip this folder and hand it over."
