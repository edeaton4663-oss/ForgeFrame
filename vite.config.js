import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    // The explicit 'all' keyword completely disables hostname filtering
    allowedHosts: 'all'
  },
  preview: {
    host: '0.0.0.0',
    // Ensures the preview container server also drops filtering checks
    allowedHosts: 'all'
  }
});
