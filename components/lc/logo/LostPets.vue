<script setup >
import { ref } from 'vue';
import LostPets from '/images/pets/lostpets.png';
</script>

<template>
  <img class="lotspets" :src="LostPets" alt="logo"/>
</template>
<style>
.lotspets {
  height: 90px;
  width: 90px;
  margin: 5px 0 10px;
}
</style>