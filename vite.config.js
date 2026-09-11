import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // CRITICAL: Tells Vite to link assets to your GitHub Pages folder path
  base: '/ForgeFrame/',
  server: {
    host: '0.0.0.0',
    allowedHosts: 'all'
  },
  preview: {
    host: '0.0.0.0',
    allowedHosts: 'all'
  }
});
