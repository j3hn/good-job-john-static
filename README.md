# Good job, John.

John Basham’s portfolio and product journal, built with **Astro**. It generates a
static site with shared components and a lightweight WebGL homepage background.

## Development

Use Node.js 22.12+ and pnpm (the lockfile is included).

```sh
pnpm install
pnpm dev           # http://localhost:8000, updates as you edit
pnpm check         # Astro diagnostics, production build, route and asset checks
pnpm format        # format source files
pnpm build         # produce dist/
pnpm preview       # preview dist/ at http://localhost:8000
```

Stop the development server before running preview on the same port. The former
Python server is no longer needed: Astro resolves components and builds assets.

## Where to edit

| Change | File or folder |
| --- | --- |
| Header, navigation, logo | `src/components/Header.astro` |
| Footer | `src/components/Footer.astro` |
| Page metadata and shared styles | `src/layouts/SiteLayout.astro` |
| Journal article structure | `src/layouts/ArticleLayout.astro` |
| Hero wording and structure | `src/components/Hero.astro` |
| Animated background | `src/scripts/hero-shader.ts` |
| Homepage feed | `src/pages/index.astro` |
| Product artwork shared across pages | `src/components/art/` |
| Experiment cards | `src/components/ExperimentGrid.astro` |
| Experience and About sections | `src/components/ExperienceMap.astro`, `About.astro` |
| Pages and journal entries | `src/pages/` |
| Shared CSS and interactions | `src/styles/`, `src/scripts/` |
| Logo, images and video | `public/assets/`, `public/uploads/` |
| Standalone interactive experiments | `public/r&d/` |

Assets in `public/` retain their existing URLs: `public/assets/LOGO.jpg` is served
at `/assets/LOGO.jpg`. The Flare article retains `/journal/flair/` to preserve links.
All portfolio pages use the same header and footer. The standalone R&D tools keep
their own interfaces. Legacy theme files remain in `public/` for compatibility.

The shader requires no external library. Reduced-motion preferences pause it by
default, the visitor can pause/play, and offscreen/hidden pages stop animating.
Browsers without WebGL display a CSS gradient. The rest of the site is rendered
as HTML; only the journal filters, experience selection and shader need JavaScript.

## Publishing

Run `pnpm check`, then publish **`dist/`** to the existing static host. A connected
build service should use `pnpm build` and `dist` as its output directory. The source
repository root is no longer a directly deployable website. No hosting account or
production deployment was changed by this migration.

See [DESIGN-NOTES.md](DESIGN-NOTES.md) for content sources and design decisions.
