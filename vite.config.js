import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    // Bypasses the proxy check entirely
    allowedHosts: () => true
  },
  preview: {
    host: '0.0.0.0',
    // Bypasses the preview proxy check entirely
    allowedHosts: () => true
  }
});
