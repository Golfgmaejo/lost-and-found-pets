<script setup>
import { ref } from 'vue';
import Gallery from '~/components/section/banner/Gallery.vue';
import AllNotice from '~/components/section/AllBanner.vue';
import Allpets from '~/components/section/pets/Allpets.vue'
</script>

<template>
    <div>
        <Gallery />
        <AllNotice/>
        <Allpets/>
    </div>
</template>