import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    strictPort: true,
    allowedHosts: ['forgeframe-production.up.railway.app', 'forgeframe-production-161b.up.railway.app', '.railway.app', 'all']
  },
  preview: {
    host: '0.0.0.0',
    strictPort: true,
    allowedHosts: ['forgeframe-production.up.railway.app', 'forgeframe-production-161b.up.railway.app', '.railway.app', 'all']
  }
});
