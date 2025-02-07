import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
	base: "/project_online-library-app",
	plugins: [react()],
	define: {
		"process.env": {},
	},
	css: {
		preprocessorOptions: {
			scss: {
				api: "modern-compiler",
			},
		},
	},
});
