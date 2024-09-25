<template>
  <div>
    <v-row class="d-flex justify-center align-center">
      <v-col class="d-flex justify-center">
        <v-tabs
          hide-slider
          v-model="tab"
          height="50"
          class="custom-tabs"
          grow
          show-arrows
        >
          <v-tab
            v-for="(type, index) in productTypes"
            :key="index"
            :value="type.value"
            :class="{
              [`tab-${type.value}`]: true,
              'active-tab': tab === type.value,
            }"
            style="margin-left: 10px; margin-right: 10px"
            @click="navigateTo(type.value)"
          >
            <span class="text-portfolio-tab">{{ type.label }}</span>
          </v-tab>
        </v-tabs>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "PetButtons",
  data() {
    return {
      productTypes: [
        { value: "lost_pet", label: "สัตว์เลี้ยงหาย" },
        { value: "find_owner", label: "หาเจ้าของ" },
        { value: "adopt_pet", label: "หาบ้าน" },
        { value: "allpets", label: "ทั้งหมด" },
      ],
      tab: this.$route.path.split('/')[1] || null, // ตั้งค่า tab ตามเส้นทางเริ่มต้น
    };
  },
  methods: {
    navigateTo(value) {
      this.$router.push(`/${value}`);
    },
  },
  watch: {
    '$route'(to) {
      this.tab = to.path.split('/')[1]; // อัปเดต tab เมื่อเส้นทางเปลี่ยน
    },
  },
};
</script>


<style scoped>
.text-portfolio-tab {
  font-family: "Prompt", sans-serif;
  color: #582e2c;
  font-size: 18px;
  font-weight: 500;
}
.v-tab.v-tab.v-btn {
  border-radius: 45px;
  min-width: 90px;
}
.v-slide-group__container {
  background-color: #faf6f0;
  border-radius: 50px;
}
.custom-tabs {
  background-color: #faf6f0;
  border-radius: 40px;
}

.active-tab {
  background-color: #ffca7a;
  box-shadow: 0px 2px 4px 0 rgba(96, 97, 112, 0.16),
    0px 0px 1px 0 rgba(40, 41, 61, 0.04);
}
</style>
