import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  root: "pages",
  base: "/dentix-rebrand/",
  publicDir: "../public",
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  plugins: [tsconfigPaths(), tailwindcss(), react()],
  build: {
    outDir: "../dist-pages",
    emptyOutDir: true,
  },
});
