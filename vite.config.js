import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    // Explicitly forces Vite to output straight to a clean 'dist' folder
    outDir: 'dist',
    emptyOutDir: true,
  },
  define: {
    'process.env': {}
  },
  server: {
    host: '0.0.0.0',
    allowedHosts: true
  },
  preview: {
    host: '0.0.0.0',
    allowedHosts: true
  }
});
