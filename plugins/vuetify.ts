import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { defineNuxtPlugin } from '#app'
import "@/assets/scss/style.scss"

import { VPicker } from 'vuetify/labs/VPicker'
import * as labsComponents from 'vuetify/labs/components'
import { VDateInput } from 'vuetify/labs/VDateInput'
import { VTimePicker } from 'vuetify/labs/VTimePicker'

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components: {
      ...components,
      ...labsComponents,
      VPicker,
      VDateInput,
      VTimePicker,
    },
    directives,
    
  })

  nuxtApp.vueApp.use(vuetify)
})
