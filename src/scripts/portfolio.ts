export {};

const header = document.querySelector<HTMLElement>(".site-header");
const toggle = document.querySelector<HTMLButtonElement>("#navToggle");
const menu = document.querySelector<HTMLElement>("#mobileMenu");
if (header && toggle && menu) {
  header.classList.add("nav-ready");
  const setMenu = (open: boolean) => {
    menu.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };
  toggle.addEventListener("click", () =>
    setMenu(toggle.getAttribute("aria-expanded") !== "true"),
  );
  menu.addEventListener("click", (event) => {
    if (event.target instanceof Element && event.target.closest("a"))
      setMenu(false);
  });
  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      toggle.getAttribute("aria-expanded") === "true"
    ) {
      setMenu(false);
      toggle.focus();
    }
  });
  document.addEventListener("click", (event) => {
    if (
      event.target instanceof Node &&
      !header.contains(event.target) &&
      !menu.contains(event.target)
    )
      setMenu(false);
  });
  window
    .matchMedia("(max-width: 980px)")
    .addEventListener("change", () => setMenu(false));
}

const feed = document.querySelector<HTMLElement>("[data-work-feed]");
if (feed) {
  const buttons = [
    ...feed.querySelectorAll<HTMLButtonElement>("[data-filter]"),
  ];
  const posts = [...feed.querySelectorAll<HTMLElement>("[data-category]")];
  const groups = [...feed.querySelectorAll<HTMLElement>("[data-post-group]")];
  const copy = {
    selected: [
      "01 — Selected work",
      "Projects built with people, for people.",
      "Client and independent work across e-commerce, education, hospitality and culture — carried from first sketch through to production.",
    ],
    all: [
      "01 — All work",
      "A practice in progress.",
      "Every project, product, experiment and field note — from client websites to independent software and small tools.",
    ],
    web: [
      "01 — Web",
      "Designed and built for the browser.",
      "Responsive websites and storefronts that carry a brand from the first screen through to checkout.",
    ],
    app: [
      "01 — App",
      "Product interfaces that feel effortless.",
      "Independent applications where structure, interaction and detail come together into something people can use.",
    ],
    tool: [
      "01 — Tool",
      "Small tools that do one thing well.",
      "Focused utilities, automations and experiments built to remove friction and follow a little curiosity.",
    ],
    write: [
      "01 — Write",
      "Notes from a broad practice.",
      "Thoughts on design, code and the experience of turning ideas into things people can use.",
    ],
  };
  type Filter = keyof typeof copy;
  const isFilter = (value: string | null): value is Filter =>
    value !== null && Object.hasOwn(copy, value);
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const apply = (filter: Filter, animate = false) => {
    buttons.forEach((button) =>
      button.setAttribute(
        "aria-pressed",
        String(button.dataset.filter === filter),
      ),
    );
    let count = 0;
    posts.forEach((post) => {
      post.hidden =
        filter === "selected"
          ? post.dataset.selected !== "true"
          : filter !== "all" && post.dataset.category !== filter;
      post.getAnimations().forEach((animation) => animation.cancel());
      if (!post.hidden) {
        count++;
        if (animate && !reducedMotion.matches)
          post.animate(
            [
              { opacity: 0, transform: "translateY(12px)" },
              { opacity: 1, transform: "translateY(0)" },
            ],
            { duration: 420, easing: "cubic-bezier(.22,1,.36,1)" },
          );
      }
    });
    groups.forEach((group) => {
      group.hidden = ![
        ...group.querySelectorAll<HTMLElement>("[data-category]"),
      ].some((post) => !post.hidden);
    });
    const [eyebrow, title, description] = copy[filter];
    const fields = {
      workEyebrow: eyebrow,
      workTitle: title,
      workDesc: description,
    };
    Object.entries(fields).forEach(([id, text]) => {
      const field = document.getElementById(id);
      if (field) field.textContent = text;
    });
    const countLabel = `${count} ${count === 1 ? "post" : "posts"}`;
    const counter = feed.querySelector("[data-feed-count]");
    if (counter) counter.textContent = countLabel;
    const status = document.getElementById("filter-status");
    if (status) status.textContent = `${countLabel} shown`;
    const empty = document.getElementById("workEmpty");
    if (empty) empty.hidden = count > 0;
  };
  const fromLocation = (): Filter => {
    const query = new URL(window.location.href).searchParams.get("category");
    if (isFilter(query)) return query;
    if (query === null) {
      try {
        const saved = localStorage.getItem("gjj-work-filter");
        if (isFilter(saved)) return saved;
      } catch {
        /* Filters also work when browser storage is unavailable. */
      }
    }
    return "selected";
  };
  buttons.forEach((button) =>
    button.addEventListener("click", () => {
      const value = button.dataset.filter ?? null;
      if (!isFilter(value)) return;
      const pastStart = feed.getBoundingClientRect().top < 46;
      apply(value, true);
      const url = new URL(window.location.href);
      url.searchParams.set("category", value);
      history.replaceState(null, "", url);
      try {
        localStorage.setItem("gjj-work-filter", value);
      } catch {
        /* Optional preference. */
      }
      if (pastStart)
        feed.scrollIntoView({ behavior: "instant", block: "start" });
    }),
  );
  apply(fromLocation());
  window.addEventListener("popstate", () => apply(fromLocation()));
}

// The supplied pixel-and-grain overlay dissolves as each image enters view.
const media = [
  ...document.querySelectorAll<HTMLElement>("[data-image-reveal]"),
];
if (
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
  "IntersectionObserver" in window
) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          observer.unobserve(entry.target);
          window.setTimeout(
            () => entry.target.classList.add("is-revealed"),
            400,
          );
        }
      });
    },
    { rootMargin: "0px 0px -35% 0px", threshold: 0 },
  );
  media.forEach((element) => {
    const shade = document.createElement("div");
    shade.className = `shade-layer${element.classList.contains("phone-strip") ? " phone-strip" : ""}`;
    shade.setAttribute("aria-hidden", "true");
    element.querySelectorAll("img").forEach((original) => {
      const clone = original.cloneNode(true) as HTMLImageElement;
      clone.alt = "";
      shade.appendChild(clone);
    });
    element.appendChild(shade);
    observer.observe(element);
  });
}
