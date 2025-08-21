import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import * as path from "path";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        globPatterns: [
          "**/*.{js,css,html,ico,svg,jpg,jpeg,webp}",
          "assets/img/*.{jpg,png}",
        ],
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === "image",
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "images-cache",
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30,
              },
            },
          },
        ],
      },
      // devOptions: {
      //   enabled: true,
      // },
    }),
  ],
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
  },
});
