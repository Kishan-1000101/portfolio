import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// GitHub Actions sets VITE_BASE to "/<repo>/" for project Pages.
// Locally and for OVH subdirectory deploys, relative "./" is safest.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: process.env.VITE_BASE || "./",
});
