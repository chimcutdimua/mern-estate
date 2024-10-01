import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3001", // Replace with your backend API endpoint
        changeOrigin: true,
        secure: true,
      },
    },
  },
  plugins: [react()],
});
