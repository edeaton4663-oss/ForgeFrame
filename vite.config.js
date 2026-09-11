import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    // Bypasses Vite 6 proxy bugs by forcing host validation to always pass
    allowedHosts: () => true
  },
  preview: {
    host: '0.0.0.0',
    // Forces the production preview server to completely skip firewall checks
    allowedHosts: () => true
  }
});
