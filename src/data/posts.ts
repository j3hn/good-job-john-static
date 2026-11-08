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
  /** Position in the work feed, lowest first. */
  order: number;
  /** Recommended work: appears under the star filter. */
  starred?: boolean;
  archive?: boolean;
}

export const posts: Post[] = [
  {
    id: "phatduds",
    title: "Phatduds",
    href: "/phatduds/",
    order: 10,
    category: "web",
    employer: "We Are Coast",
    starred: true,
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
    order: 20,
    category: "web",
    employer: "We Are Coast",
    starred: true,
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
    order: 30,
    category: "web",
    employer: "We Are Coast",
    starred: true,
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
    order: 40,
    category: "web",
    employer: "We Are Coast",
    starred: true,
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
    order: 50,
    category: "web",
    employer: "We Are Coast",
    starred: true,
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
    order: 60,
    category: "web",
    employer: "Goodjob",
    starred: true,
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
    id: "emma-power",
    title: "Emma Power",
    href: "/emma-power/",
    order: 80,
    category: "web",
    employer: "Goodjob",
    starred: true,
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
    order: 90,
    category: "web",
    employer: "Goodjob",
    starred: true,
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
    order: 100,
    category: "web",
    employer: "Goodjob",
    starred: true,
    archive: true,
    tags: "Web design · Development",
    heading: "A clear voice, on the web.",
    description:
      "Website design and development for journalist and writer Jenna Meade.",
  },
  {
    id: "canopy",
    title: "Canopy",
    href: "/r%26d/art/flow-forest.html",
    order: 190,
    category: "tool",
    starred: true,
    tags: "Generative art",
    heading: "An evolving canopy of particle trails.",
    description:
      "Explore how local rules, layered noise and colour build an organic whole.",
  },
  {
    id: "stipple",
    title: "Stipple Contours",
    href: "/r%26d/stipple_contours_1.html",
    order: 200,
    category: "tool",
    starred: true,
    tags: "Generative art",
    heading: "A study in dots, contours and seeded variation.",
    description: "Adjust the parameters and explore the composition.",
  },
  {
    id: "hours",
    title: "Hours in a Week",
    href: "/r%26d/hours-in-a-week/",
    order: 210,
    category: "tool",
    starred: true,
    tags: "Interactive tool",
    heading: "Make time tangible.",
    description:
      "Colour a weekly grid to explore where the hours go. Your choices stay in this browser.",
  },
  {
    id: "pagespeed",
    title: "PageSpeed Automation",
    href: "/r%26d/pagespeed-automation.html",
    order: 220,
    category: "tool",
    starred: true,
    tags: "Workflow",
    heading: "Compare website audit results.",
    description:
      "A workflow using the PageSpeed Insights API. Requires your own Google API key.",
  },
  {
    id: "dropbox",
    title: "Dropbox Save URL",
    href: "/r%26d/dropbox-saveurl-interface.html",
    order: 230,
    category: "tool",
    starred: true,
    tags: "API experiment",
    heading: "Save a remote file into Dropbox.",
    description:
      "An interface for saving a file and checking its progress. Requires your own Dropbox access token.",
  },
];

export const categoryLabels: Record<Category, string> = {
  web: "Web",
  app: "App",
  tool: "Tool",
  write: "Write",
};
export const postImage = (post: Post) =>
  post.image?.startsWith("/") ? post.image : `/assets/portfolio/${post.image}`;
