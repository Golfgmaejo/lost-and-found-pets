<script setup >
import { ref } from 'vue';
import PetsCatDog from '/images/pets/pets-cat-dog.png';
</script>

<template>
  <img class="petscat" :src="PetsCatDog" alt="logo"/>
</template>
<style>
.petscat {
  height: 300px;
  width: 300px;
}
</style>