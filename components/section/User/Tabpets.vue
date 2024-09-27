<template>
  <v-card>
    <v-toolbar class="text-portfolio-title background-image" title="ประวัติประกาศ"></v-toolbar>

    <div class="d-flex flex-row">
      <v-tabs
        v-model="tab"
        color="primary"
        direction="vertical"
        class="tabs custom-tabs"
        centered
      >
        <v-tab
          prepend-icon="mdi-dog-service"
          text="สัตว์เลี้ยงหาย"
          value="option-1"
          class="text-tab-dog"
        ></v-tab>
        <v-tab
          prepend-icon="mdi-account-eye"
          text="หาเจ้าของ"
          value="option-2"
          class="text-tab-dog"
        ></v-tab>
        <v-tab
          prepend-icon="mdi-home-search"
          text="หาบ้าน"
          value="option-3"
          class="text-tab-dog"
        ></v-tab>
      </v-tabs>

      <v-tabs-window v-model="tab" class="tabs-window">
        <v-tabs-window-item value="option-1">
          <v-card flat class="full-width">
            <v-card-text>
              <SectionUserUserpetsLostpetstable class="full-width" />
            </v-card-text>
          </v-card>
        </v-tabs-window-item>

        <v-tabs-window-item value="option-2">
          <v-card flat class="full-width">
            <v-card-text>
              <SectionUserUserpetsFindownertable class="full-width" />
            </v-card-text>
          </v-card>
        </v-tabs-window-item>

        <v-tabs-window-item value="option-3">
          <v-card flat class="full-width">
            <v-card-text>
              <SectionUserUserpetsAdoptpettable class="full-width" />
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
  flex: 0.5;
  overflow: hidden;
}

.tabs-window {
  flex: 4;
  overflow: hidden;
}

.full-width {
  width: 98%;
}

.v-card {
  width: 100%;
}

.v-card-text {
  padding: 0;
  width: 100%;
}

.background-image {
  background-image: url('public/images/logos/bg-admin.png');
}

.text-portfolio-title {
  font-family: "Prompt", sans-serif;
  color: #582e2c;
  font-size: 32px;
  font-weight: 700;
}

.text-portfolio-tab {
  font-family: "Prompt", sans-serif;
  color: #582e2c;
  font-size: 18px;
  font-weight: 500;
}

.text-tab-dog {
  font-family: "Prompt", sans-serif;
  color: #777;
  font-size: 16px;
  font-weight: 400;
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

.centered-text {
  text-align: center;
}

.centered-text-with-lines {
  display: flex;
  align-items: center;
  text-align: center;
  font-family: "Prompt", sans-serif;
  color: #e48245;
  font-size: 24px;
  font-weight: 500;
}

.centered-text-with-lines::before,
.centered-text-with-lines::after {
  content: "";
  flex: 1;
  border-bottom: 1px solid #ccc;
  margin: 0 10px;
}

.v-tab.v-tab.v-btn {
  border-radius: 45px;
  min-width: 90px;
}
</style>
