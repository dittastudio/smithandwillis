// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
  ],

  devtools: { enabled: true },

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
