import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

/**
 * Journal entries are Markdown files. Frontmatter holds the page metadata and
 * the work-feed listing; the body holds the article text.
 */
const journal = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/journal" }),
  schema: z.object({
    title: z.string(),
    /** Meta description for the page. */
    description: z.string(),
    /** Optional shorter text for the work feed. Falls back to `description`. */
    summary: z.string().optional(),
    subtitle: z.string(),
    eyebrow: z.string().optional(),
    /** Tags for the work-feed listing. */
    tags: z.string().optional(),
    /** Tags shown under the article title; omitted where the page had none. */
    pageTags: z.string().optional(),
    category: z.enum(["web", "app", "tool", "write"]),
    employer: z.enum(["We Are Coast", "Goodjob"]).optional(),
    /** One-line statement shown in the work feed. */
    heading: z.string(),
    /** Position in the work feed, lowest first. */
    order: z.number(),
    /** Recommended work: appears under the star filter. */
    starred: z.boolean().default(false),
    archive: z.boolean().default(false),
    image: z.string().optional(),
    alt: z.string().optional(),
    width: z.number().optional(),
    height: z.number().optional(),
    /** Portfolio artwork component shown above the article. */
    art: z.enum(["flare", "runway", "slate", "block-editor"]).optional(),
    /** Image shown above the article when no artwork component is used. */
    cover: z
      .object({
        src: z.string(),
        alt: z.string(),
        width: z.number(),
        height: z.number(),
        href: z.string().optional(),
        priority: z.boolean().default(false),
      })
      .optional(),
    backHref: z.string().optional(),
    backText: z.string().optional(),
  }),
});

export const collections = { journal };
