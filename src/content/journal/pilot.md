---
title: Pilot
description: Pilot is a self-hosted planning workspace where the documentation is the source of work, and durable Pi agents implement against it. Open source, single owner, built with Svelte and Node.
subtitle: Documentation is the source of work.
summary: A self-hosted planning workspace where a durable agent implements the page you wrote — reachable from a phone, with the repository still owning the truth.
eyebrow: 2026 · Self-hosted / Open source
tags: Svelte 5 · Node · Pi Durable · SQLite
pageTags: Svelte 5 · Node · Pi Durable · SQLite
category: tool
heading: Documentation is the source of work.
order: 160
starred: true
cover:
  src: /assets/pilot/wiki.jpg
  alt: "Pilot rendering docs/ARCHITECTURE.md: a file list down the left and the document, with its surfaces table and numbered invariants, on the right"
  width: 1672
  height: 1045
  priority: true
---

<p class="lead">Pilot is a workspace for the work rather than the code. Write the intent first — behaviour, decisions, open questions, diagrams — then let a durable agent implement against that page. The plan, the conversation and the result stay in one place, reachable from a phone, with the repository still owning the truth.</p>

<a class="text-link" href="https://github.com/goodjobdev/pilot" target="_blank" rel="noopener noreferrer">View the repository on GitHub ↗</a>

## Write the intent first

The wiki browses, edits, searches and renders any Markdown inside a registered project: diagrams, images, static HTML mockups, specification links and an inbox of the open questions still waiting for an answer. Writes are revision-checked, so a second writer gets a conflict that keeps their draft instead of a file that quietly loses the first edit.

Markdown stays the source. The index, the canvas, the alert subscriptions and the named-session registry are all derived or working state, so deleting them costs convenience and never documentation. Every read and write resolves through one containment helper that refuses absolute paths, parent directory hops and symlinks out of the project.

## Agents that work from the page

Each project can hold one durable Pi Durable session, committed to SQLite as it runs: a live transcript, steering, stopping, and questions the agent asks that you answer once. A run that dies mid-tool resumes from its last checkpoint, and a tool that may have partially run is reported as interrupted rather than repeated.

Work is admitted durably before it is shown. An input is committed to storage first and the interface reads committed state, so closing the browser cannot lose a run. Web Push carries the questions, finished runs and failures to the phone, with a link that opens the exact project.

## The board reads the documentation

Work items live in `docs/dashboard/board.md` inside the project, so the dependency canvas, the milestone timeline and the task list are views over a file in git. A task can point at the specification it implements; a task without a link is flagged rather than blocked.

<figure>
  <img src="/assets/pilot/tasks.jpg" alt="The Pilot task list: twelve work items with area, state, specification link, milestone and the tasks blocking each one" width="1672" height="1045" loading="lazy" />
  <figcaption>The task list for Pilot itself, planned in Pilot. Specification links and blocking relationships come from the board file in the repository.</figcaption>
</figure>

## What it is not

Pilot is single owner by design: one person, one credential, no roles, no sharing and no rate limiting. The agent harness is code execution — agent tools are bounded to a project workspace, and a project you register is a directory the agent may write to, so it belongs in a container rather than on a workstation. The backup script covers documentation and deliberately excludes sessions, alert keys and credentials.

An unclean kill leaves a lock, and the application refuses to start until an operator clears it — fail-closed, but a crash-loop until someone intervenes. The default provider is a scripted local stand-in, and the agent tools are question and note operations rather than a complete coding toolchain.

## Running it

Pilot needs Node 24 or later, because it uses the unflagged `node:sqlite`. Local mode binds loopback and embeds a session token in the page it serves, so it must never be exposed through a tunnel.

```
pnpm install
pnpm check && pnpm test && pnpm build
DASHBOARD_MODE=local DASHBOARD_DATA=/tmp/pilot-data PORT=4317 pnpm start
```

<a class="text-link" href="https://github.com/goodjobdev/pilot#quick-start" target="_blank" rel="noopener noreferrer">Quick start, deployment and the security model on GitHub ↗</a>

<aside class="project-status">Working tool · MIT licensed, self-hosted, and deployed for one owner. Screenshots are the real interface, with the planning mirror for Pilot’s own documentation as the project.</aside>

<a class="text-link" href="/journal/pi-gatekeeper/">Related: pi-gatekeeper, the verification gate for a coding agent ↗</a>
