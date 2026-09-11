import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://goodjobjohn.com",
  output: "static",
  trailingSlash: "always",
  server: { port: 8000, host: "127.0.0.1" },
});
