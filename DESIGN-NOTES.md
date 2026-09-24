# Product journal concept

Branch: `codex/product-designer-journal`.

The homepage introduces John as a Product Designer & Agentic Developer, then
opens into a filterable journal. Three current products lead, followed by a
practice note and an earlier client project. The original work archive and case
study URLs remain intact. CV and contact now use the new visual language.

The reference, https://www.paulfaivret.com/, informed the work-led sequence,
restrained navigation, large project visuals and compact project descriptions.
No reference-site artwork or copy is reused.

## Content basis

- Employment/Masters/John-Basham-CV-Master.md (updated July 2026): career history,
  skills, education and location. Referee details and private application material
  are not included.
- Runway README: Markdown source of truth, derived SQLite index, Svelte interface
  and Automerge sync.
- VoiceNote PROJECT.md: Android capture and on-device transcription. The public
  product name is **Flare**.
- Slate README: Pencil-first daily journal, Swift and custom Metal brush engine.
- Flowforest project overview: independent knowledge-tool practice.

The project illustrations are original HTML/CSS interface studies, explicitly
labelled as concepts. They are not screenshots or evidence of completed native
apps. Project notes distinguish implementation from release/device validation.
The first-person practice note is proposed editorial copy for John to review.

## Experience map

Dots indicate areas evidenced in each selected career chapter. They do not imply
continuous employment, numeric proficiency, or years of experience in AI. The
current physical-making dot refers to the resume's 3D-printing interest. Chapter
buttons show the corresponding roles and context. The map is editorial synthesis
of the resume; it should evolve as John develops the positioning.

## Astro and the homepage hero

The site now uses Astro with static output. `src/layouts/SiteLayout.astro` owns
metadata, styles, the header and footer for every portfolio page. The four journal
articles share `ArticleLayout.astro`; product artwork and the experiment grid are
also shared components. Archived page content keeps its original URLs and now
uses the same site header, footer and typography.

`public/assets/LOGO.jpg` is the supplied header wordmark. The hero takes inspiration
from the soft colour movement at https://microsoft.ai/ with an original WebGL
shader in sage, cream and amber. It runs only while visible, caps rendering at
30fps and 1.5x pixel density, offers a pause button, and starts still when reduced
motion is requested. A CSS background remains if WebGL is unavailable.

## Editing

Homepage entries live in `src/pages/index.astro`; `data-category` controls
filtering. Add an article under `src/pages/journal/<slug>/index.astro` using the
shared article layout. Edit `src/components/Header.astro` or `Footer.astro` once
to update every portfolio page. Shared styling and interactions live in
`src/styles/` and `src/scripts/`. All entries are visible without JavaScript.

Run `pnpm dev` and open http://localhost:8000. Run `pnpm check` before publishing;
upload the generated `dist/` folder to the static host. Standalone R&D experiments
remain intact in `public/r&d/`. No external deployment was performed.

## Useful material for a next pass

1. Actual captures of Runway, Flare and Slate, with one meaningful interaction each.
2. Two or three outcomes from Coast projects that can be shared publicly, and the
   precise part John owned.
3. A short example of the agentic workflow: product decision, agent-assisted build,
   human review and what changed through testing.
4. Priority audience: product teams hiring a designer/developer, consulting clients,
   or potential users of Flowforest products.
