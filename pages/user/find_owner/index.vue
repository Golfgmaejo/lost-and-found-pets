<script setup >
import { ref } from 'vue';
import Gallery from '~/components/section/Home/Gallery.vue';
import Findownerpage from '@/components/section/banner/Findownerpage.vue'
import Findowneruser from '~/components/section/pets/Findowneruser.vue';
definePageMeta({
    layout: 'user',
  });
</script>

<template>
    <div>
        <Gallery />
        <Findownerpage/>
        <Findowneruser/>
    </div>
</template>