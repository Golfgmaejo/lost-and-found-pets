<script setup>
const title = ref("Next-kit - Nuxt3 Typescript Free UI kit built with Vuetify3");
useHead({
  meta: [{ content: title }],
  titleTemplate: (titleChunk) => {
    return titleChunk
      ? `${titleChunk} - Nuxt3 Typescript Free UI kit built with Vuetify3`
      : "Lost And Found Pets";
  },
});
</script>

<template>
  <v-app dark>
    <LcHeader/>
    <v-main>
      <slot />  
    </v-main>
    <LcFooter/>
  </v-app>
</template>
