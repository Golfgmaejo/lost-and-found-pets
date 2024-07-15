<template>
  <div>
    <!-- -----------------------------------------------
            Start Header
      ----------------------------------------------- -->
    <v-app-bar class="app-header img">
      <v-container class="auto-height">
        <v-toolbar class="d-flex align-center">
          <!-- Logo -->
          <LcLogoPetsLogo />
          <!-- Desktop view Navigation -->
          <div class="ml-auto">
            <ul class="navbar-nav d-flex" min-height="auto">
              <v-btn class="text-nav" to="/"> หน้าหลัก </v-btn>
              <v-menu>
                <template v-slot:activator="{ props }">
                  <v-btn class="text-nav" v-bind="props"> ประกาศ </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    v-for="(pages, index) in pages"
                    :key="index"
                    :value="index"
                    class="text-nav"
                  >
                    <!-- <v-list-item-title  class="text-nav">{{ item.title }}</v-list-item-title> -->
                    <nuxt-link :to="pages.to" class="text-nav">
                      <v-list-item-title>{{ pages.title }}</v-list-item-title>
                    </nuxt-link>
                  </v-list-item>
                </v-list>
              </v-menu>
              <v-btn class="text-nav" to="/product">สินค้า</v-btn>

              <v-btn class="text-nav" to="/article">บทความ</v-btn>
              <v-btn class="text-nav" to="/about">เกี่ยวกับเรา</v-btn>
            </ul>
          </div>
        </v-toolbar>
      </v-container>
      <div>
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn class="text-nav" v-bind="props"
              ><v-icon>mdi-account</v-icon></v-btn
            >
          </template>
          <v-list>
            <v-list-item
              v-for="(userpages, index) in userpages"
              :key="index"
              :value="index"
              class="text-nav"
            >
              <!-- <v-list-item-title  class="text-nav">{{ item.title }}</v-list-item-title> -->
              <nuxt-link :to="userpages.to" class="text-nav">
                <v-list-item-title>{{ userpages.title }}</v-list-item-title>
              </nuxt-link>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn class="text-nav" color="red" to="/">ออกจากระบบ</v-btn>
      </div>
    </v-app-bar>
    <!-- -----------------------------------------------
            End Header
      ----------------------------------------------- -->
  </div>
  <!----sidebar menu drawer start----->
</template>
<script>
export default {
  data() {
    return {
      pages: [
        { title: "สัตว์เลี้ยงหาย", to: "/notice" },
        { title: "หาเจ้าของ", to: "/findowner" },
        { title: "หาบ้าน", to: "/adoptpet" },
      ],
      userpages: [
        { title: "แก้ไขข้อมูลส่วนตัว", to: "/edituser" },
        { title: "ประกาศสัตว์หาย", to: "/notice" },
        { title: "ประวัติประกาศ", to: "/userpets" },
      ],
    }; 
  },
};
</script>
<style>
.v-list-item-title {
  -webkit-hyphens: auto;
  hyphens: auto;
  overflow-wrap: normal;
  overflow: hidden;
  padding: 0;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: normal;
  word-wrap: break-word;
  font-size: 1rem;
  font-weight: 400;
  letter-spacing: 0.009375em;
  line-height: 1.5rem;
  text-transform: none;
  font-family: "Prompt";
}
</style>
