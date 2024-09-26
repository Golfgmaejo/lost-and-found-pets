<template>
  <div>
    <v-app-bar
      color="#f6ddb5"
      style="height: 85px; display: flex; justify-content: center; padding-left: 230px;
    padding-right: 230px;"
    >
      <LcLogoLafpLogo />
      <v-spacer></v-spacer>
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
                  <nuxt-link :to="userpage.to" class="text-nav text-decoration-none">
                    <v-list-item-title class="text-decoration-none">{{ userpage.title }}</v-list-item-title>
                  </nuxt-link>
                </v-list-item>
              </v-list>
            </v-menu>
            <v-btn class="text-nav" @click="logout" color="red"
              >ออกจากระบบ</v-btn
            >
          </div>
        </ul>
      </div>
    </v-app-bar>
  </div>
</template>

<script setup>
import { watchEffect } from "vue";
import { useAuthStore } from "~/stores/auth";
import { ref } from "vue";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const isLoggedIn = ref(authStore.isLoggedIn());
const user = ref(authStore.user);
const isAdmin = ref(authStore.isAdmin);
const router = useRouter();

watchEffect(() => {
  authStore.initialize();
  isLoggedIn.value = authStore.isLoggedIn();
  user.value = authStore.user;
  isAdmin.value = authStore.isAdmin;
});
const pages = [
  { title: "สัตว์เลี้ยงหาย", to: "/lost_pet" },
  { title: "หาเจ้าของ", to: "/find_owner" },
  { title: "หาบ้าน", to: "/adopt_pet" },
];
const userpages = [
  { title: "แก้ไขข้อมูลส่วนตัว", to: "/edituser" },
  { title: "ประวัติประกาศ", to: "/userpets" },
];

const logout = () => {
  authStore.logout();
  router.push("/");
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
.app-header {
  height: 95px !important;
}
.text-nav {
  font-family:  "Prompt";
  font-size: 18px;
  color: #582e2c;
  font-weight: 500;
}
::v-deep .v-list-item-title {
  text-decoration: none !important; /* ปิดการใช้งานเส้นใต้ */
}
.nuxt-link {
  text-decoration: none !important; /* ปิดการใช้งานเส้นใต้ */
  color: inherit !important; /* เพื่อให้สีไม่เปลี่ยนตามสไตล์ลิงก์ */
}
.text-nav {
  text-decoration: none !important; /* ปิดการใช้งานเส้นใต้ */
  color: inherit !important;
}

::v-deep .nuxt-link {
  text-decoration: none !important;
}

</style>
