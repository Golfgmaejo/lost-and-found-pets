<script setup >
import { ref } from 'vue';
import Gallery from '~/components/section/banner/Gallery.vue';
import AllFindowner from '@/components/section/AllFindowner.vue';
import Findowner from '@/components/section/pets/Findowner.vue'
</script>

<template>
    <div>
        <Gallery />
        <AllFindowner/>
        <Findowner/>
    </div>
</template>