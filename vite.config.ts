import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import removeConsole from 'vite-plugin-remove-console'

export default defineConfig({
  plugins: [
    react({
      // JSX runtime optimizations
      jsxRuntime: 'automatic',
    }),
    tailwindcss(),
    // Remove console logs in production build
    removeConsole({
      includes: ['log', 'warn', 'debug', 'info'],
    }),
  ],
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'firebase': ['firebase/app', 'firebase/auth', 'firebase/firestore'],
          'router': ['@tanstack/react-router'],
          'motion': ['framer-motion'],
          'icons': ['lucide-react']
        }
      }
    },
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
      },
    },
  },
  // Performance optimizations
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'framer-motion',
      '@tanstack/react-router',
      'lucide-react'
    ],
  },
  server: {
    port: 5173,
    host: true,
    // Enable HMR with better performance
    hmr: {
      overlay: true
    }
  },
  preview: {
    port: 4173,
    host: true
  }
})