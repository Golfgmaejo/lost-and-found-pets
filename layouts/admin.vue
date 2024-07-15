<template>
  <v-app>
    <LcAdmin />
    <v-main class="main-content">
      <slot />
    </v-main>
  </v-app>
</template>

<script setup>
import LcAdmin from "@/components/lc/admin/index.vue";
</script>
<style scoped>
.main-content {
  margin-left: auto;
  width: 1224px;
  margin-top: 72px;
}
</style>


