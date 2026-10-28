# John Basham — design system

The visual reference is the supplied `Design-gogo/john-basham-portfolio.html`.
The live specimen is `/style-guide/`.

`src/styles/tokens.css` holds the exported palette, Inter display/body typography,
monospace utility stack, fluid scales, spacing, radii and motion tokens. The canvas
is white, surfaces are #f5f5f5, foreground is black and borders are #dbdbdb.
Secondary text mixes #8c8c8c with black for readable contrast. Existing semantic
aliases remain for case studies and product interface illustrations.

`src/styles/portfolio.css` implements the 46px fixed header/footer, full-height
photographic hero, bounded 1280px sections, two-column project rows, and image
reveals. Rows stack below 980px; small controls adapt below 620px. The hero uses
the supplied `public/assets/portfolio/hero-bg.jpg`. Project images are monochrome
until hovered, with a pixel-and-grain overlay that dissolves on entering view.
Reduced motion disables animation. Content and links remain usable without JS.

Older case studies keep their content layouts through `src/styles/legacy.css`,
which imports the previous styles into a lower-priority cascade layer. Shared
navigation, footer, fonts and palette follow the new design on every route.

`src/data/posts.ts` is the shared source for categories, project copy and employer
credits. Categories are Web, App, Tool and Write. Selected work is curated; All
includes every entry. Personal work has no employer credit. Homepage summaries,
`/work/` and individual article metadata read from the same source.

Use `pnpm check` to verify diagnostics, the production build, preserved routes,
local assets, unique posts, categories and confirmed employer credits.
