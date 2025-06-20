import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",  // Allow access from external devices
    port: 5173,        // Default Vite port
    strictPort: true,
    allowedHosts: ["d3c2-103-154-26-102.ngrok-free.app"],  // Add your ngrok domain
  }
});
