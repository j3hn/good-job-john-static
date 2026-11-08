---
title: Runway
description: Exploring storage, sync and an editor that keeps Markdown on disk, with SQLite making it useful. Part of my independent practice, Flowforest.
subtitle: A home for your notes. Built around your files.
eyebrow: 2026 · Building / Flowforest
tags: Svelte · Markdown · SQLite
category: app
heading: A home for your notes. Built around your files.
order: 130
starred: true
art: runway
---

## The starting point

A knowledge tool should give your ideas somewhere useful to live without making the app itself the owner of them. Runway starts with Markdown files on disk, then adds an editor, an index and sync around that foundation.

## Files first, useful structure second

Markdown is the source of truth. SQLite is a derived index: it makes the workspace searchable and connected while keeping the underlying notes readable outside the app. The project uses Svelte for the interface and Automerge for sync.

## What I’m working through

The design challenge is making storage and sync feel understandable without turning the editor into a technical control panel. The desktop and browser implementations are under development; this is an ongoing build, not a launch announcement.

<aside class="project-status">In development · The visual is a portfolio interface study. Features described reflect project documentation, rather than a released product.</aside>

<a class="text-link" href="/journal/flair/">Next build note ↗</a>
