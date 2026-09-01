/**
 * IMPORT REWRITE SCRIPT
 * Purpose: Converts geotech imports from @/components and @/lib
 * to @/geotech/components and @/geotech/lib for proper path resolution
 * when geotech folder is integrated into the main project.
 *
 * Status: All imports are already correctly configured.
 * Keep this file for reference or re-run if new files are added to geotech.
 *
 * Usage: node rewrite-imports.js
 */

const fs = require("fs");
const path = require("path");
const roots = [path.join("geotech", "components"), path.join("geotech", "lib")];
let count = 0;
function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      walk(p);
    } else if (/\.([jt]sx?)$/.test(e.name)) {
      const orig = fs.readFileSync(p, "utf8");
      const updated = orig
        .replace(/(["'])@\/components\//g, "$1@/geotech/components/")
        .replace(/(["'])@\/lib\//g, "$1@/geotech/lib/")
        .replace(/(["'])@\/hooks\//g, "$1@/geotech/hooks/");
      if (updated !== orig) {
        fs.writeFileSync(p, updated);
        count++;
        console.log("updated " + p);
      }
    }
  }
}
roots.forEach(walk);
console.log("Total updated files: " + count);
