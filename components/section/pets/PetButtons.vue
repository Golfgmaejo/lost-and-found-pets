
<template>
  <div>
    <v-row class="d-flex justify-center align-center">
      <v-col class="d-flex justify-center">
        <v-btn class="mx-2" color="accent" to="/lost_pet">สัตว์เลี้ยงหาย</v-btn>
        <v-btn class="mx-2" color="accent" to="/find_owner">หาเจ้าของ</v-btn>
        <v-btn class="mx-2" color="accent" to="/adopt_pet">หาบ้าน</v-btn>
        <v-btn class="mx-2" color="accent" to="/allpets">ทั้งหมด</v-btn>
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
