import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const outDir = path.join(root, "public");
const outCardDir = path.join(outDir, "card_game");

// 1) Ensure output directory exists
fs.mkdirSync(outCardDir, { recursive: true });

// 2) Copy static app files into /public
fs.copyFileSync(path.join(root, "card_game", "card-game.html"), path.join(outCardDir, "card-game.html"));
fs.copyFileSync(path.join(root, "card_game", "config.example.js"), path.join(outCardDir, "config.example.js"));

// 3) Generate config.js inside /public (never commit secrets)
const SUPABASE_URL = process.env.SUPABASE_URL?.trim() || "";
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY?.trim() || "";

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn(
    `[vercel-build] SUPABASE_URL / SUPABASE_ANON_KEY not set. ` +
      `Deploying with Supabase disabled (game still runs).`
  );
}

const configJs =
  `// Auto-generated at build time. Do not commit.\n` +
  `window.CARD_GAME_CONFIG = {\n` +
  `  SUPABASE_URL: ${JSON.stringify(SUPABASE_URL)},\n` +
  `  SUPABASE_ANON_KEY: ${JSON.stringify(SUPABASE_ANON_KEY)}\n` +
  `};\n`;

fs.writeFileSync(path.join(outCardDir, "config.js"), configJs, "utf8");

// 4) Provide an entry index.html in /public
const indexHtml =
  `<!doctype html>\n` +
  `<html lang="ko">\n` +
  `  <head>\n` +
  `    <meta charset="utf-8" />\n` +
  `    <meta name="viewport" content="width=device-width, initial-scale=1" />\n` +
  `    <title>my-card-game</title>\n` +
  `    <meta http-equiv="refresh" content="0; url=./card_game/card-game.html" />\n` +
  `  </head>\n` +
  `  <body>\n` +
  `    Redirecting… <a href="./card_game/card-game.html">Open game</a>\n` +
  `    <script>location.replace("./card_game/card-game.html");</script>\n` +
  `  </body>\n` +
  `</html>\n`;

fs.writeFileSync(path.join(outDir, "index.html"), indexHtml, "utf8");

console.log(`[vercel-build] Output prepared at ${path.relative(root, outDir)}/`);

