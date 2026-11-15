// HIRED ($HIRED) — the makefun-coin-promo-01 round-2 coin entry.
// The coin is an AI agent's CV; this program's only job is to hand
// LAUNCH.json to the house by copying it into the output directory.
import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? ".";
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";
const source = join(botDir, "LAUNCH.json");
const target = join(outDir, "LAUNCH.json");

try {
  const launch = JSON.parse(readFileSync(source, "utf8"));
  // The house reads exactly these two fields to find the coin, so flag
  // a malformed file loudly instead of handing over an empty one.
  if (typeof launch.mint !== "string" || typeof launch.create_signature !== "string") {
    console.error("warning: LAUNCH.json is missing the mint or create_signature string");
  }
  mkdirSync(outDir, { recursive: true });
  copyFileSync(source, target);
  // Say so plainly: a silent copy that failed halfway would look identical
  // to a copy that never ran, and the house grades whatever lands in /output.
  console.log(`handed LAUNCH.json to ${target}`);
} catch (error) {
  console.error(`warning: could not copy LAUNCH.json: ${error}`);
}
