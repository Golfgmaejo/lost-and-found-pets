<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer expand-on-hover rail app class="background-image text-form">
        <v-list class="my-16">
          <v-list-item
            prepend-avatar="https://static.vecteezy.com/system/resources/thumbnails/009/636/683/small_2x/admin-3d-illustration-icon-png.png"
            subtitle="LostAndFoundPets@gmailcom"
            title="AdminLAFP"
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
        </v-list>

        <v-divider></v-divider>

        <v-list>
          <v-list-item 
            prepend-icon="mdi-logout"
            title="Logout"
            @click="logout"
          ></v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main class="main-content">
        <slot />
      </v-main>
    </v-layout>
  </v-card>
</template>

<script setup>
import { useRouter } from "vue-router";
import { watchEffect, ref } from "vue";
import { useAuthStore } from "~/stores/auth";

const router = useRouter();
const authStore = useAuthStore();
const isLoggedIn = ref(authStore.isLoggedIn());
const user = ref(authStore.user);
const isAdmin = ref(authStore.isAdmin);

watchEffect(() => {
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
</style>
