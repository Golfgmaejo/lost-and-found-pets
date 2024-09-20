<script setup >
import { ref } from 'vue';
import Gallery from '~/components/section/Home/Gallery.vue';
import Adoptpetpage from '~/components/section/banner/Adoptpetpage.vue';
import Adoptpetuser from '~/components/section/pets/Adoptpetuser.vue';
definePageMeta({
    layout: 'user',
  });
</script>

<template>
    <div>
        <Gallery />
        <Adoptpetpage/>
        <Adoptpetuser/>
    </div>
</template>