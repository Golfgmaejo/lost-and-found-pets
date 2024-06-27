<script setup>
import { ref } from 'vue';
import Gallery from '~/components/section/banner/Gallery.vue';
import AllBanner from '~/components/section/AllBanner.vue';
import Lostpets from '~/components/section/pets/Lostpets.vue'
</script>

<template>
    <div>
        <Gallery />
        <AllBanner/>
        <Lostpets/>
    </div>
</template>