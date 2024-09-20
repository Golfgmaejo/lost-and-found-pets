<template>
  <div>
    <v-app-bar class="app-header img">
      <v-container class="auto-height">
        <v-toolbar class="d-flex align-center">
          <LcLogoPetsLogo />
          <div class="ml-auto">
            <ul class="navbar-nav d-flex" min-height="auto">
              <v-btn class="text-nav" to="/"> หน้าหลัก </v-btn>
              <v-menu>
                <template v-slot:activator="{ props }">
                  <v-btn class="text-nav" v-bind="props"> ประกาศ </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    v-for="(page, index) in pages"
                    :key="index"
                    :value="index"
                    class="text-nav"
                  >
                    <nuxt-link :to="page.to" class="text-nav">
                      <v-list-item-title>{{ page.title }}</v-list-item-title>
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
      <div v-if="!isLoggedIn">
        <v-btn class="text-nav" to="/login">เข้าสู่ระบบ</v-btn>
        <v-btn class="text-nav" to="/register">สมัครสมาชิก</v-btn>
      </div>
      <div v-else>
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
  </div>
</template>

<script setup>
import { watchEffect } from 'vue';
import { useAuthStore } from '~/store/authStore';
import { ref } from 'vue';

const authStore = useAuthStore();
const isLoggedIn = ref(authStore.isLoggedIn());
const user = ref(authStore.user);
const isAdmin = ref(authStore.isAdmin);
watchEffect(() => {
  isLoggedIn.value = authStore.isLoggedIn();
  user.value = authStore.user;
  isAdmin.value = authStore.isAdmin;
});
const pages = [
  { title: "สัตว์เลี้ยงหาย", to: "/lost_pet" },
  { title: "หาเจ้าของ", to: "/find_owner" },
  { title: "หาบ้าน", to: "/adopt_pet" },
];

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
