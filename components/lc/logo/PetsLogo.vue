<script setup >
import { ref } from 'vue';
import PetsLogo from '/images/logos/pets-logo.png';
</script>

<template>
    <NuxtLink to="/" class="d-flex">
        <img class="pets" :src="PetsLogo" alt="logo"/>
    </NuxtLink>
</template>
<style scoped> 
.pets {
  height: 70px;
}
</style>