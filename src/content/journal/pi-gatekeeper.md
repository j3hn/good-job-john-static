---
title: pi-gatekeeper
description: A Pi extension that keeps a coding agent working until a verification command passes.
subtitle: Done means the checks pass.
summary: A Pi extension that runs a verification command when an agent tries to finish, feeding failures back so it can keep working.
eyebrow: 2026 · Open source / Developer tools
tags: Pi · TypeScript · Open source
pageTags: Pi · TypeScript · Verification
category: tool
heading: Done means the checks pass.
order: 150
starred: true
cover:
  src: /assets/pi-gatekeeper/card.jpg
  alt: A robot walking through a glowing green gate marked with a checkmark
  width: 1672
  height: 941
---

<p class="lead">Coding agents can make a plausible change and declare victory before the tests or typechecker agree. pi-gatekeeper puts a verification step between the edit and the finish line.</p>

<a class="text-link" href="https://github.com/j3hn/pi-gatekeeper" target="_blank" rel="noopener noreferrer">View the repository on GitHub ↗</a>

## A feedback loop for finishing

When Pi is about to finish after a task that may have changed something, the extension runs your check command. If it fails, the output is fed back to the agent so it can investigate and try again. Repeated identical failures prompt a change of approach, and an attempt limit prevents the loop from running forever.

## Your project, your checks

Set `PI_GATEKEEPER_CHECK` to the command you want to run, or let the extension find a `check` script in your package.json. If neither is available, the gate stays idle rather than guessing. The `/gate` commands let you check its status or run verification yourself.

An optional rollback can restore tracked files to their pre-task state after repeated failures. It is off by default: rollback can also undo manual edits, and it does not remove untracked files.

## Try it with Pi

Install the extension from npm, then choose a non-interactive check that suits your project.

```
pi install npm:pi-gatekeeper
```

<a class="text-link" href="https://github.com/j3hn/pi-gatekeeper#readme" target="_blank" rel="noopener noreferrer">Setup and configuration on GitHub ↗</a>
