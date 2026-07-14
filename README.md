# good-job-john-static

Personal site for **Good job.** — a plain static site (HTML/CSS/JS, no build step, no
WordPress). It began as a WordPress export and has been de-WordPressed: minified
markup expanded and formatted, IE conditional comments and Simply Static artifacts
removed, and the duplicate `wp-content/` / `wp-includes/` trees dropped in favour of the
rewritten asset paths.

## Structure

```
index.html            Home
404.html              Not-found page
<page>/index.html     Content pages (work, cv, contact, rate-card, brand-motion, …)
theme/goodjob/        Site theme: css/, js/, images/
includes/             Third-party CSS/JS (jQuery, block-library) — do not hand-edit
uploads/              Images and video
```

## Working on it

No install is required to view the site. To edit with formatting on tap:

```sh
npm install          # installs Prettier locally (optional; npx works too)
npm run serve        # http://localhost:8000
npm run format       # format all HTML with Prettier
npm run check        # verify formatting without writing
```

Prettier now parses every page. Vendor/minified assets are excluded via
`.prettierignore`.

## Notes

- A few pages reference `theme/goodjob/favicon.png`, `apple-touch-icon.png`, and
  `library/images/icon.svg`, which were never captured in the original export. The
  working favicons under `uploads/2019/03/` are used instead; add the missing files or
  drop the stale `<link>` tags when convenient.
- The WordPress block-editor CSS has been pruned: the `:root` preset palette (colors,
  gradients, shadows, spacing) and the unused `has-*-color`/`gradient`/`border` rules
  were removed. Only the rules the pages actually use remain (block layout/columns,
  spacers, buttons, quotes, separators, and `has-small-font-size`, whose one preset value
  is now inlined). The `block-library/style.min.css` link is kept — some pages use its
  block classes.
