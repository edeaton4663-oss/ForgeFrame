import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Force assets to link directly to your repository folder path
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
