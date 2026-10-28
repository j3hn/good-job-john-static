# Good job, John.

John Basham’s portfolio and product journal, built with **Astro**. It generates a
static site with shared components and the supplied photographic portfolio design.

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
| Hero photograph and project covers | `public/assets/portfolio/` |
| Homepage feed and work directory | `src/components/WorkFeed.astro` |
| Post categories, copy and employer credits | `src/data/posts.ts` |
| Product artwork shared across pages | `src/components/art/` |
| Reusable framed website videos | `src/components/VideoShowcase.astro` |
| Festival recording and backdrop colour | `src/data/saltwater-freshwater.ts` |
| Sunny Copy recording and backdrop colour | `src/data/sunny-copy.ts` |
| Bellingen recording and backdrop colour | `src/data/bellingen-destination.ts` |
| Gosling recording and backdrop colour | `src/data/gosling.ts` |
| Allegra recording and backdrop colour | `src/data/allegra.ts` |
| Experiment cards | `src/components/ExperimentGrid.astro` |
| Experience and About sections | `src/components/ExperienceTimeline.astro`, `About.astro` |
| Pages and journal entries | `src/pages/` |
| Shared CSS and interactions | `src/styles/`, `src/scripts/` |
| Logo, images and video | `public/assets/`, `public/uploads/` |
| Standalone interactive experiments | `public/r&d/` |

Assets in `public/` retain their existing URLs: `public/assets/LOGO.jpg` is served
at `/assets/LOGO.jpg`. The Flare article retains `/journal/flair/` to preserve links.
All portfolio pages use the same header and footer. The standalone R&D tools keep
their own interfaces. Legacy theme files remain in `public/` for compatibility.

The hero uses the supplied photograph. Project images reveal from a pixel-and-grain
overlay and remain monochrome until hovered. Reduced-motion preferences disable
the reveal and filter animations. All content is rendered as HTML; filters and
the mobile menu use a small shared script in `src/scripts/portfolio.ts`.

## Posts and categories

`src/data/posts.ts` supplies both the homepage and `/work/`. Categories are **Web,
App, Tool and Write**, alongside a curated star filter and **All**. Website case
studies and the Flowforest website are Web; Runway, Flare and Slate are App;
automations and experiments are Tool; the practice note is Write.

The same data supplies employer credits on project summaries and individual posts:
We Are Coast for Phatduds, Allegra, Bellingen, Saltwater Freshwater and Gosling;
Goodjob for Emma Power, Sunny Copy, Jenna Meade and Soul Charters. Personal work
has no employer label. These assignments were confirmed by John.

The category bar stays sticky inside the work section. Categories persist between
visits and can be linked directly with `/?category=tool#work`. The old `/#feed`
and `/#journal` anchors and every existing article URL still resolve. All posts
are available when JavaScript is disabled.

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
