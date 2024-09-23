<script setup >
import { ref } from 'vue';
import Allproduct from 'public/images/product/otherpetsproduct.png';
</script>

<template>
  <img class="petscat" :src="Allproduct" alt="logo"/>
</template>
<style scoped>
.petscat {
  height: 300px;
  width: 300px;
}
</style>