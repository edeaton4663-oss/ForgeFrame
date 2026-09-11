import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // This allows the dev server to accept any dynamic subdomain on Railway
    allowedHosts: ['.railway.app']
  },
  preview: {
    // This allows the preview server to accept any dynamic subdomain on Railway
    allowedHosts: ['.railway.app']
  }
});
