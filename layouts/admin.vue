<template>
  <div>
    <v-app>
      <LcAdmin/>
      <v-main>
        <slot />
      </v-main>
    </v-app>
  </div>
</template>

<script setup>
import LcAdmin from '@/components/lc/admin/index.vue';
</script>
