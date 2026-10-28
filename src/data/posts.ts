export type Category = "web" | "app" | "tool" | "write";
export type Employer = "We Are Coast" | "Goodjob";
export interface Post {
  id: string;
  title: string;
  href: string;
  category: Category;
  employer?: Employer;
  tags: string;
  heading: string;
  description: string;
  image?: string;
  alt?: string;
  width?: number;
  height?: number;
  selected?: boolean;
  archive?: boolean;
}

export const posts: Post[] = [
  {
    id: "phatduds",
    title: "Phatduds",
    href: "/phatduds/",
    category: "web",
    employer: "We Are Coast",
    selected: true,
    tags: "Shopify · E-commerce",
    heading: "Street ready. Court approved.",
    description:
      "A Shopify storefront for basketball shorts and accessories, bringing a bold streetwear identity to desktop and mobile shopping.",
    image: "phatduds-cover.jpg",
    alt: "Phatduds storefront design with basketball photography and bold red calls to action",
    width: 1200,
    height: 666,
  },
  {
    id: "allegra",
    title: "Allegra School",
    href: "/allegra/",
    category: "web",
    employer: "We Are Coast",
    selected: true,
    tags: "Web design · Education",
    heading: "A welcoming place for a different way to learn.",
    description:
      "A people-led website for Allegra School in Coffs Harbour, bringing school life, useful information and enrolment into one welcoming experience.",
    image: "allegra-cover.jpg",
    alt: "Allegra School homepage with bold typography and school photography",
    width: 1200,
    height: 837,
  },
  {
    id: "saltwater-freshwater",
    title: "Saltwater Freshwater",
    href: "/saltwater-freshwater/",
    category: "web",
    employer: "We Are Coast",
    selected: true,
    tags: "Web design · Development",
    heading: "A digital home for culture and connection.",
    description:
      "Bold typography, warm colour and photography bring the festival to the screen, connecting the program, news and ways to get involved.",
    image: "saltwater-cover.jpg",
    alt: "Saltwater Freshwater Festival website with bold typography and photography",
    width: 1200,
    height: 744,
  },
  {
    id: "bellingen-destination",
    title: "Bellingen Destination",
    href: "/bellingen-destination/",
    category: "web",
    employer: "We Are Coast",
    selected: true,
    tags: "Web design · Destination",
    heading: "A softer way to explore Bellingen.",
    description:
      "A destination website concept bringing local places, events and community together in one calm, inviting experience.",
    image: "bellingen-cover.jpg",
    alt: "Bellingen Destination homepage with landscape photography",
    width: 1200,
    height: 816,
  },
  {
    id: "gosling",
    title: "Gosling Group",
    href: "/gosling/",
    category: "web",
    employer: "We Are Coast",
    selected: true,
    tags: "Web design · Responsive",
    heading: "Built on trust. Designed for connection.",
    description:
      "A digital home for electrical expertise, bringing commercial and residential services into one clear experience.",
    image: "gosling-cover.jpg",
    alt: "Gosling Group website homepage with service imagery",
    width: 1200,
    height: 737,
  },
  {
    id: "soul-charters",
    title: "Soul Charters",
    href: "/soul-charters/",
    category: "web",
    employer: "Goodjob",
    selected: true,
    tags: "Brand · Web design",
    heading: "A dreamlike digital home for retreats at sea.",
    description:
      "A brand and website pairing immersive imagery with a spacious reading experience to introduce yacht retreats and help facilitators imagine what is possible.",
    image: "soul-charters-cover.jpg",
    alt: "Soul Charters website with immersive yacht photography",
    width: 1200,
    height: 818,
  },
  {
    id: "flowforest-website",
    title: "Flowforest website",
    href: "/journal/flowforest-website/",
    category: "web",
    tags: "Website · Astro · Typography",
    heading: "Reduce the noise. Amplify the signal.",
    description:
      "The public home for my independent practice. A quiet, typographic site that sets out what the tools believe, then shows the three products without overselling them.",
    image: "/assets/flowforest-website/cover.png",
    alt: "The Flowforest homepage with a fine contour drawing and the words Reduce the noise. Amplify the signal.",
    width: 1600,
    height: 1000,
  },
  {
    id: "emma-power",
    title: "Emma Power",
    href: "/emma-power/",
    category: "web",
    employer: "Goodjob",
    selected: true,
    archive: true,
    tags: "Brand · Web · Development",
    heading: "A clear stage for a writer, teacher and speaker.",
    description:
      "A minimal website built around Emma’s words, with calm typography and subtle movement keeping the experience simple and easy to navigate.",
  },
  {
    id: "sunny-copy",
    title: "Sunny Copy",
    href: "/sunny-copy/",
    category: "web",
    employer: "Goodjob",
    selected: true,
    archive: true,
    tags: "Brand · Web · Development",
    heading: "A simple website where the words do the work.",
    description:
      "Brand and website design for a creative copywriter, using a restrained visual system, small interactions and strong performance to keep the writing central.",
  },
  {
    id: "jenna-meade",
    title: "Jenna Meade",
    href: "/jenna-meade/",
    category: "web",
    employer: "Goodjob",
    selected: true,
    archive: true,
    tags: "Web design · Development",
    heading: "A clear voice, on the web.",
    description:
      "Website design and development for journalist and writer Jenna Meade.",
  },
  {
    id: "block-editor",
    title: "Block Editor",
    href: "/journal/block-editor/",
    category: "tool",
    selected: true,
    tags: "Gutenberg · Electron · React",
    heading: "The block editor, outside WordPress.",
    description:
      "A standalone desktop experiment with Gutenberg’s editing canvas, a simple page list and local JSON files — source code included.",
    image: "block-editor.jpg",
    alt: "Block Editor desktop prototype with a saved paragraph and the Gutenberg block inspector",
    width: 1200,
    height: 750,
  },
  {
    id: "flair",
    title: "Flare",
    href: "/journal/flair/",
    category: "app",
    selected: true,
    tags: "Android · Kotlin · Offline AI",
    heading: "Private voice notes, ready as Markdown.",
    description:
      "Live English transcription happens entirely on your phone. Pause, tag and save a thought, then keep the Markdown file in a folder you choose.",
  },
  {
    id: "runway",
    title: "Runway",
    href: "/journal/runway/",
    category: "app",
    selected: true,
    tags: "Svelte · Markdown · SQLite",
    heading: "A home for your notes. Built around your files.",
    description:
      "Exploring storage, sync and an editor that keeps Markdown on disk, with SQLite making it useful. Part of my independent practice, Flowforest.",
  },
  {
    id: "slate",
    title: "Slate",
    href: "/journal/slate/",
    category: "app",
    selected: true,
    tags: "iPad · Swift · Metal",
    heading: "A quieter place to think with your hands.",
    description:
      "A Pencil-first journal for iPad, exploring the feel of digital ink, a custom brush engine and the simple rhythm of one page per day.",
  },
  {
    id: "bus-351",
    title: "Bus 351",
    href: "/journal/bus-351/",
    category: "tool",
    tags: "Automation · n8n · WhatsApp",
    heading: "On schedule or late?",
    description:
      "A weekday workflow that checks live departures and sends one sentence to WhatsApp.",
  },
  {
    id: "solar-state-of-charge",
    title: "Solar State of Charge",
    href: "/journal/solar-state-of-charge/",
    category: "tool",
    tags: "Automation · n8n · Telegram",
    heading: "One number, every hour, wherever I am.",
    description:
      "An hourly message with the battery state of charge, straight from the Victron VRM API.",
  },
  {
    id: "canopy",
    title: "Canopy",
    href: "/r%26d/art/flow-forest.html",
    category: "tool",
    selected: true,
    tags: "Generative art",
    heading: "An evolving canopy of particle trails.",
    description:
      "Explore how local rules, layered noise and colour build an organic whole.",
  },
  {
    id: "stipple",
    title: "Stipple Contours",
    href: "/r%26d/stipple_contours_1.html",
    category: "tool",
    selected: true,
    tags: "Generative art",
    heading: "A study in dots, contours and seeded variation.",
    description: "Adjust the parameters and explore the composition.",
  },
  {
    id: "hours",
    title: "Hours in a Week",
    href: "/r%26d/hours-in-a-week/",
    category: "tool",
    selected: true,
    tags: "Interactive tool",
    heading: "Make time tangible.",
    description:
      "Colour a weekly grid to explore where the hours go. Your choices stay in this browser.",
  },
  {
    id: "pagespeed",
    title: "PageSpeed Automation",
    href: "/r%26d/pagespeed-automation.html",
    category: "tool",
    selected: true,
    tags: "Workflow",
    heading: "Compare website audit results.",
    description:
      "A workflow using the PageSpeed Insights API. Requires your own Google API key.",
  },
  {
    id: "dropbox",
    title: "Dropbox Save URL",
    href: "/r%26d/dropbox-saveurl-interface.html",
    category: "tool",
    selected: true,
    tags: "API experiment",
    heading: "Save a remote file into Dropbox.",
    description:
      "An interface for saving a file and checking its progress. Requires your own Dropbox access token.",
  },
  {
    id: "design-and-code",
    title: "The space between design and code.",
    href: "/journal/design-and-code/",
    category: "write",
    selected: true,
    tags: "September 2026 · On practice",
    heading: "The space between design and code.",
    description:
      "What I’m bringing from 15+ years of making things into a practice of building with agents.",
  },
];

export const categoryLabels: Record<Category, string> = {
  web: "Web",
  app: "App",
  tool: "Tool",
  write: "Write",
};
export const postForPath = (path: string) =>
  posts.find((post) => post.href === path);
export const postImage = (post: Post) =>
  post.image?.startsWith("/") ? post.image : `/assets/portfolio/${post.image}`;
