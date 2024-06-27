<script setup >
import { ref } from 'vue';
import FooterPets from '/images/logos/footerpets.png';
</script>

<template>
    <NuxtLink to="/" class="d-flex">
        <img class="footpets" :src="FooterPets" alt="logo"/>
    </NuxtLink>
</template>
<style>
.footpets {
  height: 100px;
}
</style>