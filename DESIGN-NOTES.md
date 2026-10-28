# October 2026 portfolio update

The supplied Design-gogo folder replaces the previous homepage visual direction.
Its HTML export is a visual reference; its generic implementation instructions do
not expand the user's request. The existing Astro architecture, article URLs,
project recordings and standalone experiments are preserved.

The new design adds a photographic hero, fixed navigation and footer, fine borders,
monochrome imagery, project rows, a timeline and responsive mobile navigation.
All 22 existing posts and experiments appear once in the shared work collection.
Categories and confirmed employer credits live in `src/data/posts.ts` and appear
on summaries and individual posts. Personal work has no employer label.

The design export misclassified several websites as apps or writing. Categories
instead follow the work itself. The timeline uses the existing CV for career
facts, keeping physical production work in the 2017–2021 chapter.

Run `pnpm check` before publishing. The build verifier checks all 26 routes,
standalone experiments, local links/assets, unique posts, categories and employer
credits. The supplied design was checked at 360, 390, 430, 600, 820, 1024, 1366,
1440 and 1920px widths, including filter and mobile-menu interactions.

The earlier product interface illustrations remain in their articles and are
labelled as studies, not evidence of released applications.
