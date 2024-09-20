<script setup>
import { ref } from 'vue';
import Gallery from '~/components/section/Home/Gallery.vue';
import Bannerlostpets from '~/components/section/banner/Bannerlostpets.vue';
import Allpets from '~/components/section/pets/Allpets.vue'

</script>

<template>
    <div>
        <Gallery />
        <Bannerlostpets/>
        <Allpets/>
    </div>
</template>