<script setup >
import { ref } from 'vue';
import LafpLogo from '/images/logos/Lafplogotext.png';
</script>

<template>
    <NuxtLink to="/" class="d-flex">
        <img class="pets" :src="LafpLogo" alt="logo"/>
    </NuxtLink>
</template>
<style scoped> 
.pets {
  height: 70px;
}
</style>