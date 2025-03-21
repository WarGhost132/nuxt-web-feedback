// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@nuxtjs/google-fonts', '@nuxt/eslint', '@nuxt/icon'],

  googleFonts: {
    families: {
      "Montserrat": true
    }
  },

  routeRules: {
    '/': { prerender: true },
    '/api/**': { cors: true}
  },

  runtimeConfig: {
    public: {
      nodeEnv: process.env.NODE_ENV,
      yandexClientId: process.env.YANDEX_CLIENT_ID,
      yandexClientSecret: process.env.YANDEX_CLIENT_SECRET,
      yandexRedirectUri: process.env.YANDEX_REDIRECT_URI,
    }
  },

  
})
