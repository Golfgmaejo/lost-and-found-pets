<template>
  <div>
    <v-row class="d-flex justify-center align-center">
      <v-col class="d-flex justify-center">
        <v-btn class="mx-2" color="accent" @click="filterProducts('สุนัข')">สุนัข</v-btn>
        <v-btn class="mx-2" color="accent" @click="filterProducts('แมว')">แมว</v-btn>
        <v-btn class="mx-2" color="accent" @click="filterProducts('สัตว์เลี้ยงอื่นๆ')">สัตว์เลี้ยงอื่นๆ</v-btn>
        <v-btn class="mx-2" color="accent" @click="filterProducts('')">ทั้งหมด</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "SortButtons",
  methods: {
    filterProducts(type) {
      this.$emit('filter', type);
    }
  }
};
</script>

<style scoped></style>
