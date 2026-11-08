---
title: Flowforest website
description: "The flowforest.com marketing site: a quiet, typographic home for local-first tools, built with Astro and deployed as static output."
subtitle: Reduce the noise. Amplify the signal.
summary: The public home for my independent practice. A quiet, typographic site that sets out what the tools believe, then shows the three products without overselling them.
eyebrow: 2026 · Website / Flowforest
tags: Website · Astro · Typography
pageTags: Website · Astro · Typography · Static site
category: web
heading: Reduce the noise. Amplify the signal.
order: 70
starred: false
image: /assets/flowforest-website/cover.png
alt: The Flowforest homepage with a fine contour drawing and the words Reduce the noise. Amplify the signal.
width: 1600
height: 1000
cover:
  src: /assets/flowforest-website/cover.png
  alt: The Flowforest homepage with a fine contour drawing across the page and the words Reduce the noise. Amplify the signal.
  width: 1600
  height: 1000
  href: https://flowforest.com/
  priority: true
---

<p class="lead">The public home for Flowforest, and the one place that has to explain what the practice is for. It sets out what the tools believe, then shows the three products without overselling any of them.</p>

<a class="text-link" href="https://flowforest.com/" target="_blank" rel="noopener noreferrer">Visit flowforest.com ↗</a>

## An argument, not a feature list

The page leads with a position rather than a product: _Reduce the noise. Amplify the signal._ From there it moves through what Flowforest is, the three tools, and the principles behind them. Two sections do the heavier work. _What we believe_ states the case for owning your own files, and _What we won’t build_ rules out surveillance, attention extraction and lock-in. Stating the refusals openly is what makes the promises checkable.

## One typeface, one accent

The whole site runs on a white field, a near-black ink and a single warm grey. There is no colour palette, no card grid and almost no iconography. Hierarchy comes from type scale, letter spacing and line breaks, so the sentence breaks fall where they should read rather than where the column happens to end.

The only ornament is the contour drawing behind the hero — fine dotted lines that drift across the page edges. It carries the name without illustrating it: forest, flow, and the slow work of tending both.

## Showing the tools without screenshots

Each product gets a short entry: a number, a name, one sentence of purpose, three facts and a status. The visual beside it is drawn in HTML and CSS rather than captured from a device, so Flare, Runway and Slate stay consistent while the apps are still in development. Each one is marked plainly: Android, in development; desktop and web, in development; iPad and Mac, in development. Nothing claims a release date it cannot keep.

<figure>
  <img src="/assets/flowforest-website/products.png" alt="The Flare entry on the Flowforest site: a numbered label, the product name, a purpose line, three feature lines and an in-development status beside a phone drawn in CSS" width="1600" height="1234" loading="lazy" />
  <figcaption>Flare, as the site presents it: purpose, facts and status in the same compact rhythm for each of the three tools.</figcaption>
</figure>

## How it is built

The site is Astro with static output. One layout holds the head, header and footer, and every style lives in a single global stylesheet. Assets are served from `public/` at the site root, so they never pass through the build. The only script is the hero canvas, loaded from the page rather than the frontmatter because frontmatter runs at build time, where there is no document to animate.

Output is deployed to Cloudflare Pages as `dist/`, with security headers copied from `public/_headers`. Routes end in a slash, and the canonical tags match, so the privacy policy is served at `/flare/privacy-policy/`.

<aside class="project-status">Live site · A marketing site for products still in development. It describes intended behaviour rather than shipped features.</aside>

<a class="text-link" href="/journal/runway/">Read the Runway build note ↗</a>
