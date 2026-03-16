import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths"

// All first-path-segments that belong to the React frontend.
// Any slug NOT in this list will be proxied to the Django backend
// so that generated sites (e.g. /legends/) are served correctly.
const FRONTEND_SEGMENTS = new Set([
  'src',
  'ioxet-labs-admin',
  'secode',
  'code-success',
  'products',
  'services',
  'resources',
  'about',
  'careers',
  'apply',
  'gallery',
  'contact',
  'privacy',
  'terms',
  'roi-calculator',
  'sitemap',
])

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths()
  ],
  server: {
    host: true,
    port: 5173,
    open: true,
    proxy: {
      // Intercept any path that looks like a single-segment slug: /<slug>/...
      // Requests for known frontend routes and static assets bypass the proxy
      // and are served by Vite/React as normal.
      '^/[a-z0-9][a-z0-9-]*(/.*)?$': {
        target: 'https://ioxet.com',
        changeOrigin: true,
        bypass(req) {
          const firstSegment = (req.url ?? '').slice(1).split('/')[0].split('?')[0]

          // Let Vite handle: empty path, file extensions (assets), Vite internals,
          // and all known React Router segments.
          if (
            !firstSegment ||
            firstSegment.includes('.') ||
            firstSegment.startsWith('@') ||
            FRONTEND_SEGMENTS.has(firstSegment)
          ) {
            return req.url
          }

          // Unknown slug → forward to Django backend (site generator)
          return null
        },
      },
    },
  },
})
