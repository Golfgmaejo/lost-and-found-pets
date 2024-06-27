
<template>
  <div>
    <v-row class="d-flex justify-center align-center">
      <v-col class="d-flex justify-center">
        <v-btn class="mx-2" to="/notice">สัตว์เลี้ยงหาย</v-btn>
        <v-btn class="mx-2" to="/findowner">หาเจ้าของ</v-btn>
        <v-btn class="mx-2" to="/adoptpet">หาบ้าน</v-btn>
        <v-btn class="mx-2" to="/allpets">ทั้งหมด</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'PetButtons'
}
</script>

<style scoped>
</style>
