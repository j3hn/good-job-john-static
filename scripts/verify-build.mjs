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
  "/gosling/",
  "/allegra/",
  "/phatduds/",
  "/saltwater-freshwater/",
  "/bellingen-destination/",
  "/journal/runway/",
  "/journal/flair/",
  "/journal/slate/",
  "/journal/design-and-code/",
  "/journal/block-editor/",
  "/journal/bus-351/",
  "/journal/solar-state-of-charge/",
  "/journal/flowforest-website/",
  "/r&d/",
  "/style-guide/",
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
  assert.ok(html.includes('class="brand" href="/"'), `${route}: home identity`);
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
// Check each recording independently so a page can reuse multiple showcases.
for (const [route, projects] of [
  ["/saltwater-freshwater/", ["saltwater-freshwater"]],
  ["/sunny-copy/", ["sunny-copy"]],
  ["/bellingen-destination/", ["bellingen-destination"]],
  ["/gosling/", ["gosling"]],
  ["/allegra/", ["allegra"]],
  ["/style-guide/", ["saltwater-freshwater"]],
]) {
  const html = fs.readFileSync(resolveFile(route), "utf8");
  const showcases = [
    ...html.matchAll(/<video-showcase\b[\s\S]*?<\/video-showcase>/g),
  ].map((match) => match[0]);
  for (const project of projects) {
    const source = "/assets/" + project + "/website-scroll.mp4";
    const matching = showcases.filter((showcase) => showcase.includes(source));
    assert.equal(matching.length, 1, route + ": one " + project + " showcase");
    const showcase = matching[0];
    assert.ok(
      showcase.includes("--showcase-background:"),
      route + ": customisable backdrop",
    );
    const videoFormats = {
      "bellingen-destination": { width: 1438, height: 978, poster: "jpg" },
      gosling: { width: 1468, height: 902, poster: "jpg" },
      allegra: { width: 1468, height: 1024, poster: "jpg" },
    };
    const format = videoFormats[project] ?? {
      width: 1580,
      height: 980,
      poster: "webp",
    };
    const dimensions =
      'width="' + format.width + '" height="' + format.height + '"';
    assert.ok(
      showcase.includes(dimensions),
      route + ": original video proportions",
    );
    for (const attribute of [
      "muted",
      "loop",
      "playsinline",
      "controls",
      'preload="none"',
    ]) {
      assert.ok(showcase.includes(attribute), route + ": video " + attribute);
    }
    assert.ok(
      showcase.includes(
        "/assets/" + project + "/website-poster." + format.poster,
      ),
      route + ": static poster",
    );
  }
}
const bellingenPage = fs.readFileSync(
  resolveFile("/bellingen-destination/"),
  "utf8",
);
for (const image of [1, 2, 3]) {
  assert.ok(
    bellingenPage.includes("/assets/bellingen-destination/" + image + ".jpg"),
    "Bellingen: supplied image " + image + " preserved alongside video",
  );
}
const phatdudsPage = fs.readFileSync(resolveFile("/phatduds/"), "utf8");
for (const screenshot of [
  "home-desktop",
  "home-mobile",
  "product-desktop",
  "product-mobile",
]) {
  assert.ok(
    phatdudsPage.includes("/assets/phatduds/" + screenshot + "-web.jpg"),
    "Phatduds: " + screenshot + " screenshot",
  );
}
assert.ok(
  phatdudsPage.includes('href="https://phatduds.com.au/"'),
  "Phatduds: live Shopify store",
);
for (const route of ["/", "/work/"]) {
  const html = fs.readFileSync(resolveFile(route), "utf8");
  assert.ok(
    html.includes('href="/phatduds/"'),
    route + ": Phatduds is discoverable",
  );
}
const homepage = fs.readFileSync(resolveFile("/"), "utf8");
for (const anchor of [
  "work",
  "feed",
  "journal",
  "experience",
  "about",
  "contact",
]) {
  assert.ok(homepage.includes(`id="${anchor}"`), `Homepage: ${anchor} anchor`);
}
for (const category of ["selected", "all", "web", "app", "tool", "write"]) {
  assert.ok(
    homepage.includes(`data-filter="${category}"`),
    `Work category: ${category}`,
  );
}
const homePosts = [
  ...homepage.matchAll(
    /<article\b[^>]*data-category="([^"]+)"[^>]*data-post-id="([^"]+)"/g,
  ),
];
assert.equal(
  homePosts.length,
  22,
  "Homepage: every existing post and experiment is discoverable",
);
assert.equal(
  new Set(homePosts.map((match) => match[2])).size,
  22,
  "Homepage: posts are not duplicated",
);
for (const [category, expectedCount] of [
  ["web", 10],
  ["app", 3],
  ["tool", 8],
  ["write", 1],
]) {
  assert.equal(
    homePosts.filter((match) => match[1] === category).length,
    expectedCount,
    `Homepage: ${category} post count`,
  );
}
for (const [routes, employer] of [
  [
    [
      "/phatduds/",
      "/allegra/",
      "/bellingen-destination/",
      "/saltwater-freshwater/",
      "/gosling/",
    ],
    "We Are Coast",
  ],
  [
    ["/emma-power/", "/sunny-copy/", "/jenna-meade/", "/soul-charters/"],
    "Goodjob",
  ],
]) {
  for (const route of routes) {
    const html = fs.readFileSync(resolveFile(route), "utf8");
    assert.ok(
      html.includes(`Created at <strong>${employer}</strong>`),
      `${route}: confirmed employer credit`,
    );
  }
}
for (const route of [
  "/journal/runway/",
  "/journal/flair/",
  "/journal/slate/",
  "/journal/block-editor/",
  "/journal/bus-351/",
  "/journal/solar-state-of-charge/",
  "/journal/flowforest-website/",
  "/journal/design-and-code/",
]) {
  const html = fs.readFileSync(resolveFile(route), "utf8");
  assert.ok(
    !html.includes('class="project-credit"'),
    `${route}: no employer credit on personal work`,
  );
}
const blockEditorPost = fs.readFileSync(
  resolveFile("/journal/block-editor/"),
  "utf8",
);
for (const route of ["/", "/r&d/"]) {
  const html = fs.readFileSync(resolveFile(route), "utf8");
  assert.equal(
    (
      html.match(
        /<a\b[^>]*class="experiment-card"[^>]*href="\/journal\/block-editor\/"/g,
      ) || []
    ).length,
    route === "/" ? 0 : 1,
    route + ": Block Editor card only in the experiments directory",
  );
  assert.ok(
    html.includes('href="/journal/block-editor/"'),
    route + ": Block Editor post is discoverable",
  );
}
const blockEditorEntries = [
  ...homepage.matchAll(/<article\b[^>]*>[\s\S]*?<\/article>/g),
]
  .map((match) => match[0])
  .filter((entry) => entry.includes('href="/journal/block-editor/"'));
assert.equal(blockEditorEntries.length, 1, "Homepage: one Block Editor post");
assert.ok(
  blockEditorEntries[0].includes('data-category="tool"'),
  "Homepage: Block Editor is a tool",
);
for (const screenshot of ["editor", "pages"]) {
  assert.ok(
    blockEditorPost.includes("/assets/block-editor/" + screenshot + ".jpg"),
    "Block Editor: " + screenshot + " screenshot",
  );
}
assert.ok(
  blockEditorPost.includes('href="https://github.com/goodjobdev/block-editor"'),
  "Block Editor: source repository",
);
assert.ok(
  !blockEditorPost.includes("<iframe"),
  "Block Editor: screenshot post, not a live demo",
);
assert.equal(errors.length, 0, errors.join("\n"));
console.log(
  `Verified ${routes.length} portfolio routes, ${experiments.length} experiments and ${checkedLinks} local links/assets.`,
);
