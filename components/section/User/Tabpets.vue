<template>
  <v-card>
    <v-toolbar class="text-portfolio-title background-image" title="ประวัติประกาศ"></v-toolbar>

    <div class="d-flex flex-row">
      <v-tabs v-model="tab" color="primary" direction="vertical" class="tabs">
        <v-tab
          prepend-icon="mdi-dog-service"
          text="สัตว์เลี้ยงหาย"
          value="option-1"
        ></v-tab>
        <v-tab
          prepend-icon="mdi-account-eye"
          text="หาเจ้าของ"
          value="option-2"
        ></v-tab>
        <v-tab
          prepend-icon="mdi-home-search"
          text="หาบ้าน"
          value="option-3"
        ></v-tab>
      </v-tabs>

      <v-tabs-window v-model="tab" class="tabs-window">
        <v-tabs-window-item value="option-1">
          <v-card flat class="full-width">
            <v-card-text>
              <SectionAdminPetsLostpetstable class="full-width" />
            </v-card-text>
          </v-card>
        </v-tabs-window-item>

        <v-tabs-window-item value="option-2">
          <v-card flat class="full-width">
            <v-card-text>
              <SectionAdminPetsFindownertable class="full-width" />
            </v-card-text>
          </v-card>
        </v-tabs-window-item>

        <v-tabs-window-item value="option-3">
          <v-card flat class="full-width">
            <v-card-text>
              <SectionAdminPetsAdoptpettable class="full-width" />
            </v-card-text>
          </v-card>
        </v-tabs-window-item>
      </v-tabs-window>
    </div>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    tab: "option-1",
  }),
};
</script>

<style scoped>
.tabs {
  flex: 1;
  overflow: hidden;
}

.tabs-window {
  flex: 4;
  overflow: hidden;
}

.full-width {
  width: 100%;
}

.v-card {
  width: 100%;
}

.v-card-text {
  padding: 0;
  width: 100%;
}
.background-image {
  background-image: url('public/images/logos/bg-pets.png');
}
</style>
