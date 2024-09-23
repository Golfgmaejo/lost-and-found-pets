<script setup >
import { ref } from 'vue';
import Lostpets from '/images/pets/lost-pets.png';
</script>

<template>
  <img class="petscat" :src="Lostpets" alt="logo"/>
</template>
<style scoped>
.petscat {
  height: 300px;
  width: 300px;
}
.lotspets {
  height: 90px;
  width: 90px;
  margin: 5px 0 10px;
}
</style>