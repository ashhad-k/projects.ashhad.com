/**
 * Maps Figma export "folder" slugs (from build-figma-image-manifest) to paths under /assets/.
 * Heroes stay in /assets/hero/; raster exports go under /assets/images/...
 */
export const FIGMA_FOLDER_TO_ASSET_DIR = {
  home: "images/home",
  announcements: "images/announcements",
  license: "images/license",
  awards: "images/awards",
  mt5: "images/platforms/mt5",
  "stp-portal": "images/platforms/stp-portal",
  "social-trading": "images/platforms/social-trading",
  "account-types": "images/account-types",
  "account-types-more": "images/account-types",
  "special-service-4": "images/special-services/anti-margin-call",
  "special-service-5": "images/special-services/negative-margin-hedge",
  "special-service-6": "images/special-services/vps",
  "special-service-7": "images/special-services/priority",
  "special-service-8": "images/special-services/trading-indicators",
  champions: "images/champions",
  "champions-faq": "images/champions",
  "champions-rules": "images/champions",
  "champions-pastwinners": "images/champions",
  about: "images/about",
  education: "images/education",
  partnership: "images/partnership",
};

/** @param {string} folder */
export function assetDirForFigmaFolder(folder) {
  return FIGMA_FOLDER_TO_ASSET_DIR[folder] ?? `images/${folder}`;
}
