import { getCollection } from "astro:content";
import { posts as staticPosts, type Post } from "./posts";

export { postImage } from "./posts";

/**
 * One ordered list for every piece of work: case studies and experiments from
 * `posts.ts`, then the journal entries from the `journal` content collection.
 */
export async function getWork(): Promise<Post[]> {
  const entries = await getCollection("journal");
  const journal: Post[] = entries.map(({ id, data }) => ({
    id,
    title: data.title,
    href: `/journal/${id}/`,
    category: data.category,
    employer: data.employer,
    tags: data.tags ?? "",
    heading: data.heading,
    description: data.summary ?? data.description,
    image: data.image,
    alt: data.alt,
    width: data.width,
    height: data.height,
    order: data.order,
    starred: data.starred,
    archive: data.archive,
  }));
  return [...staticPosts, ...journal].sort((a, b) => a.order - b.order);
}
