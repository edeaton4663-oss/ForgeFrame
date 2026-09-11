import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      'forgeframe-production.up.railway.app'
    ]
  },
  preview: {
    allowedHosts: [
      'forgeframe-production.up.railway.app'
    ]
  }
});
