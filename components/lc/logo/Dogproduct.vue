<script setup >
import { ref } from 'vue';
import Dogproduct from '/images/product/dogproduct.png';
</script>

<template>
  <img class="petscat" :src="Dogproduct" alt="logo"/>
</template>
<style scoped>
.petscat {
  height: 300px;
  width: 300px;
}
</style>