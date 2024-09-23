<script setup >
import { ref } from 'vue';
import Catproduct from '/images/product/catproduct.png';
</script>

<template>
  <img class="petscat" :src="Catproduct" alt="logo"/>
</template>
<style scoped>
.petscat {
  height: 300px;
  width: 300px;
}
</style>