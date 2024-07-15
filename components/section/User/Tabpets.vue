<template>
  <v-card>
    <v-toolbar class="text-portfolio-title" title="ประวัติประกาศ"></v-toolbar>

    <div class="d-flex flex-row">
      <v-tabs v-model="tab" color="primary" direction="vertical">
        <v-tab
          prepend-icon="mdi-dog-service"
          text="สัตว์เลี้ยงหาย"
          value="option-1"
        ></v-tab>
        <v-tab prepend-icon="mdi-account-eye" text="หาเจ้าของ" value="option-2"></v-tab>
        <v-tab
          prepend-icon="mdi-home-search"
          text="หาบ้าน"
          value="option-3"
        ></v-tab>
      </v-tabs>

      <v-tabs-window v-model="tab">
        <v-tabs-window-item value="option-1">
          <v-card flat>
            <v-card-text>
              <SectionAdminLostpetstable />
            </v-card-text>
          </v-card>
        </v-tabs-window-item>

        <v-tabs-window-item value="option-2">
          <v-card flat>
            <v-card-text>
              <SectionAdminFindownertable />
            </v-card-text>
          </v-card>
        </v-tabs-window-item>

        <v-tabs-window-item value="option-3">
          <v-card flat>
            <v-card-text>
              <SectionAdminAdoptpettable />
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
