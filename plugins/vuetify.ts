import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { defineNuxtPlugin } from "#app";
import "@/assets/scss/style.scss";

import { VPicker } from "vuetify/labs/VPicker";
import * as labsComponents from "vuetify/labs/components";
import { VDateInput } from "vuetify/labs/VDateInput";
import { VTimePicker } from "vuetify/labs/VTimePicker";

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components: {
      ...components,
      ...labsComponents,
      VPicker,
      VDateInput,
      VTimePicker,
    },
    theme: {
      defaultTheme: "CustomTheme",
      themes: {
        CustomTheme: {
          colors: {
            primary: "#e97931", // Soft orange ส้มๆ #e97931
            secondary: "#D2B48C", // Light brown
            accent: "#FFD700", // Gold
            info: "#00BFFF", // Deep sky blue
            success: "#32CD32", // Lime green
            warning: "#FF4500", // Orange red
          },
        },
      },
    },
    directives,
  });

  nuxtApp.vueApp.use(vuetify);
});
