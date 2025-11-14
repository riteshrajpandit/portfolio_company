// Optimized Vite Configuration for Production
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths"

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths()
  ],
  
  server: {
    host: true,
    port: 5173,
    open: true
  },

  build: {
    // Enable minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug']
      },
      format: {
        comments: false
      }
    },
    
    // Chunk splitting strategy for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate React and routing libraries
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          
          // UI libraries in separate chunk
          'vendor-ui': ['@chakra-ui/react', 'framer-motion'],
          
          // Icons
          'vendor-icons': ['react-icons'],
          
          // Animations
          'vendor-animations': [
            '@lottiefiles/dotlottie-react', 
            'lottie-react'
          ]
        },
        
        // Better chunk naming
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
      }
    },
    
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
    
    // Enable CSS code splitting
    cssCodeSplit: true,
    
    // Source maps - set to false for production
    sourcemap: false,
    
    // Target modern browsers
    target: 'es2015',
    
    // Asset inlining threshold (10kb)
    assetsInlineLimit: 10240
  },
  
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      '@chakra-ui/react',
      'framer-motion',
      'react-router-dom'
    ]
  },
  
  // Preview server configuration
  preview: {
    port: 4173,
    host: true
  }
})
