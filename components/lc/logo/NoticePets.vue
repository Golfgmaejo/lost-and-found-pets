<script setup >
import { ref } from 'vue';
import NoticePets from '/images/pets/lost-pets.png';
</script>

<template>
  <img class="petscat" :src="NoticePets" alt="logo"/>
</template>
<style>
.petscat {
  height: 300px;
  width: 300px;
}
</style>