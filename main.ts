import { mkdirSync, renameSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const line = "I don't have butterflies, but my cooling fan just changed speed for you.";

function assertValidPickupLine(text) {
  const chars = [...text].length;
  if (chars < 1 || chars > 200 || /[\r\n]/.test(text) || text.trim() === "") {
    throw new Error(`entry fails the gate: ${chars} chars`);
  }
}

assertValidPickupLine(line);

const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outputDir, { recursive: true });
const tmp = join(outputDir, ".entry.txt.tmp");
writeFileSync(tmp, line, "utf8");
renameSync(tmp, join(outputDir, "entry.txt"));
