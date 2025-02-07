import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({

  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
  ],

  ssr: true,

  devtools: { enabled: true },

  app: {
    head: {
      htmlAttrs: {
        lang: 'en-GB',
      },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      meta: [
        { name: 'author', content: 'Smith & Willis' },
        { name: 'revisit-after', content: '1 day' },
        { name: 'msapplication-TileColor', content: '#e87a07' },
        { name: 'theme-color', content: '#e87a07' },
        { name: 'google', content: 'notranslate' },
        { name: 'apple-mobile-web-app-title', content: 'Smith & Willis' },
        { 'http-equiv': 'content-language', 'content': 'en-GB' },
      ],
      link: [
        { rel: 'shortcut icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', href: '/favicon-96x96.png', sizes: '96x96' },
        { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'preload', type: 'font/woff2', href: '/fonts/SeasonSans-Regular.woff2', as: 'font', crossorigin: '' },
      ],
    },
  },

  css: ['~/assets/css/main.css'],

  features: {
    noScripts: true,
  },

  compatibilityDate: '2024-11-01',

  vite: {
    plugins: [
      tailwindcss(),
    ],

    vue: {
      script: {
        defineModel: true,
        propsDestructure: true,
      },
    },
  },

  eslint: {
    config: {
      standalone: false,
      stylistic: true,
      autoInit: false,
    },
  },
})
