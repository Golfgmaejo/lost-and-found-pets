<script setup>
import { ref } from "vue";
import Gallery from "~/components/section/Home/Gallery.vue";
import Bannerlostpets from "~/components/section/banner/Bannerlostpets.vue";
import Allpetsuser from "~/components/section/pets/Allpetsuser.vue";
definePageMeta({
  layout: "user",
});
</script>

<template>
  <div>
    <Gallery />
    <Bannerlostpets />
    <Allpetsuser />
  </div>
</template>
