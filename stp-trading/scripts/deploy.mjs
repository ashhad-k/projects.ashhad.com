/**
 * Upload site changes to the live FTPS host (reads .vscode/sftp.json).
 * By default only uploads files changed since the last successful deploy.
 *
 * Usage:
 *   npm run deploy          — changed files only
 *   npm run deploy:all      — full site sync
 *   npm run deploy:verbose  — changed files + FTP debug log
 */
import { Client } from "basic-ftp";
import { createHash } from "node:crypto";
import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join, posix, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(fileURLToPath(new URL(".", import.meta.url)), "..");
const CONFIG_PATH = join(ROOT, ".vscode", "sftp.json");
const CACHE_PATH = join(ROOT, ".deploy-cache.json");

function loadConfig() {
  return JSON.parse(readFileSync(CONFIG_PATH, "utf8"));
}

function loadCache() {
  try {
    return JSON.parse(readFileSync(CACHE_PATH, "utf8"));
  } catch {
    return {};
  }
}

function saveCache(cache) {
  writeFileSync(CACHE_PATH, `${JSON.stringify(cache, null, 2)}\n`, "utf8");
}

function fileFingerprint(abs) {
  const stat = statSync(abs);
  const hash = createHash("sha1").update(readFileSync(abs)).digest("hex");
  return `${stat.size}:${stat.mtimeMs}:${hash}`;
}

function globToRegExp(pattern) {
  const normalized = pattern.replace(/\\/g, "/");
  let re = "^";
  for (let i = 0; i < normalized.length; i += 1) {
    const ch = normalized[i];
    if (ch === "*") {
      if (normalized[i + 1] === "*") {
        re += ".*";
        i += 1;
      } else {
        re += "[^/]*";
      }
    } else if (ch === "?") {
      re += ".";
    } else if (/[.+^${}()|[\]\\]/.test(ch)) {
      re += `\\${ch}`;
    } else {
      re += ch;
    }
  }
  re += "$";
  return new RegExp(re);
}

function shouldIgnore(relativePosix, ignorePatterns) {
  const parts = relativePosix.split("/");
  for (const part of parts) {
    if (part === "node_modules" || part === ".git" || part === ".cursor") {
      return true;
    }
  }

  return ignorePatterns.some((pattern) => {
    const normalized = pattern.replace(/\\/g, "/");
    if (normalized.includes("/")) {
      return globToRegExp(normalized).test(relativePosix);
    }
    return parts.some((part) => globToRegExp(normalized).test(part));
  });
}

function collectFiles(dir, ignorePatterns, files = [], base = dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const abs = join(dir, entry.name);
    const rel = relative(base, abs).split(sep).join("/");

    if (shouldIgnore(rel, ignorePatterns)) {
      continue;
    }

    if (entry.isDirectory()) {
      collectFiles(abs, ignorePatterns, files, base);
    } else if (entry.isFile()) {
      files.push({ abs, rel });
    }
  }
  return files;
}

function selectFiles(files, cache, fullSync) {
  if (fullSync) {
    return files;
  }

  return files.filter(({ abs, rel }) => cache[rel] !== fileFingerprint(abs));
}

async function uploadFiles(client, remoteRoot, files) {
  let uploaded = 0;

  for (const { abs, rel } of files) {
    const remotePath = posix.join(remoteRoot, rel);
    await client.ensureDir(posix.dirname(remotePath));
    await client.uploadFrom(abs, remotePath);
    uploaded += 1;
    process.stdout.write(`\rUploaded ${uploaded}/${files.length} file(s)`);
  }

  if (files.length > 0) {
    process.stdout.write("\n");
  }

  return uploaded;
}

async function main() {
  const fullSync = process.argv.includes("--all");
  const verbose = process.argv.includes("--verbose");
  const config = loadConfig();
  const ignore = [
    ...(config.ignore ?? []),
    "scripts/**",
    "docs/**",
    "package.json",
    "package-lock.json",
    ".gitignore",
    ".deploy-cache.json",
  ];

  const allFiles = collectFiles(ROOT, ignore);
  const cache = loadCache();
  const files = selectFiles(allFiles, cache, fullSync);

  if (files.length === 0) {
    console.log("No changes to deploy — live site is already up to date.");
    return;
  }

  const client = new Client(60_000);
  client.ftp.verbose = verbose;

  console.log(`Connecting to ${config.host}…`);
  await client.access({
    host: config.host,
    port: config.port ?? 21,
    user: config.username,
    password: config.password,
    secure: config.secure === true ? true : config.secure ?? false,
  });

  const remoteRoot = (config.remotePath ?? "/").replace(/\\/g, "/");
  const mode = fullSync ? "full sync" : "changed files";
  console.log(`Uploading ${files.length} ${mode} to ${remoteRoot}…`);

  await uploadFiles(client, remoteRoot, files);
  client.close();

  const nextCache = { ...cache };
  for (const { abs, rel } of allFiles) {
    nextCache[rel] = fileFingerprint(abs);
  }
  saveCache(nextCache);

  console.log(`Done — ${files.length} file(s) are live.`);
}

main().catch((error) => {
  console.error("\nDeploy failed:", error.message ?? error);
  process.exit(1);
});
