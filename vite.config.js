import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // Set the base path to your GitHub repository name wrapped in forward slashes
  base: '/ForgeFrame/',
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    // Allowed hosts can sometimes cause CI/CD check failures if set to 'all'
    allowedHosts: true 
  },
  preview: {
    host: '0.0.0.0',
    allowedHosts: true
  }
});
