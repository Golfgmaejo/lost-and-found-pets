import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  nitro: {
    firebase: {
      gen: 2
    }
  },
  devtools: { enabled: true },
  build: {
    transpile: ["vuetify"],
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config: any) => {
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
    "@nuxtjs/leaflet",
    "@pinia/nuxt",
    
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
    define: {
      "process.env.DEBUG": false,
    },
    plugins: [vuetify({ autoImport: true })],
  },
  plugins: ["~/plugins/vuetify.ts"],
  compatibilityDate: "2024-08-12",
});
