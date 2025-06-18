import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'all-config-icons/apple-icon-180x180.png',
        'all-config-icons/favicon-32x32.png',
        'all-config-icons/favicon-16x16.png'
      ],
      manifest: {
        name: 'sYnask — Инновационная соцсеть',
        short_name: 'sYnask',
        description: 'Инновационная социальная сеть для авторов под управлением ИИ',
        start_url: '/',
        display: 'standalone',
        background_color: '#000000',
        theme_color: '#000000',
        icons: [
          {
            src: '/all-config-icons/android-icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/all-config-icons/apple-icon-180x180.png',
            sizes: '180x180',
            type: 'image/png'
          },
          {
            src: '/all-config-icons/favicon-96x96.png',
            sizes: '96x96',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})
