<script setup >
import { ref } from 'vue';
import Logofooter from 'public/images/logos/Lafplogo.png';

</script>

<template>
    <NuxtLink to="/" class="d-flex">
        <img class="footpets" :src="Logofooter" alt="logo"/>
    </NuxtLink>
</template>
<style scoped>
.footpets {
  height: 100px;
}
</style>