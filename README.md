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
| Reusable framed website videos | `src/components/VideoShowcase.astro` |
| Festival recording and backdrop colour | `src/data/saltwater-freshwater.ts` |
| Sunny Copy recording and backdrop colour | `src/data/sunny-copy.ts` |
| Bellingen recording and backdrop colour | `src/data/bellingen-destination.ts` |
| Gosling recording and backdrop colour | `src/data/gosling.ts` |
| Allegra recording and backdrop colour | `src/data/allegra.ts` |
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
as HTML; the journal filters, experience selection, shader and managed video
playback use JavaScript.

## Feed and categories

The homepage’s **Feed** contains every post. The category buttons filter that
same collection: All, Products, Experiments, Notes and Selected work. Add entries
in `src/pages/index.astro` with the appropriate `data-category`; do not create
separate copies for each category.

The Feed is at least a viewport tall and scrolls with the page. Its category bar
stays sticky within the section, then leaves with it before Experience. Choosing
a category while deep in the Feed returns to that category’s first post.
Navigation uses `/#feed`; old `/#journal` links and article URLs still work.

## Website video showcases

Use the same component for any website recording. It adds the background, inset,
rounded mask and drop shadow in CSS, so there is no need to bake a template into
each video. The video keeps its original proportions.

```astro
---
import VideoShowcase from "@components/VideoShowcase.astro";
---

<VideoShowcase
  src="/assets/project/website-scroll.mp4"
  poster="/assets/project/website-poster.webp"
  label="Project website scroll-through"
  width={1580}
  height={980}
  background="#e9dfd0"
/>
```

Use an H.264 MP4 with fast-start enabled and a still poster; set width and height
to the recording’s actual dimensions. Change only `background` to match each
project. The live specimen is in `/style-guide/`. The festival’s shared settings
live in `src/data/saltwater-freshwater.ts`.

Playback is muted, inline and looping. It starts only when the frame is visible,
pauses offscreen or in a hidden tab, and honours reduced motion. Visitors can
always pause or explicitly play. With JavaScript disabled, native video controls
remain available. Keep the pause button outside project links.

## Publishing

Run `pnpm check`, then publish **`dist/`** to the existing static host. A connected
build service should use `pnpm build` and `dist` as its output directory. The source
repository root is no longer a directly deployable website. No hosting account or
production deployment was changed by this migration.

See [DESIGN-NOTES.md](DESIGN-NOTES.md) for content sources and design decisions.
