import { defineConfig } from "vite";

export default defineConfig({
    root: "src",
    build: {
        outDir: "../dist",
        assetsDir: "assets",
        emptyOutDir: true,
        manifest: "assets/manifest.json",
        rollupOptions: {
            input: {
                script: "src/scripts/main.js",
                style: "src/styles/main.css",
            },
        },
    },
});
