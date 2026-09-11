import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";

// The migration must keep every public portfolio route and experiment reachable.
const routes = [
  "/",
  "/cv/",
  "/contact/",
  "/work/",
  "/rate-card/",
  "/brand-motion/",
  "/emma-power/",
  "/jenna-meade/",
  "/sunny-copy/",
  "/soul-charters/",
  "/journal/runway/",
  "/journal/flair/",
  "/journal/slate/",
  "/journal/design-and-code/",
  "/r&d/",
  "/404.html",
];
const experiments = [
  "/r&d/art/flow-forest.html",
  "/r&d/stipple_contours_1.html",
  "/r&d/pagespeed-automation.html",
  "/r&d/dropbox-saveurl-interface.html",
  "/r&d/hours-in-a-week/",
];
const output = path.resolve("dist");
const resolveFile = (pathname) => {
  const file = path.join(output, decodeURIComponent(pathname));
  return pathname.endsWith("/") ? path.join(file, "index.html") : file;
};
const errors = [];
let checkedLinks = 0;
for (const route of [...routes, ...experiments]) {
  assert.ok(fs.existsSync(resolveFile(route)), `Missing route: ${route}`);
}
for (const route of routes) {
  const html = fs.readFileSync(resolveFile(route), "utf8");
  assert.equal(
    (html.match(/class="site-header"/g) || []).length,
    1,
    `${route}: shared header`,
  );
  assert.ok(html.includes("/assets/LOGO.jpg"), `${route}: new logo`);
  assert.equal(
    (html.match(/<main\b/g) || []).length,
    1,
    `${route}: one main landmark`,
  );
  assert.equal(
    (html.match(/<h1\b/g) || []).length,
    1,
    `${route}: one primary heading`,
  );

  const urls = [...html.matchAll(/\b(?:href|src|poster)="([^"]+)"/g)].map(
    (match) => match[1],
  );
  for (const match of html.matchAll(/\bsrcset="([^"]+)"/g)) {
    urls.push(
      ...match[1]
        .split(",")
        .map((candidate) => candidate.trim().split(/\s+/)[0]),
    );
  }
  for (const raw of urls) {
    if (!raw || /^(?:https?:|mailto:|tel:|data:|javascript:|\/\/)/.test(raw))
      continue;
    const url = new URL(
      raw.replaceAll("&amp;", "&"),
      `https://local.test${route}`,
    );
    let file = resolveFile(url.pathname);
    if (fs.existsSync(file) && fs.statSync(file).isDirectory())
      file = path.join(file, "index.html");
    checkedLinks++;
    if (!fs.existsSync(file)) {
      errors.push(`${route}: missing ${raw}`);
      continue;
    }
    if (url.hash && file.endsWith(".html")) {
      const target = fs.readFileSync(file, "utf8");
      const id = decodeURIComponent(url.hash.slice(1));
      if (!target.includes(`id="${id}"`))
        errors.push(`${route}: missing anchor ${raw}`);
    }
  }
}
assert.equal(errors.length, 0, errors.join("\n"));
console.log(
  `Verified ${routes.length} portfolio routes, ${experiments.length} experiments and ${checkedLinks} local links/assets.`,
);
