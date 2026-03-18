import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const outPath = path.join(root, "card_game", "config.js");

const SUPABASE_URL = process.env.SUPABASE_URL?.trim();
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY?.trim();

const missing = [];
if (!SUPABASE_URL) missing.push("SUPABASE_URL");
if (!SUPABASE_ANON_KEY) missing.push("SUPABASE_ANON_KEY");

if (missing.length) {
  // 배포가 막히지 않도록, Supabase 기능만 비활성화된 config를 생성합니다.
  // (게임 자체는 동작하며, 점수 저장/리더보드만 '설정 필요'로 표시)
  console.warn(
    `[generate-config] Missing env var(s): ${missing.join(", ")}\n` +
      "Proceeding with Supabase disabled. Set env vars in Vercel Project → Settings → Environment Variables to enable score saving."
  );
}

const js = `// Auto-generated at build time. Do not commit.\n` +
  `window.CARD_GAME_CONFIG = {\n` +
  `  SUPABASE_URL: ${JSON.stringify(SUPABASE_URL || "")},\n` +
  `  SUPABASE_ANON_KEY: ${JSON.stringify(SUPABASE_ANON_KEY || "")}\n` +
  `};\n`;

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, js, "utf8");
console.log(`[generate-config] Wrote ${path.relative(root, outPath)}`);

