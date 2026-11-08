---
title: Block Editor
description: An experiment taking Gutenberg out of WordPress and into a standalone desktop app, with pages saved as local JSON files.
subtitle: What if the block editor had a place of its own?
summary: A standalone desktop experiment with Gutenberg’s editing canvas, a simple page list and local JSON files — source code included.
eyebrow: 2026 · Experiment / Desktop tools
tags: Gutenberg · Electron · React
pageTags: Gutenberg · Electron · React · TypeScript
category: tool
heading: The block editor, outside WordPress.
order: 110
starred: false
image: block-editor.jpg
alt: Block Editor desktop prototype with a saved paragraph and the Gutenberg block inspector
width: 1200
height: 750
art: block-editor
---

<p class="lead">The familiar WordPress editor, without the rest of WordPress. A small desktop experiment in composing with blocks and keeping the work on disk.</p>

<a class="text-link" href="https://github.com/goodjobdev/block-editor" target="_blank" rel="noopener noreferrer">View the repository on GitHub ↗</a>

## Just the editor

Gutenberg is a useful way to put a page together. This experiment takes its editor packages out of the WordPress admin and gives them a simpler home: a page list, an editing canvas and a block inspector inside an Electron app. There is no WordPress installation, PHP server or database to set up.

## A small loop: create, write, save

Create a page, give it a title and start adding blocks. The prototype registers Gutenberg’s core blocks and includes a small collection of patterns, with List View for navigating the document and an inspector for block settings.

Changes autosave after a short pause, with a Save button and Cmd/Ctrl+S for an explicit save. Returning to the page list saves the current page before leaving the editor.

<figure>
  <a href="/assets/block-editor/pages.jpg">
    <img src="/assets/block-editor/pages.jpg" alt="The prototype’s Pages screen showing a saved test page and the New Page button" width="1600" height="1000" loading="lazy" />
  </a>
  <figcaption>The page list after saving a test document. Open the full screenshot.</figcaption>
</figure>

## Local files, not a publishing platform

Each page is a JSON file in the app’s local data directory. It holds the title, slug, timestamps and Gutenberg’s serialized block HTML, with a separate index for the page list. File reads and writes happen through Electron’s main process rather than an HTTP API.

This is an editor experiment, not a replacement for a complete CMS. Publishing, sync and a managed media library are outside the current prototype.

## Try it locally

The repository includes setup instructions and notes on the architecture. Clone it, install the npm dependencies and run the desktop app from source. React 18 and several WordPress package versions are deliberately pinned to keep the editor dependencies compatible.

<a class="text-link" href="https://github.com/goodjobdev/block-editor#quick-start" target="_blank" rel="noopener noreferrer">Setup instructions on GitHub ↗</a>

<aside class="project-status">Working desktop experiment · These are screenshots of the prototype, not an embedded editor. No browser demo or packaged download is provided.</aside>

<a class="text-link" href="/r%26d/">More experiments ↗</a>
