import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import svgLoader from 'vite-svg-loader'

const isSpa = process.env.IS_SPA === 'true'

export default defineNuxtConfig({
  modules: [
    [
      '@nuxt/eslint',
      {
        config: {
          standalone: false,
          stylistic: true,
          autoInit: false,
        },
      },
    ],
    [
      '@nuxt/image',
      {
        provider: 'storyblok',
        storyblok: {
          baseURL: 'https://a2.storyblok.com',
        },
        domains: ['storyblok.com', 'smithandwillis.london'],
        quality: 80,
        screens: {
          '2xs': 375,
          'xs': 480,
          'sm': 600,
          'md': 800,
          'lg': 1200,
          'xl': 1440,
          '2xl': 1800,
        },
      },
    ],
    '@nuxtjs/seo',
    'nuxt-ai-ready',
    [
      'nuxt-gtag',
      {
        id: 'G-QPDWJKTYHH',
      },
    ],
    [
      '@sentry/nuxt/module',
      {
        org: 'ditta-60',
        project: 'javascript-nuxt',
        autoInjectServerSentry: 'top-level-import',
        authToken: process.env.SENTRY_AUTH_TOKEN,
      },
    ],
    [
      '@storyblok/nuxt',
      {
        accessToken: process.env.STORYBLOK_TOKEN,
      },
    ],
  ],

  ssr: !isSpa,
  devtools: { enabled: true },

  app: {
    pageTransition: { name: 'fade', mode: 'out-in' },
    layoutTransition: false,
    head: {
      htmlAttrs: {
        lang: 'en-GB',
      },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      meta: [
        { name: 'author', content: 'Smith & Willis' },
        { name: 'msapplication-TileColor', content: '#111111' },
        { name: 'theme-color', content: '#111111' },
        { name: 'apple-mobile-web-app-title', content: 'Smith & Willis' },
        { 'http-equiv': 'content-language', 'content': 'en-GB' },
      ],
      link: [
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'preload', type: 'font/woff2', href: '/fonts/SeasonSans-Regular.woff2', as: 'font', crossorigin: '' },
        { rel: 'preload', type: 'font/woff2', href: '/fonts/tiempos-text-regular.woff2', as: 'font', crossorigin: '' },
        { rel: 'preload', type: 'font/woff2', href: '/fonts/tiempos-text-regular-italic.woff2', as: 'font', crossorigin: '' },
      ],
    },
  },

  css: ['~/assets/css/app.css'],

  site: {
    url: 'https://smithandwillis.london',
    name: 'Smith & Willis',
  },

  runtimeConfig: {
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    public: {
      STORYBLOK_TOKEN: process.env.STORYBLOK_TOKEN,
      STORYBLOK_VERSION: process.env.STORYBLOK_VERSION,

      sentry: {
        dsn: process.env.NUXT_PUBLIC_SENTRY_DSN, // Use a public environment variable for the DSN
      },
    },
  },

  alias: {
    '#storyblok-components': fileURLToPath(new URL('./.storyblok/types/294626585753511/storyblok-components', import.meta.url)),
    '#storyblok-types': fileURLToPath(new URL('./.storyblok/types/storyblok', import.meta.url)),
  },

  routeRules: {
    '/**': {
      prerender: !isSpa,
    },
  },

  sourcemap: {
    client: 'hidden',
  },

  future: {
    compatibilityVersion: 4,
  },

  features: {
    noScripts: false,
  },

  compatibilityDate: '2025-04-13',

  nitro: {
    prerender: {
      crawlLinks: !isSpa,
      routes: isSpa ? [] : ['/'],
      autoSubfolderIndex: false,
      ignore: [
        route => route.includes('?'),
      ],
    },
  },

  vite: {
    plugins: [
      tailwindcss(),
      svgLoader({
        svgo: false,
      }),
    ],
    vue: {
      script: {
        defineModel: true,
        propsDestructure: true,
      },
    },
  },

  postcss: {
    plugins: {
      'postcss-nested': {},
    },
  },

  ogImage: {
    enabled: false,
  },

  sitemap: {
    excludeAppSources: true,
    sources: ['/api/sitemap'],
  },
})
