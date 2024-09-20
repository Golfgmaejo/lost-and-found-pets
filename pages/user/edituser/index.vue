<script setup>
import { ref } from "vue";
import Edituser from "~/components/section/User/Edituser.vue";
definePageMeta({
    layout: 'user',
  });
</script>

<template>
  <div>
    <Edituser />
  </div>
</template>
