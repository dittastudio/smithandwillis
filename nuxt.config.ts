// https://nuxt.com/docs/api/configuration/nuxt-config
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
        { 'http-equiv': 'content-language', 'content': 'en-GB' },
      ],
      link: [
        // https://evilmartians.com/chronicles/how-to-favicon-in-2021-six-files-that-fit-most-needs#the-ultimate-favicon-setup
        { rel: 'icon', href: '/favicon.ico', sizes: '32x32' },
        { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'preload', type: 'font/woff2', href: '/fonts/SeasonSans-Regular.woff2', as: 'font', crossorigin: '' },
      ],
    },
  },

  css: ['~/assets/css/main.css'],

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
