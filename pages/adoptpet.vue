<script setup >
import { ref } from 'vue';
import Gallery from '~/components/section/banner/Gallery.vue';
import AllAdoptpet from '@/components/section/AllAdoptpet.vue';
import Adoptpet from '~/components/section/pets/Adoptpet.vue'
</script>

<template>
    <div>
        <Gallery />
        <AllAdoptpet/>
        <Adoptpet/>
    </div>
</template>