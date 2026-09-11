import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Setting this to true permits Vite to respond to any incoming Railway host domain securely
    allowedHosts: true
  },
  preview: {
    // This catches the preview container server and unblocks the request layout
    allowedHosts: true
  }
});
