import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// On GitHub Actions, GITHUB_REPOSITORY is "owner/repo".
// For project sites, base should be "/repo/". Locally it stays "/".
const repo = process.env.GITHUB_REPOSITORY?.split("/")[1];
const isCI = !!process.env.GITHUB_REPOSITORY;
const base = isCI && repo ? `/${repo}/` : "/";

export default defineConfig({
  base,
  plugins: [react()],
});
