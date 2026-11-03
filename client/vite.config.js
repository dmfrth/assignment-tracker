import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// config for the vite dev server
export default defineConfig({
  plugins: [react()], // installs react as a plugin so vite can understand the react code
  server: {
    proxy: {
      // any request starting with /api will be forwarded to the Express server (port 3001)
      // this makes the api calls same-origin
      "/api": "http://localhost:3001",
    },
  },
});
