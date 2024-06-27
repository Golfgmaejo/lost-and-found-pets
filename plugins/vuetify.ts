import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'

import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { defineNuxtPlugin } from '#app'
import "@/assets/scss/style.scss"
import { VPicker } from 'vuetify/labs/VPicker'

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components,
    directives,
  })


  nuxtApp.vueApp.use(vuetify)
})
