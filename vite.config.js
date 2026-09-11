import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Overriding with an empty string forces relative asset asset injection loops
  base: '',
  server: {
    host: '0.0.0.0',
    allowedHosts: 'all'
  },
  preview: {
    host: '0.0.0.0',
    allowedHosts: 'all'
  }
});
