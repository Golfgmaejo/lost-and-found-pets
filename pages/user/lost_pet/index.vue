<script setup>
import { ref } from "vue";
import Gallery from "~/components/section/Home/Gallery.vue";
import Bannerlostpets from "~/components/section/banner/Bannerlostpets.vue";
import Lostpetsuser from "~/components/section/pets/Lostpetsuser.vue";

definePageMeta({
    layout: 'user',
  });
</script>

<template>
  <div>
    <Gallery />
    <Bannerlostpets />
    <Lostpetsuser />
  </div>
</template>
