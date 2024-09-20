<script setup >
import { ref } from 'vue';
import Gallery from '~/components/section/Home/Gallery.vue';
import Adoptpetpage from '~/components/section/banner/Adoptpetpage.vue';
import Adoptpet from '~/components/section/pets/Adoptpet.vue'
</script>

<template>
    <div>
        <Gallery />
        <Adoptpetpage/>
        <Adoptpet/>
    </div>
</template>