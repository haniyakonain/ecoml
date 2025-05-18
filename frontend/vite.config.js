
import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
  plugins: [
    nodePolyfills({
      // Whether to polyfill `node:` protocol imports.
      protocolImports: true,
    }),
  ],
  build: {
    outDir: 'dist', // Specifies the output directory for build files
    sourcemap: true, // Enable source maps for debugging
    rollupOptions: {
      output: {
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
  },
  define: {
    'process.env': { ...process.env }, // Ensures process.env is accessible
  },
  resolve: {
    alias: {
      '@': '/src', // Alias for cleaner imports
    },
  },
  server: {
    port: 3000, // Development server port
    open: true, // Automatically open the app in the browser
  },
});