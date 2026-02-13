import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [
        laravel({
            input: ["resources/css/app.css", "resources/js/app.tsx"],
            refresh: true,
        }),
        react(),
    ],
    // DELETE AFTER TESTING - ONLY FOR LOCAL DEVELOPMENT!!

    server: {
        host: "0.0.0.0", // Listen on all network interfaces
        port: 5173,
        strictPort: true, // Fail if port taken
        hmr: {
            host: "***.***.***.**", // LOCAL IP
            protocol: "ws", // WebSocket
        },
        allowedHosts: [
            // Prevent DNS rebinding attacks
            "***.***.***.**",
            ".localhost",
        ],
    },
});
