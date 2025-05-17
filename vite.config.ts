import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    // Configure proper MIME types
    middlewareMode: 'html',
  },
  build: {
    // Ensure proper MIME types in production
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  // Ensure proper MIME types for JavaScript modules
  assetsInclude: ['**/*.js', '**/*.mjs', '**/*.ts', '**/*.tsx'],
});
