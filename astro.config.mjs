import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://goodjobjohn.com",
  output: "static",
  trailingSlash: "always",
  server: { port: 8000, host: "127.0.0.1" },
  // Code blocks are plain text; the site styles them with its own palette.
  markdown: { syntaxHighlight: false },
});
