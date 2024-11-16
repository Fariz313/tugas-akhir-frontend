import { defineNuxtConfig } from "nuxt/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    apiUrl: '',
  },
  app: {
    baseURL: '/tugas-akhir-frontend/',
    buildAssetsDir: 'assets',
    head: {
      title: 'APS', // Other meta information
      link: [
        // { rel: "stylesheet", href: 'https://unpkg.com/leaflet/dist/leaflet.css' }
      ],
      script: [
        // { src: 'https://unpkg.com/leaflet/dist/leaflet.js' },
      ]
    }
  },
  css: ["@fortawesome/fontawesome-free/css/all.css"],
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@vite-pwa/nuxt',
    'shadcn-nuxt',
    'nuxt3-leaflet',
    '@pinia/nuxt',
    "@nuxtjs/color-mode",
    '@sidebase/nuxt-auth'
  ],
  auth: {
    globalAppMiddleware: true,
    baseURL: process.env.NUXT_PUBLIC_API_URL,
    provider: {
      type: 'local',
      endpoints: {
        signIn: { path: 'login', method: 'post' },
        signOut: { path: 'logout', method: 'get' },
        signUp: { path: '/identity/accounts/register', method: 'post' },
        getSession: { path: 'me', method: 'get' }
      },
      pages: {
        login: '/login'
      },
      token: {
        signInResponseTokenPointer: '/token',
        type: 'Bearer',
        cookieName: 'auth.token',
        headerName: 'Authorization',
      }
    }
  },
  colorMode: {
    classSuffix: '',
    preference: 'light',
    fallback: 'light'
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  },
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'Aplikasi Pengambilan Sampah',
      short_name: 'APS',
      theme_color: '#07071C',
      icons: [
        {
          src: 'icon.png',
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: 'icon.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable',
        },
      ],
    },
    workbox: {
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
    },
    injectManifest: {
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
    },
    client: {
      installPrompt: true,
      periodicSyncForUpdates: 20,
    },
    devOptions: {
      enabled: true,
      suppressWarnings: true,
      navigateFallback: '/',
      navigateFallbackAllowlist: [/^\/$/],
      type: 'module',
    },
  },

})