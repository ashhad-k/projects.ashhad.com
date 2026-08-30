/**
 * Downloads PNGs from scripts/figma-image-export-urls.json into assets/images/... (see asset-paths.mjs).
 * URLs expire quickly — re-run Figma get_screenshot and regenerate the urls file.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import { assetDirForFigmaFolder } from "./asset-paths.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const urlsPath = path.join(__dirname, "figma-image-export-urls.json");
const list = JSON.parse(fs.readFileSync(urlsPath, "utf8"));

let ok = 0;
for (const { folder, file, url } of list) {
  const dir = path.join(root, "assets", assetDirForFigmaFolder(folder));
  fs.mkdirSync(dir, { recursive: true });
  const out = path.join(dir, file);
  const r = spawnSync("curl", ["-sL", "-o", out, url], { encoding: "utf8" });
  if (r.status !== 0) {
    console.error("curl failed", folder, file, r.stderr);
    process.exit(1);
  }
  const st = fs.statSync(out);
  if (st.size < 100) {
    console.error("tiny file (bad url?)", out, st.size);
    process.exit(1);
  }
  ok++;
  console.log(out, st.size);
}
console.log("Downloaded", ok, "files");
