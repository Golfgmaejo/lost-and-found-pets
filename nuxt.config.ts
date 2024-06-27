import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  devtools: { enabled: true },
  build: {
    transpile: ['vuetify'],
  },

  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config: any) => {
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
    define: {
      'process.env.DEBUG': false,
    },
    plugins: [
      vuetify({ autoImport: true })
    ],
  },
  css: [
    'vuetify/styles',
    '@mdi/font/css/materialdesignicons.css',
    'material-design-icons-iconfont/dist/material-design-icons.css'
  ],
  plugins: [
    '~/plugins/vuetify.ts'
  ],
})
