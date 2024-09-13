import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "https://mohammad-gh72.github.io/traverlly", // Use your actual GitHub repository name here
});
