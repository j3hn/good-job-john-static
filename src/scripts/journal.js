const filters = document.querySelectorAll("[data-filter]");
filters.forEach((button) =>
  button.addEventListener("click", () => {
    filters.forEach((filter) =>
      filter.setAttribute("aria-pressed", String(filter === button)),
    );
    let count = 0;
    document.querySelectorAll("[data-category]").forEach((entry) => {
      entry.hidden =
        button.dataset.filter !== "all" &&
        entry.dataset.category !== button.dataset.filter;
      if (!entry.hidden) count++;
    });
    document.getElementById("filter-status").textContent =
      `${count} ${count === 1 ? "entry" : "entries"} shown`;
  }),
);
const chapters = {
  early: [
    "2010 — 2015",
    "In10tion / Building a creative agency",
    "Co-founded a creative agency and led design, development and client delivery. Built custom websites, e-commerce stores and an education portal, while managing designers and developers.",
  ],
  making: [
    "2017 — 2021",
    "Independent work / Making in the physical world",
    "CNC production at Sketch & Etch and industrial glass printing at Solos sat alongside independent web consulting. A chapter connecting digital design, materials, machinery and practical problem solving.",
  ],
  coast: [
    "2021 — 2026",
    "We Are Coast / Design, development & delivery",
    "Led front-end design and development: UI/UX, custom WordPress and Shopify builds, deployment and infrastructure. Contributed to scoping, client training and mentoring.",
  ],
  now: [
    "2026 — Present",
    "Flowforest / Independent product practice",
    "Bringing product thinking, interface design and agentic development together through Runway, Flare and Slate. An ongoing interest in physical making continues through 3D printing.",
  ],
};
function selectChapter(era) {
  document
    .querySelectorAll("[data-era]")
    .forEach((button) =>
      button.setAttribute("aria-pressed", String(button.dataset.era === era)),
    );
  document
    .querySelectorAll("[data-column]")
    .forEach((cell) =>
      cell.classList.toggle("active", cell.dataset.column === era),
    );
  const [date, title, copy] = chapters[era];
  document.getElementById("era-date").textContent = date;
  document.getElementById("era-title").textContent = title;
  document.getElementById("era-copy").textContent = copy;
}
if (document.querySelector("[data-era]")) {
  document
    .querySelectorAll("[data-era]")
    .forEach((button) =>
      button.addEventListener("click", () => selectChapter(button.dataset.era)),
    );
  selectChapter("now");
}
