<template>
  <template v-if="isAdmin">
    <v-card>
      <v-layout>
        <v-navigation-drawer
          expand-on-hover
          rail
          app
          class="background-image text-form"
        >
          <v-list>
            <v-list-item
              :prepend-avatar="avatarUrl"
              :subtitle="`${userData.first_name} ${userData.last_name}`"
              :title="userData.email"
            ></v-list-item>
          </v-list>

          <v-divider></v-divider>
          <v-list density="compact" nav>
            <v-list-group value="Home" v-model="open">
              <template v-slot:activator="{ props }">
                <v-list-item
                  v-bind="props"
                  prepend-icon="mdi-home"
                  title="หน้าหลัก"
                ></v-list-item>
              </template>
              <v-list-group value="gallery" v-model="open">
                <template v-slot:activator="{ props }">
                  <v-list-item
                    prepend-icon="mdi-image-multiple"
                    v-bind="props"
                    title="แกลลอรี่"
                    to="/admin/gallery"
                  ></v-list-item>
                </template>
              </v-list-group>
            </v-list-group>
            <v-list-group value="Notice" v-model="open">
              <template v-slot:activator="{ props }">
                <v-list-item
                  v-bind="props"
                  prepend-icon="mdi-dog-service"
                  title="ประกาศ"
                ></v-list-item>
              </template>
              <v-list-group value="lostpets" v-model="open">
                <template v-slot:activator="{ props }">
                  <v-list-item
                    prepend-icon="mdi-dog-service"
                    v-bind="props"
                    title="สัตว์เลี้ยงหาย"
                    to="/admin/pets/lostpets"
                  ></v-list-item>
                </template>
              </v-list-group>
              <v-list-group value="findowner" v-model="open">
                <template v-slot:activator="{ props }">
                  <v-list-item
                    prepend-icon="mdi-account-eye"
                    v-bind="props"
                    title="หาเจ้าของ"
                    to="/admin/pets/findowner"
                  ></v-list-item>
                </template>
              </v-list-group>
              <v-list-group value="adoptpet" v-model="open">
                <template v-slot:activator="{ props }">
                  <v-list-item
                    prepend-icon="mdi-home-search"
                    v-bind="props"
                    title="หาบ้าน"
                    to="/admin/pets/adoptpet"
                  ></v-list-item>
                </template>
              </v-list-group>
            </v-list-group>
            <v-list-group value="product" v-model="open">
              <template v-slot:activator="{ props }">
                <v-list-item
                  v-bind="props"
                  prepend-icon="mdi-storefront"
                  title="สินค้า"
                  to="/admin/product"
                ></v-list-item>
              </template>
            </v-list-group>
            <v-list-group value="article" v-model="open">
              <template v-slot:activator="{ props }">
                <v-list-item
                  v-bind="props"
                  prepend-icon="mdi-book-open-variant-outline"
                  title="บทความ"
                  to="/admin/article"
                ></v-list-item>
              </template>
            </v-list-group>
            <v-list-group value="Users" v-model="open">
              <template v-slot:activator="{ props }">
                <v-list-item
                  v-bind="props"
                  prepend-icon="mdi-account-circle"
                  title="Users"
                  to="/admin/users"
                ></v-list-item>
              </template>
            </v-list-group>
            <v-list-group value="About" v-model="open">
              <template v-slot:activator="{ props }">
                <v-list-item
                  v-bind="props"
                  prepend-icon="mdi mdi-information-outline"
                  title="เกี่ยวกับเรา"
                ></v-list-item>
              </template>
              <v-list-group value="about" v-model="open">
                <template v-slot:activator="{ props }">
                  <v-list-item
                    prepend-icon="mdi mdi-information-outline"
                    v-bind="props"
                    title="เกี่ยวกับเรา"
                    to="/admin/about"
                  ></v-list-item>
                </template>
              </v-list-group>
              <v-list-group value="editlink" v-model="open">
                <template v-slot:activator="{ props }">
                  <v-list-item
                    prepend-icon="mdi mdi-link-edit"
                    v-bind="props"
                    title="ลิงค์ฟุตเตอร์"
                    to="/admin/about/editlink"
                  ></v-list-item>
                </template>
              </v-list-group>
            </v-list-group>
          </v-list>

          <v-divider></v-divider>

          <v-list>
            <v-list-item
              prepend-icon="mdi-logout"
              title="Logout"
              @click="logout"
              class="text-red"
            ></v-list-item>
          </v-list>
        </v-navigation-drawer>

        <v-main class="main-content">
          <slot />
        </v-main>
      </v-layout>
    </v-card>
  </template>
  <template v-else>
    <v-container fluid class="d-flex align-center justify-center fill-height">
      <v-card class="text-center elevation-2" max-width="1200" outlined>
        <v-card-title class="headline text-danger" style="font-size: 3rem">
          <v-icon large>mdi-alert-circle</v-icon>
          คุณไม่มีสิทธิ์ในการเข้าถึงหน้านี้
        </v-card-title>
        <v-card-text class="display-2">
          <h1 class="mb-4" style="font-size: 1.5rem">
            ขออภัย คุณไม่มีสิทธิ์เข้าถึงหน้าดังกล่าว
          </h1>
          <v-btn color="primary" @click="logout" class="text-h6"
            >ออกจากระบบ</v-btn
          >
        </v-card-text>
      </v-card>
    </v-container>
  </template>
</template>

<script setup>
import { onMounted, ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "~/stores/auth";
import axios from "axios";

const router = useRouter();
const authStore = useAuthStore();
const isLoggedIn = ref(authStore.isLoggedIn());
const user = ref(authStore.user);
const isAdmin = ref(authStore.isAdmin);
const avatarUrl = ref(
  "https://static.vecteezy.com/system/resources/thumbnails/009/636/683/small_2x/admin-3d-illustration-icon-png.png"
);

const userData = ref({});
const fetchUserData = async (userId) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/user/get_user/${userId}`
    );
    userData.value = response.data;
  } catch (error) {
    console.error("Failed to fetch user data", error);
    userData.value = {};
  }
};

onMounted(async () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  if (storedUser && storedUser.id) {
    authStore.user = storedUser;
    await fetchUserData(storedUser.id);
  } else {
    console.error("User is not logged in or user data is unavailable");
    userData.value = {};
  }
});

watchEffect(() => {
  authStore.initialize();
  isLoggedIn.value = authStore.isLoggedIn();
  user.value = authStore.user;
  isAdmin.value = authStore.isAdmin;
});

const logout = () => {
  authStore.logout();
  router.push("/");
};

defineProps({
  layout: {
    type: String,
    default: "admin",
  },
});
</script>

<style scoped>
.text-form {
  font-family: "Prompt", sans-serif;
  font-size: 16px;
  font-weight: 400;
}
.v-btn {
  font-family: "Prompt", sans-serif;
  font-size: 16px;
  font-weight: 400;
}
.text-portfolio {
  font-family: "Prompt", sans-serif;
  color: #777;
  font-size: 16px;
  font-weight: 400;
}
.text-portfolio-title {
  font-family: "Prompt", sans-serif;
  color: #582e2c;
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 10px;
}
.text-subtitle-1 {
  font-family: "Prompt", sans-serif;
  color: #582e2c;
  font-size: 16px !important;
  font-weight: 500;
}
.main-content {
  margin-left: 80px;
  transition: margin-left 0.3s ease;
  background-color: #ffffff;
  min-height: 100vh;
}
.v-navigation-drawer--rail:hover ~ .main-content {
  margin-left: 256px;
}
.background-image {
  background-image: url("public/images/logos/bg-admin.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.fill-height {
  height: 100vh;
}
.text-danger {
  color: #f44336;
  font-family: "Prompt", sans-serif;
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 10px;
}
.display-2 {
  font-family: "Prompt", sans-serif;
  font-size: 16px;
  font-weight: 400;
}
.v-card {
  background-color: #ffffff;
}
</style>
