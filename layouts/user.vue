<template>
  <v-app>
    <v-app-bar class="app-header img">
      <v-container class="auto-height">
        <v-toolbar class="d-flex align-center">
          <LcLogoPetsLogo />
          <div class="ml-auto">
            <ul class="navbar-nav d-flex" min-height="auto">
              <v-btn class="text-nav" to="/user"> หน้าหลัก </v-btn>
              <v-menu>
                <template v-slot:activator="{ props }">
                  <v-btn class="text-nav" v-bind="props"> ประกาศ </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    v-for="(page, index) in pages"
                    :key="index"
                    class="text-nav"
                  >
                    <nuxt-link :to="page.to" class="text-nav">
                      <v-list-item-title>{{ page.title }}</v-list-item-title>
                    </nuxt-link>
                  </v-list-item>
                </v-list>
              </v-menu>
              <v-btn class="text-nav" to="/user/product">สินค้า</v-btn>
              <v-btn class="text-nav" to="/user/article">บทความ</v-btn>  
              <v-btn class="text-nav" to="/user/about">เกี่ยวกับเรา</v-btn>
            </ul>
          </div>
        </v-toolbar>
      </v-container>
      <div>
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn class="text-nav" v-bind="props">
              <v-icon>mdi-account</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(userpage, index) in userpages"
              :key="index"
              class="text-nav"
            >
              <nuxt-link :to="userpage.to" class="text-nav">
                <v-list-item-title>{{ userpage.title }}</v-list-item-title>
              </nuxt-link>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn class="text-nav" color="red" @click="logout">ออกจากระบบ</v-btn>
      </div>
    </v-app-bar>
    <v-main>
      <slot />
    </v-main>
    <LcFooter />
  </v-app>
</template>
<script>
export default {
  layout: 'user',
  data() {
    return {
      pages: [
        { title: "สัตว์เลี้ยงหาย", to: "/user/lost_pet" },
        { title: "หาเจ้าของ", to: "/user/find_owner" },
        { title: "หาบ้าน", to: "/user/adopt_pet" },
      ],
      userpages: [
        { title: "แก้ไขข้อมูลส่วนตัว", to: "/user/edituser" },
        { title: "ประกาศสัตว์หาย", to: "/user/lost_pet" },
        { title: "ประวัติประกาศ", to: "/user/userpets" },
      ],
    };
  },
  methods: {
    logout() {
      // Implement logout functionality here
      // For example, you might want to clear auth tokens and redirect
      this.$router.push('/'); // Redirect to the home page
    }
  }
};
</script>
<style scoped>
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
