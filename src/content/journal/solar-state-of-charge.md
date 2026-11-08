---
title: Solar State of Charge
description: An n8n automation that reads a Victron installation every hour and sends the battery state of charge to Telegram.
subtitle: One number, every hour, wherever I am.
summary: An hourly message with the battery state of charge, straight from the Victron VRM API.
eyebrow: 2026 · Automation / n8n
tags: Automation · n8n · Victron VRM · Telegram
pageTags: Automation · n8n · Victron VRM · Telegram
category: tool
heading: One number, every hour, wherever I am.
order: 180
starred: false
---

<p class="lead">A small scheduled workflow. It asks the Victron VRM API for the current battery state of charge, then sends it to a Telegram chat. Four nodes, no server to keep running.</p>

<figure>
  <a href="/assets/solar-state-of-charge/workflow.png">
    <img src="/assets/solar-state-of-charge/workflow.png" alt="The n8n canvas showing four connected nodes: Schedule Trigger, HTTP Request, Edit Fields and Send a text message" width="1173" height="545" loading="lazy" />
  </a>
  <figcaption>The workflow: hourly trigger, one API call, one field, one message. Open the full screenshot.</figcaption>
</figure>

## Why bother

The solar installation reports everything, but opening a monitoring dashboard for one number is more effort than it is worth. A message in a chat I already read answers the question without a new app or a login.

## The four steps

1. **Schedule Trigger** — runs the workflow every hour.
2. **HTTP Request** — calls `vrmapi.victronenergy.com/v2/installations/<id>/diagnostics` with an `X-Authorization: Token …` header.
3. **Edit Fields** — picks the state of charge out of the response. VRM returns a long `records` array, so the field is read by index and renamed to `Charge`.
4. **Telegram** — sends `State of Charge: …` with the charge value to a chat ID.

## The only awkward part

The diagnostics endpoint returns every record for the installation, not a named object. There is no key to look up, so the node reads `records[175]` and takes its `formattedValue`. It works, but it is brittle: if Victron adds or reorders a record, the index moves and the message reports the wrong number.

The next version should find the record by its code or description instead of its position. The trigger also carries _continue on regular output_, so a failed API call does not stop the workflow.

<aside class="project-status">Working automation · The API token and chat ID are configured in n8n credentials and are not published here.</aside>

<a class="text-link" href="/journal/bus-351/">Next automation: Bus 351 ↗</a>
