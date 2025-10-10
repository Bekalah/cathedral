import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE || '/',
  resolve: {
    alias: {
      '@cathedral': path.resolve(__dirname, '../../packages'),
      '@cathedral/game-engine': path.resolve(__dirname, '../../packages/game-engine/src')
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          three: ['three']
        }
      }
    }
  },
  server: {
    port: 5173,
    host: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      },
      '/data': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  },
  define: {
    __CODEX_VERSION__: JSON.stringify('144:99'),
    __CATHEDRAL_VERSION__: JSON.stringify('2.0.0'),
    __LIVING_ARCANAE_COUNT__: 22,
    __FUSION_COMBINATIONS__: 231
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'three']
  }
})
