<script setup >
import { ref } from 'vue';
import TargetPets from '/images/pets/found-home.png';
</script>

<template>
  <img class="petscat" :src="TargetPets" alt="logo"/>
</template>
<style scoped>
.petscat {
  height: 300px;
  width: 300px;
}
</style>